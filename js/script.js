/* =====================================
   SCRIPT.JS — ResumeIt
   Mobile menu + password toggle
===================================== */


/* Mobile menu */

function toggleMenu() {
    var menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.toggle('show');
}

function closeMenu() {
    var menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.remove('show');
}


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