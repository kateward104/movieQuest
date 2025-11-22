const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');

toggle.addEventListener('click', () => {
    links.classList.toggle('open');
});





/*
<button class="dropbtn">Dropdown
                <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
                <a href="index.html">Home</a>
                <a href="watchlist.html">Watchlist</a>
                <a href="recommendations.html">Recommended</a>
                <a href="#">Search</a>
            </div>
*/