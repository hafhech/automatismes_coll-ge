// Point d'entrée : relie la page d'accueil, la sélection des questions et le diaporama.

import { lireReglages, enregistrerReglages } from "./reglages.js";
import { chargerNiveau } from "./donnees.js";
import { construireSerie } from "./selection.js";
import { Accueil } from "./accueil.js";
import { Diapo } from "./diapo.js";

const reglages = lireReglages();
let donnees = null;

const pageAccueil = document.getElementById("accueil");
const pageDiapo = document.getElementById("diapo");

const accueil = new Accueil(reglages, {
  onChange: async (cle) => {
    enregistrerReglages(reglages);
    if (cle === "niveau") await charger();
  },
  onLancer: lancer,
});

const diapo = new Diapo(pageDiapo, {
  onQuitter: afficherAccueil,
  onRejouer: lancer,
});

async function charger() {
  accueil.afficherErreur("");
  try {
    donnees = await chargerNiveau(reglages.niveau);
    accueil.definirChapitres(donnees.chapitres);
  } catch (erreur) {
    donnees = null;
    accueil.definirChapitres([]);
    const ouvertDepuisUnFichier = location.protocol === "file:";
    accueil.afficherErreur(
      ouvertDepuisUnFichier
        ? "Les questions ne peuvent pas être lues quand la page est ouverte directement depuis un fichier. Utilisez GitHub Pages ou un serveur local (voir le README)."
        : erreur.message
    );
  }
}

function lancer() {
  if (!donnees) return;
  const { niveau, mode, chapitre, nombre, duree, difficulte } = reglages;
  const serie = construireSerie({ niveau, donnees, mode, chapitre, nombre, difficulte });

  pageAccueil.hidden = true;
  pageDiapo.hidden = false;
  document.body.classList.add("en-diapo");
  diapo.demarrer(serie, { duree, contexte: niveau });
}

function afficherAccueil() {
  pageDiapo.hidden = true;
  pageAccueil.hidden = false;
  document.body.classList.remove("en-diapo");
  document.getElementById("lancer").focus();
}

charger();
