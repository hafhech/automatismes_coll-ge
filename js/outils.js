// Petits outils partagés par tous les générateurs de questions.

export const alea = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
export const choix = (liste) => liste[alea(0, liste.length - 1)];
export const pile = () => Math.random() < 0.5;

export function melanger(liste) {
  const copie = [...liste];
  for (let i = copie.length - 1; i > 0; i--) {
    const j = alea(0, i);
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

// Nombre décimal écrit avec une virgule, sans zéros inutiles.
export function dec(x, chiffres = 4) {
  return String(Number(x.toFixed(chiffres))).replace(".", ",");
}

// Grand entier avec espaces : 12345 -> "12 345".
export function milliers(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export const entreParentheses = (n) => (n < 0 ? `(${n})` : String(n));

// « + 3 » ou « - 3 », pour écrire ax + b.
export const terme = (b) => (b < 0 ? `- ${-b}` : `+ ${b}`);

// Coefficient devant x : 1 -> "x", -1 -> "-x", 5 -> "5x".
export const coef = (a, v = "x") => (a === 1 ? v : a === -1 ? `-${v}` : `${a}${v}`);

// ax + b écrit proprement (a et b entiers).
export function affine(a, b, v = "x") {
  if (a === 0) return String(b);
  return b === 0 ? coef(a, v) : `${coef(a, v)} ${terme(b)}`;
}

export const pgcd = (a, b) => (b === 0 ? Math.abs(a) : pgcd(b, a % b));
export const ppcm = (a, b) => (a / pgcd(a, b)) * b;

export function estPremier(n) {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return true;
}

export function diviseurs(n) {
  const liste = [];
  for (let d = 1; d <= n; d++) if (n % d === 0) liste.push(d);
  return liste;
}

// Fraction irréductible sous forme « a/b » (ou entier si b vaut 1).
export function fraction(a, b) {
  const g = pgcd(a, b);
  const n = a / g;
  const d = b / g;
  return d === 1 ? String(n) : `${n}/${d}`;
}

// Fraction qui n'est PAS simplifiée.
export const frac = (a, b) => `${a}/${b}`;

// Liste de k lettres majuscules distinctes (noms de points).
export function lettres(k) {
  return melanger("ABCDEFGHIJKLMNPQRSTUVWXYZ".split("")).slice(0, k);
}

// Chiffres tous différents : pour des « chiffre des dizaines » sans ambiguïté.
export function chiffresDistincts(k) {
  return melanger([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, k);
}

// Liste d'éléments séparés par des points-virgules, chacun en maths.
export const liste = (elements) => elements.map((e) => `$${e}$`).join(" ; ");

// Heure : 20 h 05.
export const heure = (h, m) => `${h}\\text{ h }${String(m).padStart(2, "0")}`;

// Durée : 1 h 50 min (les zéros inutiles sont omis).
export function duree(h, m) {
  if (h === 0) return `${m}\\text{ min}`;
  if (m === 0) return `${h}\\text{ h}`;
  return `${h}\\text{ h }${m}\\text{ min}`;
}

export const U = (texte) => `\\text{ ${texte}}`;

// Nombre à la française : virgule décimale et espaces entre les milliers (sans zéros inutiles).
export function nb(x, chiffres = 4) {
  const [entier, decimales] = String(Number(x.toFixed(chiffres))).split(".");
  const e = entier.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return decimales ? `${e},${decimales}` : e;
}

// Résultat fractionnaire : « 8/12 = 2/3 » si on peut simplifier, « 6/3 = 2 » si c'est un entier.
export function simpl(n, d) {
  const g = pgcd(n, d);
  if (g === 1) return `${n}/${d}`;
  return `${n}/${d} = ${fraction(n, d)}`;
}

// Signe devant un nombre dans une somme : a + (b)  ->  « a + (b) », avec parenthèses si négatif.
export const plus = (n) => (n < 0 ? `(${n})` : `${n}`);

// Arrondi avec un nombre fixe de décimales, virgule française : fixe(13.02, 1) -> « 13,0 ».
export const fixe = (x, chiffres = 1) => x.toFixed(chiffres).replace(".", ",");
