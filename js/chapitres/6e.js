// Générateurs de questions, 6e : plusieurs modèles par chapitre, nombres tirés au hasard.
// Chaque fonction renvoie { q: énoncé, r: correction, d: difficulté 1 à 3 }.

import {
  alea, choix, pile, dec, milliers, melanger, pgcd, ppcm, diviseurs, fraction, lettres,
  chiffresDistincts, liste, heure, duree, U, nb,
} from "../outils.js";

const symbole = (a, b) => (a < b ? "<" : a > b ? ">" : "=");
const ordinal = ["unités", "dizaines", "centaines", "milliers"];

export default {
  // ---------------------------------------------------------------- 6e-01
  "6e-01": [
    () => {
      const c = chiffresDistincts(5);
      if (c[0] === 0) c[0] = 7 + (c[1] === 7 ? 1 : 0);
      const n = Number(c.join(""));
      const rang = alea(0, 3);
      return { q: `Quel est le chiffre des ${ordinal[rang]} dans $${milliers(n)}$ ?`, r: `$${c[4 - rang]}$`, d: 1 };
    },
    () => {
      const n = alea(1000, 99999);
      const [mot, p] = choix([["centaines", 100], ["dizaines", 10], ["milliers", 1000]]);
      return { q: `Combien y a-t-il de ${mot} en tout dans $${milliers(n)}$ ?`, r: `$${milliers(Math.floor(n / p))}$`, d: 3 };
    },
    () => {
      const a = alea(100, 9999);
      const x = String(a);
      const i = alea(0, x.length - 2);
      const b = Number(x.slice(0, i) + x[i + 1] + x[i] + x.slice(i + 2));
      if (a === b) return { q: `Compare $${a}$ et $${a + 10}$.`, r: `$${a} < ${a + 10}$`, d: 1 };
      return { q: `Compare $${milliers(a)}$ et $${milliers(b)}$.`, r: `$${milliers(a)} ${symbole(a, b)} ${milliers(b)}$`, d: 1 };
    },
    () => {
      const nombres = [...new Set(Array.from({ length: 4 }, () => alea(10, 999)))];
      const croissant = pile();
      const tri = [...nombres].sort((a, b) => (croissant ? a - b : b - a));
      return {
        q: `Range dans l’ordre ${croissant ? "croissant" : "décroissant"} : ${liste(melanger(nombres))}.`,
        r: `$${tri.join(croissant ? " < " : " > ")}$`,
        d: 1,
      };
    },
    () => {
      const a = alea(12, 98);
      const b = alea(12, 98);
      return choix([
        { q: `Calcule : $${a} + ${b}$.`, r: `$${a + b}$`, d: 1 },
        { q: `Calcule : $${a + b} - ${a}$.`, r: `$${b}$`, d: 1 },
      ]);
    },
    () => {
      const a = alea(2, 9);
      const b = alea(11, 99);
      return { q: `Calcule : $${a} × ${b}$.`, r: `$${a * b}$`, d: 2 };
    },
    () => {
      const [a, b] = choix([[25, 4], [50, 2], [20, 5], [125, 8], [25, 8]]);
      const c = alea(3, 9);
      return { q: `Calcule astucieusement : $${a} × ${c} × ${b}$.`, r: `$${a * b * c}$`, d: 3 };
    },
    () => {
      const a = alea(15, 95);
      return choix([
        { q: `Complète : $${a} + … = 100$.`, r: `$${100 - a}$`, d: 1 },
        { q: `Complète : $${a * 10} + … = 1 000$.`, r: `$${1000 - a * 10}$`, d: 2 },
      ]);
    },
    () => {
      const n = alea(1000, 99999);
      const [mot, p] = choix([["à la dizaine", 10], ["à la centaine", 100], ["au millier", 1000]]);
      return { q: `Arrondis $${milliers(n)}$ ${mot} près.`, r: `$${milliers(Math.round(n / p) * p)}$`, d: 2 };
    },
    () => {
      const n = alea(2, 999) * 10 + alea(1, 9);
      return choix([
        { q: `Quel est le successeur de $${milliers(n)}$ ?`, r: `$${milliers(n + 1)}$`, d: 1 },
        { q: `Quel est le prédécesseur de $${milliers(n)}$ ?`, r: `$${milliers(n - 1)}$`, d: 1 },
      ]);
    },
    () => {
      const n = alea(2, 90) * 10 + alea(1, 9);
      const f = choix([10, 100, 1000]);
      return { q: `Calcule : $${n} × ${milliers(f)}$.`, r: `$${milliers(n * f)}$`, d: 1 };
    },
    () => {
      const [un, plusieurs, prix] = choix([["Un cahier", "cahiers", alea(2, 9)], ["Un livre", "livres", alea(8, 19)], ["Une place de cinéma", "places", alea(6, 12)], ["Un stylo", "stylos", alea(1, 4)], ["Un sandwich", "sandwichs", alea(3, 6)]]);
      const n = alea(3, 9);
      return { q: `${un} coûte $${prix}$ €. Combien coûtent $${n}$ ${plusieurs} ?`, r: `$${prix * n}$ €`, d: 2 };
    },
  ],

  // ---------------------------------------------------------------- 6e-02
  "6e-02": [
    () => {
      const k = alea(2, 9);
      const m = alea(5, 30);
      const oui = pile();
      const n = oui ? k * m : k * m + alea(1, k - 1);
      return {
        q: `$${n}$ est-il un multiple de $${k}$ ?`,
        r: oui ? `Oui : $${n} = ${k} × ${m}$.` : `Non : $${n} = ${k} × ${m} + ${n - k * m}$.`,
        d: 1,
      };
    },
    () => {
      const k = alea(3, 15);
      return { q: `Donne les quatre premiers multiples non nuls de $${k}$.`, r: liste([k, 2 * k, 3 * k, 4 * k]), d: 1 };
    },
    () => {
      const k = choix([2, 3, 5, 9, 10]);
      const nombres = Array.from({ length: 3 }, () => alea(20, 999));
      const bons = nombres.filter((n) => n % k === 0);
      return {
        q: `Parmi ${liste(nombres)}, lesquels sont divisibles par $${k}$ ?`,
        r: bons.length ? liste(bons) : "Aucun des trois.",
        d: 2,
      };
    },
    () => {
      const n = choix([12, 16, 18, 20, 24, 28, 30, 32, 36, 40, 42, 45, 48, 50, 54, 56, 60, 63, 64, 72, 80, 90, 100]);
      return { q: `Donne tous les diviseurs de $${n}$.`, r: liste(diviseurs(n)), d: 2 };
    },
    () => {
      const b = alea(3, 12);
      const q = alea(5, 40);
      const r = alea(1, b - 1);
      return { q: `Effectue la division euclidienne de $${b * q + r}$ par $${b}$.`, r: `$${b * q + r} = ${b} × ${q} + ${r}$ avec $${r} < ${b}$`, d: 2 };
    },
    () => {
      const b = alea(3, 12);
      const q = alea(4, 30);
      const r = alea(1, b - 1);
      return { q: `Dans une division euclidienne, le diviseur est $${b}$, le quotient $${q}$ et le reste $${r}$. Quel est le dividende ?`, r: `$${b} × ${q} + ${r} = ${b * q + r}$`, d: 3 };
    },
    () => {
      const k = alea(3, 12);
      const n = alea(20, 150);
      return { q: `Quel est le plus petit multiple de $${k}$ supérieur à $${n}$ ?`, r: `$${(Math.floor(n / k) + 1) * k}$`, d: 2 };
    },
    () => {
      const k = alea(4, 12);
      const n = k * alea(3, 12) + alea(1, k - 1);
      const [paquet, objet] = choix([["paquets", "bonbons"], ["boîtes", "œufs"], ["sachets", "billes"], ["barquettes", "fraises"]]);
      return {
        q: `On range $${n}$ ${objet} dans des ${paquet} de $${k}$. Combien de ${paquet} complets obtient-on, et combien d’objets restent-ils ?`,
        r: `$${Math.floor(n / k)}$ ${paquet} complets, et il reste $${n % k}$.`,
        d: 3,
      };
    },
    () => {
      const [a, b] = choix([[4, 6], [6, 8], [3, 5], [4, 10], [6, 9], [5, 6], [8, 12], [4, 5], [6, 10], [9, 12], [10, 15]]);
      return { q: `Quel est le plus petit multiple commun non nul de $${a}$ et de $${b}$ ?`, r: `$${ppcm(a, b)}$`, d: 3 };
    },
    () => {
      const k = choix([2, 5, 10]);
      const n = alea(11, 999);
      return { q: `Quel est le reste de la division euclidienne de $${n}$ par $${k}$ ?`, r: `$${n % k}$`, d: 1 };
    },
    () => {
      const k = alea(3, 9);
      const m = alea(3, 12);
      return choix([
        { q: `Complète : $${k} × … = ${k * m}$.`, r: `$${m}$`, d: 1 },
        { q: `Complète : $… × ${k} = ${k * m}$.`, r: `$${m}$`, d: 1 },
      ]);
    },
    () => {
      const d = choix([3, 4, 6, 7, 8, 9]);
      const m = d * alea(2, 12);
      return { q: `$${d}$ est-il un diviseur de $${m}$ ?`, r: `Oui : $${m} = ${d} × ${m / d}$.`, d: 2 };
    },
  ],

  // ---------------------------------------------------------------- 6e-03
  "6e-03": [
    () => {
      const d = alea(3, 12);
      const n = alea(1, d - 1);
      const forme = choix(["un disque", "une barre de chocolat", "une pizza", "un rectangle"]);
      return { q: `On partage ${forme} en $${d}$ parts égales et on en colorie $${n}$. Quelle fraction est coloriée ?`, r: `$${n}/${d}$`, d: 1 };
    },
    () => {
      const d = alea(3, 12);
      const a = alea(1, d + 2);
      const b = choix(Array.from({ length: d + 2 }, (_, i) => i + 1).filter((x) => x !== a));
      return { q: `Compare $${a}/${d}$ et $${b}/${d}$.`, r: `$${a}/${d} ${symbole(a, b)} ${b}/${d}$`, d: 1 };
    },
    () => {
      const d = alea(3, 12);
      const n = alea(1, 2 * d);
      return { q: `Compare $${n}/${d}$ et $1$.`, r: `$${n}/${d} ${symbole(n, d)} 1$`, d: 2 };
    },
    () => {
      const d = alea(4, 12);
      const nums = melanger(Array.from({ length: d + 3 }, (_, i) => i + 1)).slice(0, 3);
      const tri = [...nums].sort((a, b) => a - b);
      return {
        q: `Range dans l’ordre croissant : ${melanger(nums).map((n) => `$${n}/${d}$`).join(" ; ")}.`,
        r: `$${tri.map((n) => `${n}/${d}`).join(" < ")}$`,
        d: 2,
      };
    },
    () => {
      const d = alea(3, 9);
      const n = alea(1, d - 1);
      const total = d * alea(2, 12);
      return { q: `Calcule $${n}/${d}$ de $${total}$.`, r: `$${(n * total) / d}$`, d: 2 };
    },
    () => {
      const [n, d] = choix([[1, 2], [1, 3], [2, 3], [3, 4], [1, 4], [2, 5], [3, 5], [1, 5], [3, 8], [5, 6]]);
      const k = alea(2, 9);
      return { q: `Complète : $${n}/${d} = \\dfrac{\\ldots}{${d * k}}$.`, r: `$${n}/${d} = ${n * k}/${d * k}$`, d: 2 };
    },
    () => {
      const d = choix([10, 100]);
      const n = alea(1, d === 10 ? 99 : 999);
      return { q: `Écris $${n}/${d}$ sous forme décimale.`, r: `$${dec(n / d)}$`, d: 2 };
    },
    () => {
      const [prenom, chose, unite] = choix([["Léa", "d’un livre de", "pages"], ["Samir", "d’une bande de", "cm"], ["Inès", "d’un trajet de", "km"], ["Tom", "d’un gâteau de", "g"]]);
      const d = alea(3, 8);
      const n = alea(1, d - 1);
      const total = d * alea(5, 40);
      return { q: `${prenom} a utilisé $${n}/${d}$ ${chose} $${total}$ ${unite}. Quelle quantité cela représente-t-il ?`, r: `$${(n * total) / d}$ ${unite}`, d: 3 };
    },
    () => {
      const m = choix([5, 10, 15, 20, 30, 40, 45, 12, 6, 50]);
      return { q: `Quelle fraction d’heure représentent $${m}$ minutes ? Donne la fraction la plus simple.`, r: `$${fraction(m, 60)}$ d’heure`, d: 3 };
    },
    () => {
      const d = alea(2, 9);
      const q = alea(1, 5);
      const r = alea(1, d - 1);
      return { q: `Écris $${q * d + r}/${d}$ sous la forme d’un entier plus une fraction inférieure à 1.`, r: `$${q} + ${r}/${d}$`, d: 3 };
    },
    () => {
      const d = alea(3, 12);
      const n = alea(1, d - 1);
      return { q: `Quelle fraction reste-t-il quand on a enlevé $${n}/${d}$ d’un tout ?`, r: `$${d - n}/${d}$`, d: 2 };
    },
  ],

  // ---------------------------------------------------------------- 6e-04
  "6e-04": [
    () => {
      const c = chiffresDistincts(4);
      if (c[0] === 0) c[0] = 9;
      const x = `${c[0]}${c[1]},${c[2]}${c[3]}`;
      const [mot, i] = choix([["dizaines", c[0]], ["unités", c[1]], ["dixièmes", c[2]], ["centièmes", c[3]]]);
      return { q: `Quel est le chiffre des ${mot} dans $${x}$ ?`, r: `$${i}$`, d: 1 };
    },
    () => {
      const e = alea(1, 20);
      const [a, b] = choix([[alea(1, 9), alea(1, 9) * 10], [alea(1, 9), alea(10, 99)], [alea(11, 98), alea(1, 9) * 10]]);
      const x = e + a / (a < 10 ? 100 : 100);
      const y = e + b / 100;
      return { q: `Compare $${dec(x, 2)}$ et $${dec(y, 2)}$.`, r: `$${dec(x, 2)} ${symbole(x, y)} ${dec(y, 2)}$`, d: 2 };
    },
    () => {
      const nombres = [...new Set(Array.from({ length: 4 }, () => alea(10, 999) / 100))];
      const tri = [...nombres].sort((a, b) => a - b);
      return { q: `Range dans l’ordre croissant : ${liste(melanger(nombres).map((n) => dec(n, 2)))}.`, r: `$${tri.map((n) => dec(n, 2)).join(" < ")}$`, d: 2 };
    },
    () => {
      const c = [alea(1, 9), alea(1, 9), alea(1, 9)];
      return { q: `Complète : $${c[0]},${c[1]}${c[2]} = ${c[0]} + ${c[1]}/10 + \\dfrac{\\ldots}{100}$.`, r: `$${c[2]}$`, d: 2 };
    },
    () => {
      const n = alea(11, 999);
      return choix([
        { q: `Écris $${n}/100$ sous forme décimale.`, r: `$${dec(n / 100)}$`, d: 2 },
        { q: `Écris $${dec(n / 100, 2)}$ sous la forme d’une fraction décimale.`, r: `$${n}/100$`, d: 2 },
      ]);
    },
    () => {
      const x = alea(101, 9999) / 100;
      return choix([
        { q: `Encadre $${dec(x, 2)}$ par deux entiers consécutifs.`, r: `$${Math.floor(x)} < ${dec(x, 2)} < ${Math.floor(x) + 1}$`, d: 1 },
        { q: `Encadre $${dec(x, 2)}$ par deux dixièmes consécutifs.`, r: `$${dec(Math.floor(x * 10) / 10, 1)} < ${dec(x, 2)} < ${dec(Math.floor(x * 10) / 10 + 0.1, 1)}$`, d: 2 },
      ]);
    },
    () => {
      const m = alea(1001, 99999);
      const [mot, p] = choix([["à l’unité", 1], ["au dixième", 10], ["au centième", 100]]);
      const x = m / 1000;
      const r = Math.round((m / 1000) * p) / p;
      return { q: `Arrondis $${dec(x, 3)}$ ${mot} près.`, r: `$${dec(r, 2)}$`, d: 2 };
    },
    () => {
      const a = alea(1, 99);
      return choix([
        { q: `Complète : $${dec(a / 10, 1)} + … = 10$.`, r: `$${dec(10 - a / 10, 1)}$`, d: 2 },
        { q: `Quel nombre faut-il ajouter à $${dec(a / 100, 2)}$ pour obtenir $1$ ?`, r: `$${dec(1 - a / 100, 2)}$`, d: 2 },
      ]);
    },
    () => {
      const e = alea(1, 30);
      const a = alea(1, 8);
      return { q: `Donne un nombre décimal compris entre $${e},${a}$ et $${e},${a + 1}$.`, r: `Par exemple $${e},${a}5$.`, d: 3 };
    },
    () => {
      const x = alea(11, 999) / 10;
      return choix([
        { q: `Quel nombre vient juste après $${dec(x, 1)}$ sur une droite graduée de $0,1$ en $0,1$ ?`, r: `$${dec(x + 0.1, 1)}$`, d: 1 },
        { q: `Quel nombre vient juste avant $${dec(x, 1)}$ sur une droite graduée de $0,1$ en $0,1$ ?`, r: `$${dec(x - 0.1, 1)}$`, d: 1 },
      ]);
    },
    () => {
      const u = alea(1, 99);
      const c = alea(1, 9);
      return { q: `Écris en chiffres : $${u}$ unités et $${c}$ centièmes.`, r: `$${dec(u + c / 100, 2)}$`, d: 2 };
    },
  ],

  // ---------------------------------------------------------------- 6e-05
  "6e-05": [
    () => {
      const a = alea(11, 199) / 10;
      const b = alea(11, 199) / 10;
      return choix([
        { q: `Calcule : $${dec(a, 1)} + ${dec(b, 1)}$.`, r: `$${dec(a + b, 1)}$`, d: 1 },
        { q: `Calcule : $${dec(Math.max(a, b), 1)} - ${dec(Math.min(a, b), 1)}$.`, r: `$${dec(Math.abs(a - b), 1)}$`, d: 2 },
      ]);
    },
    () => {
      const a = alea(101, 999) / 100;
      const b = alea(101, 999) / 100;
      return choix([
        { q: `Calcule : $${dec(a, 2)} + ${dec(b, 2)}$.`, r: `$${dec(a + b, 2)}$`, d: 2 },
        { q: `Calcule : $${dec(Math.max(a, b), 2)} - ${dec(Math.min(a, b), 2)}$.`, r: `$${dec(Math.abs(a - b), 2)}$`, d: 2 },
      ]);
    },
    () => {
      const x = alea(11, 999) / 100;
      const f = choix([10, 100, 1000]);
      const sens = pile();
      return {
        q: `Calcule : $${dec(x, 2)} ${sens ? "×" : "÷"} ${milliers(f)}$.`,
        r: `$${dec(sens ? x * f : x / f, 5)}$`,
        d: 1,
      };
    },
    () => {
      const a = alea(11, 99) / 10;
      const b = alea(2, 9);
      return { q: `Calcule : $${dec(a, 1)} × ${b}$.`, r: `$${dec(a * b, 1)}$`, d: 2 };
    },
    () => {
      const a = alea(2, 9) / 10;
      const b = alea(2, 9) / 10;
      return { q: `Calcule : $${dec(a, 1)} × ${dec(b, 1)}$.`, r: `$${dec(a * b, 2)}$`, d: 3 };
    },
    () => {
      const k = alea(2, 9);
      const q = alea(11, 99) / 10;
      return { q: `Calcule : $${dec(q * k, 1)} ÷ ${k}$.`, r: `$${dec(q, 1)}$`, d: 2 };
    },
    () => {
      const [d, objet] = choix([[2, "stylos"], [4, "cahiers"], [5, "baguettes"], [8, "croissants"]]);
      const n = alea(1, 9);
      return { q: `Calcule : $${n} ÷ ${d}$.`, r: `$${dec(n / d, 3)}$`, d: 2 };
    },
    () => {
      const [un, plusieurs, prix] = choix([["Un stylo", "stylos", 1.2], ["Un cahier", "cahiers", 2.5], ["Un pain au chocolat", "pains au chocolat", 1.1], ["Une bouteille d’eau", "bouteilles d’eau", 0.8], ["Un ticket de bus", "tickets de bus", 1.5], ["Une glace", "glaces", 2.2]]);
      const n = alea(3, 9);
      return { q: `${un} coûte $${dec(prix, 2)}$ €. Combien coûtent $${n}$ ${plusieurs} ?`, r: `$${dec(prix * n, 2)}$ €`, d: 2 };
    },
    () => {
      const billet = choix([10, 20, 50]);
      const achat = alea(11, billet * 10 - 10) / 10;
      return { q: `Je paie $${dec(achat, 1)}$ € avec un billet de $${billet}$ €. Combien me rend-on ?`, r: `$${dec(billet - achat, 1)}$ €`, d: 2 };
    },
    () => {
      const [a, b] = choix([[2.5, 4], [0.25, 4], [1.25, 8], [0.5, 2], [0.2, 5], [0.125, 8]]);
      const c = alea(3, 9);
      return { q: `Calcule astucieusement : $${dec(a, 3)} × ${c} × ${b}$.`, r: `$${dec(a * b * c, 3)}$`, d: 3 };
    },
    () => {
      const a = alea(11, 99) / 10;
      const b = alea(11, 99) / 10;
      const c = alea(1, 9);
      return { q: `Calcule : $${dec(a, 1)} + ${dec(b, 1)} + ${c}$.`, r: `$${dec(a + b + c, 1)}$`, d: 2 };
    },
  ],

  // ---------------------------------------------------------------- 6e-06
  "6e-06": [
    () => {
      const r = alea(2, 25);
      return choix([
        { q: `Un cercle a un rayon de $${r}$ cm. Quel est son diamètre ?`, r: `$${2 * r}$ cm`, d: 1 },
        { q: `Un cercle a un diamètre de $${2 * r}$ cm. Quel est son rayon ?`, r: `$${r}$ cm`, d: 1 },
      ]);
    },
    () => {
      const [a, b, m] = lettres(3);
      const l = alea(2, 20) * 2;
      return { q: `$${m}$ est le milieu du segment $[${a}${b}]$ et $${a}${b} = ${l}$ cm. Combien mesure $${a}${m}$ ?`, r: `$${a}${m} = ${l / 2}$ cm`, d: 1 };
    },
    () => {
      const [o, a] = lettres(2);
      const r = alea(2, 12);
      return { q: `$${a}$ est un point du cercle de centre $${o}$ et de rayon $${r}$ cm. Combien mesure $[${o}${a}]$ ?`, r: `$${o}${a} = ${r}$ cm`, d: 1 };
    },
    () => {
      const [o, m] = lettres(2);
      const r = alea(3, 10);
      const x = r + choix([-2, -1, 0, 1, 2, 3]);
      const ou = x < r ? "à l’intérieur du cercle" : x > r ? "à l’extérieur du cercle" : "sur le cercle";
      return { q: `Un cercle a pour centre $${o}$ et pour rayon $${r}$ cm. Le point $${m}$ est tel que $${o}${m} = ${x}$ cm. Où se trouve $${m}$ ?`, r: `$${m}$ est ${ou}.`, d: 2 };
    },
    () => {
      const [a, b, m] = lettres(3);
      const x = alea(2, 15);
      return { q: `$${m}$ est un point de la médiatrice de $[${a}${b}]$ et $${m}${a} = ${x}$ cm. Combien mesure $${m}${b}$ ?`, r: `$${m}${b} = ${x}$ cm`, d: 2 };
    },
    () => {
      const [a, b, c, e] = lettres(4);
      return choix([
        { q: `Les droites $(${a}${b})$ et $(${c}${e})$ sont perpendiculaires à une même droite $(d)$. Que peut-on dire de $(${a}${b})$ et $(${c}${e})$ ?`, r: `Elles sont parallèles.`, d: 2 },
        { q: `Les droites $(${a}${b})$ et $(${c}${e})$ sont parallèles, et $(d)$ est perpendiculaire à $(${a}${b})$. Que peut-on dire de $(d)$ et $(${c}${e})$ ?`, r: `Elles sont perpendiculaires.`, d: 2 },
        { q: `Les droites $(${a}${b})$ et $(${c}${e})$ sont parallèles à une même droite $(d)$. Que peut-on dire de $(${a}${b})$ et $(${c}${e})$ ?`, r: `Elles sont parallèles.`, d: 2 },
      ]);
    },
    () => {
      const [a, b, m] = lettres(3);
      const l = alea(6, 20);
      const x = alea(2, l - 2);
      return { q: `$${m}$ est un point du segment $[${a}${b}]$. On sait que $${a}${b} = ${l}$ cm et $${a}${m} = ${x}$ cm. Combien mesure $${m}${b}$ ?`, r: `$${m}${b} = ${l - x}$ cm`, d: 1 };
    },
    () => {
      const r1 = alea(2, 8);
      const r2 = alea(2, 8);
      const cas = alea(0, 3);
      const d = [r1 + r2 + alea(1, 4), r1 + r2, Math.abs(r1 - r2) + 1 + (r1 + r2 - Math.abs(r1 - r2) > 2 ? 1 : 0), Math.max(0, Math.abs(r1 - r2) - alea(1, 2))][cas];
      const dist = Math.max(1, d);
      let rep;
      if (dist > r1 + r2 || dist < Math.abs(r1 - r2)) rep = "Ils n’ont aucun point commun.";
      else if (dist === r1 + r2 || dist === Math.abs(r1 - r2)) rep = "Ils ont un seul point commun.";
      else rep = "Ils ont exactement deux points communs.";
      return {
        q: `Deux cercles ont pour rayons $${r1}$ cm et $${r2}$ cm, et leurs centres sont distants de $${dist}$ cm. Combien ont-ils de points communs ?`,
        r: rep,
        d: 3,
      };
    },
    () => {
      const [a, b, c] = lettres(3);
      return choix([
        { q: `Comment s’appelle la droite perpendiculaire à $[${a}${b}]$ passant par son milieu ?`, r: `La médiatrice de $[${a}${b}]$.`, d: 2 },
        { q: `Comment s’appelle un segment qui relie deux points d’un cercle et passe par son centre ?`, r: `Un diamètre.`, d: 1 },
        { q: `Comment s’appelle un segment qui relie deux points d’un cercle sans passer par son centre ?`, r: `Une corde.`, d: 2 },
        { q: `Comment note-t-on la demi-droite d’origine $${a}$ qui passe par $${b}$ ?`, r: `$[${a}${b})$`, d: 2 },
        { q: `Comment note-t-on la droite qui passe par $${a}$ et $${b}$ ?`, r: `$(${a}${b})$`, d: 1 },
        { q: `Comment note-t-on le segment d’extrémités $${a}$ et $${b}$ ?`, r: `$[${a}${b}]$`, d: 1 },
        { q: `Les points $${a}$, $${b}$ et $${c}$ sont sur une même droite : comment dit-on qu’ils sont ?`, r: `Alignés.`, d: 1 },
      ]);
    },
    () => {
      const r = alea(2, 15);
      return { q: `Je trace un cercle avec un compas dont l’écartement est de $${r}$ cm. Quel est son diamètre ?`, r: `$${2 * r}$ cm`, d: 2 };
    },
  ],

  // ---------------------------------------------------------------- 6e-07
  "6e-07": [
    () => {
      const x = choix([alea(5, 85), 90, alea(95, 175), 180, alea(10, 80), alea(100, 170)]);
      const type = x < 90 ? "aigu" : x === 90 ? "droit" : x < 180 ? "obtus" : "plat";
      return { q: `Un angle mesure $${x}°$. Est-il aigu, droit, obtus ou plat ?`, r: `Il est ${type}.`, d: 1 };
    },
    () => {
      const x = alea(5, 85);
      return { q: `Deux angles sont complémentaires. L’un mesure $${x}°$. Combien mesure l’autre ?`, r: `$${90 - x}°$`, d: 2 };
    },
    () => {
      const x = alea(10, 170);
      return { q: `Deux angles sont supplémentaires. L’un mesure $${x}°$. Combien mesure l’autre ?`, r: `$${180 - x}°$`, d: 2 };
    },
    () => {
      const x = alea(5, 89) * 2;
      return choix([
        { q: `Quelle est la mesure de chaque angle formé par la bissectrice d’un angle de $${x}°$ ?`, r: `$${x / 2}°$`, d: 2 },
        { q: `La bissectrice d’un angle forme deux angles de $${x / 2}°$. Combien mesure l’angle de départ ?`, r: `$${x}°$`, d: 2 },
      ]);
    },
    () => {
      const [a, b, c] = lettres(3);
      return { q: `Comment note-t-on l’angle de sommet $${b}$ formé par les demi-droites $[${b}${a})$ et $[${b}${c})$ ?`, r: `$\\widehat{${a}${b}${c}}$`, d: 1 };
    },
    () => {
      const x = [alea(10, 170)];
      while (x.length < 3) { const v = alea(10, 170); if (!x.includes(v)) x.push(v); }
      const [mot, f] = choix([["grand", Math.max], ["petit", Math.min]]);
      return { q: `Quel est le plus ${mot} de ces angles : ${x.map((v) => `$${v}°$`).join(" ; ")} ?`, r: `$${f(...x)}°$`, d: 1 };
    },
    () => {
      const h = alea(1, 11);
      const a = Math.min(30 * h, 360 - 30 * h);
      return { q: `Une horloge indique $${h}$ h pile. Quelle est la mesure du plus petit angle formé par les aiguilles ?`, r: `$${a}°$`, d: 3 };
    },
    () => {
      const x = alea(10, 80);
      const y = alea(10, 90);
      const [a, b, c, e] = lettres(4);
      return { q: `Les angles $\\widehat{${a}${b}${c}}$ et $\\widehat{${c}${b}${e}}$ sont adjacents, avec $\\widehat{${a}${b}${c}} = ${x}°$ et $\\widehat{${c}${b}${e}} = ${y}°$. Combien mesure $\\widehat{${a}${b}${e}}$ ?`, r: `$${x + y}°$`, d: 2 };
    },
    () => {
      const x = alea(1, 17) * 10;
      return { q: `Un angle plat est partagé en deux angles. L’un mesure $${x}°$. Combien mesure l’autre ?`, r: `$${180 - x}°$`, d: 2 };
    },
    () => {
      const n = alea(2, 4);
      return { q: `Combien y a-t-il d’angles droits dans ${n === 2 ? "un demi-tour" : n === 3 ? "trois quarts de tour" : "un tour complet"} ?`, r: `$${n}$`, d: 2 };
    },
  ],

  // ---------------------------------------------------------------- 6e-08
  "6e-08": [
    () => {
      const [a, b, m] = lettres(3);
      const x = alea(2, 14);
      return { q: `$${b}$ est le symétrique de $${a}$ par rapport à la droite $(d)$, qui coupe $[${a}${b}]$ en $${m}$. On a $${a}${m} = ${x}$ cm. Combien mesure $${a}${b}$ ?`, r: `$${a}${b} = ${2 * x}$ cm`, d: 2 };
    },
    () => {
      const l = alea(2, 15);
      const [phrase, mes] = choix([
        [`Un segment mesure $${l}$ cm. Combien mesure son symétrique par rapport à une droite ?`, `$${l}$ cm`],
        [`Un angle mesure $${l * 5}°$. Combien mesure son symétrique par rapport à une droite ?`, `$${l * 5}°$`],
        [`Un cercle a un rayon de $${l}$ cm. Quel est le rayon de son symétrique par rapport à une droite ?`, `$${l}$ cm`],
        [`Un triangle a un périmètre de $${l * 3}$ cm. Quel est le périmètre de son symétrique par rapport à une droite ?`, `$${l * 3}$ cm`],
        [`Un rectangle a une aire de $${l * 4}$ cm². Quelle est l’aire de son symétrique par rapport à une droite ?`, `$${l * 4}$ cm²`],
      ]);
      return { q: phrase, r: `${mes} : la symétrie conserve les longueurs, les angles et les aires.`, d: 1 };
    },
    () => {
      const n = alea(1, 9);
      const [cote, oppose] = choix([["à gauche", "à droite"], ["à droite", "à gauche"], ["au-dessus", "au-dessous"], ["au-dessous", "au-dessus"]]);
      return { q: `Sur un quadrillage, le point $A$ est à $${n}$ carreau${n > 1 ? "x" : ""} ${cote} de l’axe de symétrie $(d)$. Où est son symétrique $A'$ ?`, r: `À $${n}$ carreau${n > 1 ? "x" : ""} ${oppose} de $(d)$.`, d: 2 };
    },
    () => {
      const [forme, n] = choix([
        ["un carré", 4], ["un rectangle (non carré)", 2], ["un losange (non carré)", 2], ["un triangle équilatéral", 3],
        ["un triangle isocèle (non équilatéral)", 1], ["un hexagone régulier", 6], ["un pentagone régulier", 5],
        ["un octogone régulier", 8], ["un parallélogramme (ni rectangle ni losange)", 0], ["un trapèze isocèle", 1],
        ["un triangle rectangle isocèle", 1], ["un triangle quelconque", 0],
      ]);
      return { q: `Combien d’axes de symétrie possède ${forme} ?`, r: `$${n}$`, d: 2 };
    },
    () => {
      const n = alea(3, 12);
      return { q: `Combien un polygone régulier à $${n}$ côtés a-t-il d’axes de symétrie ?`, r: `$${n}$`, d: 2 };
    },
    () => {
      const [a, b, c] = lettres(3);
      return { q: `Le triangle $${a}${b}${c}$ est isocèle en $${a}$. Quelle droite est un axe de symétrie du triangle ?`, r: `La médiatrice de $[${b}${c}]$ (elle passe par $${a}$).`, d: 3 };
    },
    () => {
      const [m] = lettres(1);
      return { q: `Le point $${m}$ est situé sur l’axe de symétrie $(d)$. Quel est son symétrique par rapport à $(d)$ ?`, r: `Lui-même : $${m}$ est son propre symétrique.`, d: 2 };
    },
    () => {
      const [a, b] = lettres(2);
      return { q: `Si la droite $(d)$ est la médiatrice de $[${a}${b}]$, que peut-on dire des points $${a}$ et $${b}$ ?`, r: `Ils sont symétriques par rapport à $(d)$.`, d: 2 };
    },
    () => {
      const x = alea(2, 17) * 5;
      const [a, b, c] = lettres(3);
      return { q: `L’angle $\\widehat{${a}${b}${c}}$ mesure $${x}°$. Quelle est la mesure de son symétrique par rapport à une droite ?`, r: `$${x}°$ : la symétrie conserve les angles.`, d: 1 };
    },
  ],

  // ---------------------------------------------------------------- 6e-09
  "6e-09": [
    () => {
      const [objet, p] = choix([["cahiers", 1.5], ["stylos", 0.8], ["croissants", 1.2], ["places de cinéma", 6], ["bouteilles de jus", 2.5], ["baguettes", 1.1]]);
      const n1 = alea(2, 6);
      const k = alea(2, 5);
      return { q: `$${n1}$ ${objet} coûtent $${dec(p * n1, 2)}$ €. Combien coûtent $${n1 * k}$ ${objet} ?`, r: `$${dec(p * n1 * k, 2)}$ €`, d: 1 };
    },
    () => {
      const [objet, p] = choix([["kg de pommes", 2], ["kg de farine", 1.5], ["m de ruban", 3], ["L de lait", 1.2], ["kg de pommes de terre", 1.6]]);
      const n1 = choix([2, 4, 5, 10]);
      const n2 = alea(1, 9);
      return { q: `$${n1}$ ${objet} coûtent $${dec(p * n1, 2)}$ €. Combien coûtent $${n2}$ ${objet} ?`, r: `$${dec(p * n2, 2)}$ €`, d: 2 };
    },
    () => {
      const x1 = alea(2, 9);
      const c = choix([2, 3, 4, 5, 1.5, 2.5, 10]);
      const x2 = alea(2, 12);
      return { q: `Dans un tableau de proportionnalité, à $${x1}$ correspond $${dec(x1 * c, 2)}$. Quel nombre correspond à $${x2}$ ?`, r: `$${dec(x2 * c, 2)}$`, d: 2 };
    },
    () => {
      const x = [alea(2, 5), alea(6, 9), alea(10, 14)];
      const c = alea(2, 6);
      const y = x.map((v) => v * c);
      const oui = pile();
      if (!oui) y[alea(0, 2)] += alea(1, 3);
      return {
        q: `Ce tableau est-il un tableau de proportionnalité ? Première ligne : ${liste(x)}. Seconde ligne : ${liste(y)}.`,
        r: oui ? `Oui : on multiplie toujours par $${c}$.` : `Non : le passage de la première à la seconde ligne ne se fait pas toujours avec le même nombre.`,
        d: 3,
      };
    },
    () => {
      const p = choix([10, 20, 25, 50, 75, 5]);
      const n = choix([20, 40, 60, 80, 100, 120, 200, 400, 500]);
      return { q: `Calcule $${p}\\,\\%$ de $${n}$.`, r: `$${(n * p) / 100}$`, d: p === 10 || p === 50 ? 2 : 3 };
    },
    () => {
      const [e, m] = choix([[1000, 10], [10000, 100], [100000, 1000], [50000, 500], [25000, 250]]);
      const c = alea(2, 9);
      const reel = c * m;
      return { q: `Sur une carte à l’échelle $1/${milliers(e)}$, deux villes sont distantes de $${c}$ cm. Quelle est la distance réelle, en mètres ?`, r: `$${milliers(reel)}$ m`, d: 3 };
    },
    () => {
      const [t, unite, un, nom] = choix([["consommation", "L", 6, "pour $100$ km"], ["débit", "L", 8, "par minute"], ["salaire", "€", 12, "par heure"], ["distance", "km", 4, "par heure"]]);
      const n = alea(2, 9);
      const phrase = {
        "pour $100$ km": [`Une voiture consomme $${un}$ L pour $100$ km. Combien consomme-t-elle pour $${n * 100}$ km ?`, `$${un * n}$ L`],
        "par minute": [`Un robinet débite $${un}$ L par minute. Quelle quantité d’eau coule en $${n}$ minutes ?`, `$${un * n}$ L`],
        "par heure": [t === "salaire" ? `On gagne $${un}$ € par heure. Combien gagne-t-on en $${n}$ heures ?` : `Un marcheur parcourt $${un}$ km par heure. Quelle distance parcourt-il en $${n}$ heures ?`, t === "salaire" ? `$${un * n}$ €` : `$${un * n}$ km`],
      }[nom];
      return { q: phrase[0], r: phrase[1], d: 2 };
    },
    () => {
      const n1 = choix([2, 4, 5, 10]);
      const [ing, g] = choix([["de farine", 50], ["de sucre", 25], ["de beurre", 20], ["de chocolat", 30]]);
      const n2 = n1 * alea(2, 4);
      return { q: `Une recette pour $${n1}$ personnes demande $${g * n1}$ g ${ing}. Quelle quantité faut-il pour $${n2}$ personnes ?`, r: `$${g * n2}$ g`, d: 2 };
    },
    () => {
      const prix = choix([20, 40, 50, 60, 80, 100, 120, 200]);
      const p = choix([10, 20, 25, 50]);
      return { q: `Un article coûte $${prix}$ €. Il est soldé à $-${p}\\,\\%$. Quel est son nouveau prix ?`, r: `$${nb(prix - (prix * p) / 100)}$ €`, d: 3 };
    },
  ],

  // ---------------------------------------------------------------- 6e-10
  "6e-10": [
    () => {
      const L = alea(3, 25);
      const l = alea(2, L - 1);
      return choix([
        { q: `Calcule le périmètre d’un rectangle de $${L}$ cm sur $${l}$ cm.`, r: `$${2 * (L + l)}$ cm`, d: 1 },
        { q: `Calcule l’aire d’un rectangle de $${L}$ cm sur $${l}$ cm.`, r: `$${L * l}$ cm²`, d: 1 },
      ]);
    },
    () => {
      const c = alea(2, 20);
      return choix([
        { q: `Calcule le périmètre d’un carré de côté $${c}$ cm.`, r: `$${4 * c}$ cm`, d: 1 },
        { q: `Calcule l’aire d’un carré de côté $${c}$ cm.`, r: `$${c * c}$ cm²`, d: 1 },
        { q: `Calcule le périmètre d’un triangle équilatéral de côté $${c}$ cm.`, r: `$${3 * c}$ cm`, d: 1 },
      ]);
    },
    () => {
      const b = alea(2, 12) * 2;
      const h = alea(2, 12);
      return { q: `Un triangle rectangle a des côtés de l’angle droit de $${b}$ cm et $${h}$ cm. Calcule son aire.`, r: `$${(b * h) / 2}$ cm²`, d: 2 };
    },
    () => {
      const r = alea(2, 12);
      return choix([
        { q: `Donne la valeur exacte de la longueur d’un cercle de rayon $${r}$ cm.`, r: `$2 × ${r} × π = ${2 * r}π$ cm`, d: 3 },
        { q: `Donne la valeur exacte de l’aire d’un disque de rayon $${r}$ cm.`, r: `$${r} × ${r} × π = ${r * r}π$ cm²`, d: 3 },
      ]);
    },
    () => {
      const [de, vers, f] = choix([["m²", "cm²", 10000], ["cm²", "mm²", 100], ["dm²", "cm²", 100], ["ha", "m²", 10000]]);
      const x = alea(2, 40);
      return { q: `Convertis $${x}$ ${de} en ${vers}.`, r: `$${milliers(x * f)}$ ${vers}`, d: 3 };
    },
    () => {
      const c = alea(2, 25);
      return choix([
        { q: `Un carré a un périmètre de $${4 * c}$ cm. Quelle est la longueur de son côté ?`, r: `$${c}$ cm`, d: 2 },
        { q: `Un carré a une aire de $${c * c}$ cm². Quelle est la longueur de son côté ?`, r: `$${c}$ cm`, d: 3 },
      ]);
    },
    () => {
      const L = alea(4, 15);
      const l = alea(3, L - 1);
      return { q: `Un rectangle a une aire de $${L * l}$ cm² et une longueur de $${L}$ cm. Quelle est sa largeur ?`, r: `$${l}$ cm`, d: 3 };
    },
    () => {
      const L = alea(7, 20);
      const l = alea(5, L - 1);
      const c = alea(2, Math.min(4, l - 1));
      return { q: `Dans un rectangle de $${L}$ cm sur $${l}$ cm, on enlève un carré de $${c}$ cm de côté. Quelle est l’aire de la figure restante ?`, r: `$${L * l} - ${c * c} = ${L * l - c * c}$ cm²`, d: 3 };
    },
    () => {
      const a = alea(3, 15);
      const b = alea(3, 15);
      const c = alea(3, 15);
      return { q: `Un triangle a des côtés de $${a}$ cm, $${b}$ cm et $${c}$ cm. Quel est son périmètre ?`, r: `$${a + b + c}$ cm`, d: 1 };
    },
    () => {
      const L = alea(8, 60);
      const l = alea(5, L - 1);
      return { q: `Un jardin rectangulaire mesure $${L}$ m de long et $${l}$ m de large. Quelle longueur de grillage faut-il pour l’entourer ?`, r: `$${2 * (L + l)}$ m`, d: 2 };
    },
  ],

  // ---------------------------------------------------------------- 6e-11
  "6e-11": [
    () => {
      const h = alea(1, 5);
      const m = alea(1, 59);
      return { q: `Convertis $${duree(h, m)}$ en minutes.`, r: `$${60 * h + m}\\text{ min}$`, d: 1 };
    },
    () => {
      const total = alea(61, 400);
      return { q: `Convertis $${total}$ minutes en heures et minutes.`, r: `$${duree(Math.floor(total / 60), total % 60)}$`, d: 2 };
    },
    () => {
      const m = alea(1, 9);
      const s = alea(1, 59);
      return choix([
        { q: `Convertis $${m}\\text{ min }${s}\\text{ s}$ en secondes.`, r: `$${60 * m + s}\\text{ s}$`, d: 2 },
        { q: `Convertis $${60 * m + s}\\text{ s}$ en minutes et secondes.`, r: `$${m}\\text{ min }${s}\\text{ s}$`, d: 2 },
      ]);
    },
    () => {
      const h = alea(8, 21);
      const m = choix([0, 5, 10, 15, 20, 30, 35, 40, 45, 50]);
      const dh = alea(0, 3);
      const dm = choix([10, 15, 20, 30, 40, 45, 50]);
      const fin = h * 60 + m + dh * 60 + dm;
      return { q: `Un film commence à $${heure(h, m)}$ et dure $${duree(dh, dm)}$. À quelle heure se termine-t-il ?`, r: `$${heure(Math.floor(fin / 60) % 24, fin % 60)}$`, d: 3 };
    },
    () => {
      const d1 = alea(7, 18) * 60 + choix([0, 10, 15, 20, 30, 40, 45, 50]);
      const duree1 = alea(45, 300);
      const f = d1 + duree1;
      return { q: `Un train part à $${heure(Math.floor(d1 / 60), d1 % 60)}$ et arrive à $${heure(Math.floor(f / 60), f % 60)}$. Quelle est la durée du trajet ?`, r: `$${duree(Math.floor(duree1 / 60), duree1 % 60)}$`, d: 3 };
    },
    () => {
      const x = alea(2, 90);
      const [de, vers, f, sens] = choix([["km", "m", 1000, 1], ["m", "cm", 100, 1], ["cm", "mm", 10, 1], ["m", "dm", 10, 1], ["dm", "cm", 10, 1], ["cm", "m", 100, -1], ["mm", "cm", 10, -1], ["m", "km", 1000, -1]]);
      const v = sens === 1 ? x * f : x / f;
      return { q: `Convertis $${x}$ ${de} en ${vers}.`, r: `$${nb(v, 3)}$ ${vers}`, d: 2 };
    },
    () => {
      const x = alea(2, 50);
      const [de, vers, f, sens] = choix([["kg", "g", 1000, 1], ["t", "kg", 1000, 1], ["g", "kg", 1000, -1], ["L", "mL", 1000, 1], ["cL", "mL", 10, 1], ["mL", "L", 1000, -1], ["L", "cL", 100, 1], ["hL", "L", 100, 1]]);
      const v = sens === 1 ? x * f : x / f;
      return { q: `Convertis $${x}$ ${de} en ${vers}.`, r: `$${nb(v, 3)}$ ${vers}`, d: 2 };
    },
    () => {
      const n = alea(2, 9);
      return choix([
        { q: `Combien y a-t-il de minutes dans $${n}$ heures ?`, r: `$${60 * n}$`, d: 1 },
        { q: `Combien y a-t-il de secondes dans $${n}$ minutes ?`, r: `$${60 * n}$`, d: 1 },
        { q: `Combien y a-t-il de jours dans $${n}$ semaines ?`, r: `$${7 * n}$`, d: 1 },
        { q: `Combien y a-t-il d’heures dans $${n}$ jours ?`, r: `$${24 * n}$`, d: 2 },
      ]);
    },
    () => {
      const h1 = alea(0, 3), m1 = alea(5, 55), h2 = alea(0, 3), m2 = alea(5, 55);
      const t = h1 * 60 + m1 + h2 * 60 + m2;
      return { q: `Calcule : $${duree(h1, m1)} + ${duree(h2, m2)}$.`, r: `$${duree(Math.floor(t / 60), t % 60)}$`, d: 3 };
    },
    () => {
      const x = choix([0.25, 0.5, 0.75, 1.5, 1.25, 2.5, 0.1, 0.2, 0.3, 0.4, 0.6, 1.75, 2.25, 3.5]);
      const t = Math.round(x * 60);
      return { q: `Écris $${dec(x, 2)}$ h en heures et minutes.`, r: `$${duree(Math.floor(t / 60), t % 60)}$`, d: 3 };
    },
  ],
};
