/**
 * Service layer for the Supabase `users` table and authentication.
 *
 * Table columns:
 * id, created_at, account_type, first_name, last_name, email, terms_accepted
 */
const UsersService = {
    getClient() {
        if (!window.supabaseClient) {
            throw new Error('Supabase is not configured. See js/supabase-config.example.js');
        }
        return window.supabaseClient;
    },

    isConfigured() {
        return Boolean(window.supabaseClient);
    },

    mapAccountType(selectedType) {
        return selectedType === 'technician' ? 'technician' : 'regular_user';
    },

    toSessionUser(profile) {
        return {
            id: profile.id,
            email: profile.email,
            name: `${profile.first_name} ${profile.last_name}`.trim(),
            firstName: profile.first_name,
            lastName: profile.last_name,
            role: profile.account_type,
            accountType: profile.account_type,
            termsAccepted: profile.terms_accepted,
            avatar: profile.avatar || this.getDefaultAvatar(profile.account_type)
        };
    },

    getDefaultAvatar(accountType) {
        if (accountType === 'technician') {
            return 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80';
        }
        return 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80';
    },

    saveSessionUser(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
    },

    async getProfileByEmail(email) {
        const supabase = this.getClient();
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .maybeSingle();

        if (error) {
            throw error;
        }

        return data;
    },

    async ensureProfile(authUser) {
        const email = authUser?.email;
        if (!email) {
            throw new Error('Signed-in account is missing an email address.');
        }

        const existingProfile = await this.getProfileByEmail(email);
        if (existingProfile) {
            return existingProfile;
        }

        const meta = authUser.user_metadata || {};
        const supabase = this.getClient();
        const profilePayload = {
            email,
            first_name: meta.first_name || '',
            last_name: meta.last_name || '',
            account_type: meta.account_type || 'regular_user',
            terms_accepted: Boolean(meta.terms_accepted)
        };

        const { data, error } = await supabase
            .from('users')
            .insert(profilePayload)
            .select('*')
            .single();

        if (error) {
            if (error.code === '23505') {
                return this.getProfileByEmail(email);
            }
            throw error;
        }

        return data;
    },

    getAuthErrorMessage(error) {
        const message = error?.message || '';
        const code = error?.code || error?.error_code || '';

        if (code === 'email_not_confirmed' || /email not confirmed/i.test(message)) {
            return 'Please confirm your email before signing in. Check your inbox for the confirmation link.';
        }

        if (code === 'invalid_credentials' || /invalid login credentials/i.test(message)) {
            return 'Invalid email or password.';
        }

        if (code === 'user_not_found' || /user not found/i.test(message)) {
            return 'No account found with that email. Please sign up first.';
        }

        if (/user profile not found/i.test(message)) {
            return 'Your account exists but the profile is missing. Please try again or contact support.';
        }

        return message || 'Something went wrong. Please try again.';
    },

    async register({ firstName, lastName, email, password, accountType, termsAccepted }) {
        const supabase = this.getClient();
        const mappedAccountType = this.mapAccountType(accountType);

        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    account_type: mappedAccountType,
                    terms_accepted: termsAccepted
                }
            }
        });

        if (authError) {
            throw authError;
        }

        let profile = null;

        if (authData.session) {
            const { data, error } = await supabase
                .from('users')
                .insert({
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    account_type: mappedAccountType,
                    terms_accepted: termsAccepted
                })
                .select('*')
                .single();

            if (error) {
                throw error;
            }

            profile = data;
        }

        return {
            authUser: authData.user,
            session: authData.session,
            profile
        };
    },

    async login({ email, password }) {
        const supabase = this.getClient();

        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (authError) {
            throw authError;
        }

        const profile = await this.ensureProfile(authData.user);

        if (!profile) {
            throw new Error('User profile not found in the database.');
        }

        const sessionUser = this.toSessionUser(profile);
        this.saveSessionUser(sessionUser);

        return {
            session: authData.session,
            user: sessionUser
        };
    },

    async logout() {
        if (!this.isConfigured()) {
            localStorage.removeItem('currentUser');
            return;
        }

        const supabase = this.getClient();
        await supabase.auth.signOut();
        localStorage.removeItem('currentUser');
    },

    async restoreSession() {
        if (!this.isConfigured()) {
            return null;
        }

        const supabase = this.getClient();
        const { data, error } = await supabase.auth.getSession();

        if (error || !data.session) {
            return null;
        }

        const profile = await this.ensureProfile(data.session.user);

        if (!profile) {
            return null;
        }

        return this.saveSessionUser(this.toSessionUser(profile));
    },

    getCurrentUser() {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    },

    isLoggedIn() {
        return this.getCurrentUser() !== null;
    }
};

window.UsersService = UsersService;
