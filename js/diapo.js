// Diaporama : affiche les questions une à une, gère le minuteur et la correction.

import { formater } from "./maths.js";

const PAS_MAX_MS = 1000; // évite un saut du minuteur quand l'onglet revient au premier plan
const SECONDES_URGENTES = 5;

export class Diapo {
  constructor(racine, { onQuitter, onRejouer }) {
    this.racine = racine;
    this.onQuitter = onQuitter;
    this.onRejouer = onRejouer;

    const $ = (id) => racine.querySelector(`#${id}`);
    this.el = {
      position: $("diapo-position"),
      contexte: $("diapo-contexte"),
      reste: $("diapo-reste"),
      minuteur: $("diapo-minuteur"),
      trait: $("diapo-trait"),
      scene: $("diapo-scene"),
      question: $("diapo-question"),
      reponse: $("diapo-reponse"),
      reponseTexte: $("diapo-reponse-texte"),
      fin: $("diapo-fin"),
      finListe: $("diapo-fin-liste"),
      precedent: $("diapo-precedent"),
      correction: $("diapo-correction"),
      suivant: $("diapo-suivant"),
      rejouer: $("diapo-rejouer"),
      pause: $("diapo-pause"),
      pleinEcran: $("diapo-plein-ecran"),
      quitter: $("diapo-quitter"),
    };

    this.actif = false;
    this.serie = [];
    this.index = 0;
    this.duree = 0;
    this.contexteBase = "";
    this.ecoule = 0;
    this.enPause = false;
    this.correctionVisible = false;
    this.derniereImage = 0;

    this.el.precedent.addEventListener("click", () => this.aller(this.index - 1));
    this.el.suivant.addEventListener("click", () => this.aller(this.index + 1));
    this.el.correction.addEventListener("click", () => this.basculerCorrection());
    this.el.pause.addEventListener("click", () => this.basculerPause());
    this.el.pleinEcran.addEventListener("click", () => this.basculerPleinEcran());
    this.el.quitter.addEventListener("click", () => this.quitter());
    this.el.rejouer.addEventListener("click", () => {
      this.arreter();
      this.onRejouer();
    });
    document.addEventListener("keydown", (e) => this.toucheClavier(e));
  }

  demarrer(serie, { duree, contexte }) {
    this.serie = serie;
    this.duree = duree;
    this.contexteBase = contexte;
    this.actif = true;
    this.enPause = false;
    this.el.pause.textContent = "Pause";
    this.el.minuteur.hidden = duree === 0;
    this.el.reste.hidden = duree === 0;
    this.el.fin.hidden = true;
    this.el.scene.hidden = false;
    this.el.rejouer.hidden = true;
    this.aller(0);
    this.derniereImage = performance.now();
    requestAnimationFrame((t) => this.image(t));
    this.el.suivant.focus();
  }

  arreter() {
    this.actif = false;
    if (document.fullscreenElement) document.exitFullscreen?.();
  }

  quitter() {
    this.arreter();
    this.onQuitter();
  }

  // --- Navigation -------------------------------------------------------

  aller(position) {
    if (position < 0) return;
    if (position >= this.serie.length) {
      this.afficherFin();
      return;
    }

    this.el.scene.hidden = false;
    this.el.fin.hidden = true;
    this.el.rejouer.hidden = true;
    this.el.correction.hidden = false;
    this.el.suivant.hidden = false;

    this.index = position;
    this.ecoule = 0;

    const question = this.serie[position];
    this.el.position.textContent = `Question ${position + 1} sur ${this.serie.length}`;
    this.el.question.innerHTML = formater(question.q);
    this.el.reponseTexte.innerHTML = `<span class="invisible">Correction : </span>${formater(question.r)}`;
    this.definirCorrection(false);
    this.el.precedent.disabled = position === 0;
    this.el.suivant.textContent = position === this.serie.length - 1 ? "Terminer" : "Suivante";
    this.el.scene.scrollTop = 0;

    this.el.contexte.textContent = [this.contexteBase, question.chapitre].filter(Boolean).join(" : ");
    this.mettreAJourMinuteur();
  }

  basculerCorrection(forcer) {
    this.definirCorrection(forcer ?? !this.correctionVisible);
    if (this.correctionVisible) this.el.scene.scrollTop = this.el.scene.scrollHeight;
  }

  // La correction se déplie sous la question (voir .reponse dans diapo.css).
  definirCorrection(visible) {
    this.correctionVisible = visible;
    this.el.reponse.dataset.ouverte = String(visible);
    this.el.reponse.setAttribute("aria-hidden", String(!visible));
    this.el.correction.textContent = visible ? "Masquer la correction" : "Correction";
  }

  basculerPause() {
    this.enPause = !this.enPause;
    this.el.pause.textContent = this.enPause ? "Reprendre" : "Pause";
  }

  basculerPleinEcran() {
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      this.racine.requestFullscreen?.();
    }
  }

  afficherFin() {
    this.el.scene.hidden = true;
    this.el.fin.hidden = false;
    this.el.minuteur.hidden = true;
    this.el.reste.hidden = true;
    this.el.position.textContent = `${this.serie.length} questions`;
    this.el.finListe.innerHTML = this.serie
      .map((q) => `<li>${formater(q.q)}<span class="fin-reponse">${formater(q.r)}</span></li>`)
      .join("");
    this.el.correction.hidden = true;
    this.el.suivant.hidden = true;
    this.el.rejouer.hidden = false;
    this.el.precedent.disabled = false;
    this.index = this.serie.length;
    this.el.rejouer.focus();
  }

  // --- Minuteur ---------------------------------------------------------

  image(maintenant) {
    if (!this.actif) return;

    const pas = Math.min(maintenant - this.derniereImage, PAS_MAX_MS);
    this.derniereImage = maintenant;

    const enCours =
      this.duree > 0 && !this.enPause && !this.correctionVisible && this.index < this.serie.length;
    if (enCours) {
      this.ecoule += pas;
      if (this.ecoule >= this.duree * 1000) {
        this.ecoule = this.duree * 1000;
        this.basculerCorrection(true); // le temps est écoulé : on corrige
      }
      this.mettreAJourMinuteur();
    }

    requestAnimationFrame((t) => this.image(t));
  }

  mettreAJourMinuteur() {
    if (this.duree === 0) return;
    const reste = Math.max(0, this.duree * 1000 - this.ecoule);
    const secondes = Math.ceil(reste / 1000);
    const urgent = secondes <= SECONDES_URGENTES && reste > 0;

    this.el.trait.style.setProperty("--reste", String(reste / (this.duree * 1000)));
    this.el.trait.classList.toggle("urgent", urgent);
    this.el.reste.textContent = `${secondes} s`;
    this.el.reste.classList.toggle("urgent", urgent);
  }

  // --- Clavier ----------------------------------------------------------

  toucheClavier(e) {
    if (!this.actif || e.ctrlKey || e.metaKey || e.altKey) return;

    const touche = e.key.toLowerCase();
    if (touche === "arrowright" || touche === "pagedown") this.aller(this.index + 1);
    else if (touche === "arrowleft" || touche === "pageup") this.aller(this.index - 1);
    else if (touche === "c" && this.index < this.serie.length) this.basculerCorrection();
    else if (touche === "p") this.basculerPause();
    else if (touche === "f") this.basculerPleinEcran();
    else if (touche === "escape" && !document.fullscreenElement) this.quitter();
    else return;

    e.preventDefault();
  }
}
