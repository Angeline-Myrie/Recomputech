// ========================================
// TECHNICIAN AUTHENTICATION - SUPABASE
// ========================================

document.addEventListener('DOMContentLoaded', async function () {

    // ========================================
    // ELEMENTOS DEL DOM
    // ========================================

    const urlParams = new URLSearchParams(window.location.search);
    const initialMode = urlParams.get('mode') === 'register' ? 'register' : 'login';

    const toggleBtns = document.querySelectorAll('.toggle-btn');

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    const authTitle = document.getElementById('authTitle');
    const authSubtitle = document.getElementById('authSubtitle');

    const togglePasswordBtns = document.querySelectorAll('.toggle-password');

    const profilePhotoInput = document.getElementById('profilePhoto');
    const profilePhotoPreview = document.getElementById('profilePhotoPreview');
    const profilePhotoImg = document.getElementById('profilePhotoImg');
    const removeProfilePhotoBtn = document.getElementById('removeProfilePhoto');

    const certificationPhotosInput = document.getElementById('certificationPhotos');
    const certificationPhotosPreview = document.getElementById('certificationPhotosPreview');

    const applicationMessage = document.getElementById('applicationMessage');
    const submitApplicationBtn = document.getElementById('submitApplicationBtn');

    let currentMode = initialMode;

    let profilePhotoData = null;
    let certificationPhotoData = [];


    // ========================================
    // VERIFICAR SUPABASE
    // ========================================

    if (!window.supabaseClient) {
        console.error('Supabase client is not available.');

        showNotification(
            'Unable to connect to the authentication system. Please try again later.',
            'error'
        );

        return;
    }

    const supabase = window.supabaseClient;


    // ========================================
    // FUNCIONES AUXILIARES
    // ========================================

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }


    function getCheckedValues(name) {
        return Array.from(
            document.querySelectorAll(`input[name="${name}"]:checked`)
        ).map(el => el.value);
    }


    function splitCommaValues(value) {
        if (!value) return [];

        return value
            .split(',')
            .map(item => item.trim())
            .filter(Boolean);
    }


    function readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {

            const reader = new FileReader();

            reader.onload = () => resolve(reader.result);

            reader.onerror = () => reject(
                new Error('Unable to read the selected file.')
            );

            reader.readAsDataURL(file);
        });
    }


    // ========================================
    // NOTIFICACIONES
    // ========================================

    function showNotification(message, type = 'info') {

        const existingNotification =
            document.querySelector('.auth-notification');

        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');

        notification.className =
            `auth-notification auth-notification-${type}`;

        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>

            <button class="notification-close" type="button">
                <i class="fas fa-times"></i>
            </button>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${getNotificationColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        const closeNotification = () => {

            if (!notification.parentNode) return;

            notification.style.animation =
                'slideOutRight 0.3s ease-out';

            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        };

        setTimeout(closeNotification, 5000);

        notification
            .querySelector('.notification-close')
            .addEventListener('click', closeNotification);
    }


    function getNotificationIcon(type) {

        switch (type) {

            case 'success':
                return 'fa-check-circle';

            case 'error':
                return 'fa-exclamation-circle';

            case 'warning':
                return 'fa-exclamation-triangle';

            default:
                return 'fa-info-circle';
        }
    }


    function getNotificationColor(type) {

        switch (type) {

            case 'success':
                return 'linear-gradient(135deg, #10b981, #059669)';

            case 'error':
                return 'linear-gradient(135deg, #ef4444, #dc2626)';

            case 'warning':
                return 'linear-gradient(135deg, #f59e0b, #d97706)';

            default:
                return 'linear-gradient(135deg, #218DA6, #1b6e82)';
        }
    }


    // ========================================
    // APPLICATION MESSAGE
    // ========================================

    function showApplicationMessage(message, type = 'success') {

        if (!applicationMessage) return;

        applicationMessage.className =
            `alert alert-${type}`;

        applicationMessage.textContent = message;

        applicationMessage.classList.remove('d-none');
    }


    // ========================================
    // LOGIN / REGISTER TOGGLE
    // ========================================

    toggleBtns.forEach(btn => {

        btn.classList.toggle(
            'active',
            btn.dataset.mode === initialMode
        );
    });


    function switchToLogin() {

        authTitle.textContent = 'Technician Sign In';

        authSubtitle.textContent =
            'Access your technician dashboard';

        registerForm.style.opacity = '0';
        registerForm.style.transform = 'translateX(20px)';

        setTimeout(() => {

            registerForm.style.display = 'none';

            loginForm.style.display = 'block';

            setTimeout(() => {

                loginForm.style.opacity = '1';
                loginForm.style.transform = 'translateX(0)';

            }, 50);

        }, 200);
    }


    function switchToRegister() {

        authTitle.textContent =
            'Technician Application';

        authSubtitle.textContent =
            'Apply to join the Recomputech technician network';

        loginForm.style.opacity = '0';
        loginForm.style.transform = 'translateX(-20px)';

        setTimeout(() => {

            loginForm.style.display = 'none';

            registerForm.style.display = 'block';

            setTimeout(() => {

                registerForm.style.opacity = '1';
                registerForm.style.transform = 'translateX(0)';

            }, 50);

        }, 200);
    }


    if (initialMode === 'register') {

        loginForm.style.display = 'none';
        loginForm.style.opacity = '0';

        registerForm.style.display = 'block';
        registerForm.style.opacity = '1';
        registerForm.style.transform = 'translateX(0)';

        authTitle.textContent =
            'Technician Application';

        authSubtitle.textContent =
            'Apply to join the Recomputech technician network';

    } else {

        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    }


    toggleBtns.forEach(btn => {

        btn.addEventListener('click', function () {

            const mode = this.dataset.mode;

            if (mode === currentMode) return;

            toggleBtns.forEach(b =>
                b.classList.remove('active')
            );

            this.classList.add('active');

            if (mode === 'login') {
                switchToLogin();
            } else {
                switchToRegister();
            }

            currentMode = mode;
        });
    });


    // ========================================
    // PASSWORD VISIBILITY - LOGIN ONLY
    // ========================================

    togglePasswordBtns.forEach(btn => {

        btn.addEventListener('click', function () {

            const input =
                this.parentElement.querySelector(
                    'input[type="password"], input[type="text"]'
                );

            if (!input) return;

            const icon = this.querySelector('i');

            if (input.type === 'password') {

                input.type = 'text';

                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');

            } else {

                input.type = 'password';

                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });


    // ========================================
    // PROFILE PHOTO PREVIEW
    // ========================================

    if (profilePhotoInput) {

        profilePhotoInput.addEventListener(
            'change',
            async function () {

                const file = this.files[0];

                if (!file) return;

                if (!file.type.startsWith('image/')) {

                    showNotification(
                        'Please select a valid image file.',
                        'error'
                    );

                    this.value = '';

                    return;
                }

                try {

                    profilePhotoData =
                        await readFileAsDataURL(file);

                    profilePhotoImg.src =
                        profilePhotoData;

                    profilePhotoPreview.hidden = false;

                } catch (error) {

                    console.error(error);

                    showNotification(
                        'Unable to read the selected image.',
                        'error'
                    );
                }
            }
        );
    }


    // ========================================
    // REMOVE PROFILE PHOTO
    // ========================================

    if (removeProfilePhotoBtn) {

        removeProfilePhotoBtn.addEventListener(
            'click',
            function () {

                profilePhotoData = null;

                profilePhotoInput.value = '';

                profilePhotoPreview.hidden = true;

                profilePhotoImg.src = '';
            }
        );
    }


    // ========================================
    // CERTIFICATION PHOTOS PREVIEW
    // ========================================

    if (certificationPhotosInput) {

        certificationPhotosInput.addEventListener(
            'change',
            async function () {

                const files = Array.from(this.files);

                certificationPhotoData = [];

                try {

                    for (const file of files) {

                        if (!file.type.startsWith('image/')) {
                            continue;
                        }

                        const data =
                            await readFileAsDataURL(file);

                        certificationPhotoData.push(data);
                    }

                    certificationPhotosPreview.innerHTML =
                        certificationPhotoData
                            .map(
                                (src, index) => `
                                    <div class="photo-preview-item">
                                        <img
                                            src="${src}"
                                            alt="Certification ${index + 1}"
                                        >
                                    </div>
                                `
                            )
                            .join('');

                } catch (error) {

                    console.error(error);

                    showNotification(
                        'Unable to process certification images.',
                        'error'
                    );
                }
            }
        );
    }


    // ========================================
    // TECHNICIAN LOGIN
    // ========================================

    loginForm.addEventListener(
        'submit',
        async function (e) {

            e.preventDefault();

            const email =
                document.getElementById('loginEmail')
                    .value
                    .trim()
                    .toLowerCase();

            const password =
                document.getElementById('loginPassword')
                    .value;

            if (!email || !password) {

                showNotification(
                    'Please fill in all fields.',
                    'error'
                );

                return;
            }

            if (!isValidEmail(email)) {

                showNotification(
                    'Please enter a valid email address.',
                    'error'
                );

                return;
            }

            showNotification(
                'Signing in...',
                'info'
            );

            try {

                const {
                    data,
                    error
                } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });

                if (error) {
                    throw error;
                }

                if (!data.user) {
                    throw new Error(
                        'Unable to retrieve your account.'
                    );
                }


                // ----------------------------------------
                // GET USER PROFILE
                // ----------------------------------------

                const {
                    data: profile,
                    error: profileError
                } = await supabase
                    .from('users')
                    .select('*')
                    .eq('user_id', data.user.id)
                    .maybeSingle();


                if (profileError) {
                    throw profileError;
                }


                if (!profile) {

                    await supabase.auth.signOut();

                    showNotification(
                        'Your user profile could not be found.',
                        'error'
                    );

                    return;
                }


                // ----------------------------------------
                // VERIFY ACCOUNT TYPE
                // ----------------------------------------

                if (profile.account_type !== 'technician') {

                    await supabase.auth.signOut();

                    showNotification(
                        'This account is not registered as a technician. Please use the regular sign-in page.',
                        'error'
                    );

                    return;
                }


                // ----------------------------------------
                // TEMPORARY APPROVAL CHECK
                // ----------------------------------------
                //
                // We will connect the final technician
                // approval status here after finishing
                // the approval system.
                //
                // ----------------------------------------

                showNotification(
                    'Welcome back! Redirecting to your dashboard...',
                    'success'
                );

                setTimeout(() => {

                    window.location.href =
                        '../dashboard/Technician/dashboard-technician.html';

                }, 1200);


            } catch (error) {

                console.error(
                    'Technician login error:',
                    error
                );

                let message =
                    'Unable to sign in. Please check your email and password.';


                if (
                    error.message &&
                    error.message.toLowerCase().includes(
                        'email not confirmed'
                    )
                ) {

                    message =
                        'Please confirm your email before signing in.';
                }


                showNotification(
                    message,
                    'error'
                );
            }
        }
    );


    // ========================================
    // TECHNICIAN APPLICATION
    // ========================================

    registerForm.addEventListener(
        'submit',
        async function (e) {

            e.preventDefault();


            // ----------------------------------------
            // GET BASIC INFORMATION
            // ----------------------------------------

            const firstName =
                document.getElementById('firstName')
                    .value
                    .trim();

            const lastName =
                document.getElementById('lastName')
                    .value
                    .trim();

            const email =
                document.getElementById('registerEmail')
                    .value
                    .trim()
                    .toLowerCase();


            // ----------------------------------------
            // GET PROFESSIONAL INFORMATION
            // ----------------------------------------

            const experienceDescription =
                document.getElementById(
                    'experienceDescription'
                ).value.trim();

            const specialty =
                document.getElementById(
                    'specialty'
                ).value.trim();

            const experienceYears =
                document.getElementById(
                    'experienceYears'
                ).value;

            const location =
                document.getElementById(
                    'location'
                ).value.trim();

            const hourlyRate =
                document.getElementById(
                    'hourlyRate'
                ).value;

            const availability =
                document.getElementById(
                    'availability'
                ).value.trim();

            const professionalInfo =
                document.getElementById(
                    'professionalInfo'
                ).value.trim();


            // ----------------------------------------
            // CHECKBOXES
            // ----------------------------------------

            const technologies =
                getCheckedValues('technologies');

            const products =
                getCheckedValues('products');


            // ----------------------------------------
            // TERMS
            // ----------------------------------------

            const agreeTerms =
                document.getElementById(
                    'agreeTerms'
                ).checked;


            // ----------------------------------------
            // VALIDATION
            // ----------------------------------------

            if (
                !firstName ||
                !lastName ||
                !email ||
                !experienceDescription ||
                !specialty ||
                !experienceYears ||
                !location
            ) {

                showNotification(
                    'Please fill in all required fields.',
                    'error'
                );

                return;
            }


            if (!isValidEmail(email)) {

                showNotification(
                    'Please enter a valid email address.',
                    'error'
                );

                return;
            }


            if (technologies.length === 0) {

                showNotification(
                    'Please select at least one technology.',
                    'error'
                );

                return;
            }


            if (products.length === 0) {

                showNotification(
                    'Please select at least one product category.',
                    'error'
                );

                return;
            }


            if (!agreeTerms) {

                showNotification(
                    'Please agree to the Terms of Service.',
                    'error'
                );

                return;
            }


            // ----------------------------------------
            // PREPARE APPLICATION DATA
            // ----------------------------------------

            const certifications =
                splitCommaValues(
                    document.getElementById(
                        'certifications'
                    ).value
                );


            const languages =
                splitCommaValues(
                    document.getElementById(
                        'languages'
                    ).value
                );


            // ----------------------------------------
            // DISABLE BUTTON
            // ----------------------------------------

            if (submitApplicationBtn) {

                submitApplicationBtn.disabled = true;

                submitApplicationBtn.innerHTML = `
                    <span
                        class="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true">
                    </span>

                    Submitting application...
                `;
            }


            showNotification(
                'Submitting your technician application...',
                'info'
            );


            try {

                // ----------------------------------------
                // CALL SUPABASE EDGE FUNCTION
                // ----------------------------------------

                const {
                    data,
                    error
                } = await supabase.functions.invoke(
                    'submit-technician-application',
                    {
                        body: {

                            email,

                            firstName,

                            lastName,

                            profilePhoto:
                                profilePhotoData || null,

                            certifications,

                            certificationPhotos:
                                certificationPhotoData,

                            experienceDescription,

                            experienceYears,

                            technologies,

                            products,

                            specialty,

                            location,

                            hourlyRate:
                                hourlyRate || null,

                            languages,

                            availability,

                            professionalInfo
                        }
                    }
                );


                if (error) {

                    console.error(
                        'Edge Function error:',
                        error
                    );

                    throw error;
                }


                if (!data || !data.success) {

                    throw new Error(
                        data?.error ||
                        'Unable to submit the application.'
                    );
                }


                // ----------------------------------------
                // SUCCESS
                // ----------------------------------------

                showNotification(
                    'Application submitted successfully!',
                    'success'
                );


                showApplicationMessage(
                    'Your technician application has been submitted successfully and is now under review. Recomputech will review your information and contact you by email with the next steps.',
                    'success'
                );


                // ----------------------------------------
                // DISABLE FORM AFTER SUBMISSION
                // ----------------------------------------

                const formElements =
                    registerForm.querySelectorAll(
                        'input, textarea, select, button'
                    );

                formElements.forEach(element => {

                    element.disabled = true;

                });


                if (submitApplicationBtn) {

                    submitApplicationBtn.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        Application Submitted
                    `;
                }


            } catch (error) {

                console.error(
                    'Technician application error:',
                    error
                );


                let message =
                    'Unable to submit your application. Please try again.';


                if (
                    error.message &&
                    error.message.includes(
                        'already have a technician application'
                    )
                ) {

                    message =
                        'You already have a technician application pending review.';
                }


                showNotification(
                    message,
                    'error'
                );


                showApplicationMessage(
                    message,
                    'danger'
                );


                // ----------------------------------------
                // RE-ENABLE BUTTON
                // ----------------------------------------

                if (submitApplicationBtn) {

                    submitApplicationBtn.disabled = false;

                    submitApplicationBtn.innerHTML = `
                        <i class="fas fa-tools"></i>
                        Submit Technician Application
                    `;
                }
            }
        }
    );


    // ========================================
    // ANIMATIONS
    // ========================================

    const animationStyles = `

        @keyframes slideInRight {

            from {
                transform: translateX(100%);
                opacity: 0;
            }

            to {
                transform: translateX(0);
                opacity: 1;
            }
        }


        @keyframes slideOutRight {

            from {
                transform: translateX(0);
                opacity: 1;
            }

            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }


        .auth-form {

            transition:
                all 0.3s ease;

            opacity: 1;

            transform:
                translateX(0);
        }
    `;


    const styleSheet =
        document.createElement('style');

    styleSheet.textContent =
        animationStyles;

    document.head.appendChild(
        styleSheet
    );


    // ========================================
    // INITIAL FORM STATE
    // ========================================

    loginForm.style.opacity =
        initialMode === 'login'
            ? '1'
            : '0';

    loginForm.style.transform =
        'translateX(0)';


    registerForm.style.opacity =
        initialMode === 'register'
            ? '1'
            : '0';


    registerForm.style.transform =
        initialMode === 'register'
            ? 'translateX(0)'
            : 'translateX(20px)';


    document.documentElement.style.scrollBehavior =
        'smooth';
});


// ========================================
// THEME
// ========================================

const currentTheme =
    localStorage.getItem('theme') || 'light';

document.body.setAttribute(
    'data-theme',
    currentTheme
);