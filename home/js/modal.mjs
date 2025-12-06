

const avatarModal = document.querySelector("#avatarModal");
let navProfile = document.querySelector("#navProfile") /* This is the nav profile */
const avatarOptions = document.querySelectorAll(".avatar-option")
const closeModalBtn = document.querySelector("#closeModal");
let profileView = document.querySelector("#profileView"); /* This is the character with the stats */

let savedAvatar = localStorage.getItem("chosenAvatar");
let savedProfile = localStorage.getItem("profileCard");

if (savedAvatar) {
    profileView.src = savedAvatar;
}

if (savedProfile) {
    navProfile.src = savedProfile;
}



navProfile.addEventListener("click", () => {
    avatarModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
})


avatarOptions.forEach(img => {
    img.addEventListener("click", () => {
        let chosenAvatar = img.dataset.avatar;
        let profile = img.dataset.profile;

        localStorage.setItem("chosenAvatar", chosenAvatar);
        localStorage.setItem("profileCard", profile);
    });
});



/* This closes the modal if the user clicks the X*/
closeModalBtn.addEventListener("click", () => {
    avatarModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
});


/*This closes the modal if the user clicks outside the modal*/
avatarModal.addEventListener("click", e => {
    if (e.target.classList.contains("modal-overlay")) {
        avatarModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
    }
})


submitModal.addEventListener("click", () => {
    let newAvatar = localStorage.getItem("chosenAvatar");
    let newProfile = localStorage.getItem("profileCard");

    if (newAvatar) {
        profileView.src = newAvatar;
    }

    if (newProfile) {
        navProfile.src = newProfile;
    }

    avatarModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
})