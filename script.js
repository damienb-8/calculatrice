"use strict";

function addition(a, b) {
    return a + b;
}

function soustraction(a, b) {
    return a - b;
}

function multiplication(a, b) {
    return a * b;
}

function division(a, b) {
    return a / b;
}

let operateur = false;
let nombreA = null;
let virguleNombreA = false;
let nombreB = null;
let virguleNombreB = false;

function calculer(a, b, operateur) {
    a = Number(a);
    b = Number(b);
    switch (operateur) {
        case "+":
            return addition(a, b);
        case "−":
            return soustraction(a, b);
        case "×":
            return multiplication(a, b);
        case "÷":
            if (b == 0) {
                alert("Ceci est impossible...");
                clicEffacer();
                return null;
            } else {
                return division(a, b);
            }
    }
}

function arrondir(nombre) {
    if (nombre != null) {
        return Number(nombre.toPrecision(6));
    }
    return null;
}

const boutons = document.querySelector(".boutons");
const ecran = document.querySelector(".ecran span");

function clicChiffre(chiffre) {
    if (operateur) { // si c'est le second nombre
        if (!nombreB) {
            nombreB = chiffre;
        } else {
            nombreB = String(nombreB) + chiffre;
        }
        ecran.textContent = nombreA + operateur + nombreB;
    } else { // si c'est le premier nombre
        if (!nombreA) {
            nombreA = chiffre;
        } else {
            nombreA = String(nombreA) + chiffre;
        }
        ecran.textContent = nombreA;
    }
}

function clicOperateur(bouton) {
    if (operateur && nombreB != null) { // si on a déjà les deux nombres et un opérateur (1+1)

        nombreA = arrondir(calculer(nombreA, nombreB, operateur));
        if (nombreA != null) {
            nombreB = null;
            virguleNombreB = false;
            operateur = bouton;
            ecran.textContent = nombreA + operateur;
        }

    } else if (operateur) { // si on a un nombre et un opérateur (1+)
        operateur = bouton;
        ecran.textContent = ecran.textContent.slice(0, -1) + operateur;
    } else if (nombreA != null) { // si on a juste un nombre (1)
        operateur = bouton;
        nombreA = Number(nombreA);
        ecran.textContent = nombreA + operateur;
    } else { // si on n'a rien du tout ()
        alert("Vous devez commencer votre calcul par un chiffre !");
    }
}

function clicEgal() {
    if (nombreB != null) {
        let resultat = arrondir(calculer(nombreA, nombreB, operateur));
        if (resultat != null) {
            ecran.textContent = resultat;
            nombreA = null;
            virguleNombreA = false;
            nombreB = null;
            virguleNombreB = false;
            operateur = false;
        }
    } else {
        alert("Vous ne pouvez pas calculer un résultat sans taper votre calcul avant !");
    }
}

function clicEffacer() {
    ecran.textContent = "";
    nombreA = null;
    virguleNombreA = false;
    nombreB = null;
    virguleNombreB = false;
    operateur = false;
}

function clicVirgule() { // ajoute un . et entre en mode "virgule activée"
    if (operateur && !virguleNombreB && nombreB != null) { // si c'est le second nombre et que c'est la première virgule
        virguleNombreB = true;
        nombreB += ".";
        ecran.textContent += ".";
    } else if (!operateur && !virguleNombreA && nombreA != null) { // si c'est le premier nombre et la première virgule
        virguleNombreA = true;
        nombreA += ".";
        ecran.textContent += ".";
    }
}

function clicRetour() {
    if (!operateur && nombreA != null) { // (1)
        if (ecran.textContent.charAt(ecran.textContent.length - 1) == ".") {
            virguleNombreA = false;
        }
        nombreA = String(nombreA).slice(0, -1);
        if (nombreA.length == 0) {
            nombreA = null;
        }
        ecran.textContent = nombreA;
    } else if (operateur && nombreB == null) { // (1+)
        operateur = false;
        ecran.textContent = nombreA;
    } else if (operateur && nombreB != null) { // (1+1)
        if (ecran.textContent.charAt(ecran.textContent.length - 1) == ".") {
            virguleNombreB = false;
        }
        nombreB = String(nombreB).slice(0, -1);
        if (nombreB.length == 0) {
            nombreB = null;
            ecran.textContent = nombreA + operateur;
        } else {
            ecran.textContent = nombreA + operateur + nombreB;
        }
    }
}

boutons.addEventListener("click", (e) => {

    switch (e.target.getAttribute("class")) {
        case "boutonChiffre": // si on clique sur un chiffre
            clicChiffre(Number(e.target.textContent));
            break;
        case "boutonOperateur": // si on clique sur un operateur
            clicOperateur(e.target.textContent);
            break;
        case "boutonEgal": // si on clique sur égal
            clicEgal();
            break;
        case "boutonEffacer": // si on clique sur effacer
            clicEffacer();
            break;
        case "boutonVirgule": // si on clique sur la virgule
            clicVirgule();
            break;
        case "boutonRetour": // si on clique sur retour
            clicRetour();
            break;
    }

});
