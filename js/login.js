/* =============================================================================
   JS/LOGIN.JS — ResumeIt Authentication Module
   Handles Sign-In (password) and Magic Link via Supabase Auth.
   Requires: supabase-config.js + supabase-auth.js + Supabase JS v2 CDN
============================================================================= */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        /* ── Redirect if already logged in ─────────────────────────── */
        ResumeAuth.redirectIfLoggedIn('dashboard.html');

        var form         = document.getElementById('loginForm');
        var emailInput   = document.getElementById('email');
        var passwordInput = document.getElementById('password');
        var submitBtn    = document.getElementById('submitBtn');
        var feedback     = document.getElementById('formFeedback');
        var magicLinkBtn = document.getElementById('magicLinkBtn');

        var sb = ResumeAuth.getClient();

        /* ── Password Sign-In ───────────────────────────────────────── */
        if (form) {
            form.addEventListener('submit', async function (e) {
                e.preventDefault();

                var email    = emailInput    ? emailInput.value.trim()    : '';
                var password = passwordInput ? passwordInput.value        : '';

                if (!email || !password) {
                    showFeedback('Please fill in all fields.', 'error');
                    return;
                }

                if (!validateEmail(email)) {
                    showFeedback('Please enter a valid email address.', 'error');
                    if (emailInput) emailInput.focus();
                    return;
                }

                if (password.length < 6) {
                    showFeedback('Password must be at least 6 characters.', 'error');
                    if (passwordInput) passwordInput.focus();
                    return;
                }

                setLoading(true, 'Signing in...');

                var { error } = await sb.auth.signInWithPassword({ email, password });

                if (error) {
                    showFeedback(friendlyError(error.message), 'error');
                    setLoading(false, 'Sign In');
                    return;
                }

                showFeedback('Signed in successfully! Redirecting…', 'success');
                setTimeout(function () {
                    window.location.href = 'dashboard.html';
                }, 600);
            });
        }

        /* ── Magic Link ─────────────────────────────────────────────── */
        if (magicLinkBtn) {
            magicLinkBtn.addEventListener('click', async function () {
                var email = emailInput ? emailInput.value.trim() : '';

                if (!email) {
                    showFeedback('Please enter your email address above first.', 'error');
                    if (emailInput) emailInput.focus();
                    return;
                }

                if (!validateEmail(email)) {
                    showFeedback('Please enter a valid email address.', 'error');
                    if (emailInput) emailInput.focus();
                    return;
                }

                magicLinkBtn.disabled = true;
                magicLinkBtn.textContent = 'Sending…';

                var { error } = await sb.auth.signInWithOtp({
                    email,
                    options: { emailRedirectTo: window.location.origin + '/dashboard.html' }
                });

                magicLinkBtn.disabled = false;
                magicLinkBtn.textContent = '✉ Send Magic Link to Email';

                if (error) {
                    showFeedback(friendlyError(error.message), 'error');
                    return;
                }

                showFeedback('✉ Magic link sent to ' + email + '! Check your inbox.', 'success');
            });
        }

        /* ── Helpers ─────────────────────────────────────────────────── */
        function showFeedback(msg, type) {
            if (!feedback) return;
            feedback.textContent = msg;
            feedback.className = 'form-feedback ' + type;
        }

        function setLoading(loading, label) {
            if (!submitBtn) return;
            submitBtn.textContent = label;
            submitBtn.disabled = loading;
        }

        function validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        function friendlyError(msg) {
            if (!msg) return 'Something went wrong. Please try again.';
            if (/invalid login/i.test(msg))   return 'Invalid email or password.';
            if (/email not confirmed/i.test(msg)) return 'Please confirm your email before signing in.';
            if (/too many requests/i.test(msg))   return 'Too many attempts. Please wait a moment and try again.';
            if (/user not found/i.test(msg))      return 'No account found with that email.';
            return msg;
        }
    });
})();