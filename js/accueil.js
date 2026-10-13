// Écran de choix : construit les choix (niveau, contenu, chapitre, durée...)
// et prévient main.js quand un réglage change.

import { NIVEAUX, MODES, NOMBRES, DUREES, DIFFICULTES } from "./reglages.js";

export class Accueil {
  constructor(reglages, { onChange, onLancer }) {
    this.reglages = reglages;
    this.onChange = onChange;
    this.chapitres = [];

    const $ = (id) => document.getElementById(id);
    this.el = {
      erreur: $("erreur"),
      aideMode: $("aide-mode"),
      listeChapitres: $("liste-chapitres"),
      serieTitre: $("t-serie"),
      serieDetail: $("resume-detail"),
      lancer: $("lancer"),
    };

    this.groupes = {
      niveau: this.creerChoix($("choix-niveau"), NIVEAUX, "niveau", "niveau"),
      mode: this.creerChoix($("choix-mode"), MODES, "mode", "onglet"),
      nombre: this.creerChoix($("choix-nombre"), NOMBRES, "nombre", "segment"),
      duree: this.creerChoix($("choix-duree"), DUREES, "duree", "segment"),
      difficulte: this.creerChoix($("choix-difficulte"), DIFFICULTES, "difficulte", "segment"),
    };

    this.el.lancer.addEventListener("click", onLancer);
    this.actualiser();
  }

  // Un groupe de boutons « un seul choix possible ».
  creerChoix(conteneur, options, cle, classe) {
    const boutons = options.map((option) => {
      const bouton = document.createElement("button");
      bouton.type = "button";
      bouton.className = classe;
      bouton.textContent = option.libelle;
      bouton.setAttribute("role", "radio");
      bouton.addEventListener("click", () => this.choisir(cle, option.id));
      return { option, bouton };
    });
    conteneur.replaceChildren(...boutons.map((b) => b.bouton));
    return boutons;
  }

  choisir(cle, valeur) {
    if (this.reglages[cle] === valeur) return;
    this.reglages[cle] = valeur;
    if (cle === "niveau") this.reglages.chapitre = 0;
    this.actualiser();
    this.onChange(cle);
  }

  // Affiche les chapitres du niveau qui vient d'être chargé.
  definirChapitres(chapitres) {
    this.chapitres = chapitres;
    this.reglages.chapitre = Math.min(this.reglages.chapitre, Math.max(0, chapitres.length - 1));
    this.actualiser();
  }

  afficherErreur(message) {
    this.el.erreur.textContent = message;
    this.el.erreur.hidden = !message;
  }

  // La liste des chapitres : une ligne par chapitre, ou un message
  // quand le mode choisi n'a pas besoin de chapitre.
  dessinerMenu() {
    const { mode, niveau } = this.reglages;
    const utiliseUnChapitre = mode === "chapitre" || mode === "reactivation";

    // On ne reconstruit la liste que si elle change vraiment (le focus clavier reste en place).
    const empreinte = `${utiliseUnChapitre ? "liste" : mode}|${niveau}|${this.chapitres.length}`;
    if (empreinte === this.empreinteMenu) return;
    this.empreinteMenu = empreinte;

    if (!utiliseUnChapitre) {
      const message = document.createElement("li");
      message.className = "menu-vide";
      message.textContent =
        mode === "niveau"
          ? `Les ${this.chapitres.length} chapitres de ${niveau}, mélangés.`
          : `Des calculs tirés au hasard, adaptés au niveau ${niveau}.`;
      this.el.listeChapitres.removeAttribute("role");
      this.el.listeChapitres.replaceChildren(message);
      return;
    }

    this.el.listeChapitres.setAttribute("role", "radiogroup");
    this.el.listeChapitres.replaceChildren(
      ...this.chapitres.map((chapitre, position) => {
        const item = document.createElement("li");
        const bouton = document.createElement("button");
        bouton.type = "button";
        bouton.className = "chapitre";
        bouton.setAttribute("role", "radio");
        bouton.innerHTML =
          `<span class="numero">${position + 1}</span>` +
          `<span class="titre"></span>` +
          `<span class="points" aria-hidden="true"></span>` +
          `<span class="nb-questions">${chapitre.questions.length} q.</span>`;
        bouton.querySelector(".titre").textContent = chapitre.titre;
        bouton.addEventListener("click", () => this.choisir("chapitre", position));
        item.append(bouton);
        return item;
      })
    );
  }

  actualiser() {
    const { niveau, mode, chapitre, nombre } = this.reglages;

    for (const [cle, boutons] of Object.entries(this.groupes)) {
      for (const { option, bouton } of boutons) {
        bouton.setAttribute("aria-checked", String(option.id === this.reglages[cle]));
      }
    }

    this.dessinerMenu();

    // Pas d'aide quand la carte affiche déjà un message à la place des chapitres.
    const aides = {
      chapitre: MODES.find((m) => m.id === "chapitre").aide,
      reactivation: "Le chapitre choisi est le dernier ; ceux en teinte claire sont rejoués avec lui.",
    };
    this.el.aideMode.textContent = aides[mode] ?? "";

    this.el.listeChapitres.querySelectorAll(".chapitre").forEach((bouton, position) => {
      bouton.setAttribute("aria-checked", String(position === chapitre));
      bouton.classList.toggle("inclus", mode === "reactivation" && position < chapitre);
    });

    // Résumé de la série, en tête du panneau de droite.
    const titreChapitre = this.chapitres[chapitre]?.titre ?? "";
    const resume = {
      chapitre: [`${niveau}, chapitre ${chapitre + 1}`, titreChapitre],
      reactivation: [`${niveau}, révisions`, `Du chapitre 1 au chapitre ${chapitre + 1}.`],
      niveau: [`${niveau}, tout le niveau`, "Un mélange de tous les chapitres."],
      mental: [`${niveau}, calcul mental`, "Questions tirées au hasard."],
    }[mode];
    this.el.serieTitre.textContent = resume[0];
    this.el.serieDetail.textContent = resume[1];
    this.el.lancer.textContent = `Lancer ${nombre} questions`;
  }
}
