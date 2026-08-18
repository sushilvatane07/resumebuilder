/* =====================================
   LOGIN MODAL
===================================== */

const authModal = document.getElementById("authModal");


function openLogin() {

    authModal.classList.add("show");

    document.getElementById("loginForm")
        .classList.remove("hidden");

    document.getElementById("signupForm")
        .classList.add("hidden");

}


function openSignup() {

    authModal.classList.add("show");

    document.getElementById("loginForm")
        .classList.add("hidden");

    document.getElementById("signupForm")
        .classList.remove("hidden");

}


function closeLogin() {

    authModal.classList.remove("show");

}


/* Close when clicking outside */

authModal.addEventListener("click", function(event) {

    if (event.target === authModal) {

        closeLogin();

    }

});


/* =====================================
   MOBILE MENU
===================================== */

function toggleMenu() {

    document
        .getElementById("mobileMenu")
        .classList.toggle("show");

}


function closeMenu() {

    document
        .getElementById("mobileMenu")
        .classList.remove("show");

}


/* =====================================
   PASSWORD
===================================== */

function togglePassword(inputId, button) {

    const input = document.getElementById(inputId);


    if (input.type === "password") {

        input.type = "text";

        button.textContent = "Hide";

    } else {

        input.type = "password";

        button.textContent = "Show";

    }

}


/* =====================================
   LOGIN
===================================== */

function login(event) {

    event.preventDefault();


    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;


    if (!email || !password) {

        alert("Please fill in all fields.");

        return;

    }


    alert("Login successful!");

}


/* =====================================
   SIGNUP
===================================== */

function signup(event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("signupEmail").value.trim();

    const password =
        document.getElementById("signupPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    if (!name || !email || !password || !confirmPassword) {

        alert("Please fill in all fields.");

        return;

    }


    if (password.length < 6) {

        alert("Password must contain at least 6 characters.");

        return;

    }


    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;

    }


    alert("Account created successfully!");

    openLogin();

}


/* =====================================
   MAGIC LINK
===================================== */

function magicLink() {

    const email = prompt(
        "Enter your email to receive a magic link:"
    );


    if (!email) {

        return;

    }


    alert(
        "Magic link sent to " +
        email +
        ". Please check your email."
    );

}