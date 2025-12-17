// nav.mjs
export function initNav() {
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!navToggle || !mobileMenu) return;

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });

    // Ensure menu resets on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 950) {
            mobileMenu.classList.remove('active');
        }
    });

    // Optional: Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // Future nav features (dropdowns, profile clicks, etc.) can be added here
}