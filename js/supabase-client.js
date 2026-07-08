/**
 * Initializes the Supabase client using values from supabase-config.js
 */
(function initSupabaseClient() {
    if (typeof window.supabase === 'undefined') {
        console.error('Supabase JS library not loaded. Include the CDN script before supabase-client.js');
        window.supabaseClient = null;
        return;
    }

    if (!window.SUPABASE_CONFIG) {
        console.warn(
            'Supabase config not found. Copy js/supabase-config.example.js to js/supabase-config.js and add your credentials.'
        );
        window.supabaseClient = null;
        return;
    }

    const { url, anonKey } = window.SUPABASE_CONFIG;

    if (!url || !anonKey || url.includes('YOUR_PROJECT') || anonKey.includes('YOUR_SUPABASE')) {
        console.warn('Supabase is not configured yet. Update js/supabase-config.js with your project URL and anon key.');
        window.supabaseClient = null;
        return;
    }

    window.supabaseClient = window.supabase.createClient(url, anonKey);
})();
