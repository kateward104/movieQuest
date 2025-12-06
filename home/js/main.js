
/* Mobile Menu Toggle */
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("navToggle");
    const menu = document.getElementById("mobileMenu");

    if (toggle && menu) {
        toggle.addEventListener("click", () => {
            const isOpen = menu.style.display === "flex";
            menu.style.display = isOpen ? "none" : "flex";
        });
    }

    // Dynamically create a single modal and fetch /contact.html content when needed
    const modalCache = { contentHTML: null };

    function createModalShell() {
        // If exists, return it
        let existing = document.getElementById('contactModal');
        if (existing) return existing;

        const modal = document.createElement('div');
        modal.id = 'contactModal';
        modal.className = 'modal';
        modal.setAttribute('aria-hidden', 'true');
        modal.setAttribute('role', 'dialog');

        modal.innerHTML = `
            <div class="modal-overlay" data-close-modal></div>
            <div class="modal-content" tabindex="-1">
                <button class="modal-close" aria-label="Close contact form" data-close-modal>&times;</button>
                <div class="contact-modal-body-placeholder"></div>
            </div>
        `;

        document.body.appendChild(modal);
        return modal;
    }

    function setModalContent(modal, html) {
        const container = modal.querySelector('.contact-modal-body-placeholder');
        if (!container) return;
        container.innerHTML = html;
    }

    function openModalWithContent(triggerEl) {
        const modal = createModalShell();
        modal._lastFocusedTrigger = triggerEl || document.activeElement;

        // if we already cached content, use it
        if (modalCache.contentHTML) {
            setModalContent(modal, modalCache.contentHTML);
            showModal(modal);
            return;
        }

        // If we're already on the contact page, reuse the current page content instead of fetching
        try {
            const currentPath = window.location.pathname || window.location.href;
            if (currentPath.endsWith('contact.html')) {
                const pageContent = document.querySelector('section.content');
                if (pageContent) {
                    modalCache.contentHTML = pageContent.innerHTML;
                    setModalContent(modal, modalCache.contentHTML);
                    showModal(modal);
                    return;
                }
            }
        } catch (e) {
            // fall through to fetch
        }

        // fetch the contact.html page and extract the .content section
        fetch('contact.html', { credentials: 'same-origin' }).then(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.text();
        }).then(text => {
            try {
                const doc = new DOMParser().parseFromString(text, 'text/html');
                // Find the main content section
                const content = doc.querySelector('section.content');
                const html = content ? content.innerHTML : text;
                modalCache.contentHTML = html;
                setModalContent(modal, html);
                showModal(modal);
            } catch (e) {
                // fallback to navigating to the page if parsing fails
                window.location = 'contact.html';
            }
        }).catch(() => {
            // fallback to navigating to the page
            window.location = 'contact.html';
        });
    }

    function showModal(modal) {
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        // focus the first focusable element inside modal
        const focusable = modal.querySelector('input, button, textarea, select, a[href]');
        if (focusable) focusable.focus();
        else modal.querySelector('.modal-content').focus();
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        try { modal._lastFocusedTrigger && modal._lastFocusedTrigger.focus(); } catch (e) { }
    }

    // Attach click listeners to any anchor intended to open contact modal
    document.querySelectorAll('a.open-contact-modal').forEach(el => {
        el.addEventListener('click', (evt) => {
            // Prevent navigation and open modal instead
            evt.preventDefault();
            openModalWithContent(el);
        });
    });

    // Handle close buttons / overlay (delegate)
    document.addEventListener('click', (evt) => {
        if (evt.target.matches('[data-close-modal]') || (evt.target.classList && evt.target.classList.contains('modal-overlay'))) {
            const modal = evt.target.closest('.modal');
            closeModal(modal);
        }
    });

    // Close on ESC
    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
            const open = document.querySelector('.modal[aria-hidden="false"]');
            if (open) closeModal(open);
        }
    });
});




/* Javascript to make the movies go to rotten tomatoes website */

document.querySelectorAll(".movie").forEach(img => {
    img.addEventListener("click", () => {
        window.open(img.dataset.rt, "_blank");
    });
});