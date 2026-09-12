/**
 * Supabase configuration
 */

window.SUPABASE_CONFIG = {
    url: 'https://jmjltwfqxwvndfrzkbps.supabase.co',
    anonKey: 'sb_publishable_cVgJNHXSekBFsKFSDBbMqg_j2X66H1u'
};

// Crear cliente de Supabase
if (window.supabase && !window.supabaseClient) {
    window.supabaseClient = window.supabase.createClient(
        window.SUPABASE_CONFIG.url,
        window.SUPABASE_CONFIG.anonKey
    );
}