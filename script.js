
/* =========================================
   SANJANA J S - PORTFOLIO JAVASCRIPT
   Theme Toggle | Mobile Menu | Contact Form
========================================= */


/* 1. LIGHT AND DARK THEME */

const themeToggle = document.querySelector("[data-theme-toggle]");

const rootElement = document.documentElement;

// Get previously saved theme
function getSavedTheme() {
    try {
        return localStorage.getItem("portfolio-theme");
    } catch (error) {
        return null;
    }
}

// Apply selected theme
function applyTheme(theme) {

    rootElement.setAttribute("data-theme", theme);

    if (themeToggle) {

        const themeIcon = themeToggle.querySelector(".theme-icon");

        const isDark = theme === "dark";

        if (themeIcon) {
            themeIcon.textContent = isDark ? "☀️" : "🌙";
        }

        themeToggle.setAttribute(
            "aria-pressed",
            String(isDark)
        );

        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );
    }
}

// Load saved theme or use light mode
const savedTheme = getSavedTheme();

const initialTheme =
    savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : "light";

applyTheme(initialTheme);

// Switch theme when button is clicked
if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        const currentTheme =
            rootElement.getAttribute("data-theme");

        const newTheme =
            currentTheme === "dark" ? "light" : "dark";

        applyTheme(newTheme);

        // Save selected theme
        try {
            localStorage.setItem("portfolio-theme", newTheme);
        } catch (error) {
            // Theme still works if storage is unavailable
        }

    });

}


/* 2. MOBILE NAVIGATION MENU */

const menuToggle = document.querySelector(".menu-toggle");

const navigationMenu = document.querySelector("#primary-navigation");

if (menuToggle && navigationMenu) {

    // Open or close menu
    menuToggle.addEventListener("click", () => {

        const isOpen =
            navigationMenu.classList.toggle("is-open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });

    // Close menu after selecting a navigation link
    navigationMenu.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            navigationMenu.classList.remove("is-open");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });

    // Close menu using Escape key
    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            navigationMenu.classList.remove("is-open");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    });

}


/* 3. AUTOMATIC COPYRIGHT YEAR */

document.querySelectorAll(".current-year").forEach((element) => {

    element.textContent = new Date().getFullYear();

});
// Show success message after contact form submission
const urlParams = new URLSearchParams(window.location.search);

if (urlParams.get("message") === "success") {
    const main = document.querySelector("main");

    if (main) {
        const successMessage = document.createElement("div");

        successMessage.className = "success-message";
        successMessage.setAttribute("role", "status");
        successMessage.setAttribute("aria-live", "polite");

        successMessage.innerHTML = `
            <span class="success-icon">✓</span>
            <div>
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully.</p>
            </div>
        `;

        main.prepend(successMessage);
    }

    // Remove the query parameter from the address bar
    window.history.replaceState(
        {},
        document.title,
        window.location.pathname
    );
}


/* 4. CONTACT FORM VALIDATION */

const contactForm = document.querySelector("#contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        // Check required fields
        if (!contactForm.checkValidity()) {

            event.preventDefault();

            contactForm.reportValidity();

            return;
        }

        // Prevent accidental repeated clicks
        const submitButton =
            document.querySelector("#submit-button");

        if (submitButton) {

            submitButton.disabled = true;

            submitButton.textContent = "Submitting...";

        }

        // The browser submits the form to FormSubmit

    });
   

}
