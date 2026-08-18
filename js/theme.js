/* =====================================
   THEME TOGGLE  — ResumeIt
   • Reads localStorage on every page load
   • Applies data-theme="light" on <html>
   • Updates all .theme-btn icons
===================================== */

(function () {

    /* 1. Apply saved theme BEFORE first paint */
    var saved = localStorage.getItem('resumeit-theme');
    if (saved === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    /* 2. Sync every .theme-btn icon on the page */
    function syncIcons() {
        var isLight = document.documentElement.getAttribute('data-theme') === 'light';
        document.querySelectorAll('.theme-btn').forEach(function (btn) {
            btn.textContent = isLight ? '☀️' : '🌙';
            btn.setAttribute('title', isLight ? 'Switch to dark mode' : 'Switch to light mode');
        });
    }

    /* 3. Public toggle — called by onclick="toggleTheme()" */
    window.toggleTheme = function () {
        var isLight = document.documentElement.getAttribute('data-theme') === 'light';
        if (isLight) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('resumeit-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('resumeit-theme', 'light');
        }
        syncIcons();
    };

    /* 4. Run icon sync once DOM is ready */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', syncIcons);
    } else {
        syncIcons();
    }

})();