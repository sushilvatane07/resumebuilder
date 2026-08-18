/* =====================================
   SCRIPT.JS — ResumeIt
   Mobile menu + password toggle
===================================== */

/* Mobile menu */
function toggleMenu() {
    var menu = document.getElementById('mobileMenu');
    var btn = document.getElementById('menuBtn');
    if (!menu) return;
    var isOpen = menu.classList.toggle('show');
    if (btn) {
        btn.textContent = isOpen ? '✕' : '☰';
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }
}

function closeMenu() {
    var menu = document.getElementById('mobileMenu');
    var btn = document.getElementById('menuBtn');
    if (menu) menu.classList.remove('show');
    if (btn) {
        btn.textContent = '☰';
        btn.setAttribute('aria-expanded', 'false');
    }
}

// Close menu when clicking outside navbar
document.addEventListener('click', function (e) {
    var navbar = document.querySelector('.navbar');
    var menu = document.getElementById('mobileMenu');
    if (menu && menu.classList.contains('show') && navbar && !navbar.contains(e.target)) {
        closeMenu();
    }
});

// Close menu on Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeMenu();
    }
});

/* Password visibility toggle */
function togglePassword(inputId, btn) {
    var input = document.getElementById(inputId);
    if (!input) return;
    if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = 'Hide';
    } else {
        input.type = 'password';
        btn.textContent = 'Show';
    }
}

/* Authentication State Sync for Navigation — uses real Supabase session */
async function syncNavAuthState() {
    var navAuthSlot    = document.getElementById('navAuthSlot');
    var mobileAuthSlot = document.getElementById('mobileAuthSlot');

    // ResumeAuth may not be available on pages that don't load it
    var session = null;
    if (window.ResumeAuth) {
        try { session = await ResumeAuth.getSession(); } catch(e) {}
    }

    if (session) {
        if (navAuthSlot) {
            navAuthSlot.innerHTML =
                '<a href="resume-form.html" class="create-nav-btn">Create Resume</a>' +
                '<a href="dashboard.html" class="login-nav-btn">Dashboard</a>';
        }
        if (mobileAuthSlot) {
            mobileAuthSlot.innerHTML =
                '<a href="resume-form.html" onclick="closeMenu()" class="mobile-cta-link">⚡ Create Resume</a>' +
                '<a href="dashboard.html" onclick="closeMenu()">Dashboard</a>';
        }
    } else {
        if (navAuthSlot) {
            navAuthSlot.innerHTML = '<a href="login.html" class="login-nav-btn">Login</a>';
        }
        if (mobileAuthSlot) {
            mobileAuthSlot.innerHTML = '<a href="login.html" onclick="closeMenu()">Login</a>';
        }
    }
}

document.addEventListener('DOMContentLoaded', syncNavAuthState);