// Construction d'une série de questions à partir des réglages choisis.
//
// Chaque chapitre a plusieurs modèles de questions (js/chapitres/<niveau>.js) dont les nombres
// sont tirés au hasard : on peut donc retravailler un chapitre autant de fois qu'on veut sans
// retomber sur les mêmes questions. Les questions écrites à la main dans data/<niveau>.json
// viennent s'y ajouter.

import { genererQuestion } from "./generateurs.js";
import { GENERATEURS_CHAPITRES } from "./chapitres/index.js";
import { alea, choix, melanger } from "./outils.js";

const DIFFICULTE_CIBLE = { facile: 1, moyen: 2, difficile: 3 };

// Réserve de questions d'un chapitre, mélangées, celles du niveau voulu en premier.
function reserveDuChapitre(chapitre, nombre, difficulte, dejaVues) {
  const modeles = GENERATEURS_CHAPITRES[chapitre.id] || [];
  const banque = melanger(chapitre.questions || []);
  const sources = banque.length ? [...modeles, "banque"] : modeles;
  const voulu = Math.max(nombre * 3, 30);
  const reserve = [];
  const locales = new Set();

  for (let essais = 0; reserve.length < voulu && essais < voulu * 20 && sources.length > 0; essais++) {
    const source = choix(sources);
    let question;
    if (source === "banque") {
      if (banque.length === 0) continue;
      question = banque[alea(0, banque.length - 1)];
    } else {
      question = source();
    }
    if (locales.has(question.q) || dejaVues.has(question.q)) continue;
    locales.add(question.q);
    reserve.push({ ...question, chapitre: chapitre.titre });
  }

  const cible = DIFFICULTE_CIBLE[difficulte];
  if (!cible) return reserve;
  return melanger(reserve).sort((a, b) => Math.abs(a.d - cible) - Math.abs(b.d - cible));
}

// Tire une question dans chaque chapitre à tour de rôle, pour que tous soient représentés.
function repartir(groupes, nombre) {
  const choisies = [];
  const vues = new Set();
  let reste = groupes.filter((g) => g.length > 0);
  while (choisies.length < nombre && reste.length > 0) {
    for (const groupe of reste) {
      while (groupe.length > 0 && choisies.length < nombre) {
        const question = groupe.shift();
        if (vues.has(question.q)) continue;
        vues.add(question.q);
        choisies.push(question);
        break;
      }
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

  const groupes = chapitres.filter(Boolean).map((c) => reserveDuChapitre(c, nombre, difficulte, new Set()));
  const serie = repartir(groupes, nombre);

  // Complète avec des questions de calcul mental si besoin (et pour le mode « Calcul mental »).
  const dejaVues = new Set(serie.map((q) => q.q));
  let essais = 0;
  while (serie.length < nombre && essais < nombre * 30) {
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
