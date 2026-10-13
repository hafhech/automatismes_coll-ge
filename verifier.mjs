// Vérifie les banques de questions avant de publier le site :
//   npm run verifier
//
// 1. chaque chapitre contient assez de questions, bien formées ;
// 2. toutes les formules s'affichent avec KaTeX (celui du dossier vendor/) ;
// 3. le tirage de séries donne toujours le bon nombre de questions, sans doublon.

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

import { pretraiter } from "../js/maths.js";
import { construireSerie } from "../js/selection.js";
import { genererQuestion } from "../js/generateurs.js";

const RACINE = join(dirname(fileURLToPath(import.meta.url)), "..");
const NIVEAUX = ["6e", "5e", "4e", "3e"];
const MODES = ["chapitre", "reactivation", "niveau", "mental"];
const DIFFICULTES = ["mixte", "facile", "moyen", "difficile"];
const MIN_PAR_CHAPITRE = 8;

const erreurs = [];
const signaler = (message) => erreurs.push(message);

// KaTeX est chargé depuis le dossier vendor/, comme sur le site.
const contexte = {};
vm.createContext(contexte);
vm.runInContext(readFileSync(join(RACINE, "vendor/katex/katex.min.js"), "utf8"), contexte);
const katex = contexte.katex;
if (!katex) throw new Error("KaTeX n’a pas pu être chargé depuis vendor/katex/katex.min.js");

function verifierFormules(texte, lieu) {
  if (typeof texte !== "string" || texte.trim() === "") {
    signaler(`${lieu} : texte vide`);
    return;
  }
  if ((texte.match(/\$/g) || []).length % 2 !== 0) {
    signaler(`${lieu} : nombre impair de « $ » dans « ${texte} »`);
    return;
  }
  for (const [, formule] of texte.matchAll(/\$([^$]+)\$/g)) {
    try {
      katex.renderToString(pretraiter(formule), { throwOnError: true });
    } catch (e) {
      signaler(`${lieu} : formule illisible « ${formule} » (${e.message})`);
    }
  }
  if (/undefined|NaN|Infinity/.test(texte)) signaler(`${lieu} : valeur invalide dans « ${texte} »`);
}

// --- 1 et 2 : banques de questions -------------------------------------------

const banques = {};
console.log("Banques de questions");
for (const niveau of NIVEAUX) {
  const donnees = JSON.parse(readFileSync(join(RACINE, `data/${niveau}.json`), "utf8"));
  banques[niveau] = donnees;

  const effectifs = donnees.chapitres.map((c) => c.questions.length);
  const vues = new Set();

  donnees.chapitres.forEach((chapitre, i) => {
    const nom = `${niveau}, chapitre ${i + 1} (${chapitre.titre})`;
    if (!chapitre.id || !chapitre.titre) signaler(`${nom} : id ou titre manquant`);
    if (chapitre.questions.length < MIN_PAR_CHAPITRE) {
      signaler(`${nom} : seulement ${chapitre.questions.length} questions (minimum ${MIN_PAR_CHAPITRE})`);
    }
    const niveauxPresents = new Set(chapitre.questions.map((q) => q.d));
    if (niveauxPresents.size < 2) signaler(`${nom} : une seule difficulté représentée`);

    chapitre.questions.forEach((question, j) => {
      const lieu = `${nom}, question ${j + 1}`;
      if (![1, 2, 3].includes(question.d)) signaler(`${lieu} : difficulté « d » doit valoir 1, 2 ou 3`);
      verifierFormules(question.q, `${lieu} (énoncé)`);
      verifierFormules(question.r, `${lieu} (réponse)`);
      if (vues.has(question.q)) signaler(`${lieu} : énoncé en double`);
      vues.add(question.q);
    });
  });

  const total = effectifs.reduce((a, b) => a + b, 0);
  console.log(
    `  ${niveau} : ${donnees.chapitres.length} chapitres, ${total} questions ` +
      `(de ${Math.min(...effectifs)} à ${Math.max(...effectifs)} par chapitre)`
  );
}

// --- Générateurs de calcul mental --------------------------------------------

for (const niveau of NIVEAUX) {
  for (let i = 0; i < 400; i++) {
    const question = genererQuestion(niveau);
    verifierFormules(question.q, `générateur ${niveau} (énoncé)`);
    verifierFormules(question.r, `générateur ${niveau} (réponse)`);
  }
}

// --- 3 : tirage des séries ----------------------------------------------------

let nbSeries = 0;
for (const niveau of NIVEAUX) {
  const donnees = banques[niveau];
  const dernier = donnees.chapitres.length - 1;
  for (const mode of MODES) {
    for (const difficulte of DIFFICULTES) {
      for (const nombre of [5, 10, 15, 20]) {
        for (const chapitre of mode === "chapitre" || mode === "reactivation" ? [...donnees.chapitres.keys()] : [dernier]) {
          const serie = construireSerie({ niveau, donnees, mode, chapitre, nombre, difficulte });
          nbSeries++;
          const lieu = `série ${niveau}/${mode}/${difficulte}/${nombre}/chapitre ${chapitre + 1}`;
          if (serie.length !== nombre) signaler(`${lieu} : ${serie.length} questions au lieu de ${nombre}`);
          if (new Set(serie.map((q) => q.q)).size !== serie.length) signaler(`${lieu} : question en double`);
        }
      }
    }
  }
}
console.log(`Tirage : ${nbSeries} séries simulées`);

// --- Résultat -----------------------------------------------------------------

if (erreurs.length > 0) {
  console.error(`\n${erreurs.length} problème(s) :`);
  for (const e of erreurs.slice(0, 60)) console.error(`  - ${e}`);
  process.exit(1);
}
console.log("\nTout est en ordre : aucun chapitre vide, toutes les formules s’affichent.");
