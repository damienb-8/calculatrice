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

let operateur;
let nombreA;
let nombreB;

function calculer(a, b, operateur) {
    switch (operateur) {
        case "+":
            return addition(a, b);
        case "-":
            return soustraction(a, b);
        case "*":
            return multiplication(a, b);
        case "/":
            return division(a, b);
    }
}

const boutons = document.querySelector(".boutons");
const ecran = document.querySelector(".ecran span");
boutons.addEventListener("click", (e) => {
    if (e.target.getAttribute("class") == "boutonChiffre") {
        if (nombreA) {
            nombreA = nombreA * 10 + Number(e.target.textContent);
        } else {
            nombreA = Number(e.target.textContent);
        }
        ecran.textContent = nombreA;
    }
});
