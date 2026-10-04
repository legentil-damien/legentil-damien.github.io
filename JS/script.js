const menuButton = document.querySelector(".header__button__navbar");
const layout = document.querySelector(".layout");
const mobileQuery = window.matchMedia("(max-width: 767px)");
const backDrop = document.querySelector(".backdrop");

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