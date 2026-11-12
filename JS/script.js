const menuButton = document.querySelector(".header__button__navbar");
const layout = document.querySelector(".layout");
const mobileQuery = window.matchMedia("(max-width: 767px)");
const backDrop = document.querySelector(".backdrop");
const toggleBtn = document.getElementById("toggleBtn")
const htmlElement = document.documentElement;
const textSombre = document.getElementById('txtTheme')

if (mobileQuery.matches) {
    menuButton.setAttribute("aria-expanded", "false");
}


menuButton.addEventListener("click", function () {
    if (mobileQuery.matches) {
        // Téléphone : ouvrir / fermer le menu
        const isOpen = layout.classList.toggle("is-open");
        if (isOpen) {
            menuButton.setAttribute("aria-expanded", "true");
        } else {
            menuButton.setAttribute("aria-expanded", "false");
        }
    } else {
        // Ordinateur : replier / déplier la barre
        const isCollapsed = layout.classList.toggle("is-collapsed");
        if (isCollapsed) {
            menuButton.setAttribute("aria-expanded", "false");
        } else {
            menuButton.setAttribute("aria-expanded", "true");
        }
    }
});

backDrop.addEventListener("click", function(){
    layout.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
})

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    htmlElement.setAttribute('data-theme', 'dark');
}

toggleBtn.addEventListener('click', function(){
    const isDark = htmlElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
        htmlElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        
    } else {
        htmlElement.setAttribute('data-theme','dark' );
        localStorage.setItem('theme', 'dark');
    }
});