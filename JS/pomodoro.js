const play = document.querySelector(".btn__start");
const reset = document.querySelector(".btn__reset");
const passer = document.querySelector(".btn__passer");
const minuteur = document.querySelector(".h2__minuteur");
const mode = document.querySelector(".mode");
const session = document.querySelector(".p__session");
const secondesDansMinute = 60;


const modes = {
    travail: {nom: "Travail", duree: 25 * secondesDansMinute},
    pauseCourte: {nom: "Pause courte", duree: 5 * secondesDansMinute},
    pauseLongue: {nom: "Pause longue", duree: 15 * secondesDansMinute}
}

let resteSecondes = modes.travail.duree; 
let modeActif = "travail";
let sessionActive = 0;
let idMinuteur = null;

const formaterTemps = (totalSecondes) => {
    const calculMinute = String(Math.floor(totalSecondes / 60));
    const calculSecondes = String(totalSecondes % 60);
    const minute =calculMinute.padStart(2, "0");
    const seconde = calculSecondes.padStart(2, "0");
    return  minute + ':'+ seconde;
}

const afficher = () => {
    const rondsPleins = sessionActive % 4;
    const rondsVides = 4 - rondsPleins;
    minuteur.textContent = formaterTemps(resteSecondes);
    mode.textContent = "Mode : "+ modes[modeActif].nom;
    session.textContent = "● ".repeat(rondsPleins) + "○ ".repeat(rondsVides);
    document.title= formaterTemps(resteSecondes) + " " + modes[modeActif].nom;
}

const tick = () => {
    if(resteSecondes > 0){
        resteSecondes --;
        afficher();
    } else {
        pause();
        modeSuivant();
    }
}

const demarrer = () => {
    if (idMinuteur === null){
        idMinuteur = setInterval(tick, 1000);
        play.classList.add("en-cours")
        play.setAttribute("aria-label", "Mettre en pause")
    }
}

const pause = () => {
    clearInterval(idMinuteur);
    idMinuteur = null;
    play.classList.remove("en-cours")
    play.setAttribute("aria-label", "Démarrer")
}

const basculer = () => {
    if (idMinuteur === null){
        demarrer()
    } else{
        pause();
    }
}

const changerMode = (nouveauMode) => {
    modeActif = nouveauMode;
    resteSecondes = modes[nouveauMode].duree;
    afficher()
} 

const modeSuivant = () =>{
    if (modeActif === "travail"){
        sessionActive ++
        if (sessionActive % 4 === 0){
            changerMode("pauseLongue");
        } else {
            changerMode("pauseCourte")
        }
    } else{
        changerMode("travail")
    }
}

const pass = () =>{
    pause();
    modeSuivant();
}

const reinitialiser = () =>{
    pause();
    sessionActive= 0;
    changerMode('travail')
    afficher();
}

play.addEventListener("click", basculer);
passer.addEventListener("click", pass);
reset.addEventListener("click", reinitialiser);
afficher();
