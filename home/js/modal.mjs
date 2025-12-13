// ---------- Shared modal helpers ----------
function openModal(modal) {
    if (!modal) return;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function closeModal(modal) {
    if (!modal) return;
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

// ---------- Avatar UI helper ----------
function updateAvatarUI(avatarURL, profileURL) {
    const profileView = document.querySelector("#profileView");
    const navProfile = document.querySelector("#navProfile");

    if (profileView && avatarURL) profileView.src = avatarURL;
    if (navProfile && profileURL) navProfile.src = profileURL;
}

// ---------- Avatar Modal ----------
function initAvatarModal() {
    const avatarModal = document.querySelector("#avatarModal");
    const navProfile = document.querySelector("#navProfile");
    const closeModalBtn = document.querySelector("#closeModal");
    const submitModal = document.querySelector("#submitModal");
    const avatarOptions = document.querySelectorAll(".avatar-option");

    // Load saved avatar on page load
    const savedAvatar = localStorage.getItem("chosenAvatar");
    const savedProfile = localStorage.getItem("profileCard");
    updateAvatarUI(savedAvatar, savedProfile);

    navProfile?.addEventListener("click", () => openModal(avatarModal));
    closeModalBtn?.addEventListener("click", () => closeModal(avatarModal));
    submitModal?.addEventListener("click", () => closeModal(avatarModal));

    avatarModal?.addEventListener("click", e => {
        if (e.target.classList.contains("modal-overlay")) {
            closeModal(avatarModal);
        }
    });

    // Click avatar → save + preview immediately
    avatarOptions.forEach(img => {
        img.addEventListener("click", () => {
            const avatar = img.dataset.avatar;
            const profile = img.dataset.profile;

            localStorage.setItem("chosenAvatar", avatar);
            localStorage.setItem("profileCard", profile);

            updateAvatarUI(avatar, profile);
        });
    });
}

// ---------- Load Movies ----------
async function loadMovies() {
    const res = await fetch("home/js/movies.json");
    const data = await res.json();

    // Map by ID
    return Object.fromEntries(
        data.movies.map(movie => [movie.id, movie])
    );
}

// ---------- Movie Modal ----------
function initMovieModal(movieMap) {
    const movieModal = document.querySelector("#movieModal");
    const modalClose = document.querySelector("#modalClose");

    const fields = {
        image: document.querySelector("#modalImage"),
        title: document.querySelector("#modalTitle"),
        year: document.querySelector("#modalYear span"),
        duration: document.querySelector("#modalDuration span"),
        rating: document.querySelector("#modalRating span"),
        xp: document.querySelector("#modalxpReward"),
        description: document.querySelector("#modalDescription span"),
        rt: document.querySelector("#rtButton")
    };

    document.querySelectorAll(".movie").forEach(img => {
        img.addEventListener("click", () => {
            // USE img.id (matches your HTML)
            const movie = movieMap[img.dataset.id];
            if (!movie) return;

            fields.image.src = movie.image;
            fields.title.textContent = movie.title;
            fields.year.textContent = movie.release_year;
            fields.duration.textContent = movie.duration;
            fields.rating.textContent = movie.rating;
            fields.xp.textContent = movie.xp_reward;
            fields.description.textContent = movie.description;
            fields.rt.href = movie.rt_url;

            openModal(movieModal);
        });
    });

    modalClose?.addEventListener("click", () => closeModal(movieModal));

    movieModal?.addEventListener("click", e => {
        if (e.target.classList.contains("modal-overlay")) {
            closeModal(movieModal);
        }
    });
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", async () => {
    initAvatarModal();
    const movies = await loadMovies();
    initMovieModal(movies);
});