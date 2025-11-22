
/* Mobile Menu Toggle */
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("navToggle");
    const menu = document.getElementById("mobileMenu");

    toggle.addEventListener("click", () => {
        const isOpen = menu.style.display === "flex";
        menu.style.display = isOpen ? "none" : "flex";
    });
});