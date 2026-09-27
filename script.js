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
let nombreB = null;

function calculer(a, b, operateur) {
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
            } else {
                return division(a, b);
            }
    }
}

const boutons = document.querySelector(".boutons");
const ecran = document.querySelector(".ecran span");

function clicChiffre(chiffre) {
    if (operateur) { // si c'est le second nombre
        if (!nombreB) {
            nombreB = 0;
        }
        nombreB = nombreB * 10 + chiffre;
        ecran.textContent += chiffre;
    } else { // si c'est le premier nombre
        if (!nombreA) {
            nombreA = 0;
        }
        nombreA = nombreA * 10 + chiffre;
        ecran.textContent = nombreA;
    }
}

function clicOperateur(bouton) {
    if (operateur && nombreB != null) {

        nombreA = calculer(nombreA, nombreB, operateur);
        if (nombreA != undefined) {
            nombreB = 0;
            ecran.textContent = String(nombreA).length > 6 ? nombreA.toPrecision(6) : nombreA;
            operateur = bouton;
            ecran.textContent += operateur;
        } else {
            clicEffacer();
        }

    } else if (operateur) {
        operateur = bouton;
        ecran.textContent = ecran.textContent.slice(0, -1) + operateur;
    } else if (nombreA != null) {
        operateur = bouton;
        ecran.textContent += operateur;
    } else {
        alert("Vous devez commencer votre calcul par un chiffre !");
    }
}

function clicEgal() {
    if (nombreA != null && nombreB != null && operateur) {
        let resultat = calculer(nombreA, nombreB, operateur);
        if (resultat != undefined) {
            ecran.textContent = String(resultat).length > 6 ? resultat.toPrecision(6) : resultat;
        } else {
            ecran.textContent = "";
        }
        nombreA = null;
        nombreB = null;
        operateur = false;
    } else {
        alert("Vous ne pouvez pas calculer un résultat sans taper votre calcul avant !");
    }
}

function clicEffacer() {
    ecran.textContent = "";
    nombreA = null;
    nombreB = null;
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
