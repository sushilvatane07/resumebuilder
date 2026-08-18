/* =============================================================================
   SUPABASE-AUTH.JS — ResumeIt
   Shared authentication helpers used by every page.
   Requires: supabase-config.js loaded first, and Supabase JS v2 CDN.
============================================================================= */

(function (window) {
    'use strict';

    /* ── Singleton client ─────────────────────────────────────────── */
    var _client = null;

    function getClient() {
        if (!_client) {
            _client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        }
        return _client;
    }

    /* ── Session helpers ──────────────────────────────────────────── */

    /** Returns the current session object, or null if not signed in. */
    async function getSession() {
        var sb = getClient();
        var { data } = await sb.auth.getSession();
        return data.session;
    }

    /**
     * If no active session, redirect to the given URL (default: login.html).
     * Call at the top of any protected page.
     */
    async function requireAuth(redirectTo) {
        var session = await getSession();
        if (!session) {
            window.location.href = redirectTo || 'login.html';
        }
        return session;
    }

    /**
     * If already signed in, redirect to the given URL (default: dashboard.html).
     * Call on login/register pages so authenticated users skip them.
     */
    async function redirectIfLoggedIn(redirectTo) {
        var session = await getSession();
        if (session) {
            window.location.href = redirectTo || 'dashboard.html';
        }
    }

    /** Sign out and go home. */
    async function signOut() {
        var sb = getClient();
        await sb.auth.signOut();
        window.location.href = 'index.html';
    }

    /**
     * Returns a friendly display name for the user.
     * Prefers full_name from metadata, falls back to email prefix.
     */
    function getDisplayName(session) {
        if (!session) return 'User';
        var meta = session.user.user_metadata;
        if (meta && meta.full_name && meta.full_name.trim()) {
            return meta.full_name.trim();
        }
        var email = session.user.email || '';
        var prefix = email.split('@')[0];
        return prefix.charAt(0).toUpperCase() + prefix.slice(1);
    }

    /* ── Expose on window.ResumeAuth ─────────────────────────────── */
    window.ResumeAuth = {
        getClient:          getClient,
        getSession:         getSession,
        requireAuth:        requireAuth,
        redirectIfLoggedIn: redirectIfLoggedIn,
        signOut:            signOut,
        getDisplayName:     getDisplayName
    };

})(window);
