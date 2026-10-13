// Construction d'une série de questions à partir des réglages choisis.

import { genererQuestion } from "./generateurs.js";

const DIFFICULTE_CIBLE = { facile: 1, moyen: 2, difficile: 3 };

function melanger(liste) {
  const copie = [...liste];
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

// Questions d'un chapitre, mélangées, celles du niveau de difficulté voulu en premier.
function ordonner(questions, difficulte) {
  const melangees = melanger(questions);
  const cible = DIFFICULTE_CIBLE[difficulte];
  if (!cible) return melangees;
  return melangees.sort((a, b) => Math.abs(a.d - cible) - Math.abs(b.d - cible));
}

// Tire une question dans chaque chapitre à tour de rôle, pour que tous soient représentés.
function repartir(groupes, nombre) {
  const choisies = [];
  let reste = groupes.filter((g) => g.length > 0);
  while (choisies.length < nombre && reste.length > 0) {
    for (const groupe of reste) {
      if (choisies.length < nombre) choisies.push(groupe.shift());
    }
    reste = reste.filter((g) => g.length > 0);
  }
  return choisies;
}

/**
 * @param {object} options
 * @param {string} options.niveau       "6e", "5e", "4e" ou "3e"
 * @param {object} options.donnees      contenu de data/<niveau>.json
 * @param {string} options.mode         "chapitre", "reactivation", "niveau" ou "mental"
 * @param {number} options.chapitre     position du chapitre choisi (à partir de 0)
 * @param {number} options.nombre       nombre de questions voulu
 * @param {string} options.difficulte   "mixte", "facile", "moyen" ou "difficile"
 */
export function construireSerie({ niveau, donnees, mode, chapitre, nombre, difficulte }) {
  let chapitres = [];
  if (mode === "chapitre") chapitres = [donnees.chapitres[chapitre]];
  if (mode === "reactivation") chapitres = donnees.chapitres.slice(0, chapitre + 1);
  if (mode === "niveau") chapitres = donnees.chapitres;

  const groupes = chapitres.filter(Boolean).map((c) =>
    ordonner(
      c.questions.map((q) => ({ ...q, chapitre: c.titre })),
      difficulte
    )
  );

  const serie = repartir(groupes, nombre);

  // Complète avec des questions de calcul mental si la banque ne suffit pas.
  const dejaVues = new Set(serie.map((q) => q.q));
  let essais = 0;
  while (serie.length < nombre && essais < nombre * 20) {
    essais++;
    const question = genererQuestion(niveau);
    if (dejaVues.has(question.q)) continue;
    dejaVues.add(question.q);
    serie.push(question);
  }

  // Série mixte sur un seul chapitre : on monte progressivement en difficulté.
  if ((mode === "chapitre" || mode === "mental") && difficulte === "mixte") {
    return serie.sort((a, b) => a.d - b.d);
  }
  return mode === "chapitre" || mode === "mental" ? serie : melanger(serie);
}
