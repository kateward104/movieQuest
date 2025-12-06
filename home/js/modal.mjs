/* Modal Avatar Logic */

document.addEventListener("DOMContentLoaded", () => {

    const avatarModal = document.querySelector("#avatarModal");
    const navProfile = document.querySelector("#navProfile");
    const profileView = document.querySelector("#profileView");
    const avatarOptions = document.querySelectorAll(".avatar-option");
    const closeModalBtn = document.querySelector("#closeModal");
    const submitModal = document.querySelector("#submitModal");

    // Helper function: updates only the elements that exist on this page
    function updateAvatarUI(avatarURL, profileURL) {
        if (profileView && avatarURL) {
            profileView.src = avatarURL;
        }

        if (navProfile && profileURL) {
            navProfile.src = profileURL;
        }
    }

    // Load saved choices on every page
    const savedAvatar = localStorage.getItem("chosenAvatar");
    const savedProfile = localStorage.getItem("profileCard");

    updateAvatarUI(savedAvatar, savedProfile);

    // Open modal from nav profile (only if this page actually has one)
    if (navProfile) {
        navProfile.addEventListener("click", () => {
            avatarModal.setAttribute("aria-hidden", "false");
            document.body.classList.add("modal-open");
        });
    }

    // Handle selecting an avatar option
    avatarOptions.forEach(img => {
        img.addEventListener("click", () => {
            const chosenAvatar = img.dataset.avatar;
            const profile = img.dataset.profile;

            localStorage.setItem("chosenAvatar", chosenAvatar);
            localStorage.setItem("profileCard", profile);
        });
    });

    // Close modal normally
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            avatarModal.setAttribute("aria-hidden", "true");
            document.body.classList.remove("modal-open");
        });
    }

    // Close by clicking outside
    avatarModal.addEventListener("click", e => {
        if (e.target.classList.contains("modal-overlay")) {
            avatarModal.setAttribute("aria-hidden", "true");
            document.body.classList.remove("modal-open");
        }
    });

    // Submit button inside modal
    if (submitModal) {
        submitModal.addEventListener("click", () => {
            const newAvatar = localStorage.getItem("chosenAvatar");
            const newProfile = localStorage.getItem("profileCard");

            updateAvatarUI(newAvatar, newProfile);

            avatarModal.setAttribute("aria-hidden", "true");
            document.body.classList.remove("modal-open");
        });
    }
});