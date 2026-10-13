// Options proposées sur la page d'accueil et mémorisation des choix.
// Pour ajouter un niveau, une durée ou un mode, c'est ici (et dans data/).

export const NIVEAUX = [
  { id: "6e", libelle: "6e" },
  { id: "5e", libelle: "5e" },
  { id: "4e", libelle: "4e" },
  { id: "3e", libelle: "3e" },
];

export const MODES = [
  {
    id: "chapitre",
    libelle: "Un chapitre",
    aide: "Uniquement des questions du chapitre choisi.",
  },
  {
    id: "reactivation",
    libelle: "Depuis le début",
    aide: "Questions du chapitre 1 jusqu’au chapitre choisi, pour réactiver ce qui a déjà été vu.",
  },
  {
    id: "niveau",
    libelle: "Tout le niveau",
    aide: "Un mélange de tous les chapitres du niveau.",
  },
  {
    id: "mental",
    libelle: "Calcul mental",
    aide: "Questions tirées au hasard à chaque série : jamais deux fois les mêmes.",
  },
];

export const NOMBRES = [5, 10, 15, 20].map((n) => ({ id: n, libelle: `${n} questions` }));

export const DUREES = [
  { id: 15, libelle: "15 s" },
  { id: 30, libelle: "30 s" },
  { id: 45, libelle: "45 s" },
  { id: 60, libelle: "1 min" },
  { id: 0, libelle: "Sans limite" },
];

export const DIFFICULTES = [
  { id: "mixte", libelle: "Mixte" },
  { id: "facile", libelle: "Facile" },
  { id: "moyen", libelle: "Moyen" },
  { id: "difficile", libelle: "Difficile" },
];

const CLE = "automatismes.reglages.v1";

export const PAR_DEFAUT = {
  niveau: "6e",
  mode: "chapitre",
  chapitre: 0,
  nombre: 10,
  duree: 30,
  difficulte: "mixte",
};

function valide(liste, valeur, secours) {
  return liste.some((o) => o.id === valeur) ? valeur : secours;
}

export function lireReglages() {
  let brut = {};
  try {
    brut = JSON.parse(localStorage.getItem(CLE)) || {};
  } catch {
    brut = {};
  }
  return {
    niveau: valide(NIVEAUX, brut.niveau, PAR_DEFAUT.niveau),
    mode: valide(MODES, brut.mode, PAR_DEFAUT.mode),
    chapitre: Number.isInteger(brut.chapitre) && brut.chapitre >= 0 ? brut.chapitre : 0,
    nombre: valide(NOMBRES, brut.nombre, PAR_DEFAUT.nombre),
    duree: valide(DUREES, brut.duree, PAR_DEFAUT.duree),
    difficulte: valide(DIFFICULTES, brut.difficulte, PAR_DEFAUT.difficulte),
  };
}

export function enregistrerReglages(reglages) {
  try {
    localStorage.setItem(CLE, JSON.stringify(reglages));
  } catch {
    // Stockage indisponible (navigation privée, par exemple) : sans conséquence.
  }
}
