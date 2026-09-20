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
let nombreA = 0;
let nombreB = 0;

function calculer(a, b, operateur) {
    switch (operateur) {
        case "+":
            return addition(a, b);
        case "−":
            return soustraction(a, b);
        case "×":
            return multiplication(a, b);
        case "÷":
            return division(a, b);
    }
}

const boutons = document.querySelector(".boutons");
const ecran = document.querySelector(".ecran span");

function clicChiffre(chiffre) {
    if (operateur) { // si c'est le second nombre
        nombreB = nombreB * 10 + chiffre;
        ecran.textContent += chiffre;
    } else { // si c'est le premier nombre
        nombreA = nombreA * 10 + chiffre;
        ecran.textContent = nombreA;
    }
}

function clicOperateur(bouton) {
    operateur = bouton;
    ecran.textContent += operateur;
}

function clicEgal() {
    ecran.textContent = calculer(nombreA, nombreB, operateur);
    nombreA = 0;
    nombreB = 0;
    operateur = false;
}

function clicEffacer() {
    ecran.textContent = "";
    nombreA = 0;
    nombreB = 0;
    operateur = false;
}

boutons.addEventListener("click", (e) => {

    if (e.target.getAttribute("class") == "boutonChiffre") { // si on clique sur un chiffre
        clicChiffre(Number(e.target.textContent));
    } else if (e.target.getAttribute("class") == "boutonOperateur") { // si on clique sur un operateur
        clicOperateur(e.target.textContent);
    } else if (e.target.getAttribute("class") == "boutonEgal") { // si on clique sur égal
        clicEgal();
    } else if (e.target.getAttribute("class") == "boutonEffacer") { // si on clique sur effacer
        clicEffacer();
    }

});
