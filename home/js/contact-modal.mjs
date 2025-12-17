export function initContactModal() {
    const modalCache = { contentHTML: null };

    function createModalShell() {
        let existing = document.getElementById('contactModal');
        if (existing) return existing;

        const modal = document.createElement('div');
        modal.id = 'contactModal';
        modal.className = 'modal';
        modal.setAttribute('aria-hidden', 'true');

        modal.innerHTML = `
            <div class="modal-overlay" data-close-modal></div>
            <div class="modal-content" tabindex="-1">
                <button class="modal-close" data-close-modal>&times;</button>
                <div class="contact-modal-body-placeholder"></div>
            </div>
        `;

        document.body.appendChild(modal);
        return modal;
    }

    function showModal(modal) {
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    }

    function setModalContent(modal, html) {
        modal.querySelector('.contact-modal-body-placeholder').innerHTML = html;
    }

    function openModalWithContent(trigger) {
        const modal = createModalShell();

        if (modalCache.contentHTML) {
            setModalContent(modal, modalCache.contentHTML);
            showModal(modal);
            return;
        }

        fetch('contact.html')
            .then(res => res.text())
            .then(html => {
                const doc = new DOMParser().parseFromString(html, 'text/html');
                const content = doc.querySelector('section.content');
                modalCache.contentHTML = content.innerHTML;
                setModalContent(modal, modalCache.contentHTML);
                showModal(modal);
            });
    }

    document.querySelectorAll('.open-contact-modal').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            openModalWithContent(link);
        });
    });

    document.addEventListener('click', e => {
        if (e.target.matches('[data-close-modal]') || e.target.classList.contains('modal-overlay')) {
            closeModal(e.target.closest('.modal'));
        }
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeModal(document.querySelector('.modal[aria-hidden="false"]'));
        }
    });
}