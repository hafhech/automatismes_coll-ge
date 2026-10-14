// Générateurs de questions, 3e.

import {
  alea, choix, pile, dec, melanger, pgcd, ppcm, estPremier, diviseurs, fraction, simpl, lettres, liste, nb, milliers,
  entreParentheses, coef, terme, affine, fixe,
} from "../outils.js";

const relatif = (min, max) => { let n = 0; while (n === 0) n = alea(min, max); return n; };

// Fraction avec son signe : (-6, 8) -> « -3/4 ».
function rat(n, d) {
  if (d < 0) { n = -n; d = -d; }
  const g = pgcd(Math.abs(n), d) || 1;
  const a = n / g, b = d / g;
  return b === 1 ? String(a) : `${a}/${b}`;
}

// Polynôme ax² + bx + c écrit proprement.
function poly(a, b, c) {
  const parts = [];
  if (a) parts.push(a === 1 ? "x²" : a === -1 ? "-x²" : `${a}x²`);
  if (b) {
    const t = Math.abs(b) === 1 ? "x" : `${Math.abs(b)}x`;
    parts.push(parts.length ? (b < 0 ? `- ${t}` : `+ ${t}`) : b < 0 ? `-${t}` : t);
  }
  if (c || !parts.length) parts.push(parts.length ? (c < 0 ? `- ${-c}` : `+ ${c}`) : String(c));
  return parts.join(" ");
}

const TRIPLETS = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [6, 8, 10], [9, 12, 15]];
const rad = (angle) => (angle * Math.PI) / 180;

export default {
  // ---------------------------------------------------------------- 3e-01
  "3e-01": [
    () => {
      const n = alea(11, 120);
      const d = diviseurs(n).find((x) => x > 1 && x < n);
      return { q: `$${n}$ est-il un nombre premier ?`, r: d ? `Non : il est divisible par $${d}$.` : `Oui : ses seuls diviseurs sont $1$ et $${n}$.`, d: 2 };
    },
    () => {
      const N = choix([20, 30, 40, 50]);
      const l = Array.from({ length: N }, (_, i) => i + 1).filter(estPremier);
      return { q: `Donne tous les nombres premiers inférieurs à $${N}$.`, r: liste(l), d: 2 };
    },
    () => {
      const premiers = [2, 3, 5, 7, 11];
      let facteurs, n;
      do {
        facteurs = Array.from({ length: alea(2, 4) }, () => choix(premiers)).sort((a, b) => a - b);
        n = facteurs.reduce((s, x) => s * x, 1);
      } while (n > 500 || n < 12);
      const groupes = [...new Set(facteurs)].map((p) => [p, facteurs.filter((x) => x === p).length]);
      const ecrit = groupes.map(([p, e]) => (e > 1 ? `${p}^${e}` : `${p}`)).join(" × ");
      return { q: `Décompose $${n}$ en produit de facteurs premiers.`, r: `$${n} = ${ecrit}$`, d: 3 };
    },
    () => {
      const g = alea(2, 15);
      let p, q;
      do { p = alea(2, 12); q = alea(2, 12); } while (pgcd(p, q) !== 1 || p === q);
      return { q: `Calcule le PGCD de $${g * p}$ et de $${g * q}$.`, r: `$PGCD(${g * p} ; ${g * q}) = ${g}$`, d: 3 };
    },
    () => {
      const g = choix([1, 1, 2, 3, 5, 7]);
      let p, q;
      do { p = alea(2, 15); q = alea(2, 15); } while (pgcd(p, q) !== 1 || p === q);
      const a = g * p, b = g * q;
      return { q: `$${a}$ et $${b}$ sont-ils premiers entre eux ?`, r: g === 1 ? `Oui : leur PGCD est $1$.` : `Non : leur PGCD est $${g}$.`, d: 3 };
    },
    () => {
      const g = alea(2, 12);
      let p, q;
      do { p = alea(2, 13); q = alea(p + 1, 15); } while (pgcd(p, q) !== 1);
      return { q: `Rends irréductible la fraction $${g * p}/${g * q}$.`, r: `$${p}/${q}$ (PGCD $${g}$)`, d: 3 };
    },
    () => {
      const g = alea(2, 12);
      let p, q;
      do { p = alea(2, 9); q = alea(2, 9); } while (pgcd(p, q) !== 1 || p === q);
      const [a, b] = choix([["billes rouges", "billes bleues"], ["roses", "tulipes"], ["stylos", "crayons"], ["garçons", "filles"]]);
      return { q: `On a $${g * p}$ ${a} et $${g * q}$ ${b}. On veut faire le plus grand nombre possible de lots identiques, sans rien laisser. Combien de lots peut-on faire ?`, r: `PGCD de $${g * p}$ et $${g * q}$ : $${g}$ lots.`, d: 3 };
    },
    () => {
      const n = alea(100, 9999);
      const k = choix([3, 9]);
      const s = String(n).split("").reduce((t, c) => t + Number(c), 0);
      return { q: `$${milliers(n)}$ est-il divisible par $${k}$ ?`, r: s % k === 0 ? `Oui : la somme de ses chiffres est $${s}$, multiple de $${k}$.` : `Non : la somme de ses chiffres est $${s}$, qui n’est pas un multiple de $${k}$.`, d: 2 };
    },
    () => {
      const n = alea(10, 90);
      let p = n + 1;
      while (!estPremier(p)) p++;
      return { q: `Quel est le plus petit nombre premier supérieur à $${n}$ ?`, r: `$${p}$`, d: 2 };
    },
    () => {
      const l = melanger(Array.from({ length: 58 }, (_, i) => i + 2)).slice(0, 4).sort((a, b) => a - b);
      const bons = l.filter(estPremier);
      return { q: `Parmi ${liste(l)}, lesquels sont premiers ?`, r: bons.length ? liste(bons) : "Aucun des quatre.", d: 2 };
    },
    () => {
      const a = alea(2, 4), b = alea(2, 3), c = choix([5, 7]);
      return { q: `Calcule : $2^${a} × 3^${b} × ${c}$.`, r: `$${2 ** a * 3 ** b * c}$`, d: 2 };
    },
  ],

  // ---------------------------------------------------------------- 3e-02
  "3e-02": [
    () => {
      const n = alea(2, 20);
      return { q: `Calcule : $sqrt(${n * n})$.`, r: `$${n}$`, d: 1 };
    },
    () => {
      const b = choix([2, 3, 5, 6, 7, 10]);
      const a = alea(2, 9);
      return { q: `Écris $sqrt(${a * a * b})$ sous la forme $a sqrt(b)$ avec $b$ le plus petit possible.`, r: `$${a}sqrt(${b})$`, d: 3 };
    },
    () => {
      const m = choix([2, 3, 5, 6, 7]);
      const k = alea(2, 6);
      return { q: `Calcule : $sqrt(${m}) × sqrt(${m * k * k})$.`, r: `$sqrt(${m * m * k * k}) = ${m * k}$`, d: 3 };
    },
    () => {
      const b = choix([2, 3, 5, 7]);
      const a = alea(1, 8), c = alea(1, 8);
      const plus = pile();
      const t = (n) => (n === 1 ? `sqrt(${b})` : `${n}sqrt(${b})`);
      const r = plus ? a + c : a - c;
      return { q: `Simplifie : $${t(a)} ${plus ? "+" : "-"} ${t(c)}$.`, r: r === 0 ? `$0$` : `$${r === 1 ? "" : r === -1 ? "-" : r}sqrt(${b})$`, d: 3 };
    },
    () => {
      const a = alea(2, 6), b = choix([2, 3, 5, 7, 11]);
      return choix([
        { q: `Calcule : $(sqrt(${b}))^2$.`, r: `$${b}$`, d: 2 },
        { q: `Calcule : $(${a}sqrt(${b}))^2$.`, r: `$${a}^2 × ${b} = ${a * a * b}$`, d: 3 },
      ]);
    },
    () => {
      const n = alea(2, 99);
      if (Number.isInteger(Math.sqrt(n))) return { q: `Encadre $sqrt(50)$ par deux entiers consécutifs.`, r: `$7 < sqrt(50) < 8$`, d: 2 };
      const f = Math.floor(Math.sqrt(n));
      return { q: `Encadre $sqrt(${n})$ par deux entiers consécutifs.`, r: `$${f} < sqrt(${n}) < ${f + 1}$`, d: 2 };
    },
    () => {
      const n = choix([2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 17, 19, 20, 21, 22, 23, 24, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]);
      return { q: `Donne l’arrondi au dixième de $sqrt(${n})$.`, r: `$sqrt(${n}) ≈ ${dec(Math.round(Math.sqrt(n) * 10) / 10, 1)}$`, d: 3 };
    },
    () => {
      const m = choix([2, 3, 5, 6, 7]);
      const k = alea(2, 7);
      return { q: `Calcule : $sqrt(${m * k * k}) ÷ sqrt(${m})$.`, r: `$${k}$`, d: 3 };
    },
    () => {
      const a = alea(2, 9), b = alea(2, 6), c = alea(2, 9);
      return choix([
        { q: `Écris sous la forme d’une seule puissance : $${a}^${b} × ${a}^${c}$.`, r: `$${a}^{${b + c}}$`, d: 2 },
        { q: `Écris sous la forme d’une seule puissance : $${a}^{${b + c}} ÷ ${a}^${b}$.`, r: `$${a}^${c}$`, d: 3 },
        { q: `Écris sous la forme d’une seule puissance : $(${a}^${b})^${Math.min(c, 4)}$.`, r: `$${a}^{${b * Math.min(c, 4)}}$`, d: 3 },
      ]);
    },
    () => {
      const [a, b] = choix([[2, 3], [2, 4], [3, 3], [1, 5], [2, 2], [4, 2], [1, 8], [3, 2], [5, 4], [6, 5], [7, 3], [8, 5]]);
      const m = alea(2, 6), n = alea(-5, -1);
      let c = a * b, e = m + n;
      if (c >= 10) { c /= 10; e += 1; }
      return { q: `Donne l’écriture scientifique de $(${a} × 10^{${m}}) × (${b} × 10^{${n}})$.`, r: `$${dec(c, 2)} × 10^{${e}}$`, d: 3 };
    },
    () => {
      const [a, b, c] = choix(TRIPLETS);
      return { q: `Calcule : $sqrt(${a * a} + ${b * b})$.`, r: `$sqrt(${a * a + b * b}) = ${c}$`, d: 2 };
    },
    () => {
      const n = alea(2, 15);
      const exact = pile();
      return exact
        ? { q: `Un carré a une aire de $${n * n}$ cm². Quelle est la longueur de son côté ?`, r: `$${n}$ cm`, d: 2 }
        : { q: `Un carré a une aire de $${n * n + 1}$ cm². Donne la valeur exacte de son côté.`, r: `$sqrt(${n * n + 1})$ cm`, d: 2 };
    },
  ],

  // ---------------------------------------------------------------- 3e-03
  "3e-03": [
    () => {
      const a = alea(1, 9);
      const plus = pile();
      return { q: `Développe : $(x ${plus ? "+" : "-"} ${a})^2$.`, r: `$${poly(1, plus ? 2 * a : -2 * a, a * a)}$`, d: 2 };
    },
    () => {
      const a = alea(2, 12);
      return { q: `Développe : $(x - ${a})(x + ${a})$.`, r: `$x^2 - ${a * a}$`, d: 2 };
    },
    () => {
      const a = alea(1, 4), b = relatif(-6, 6), c = alea(1, 4), d = relatif(-6, 6);
      return { q: `Développe et réduis : $(${affine(a, b)})(${affine(c, d)})$.`, r: `$${poly(a * c, a * d + b * c, b * d)}$`, d: 3 };
    },
    () => {
      const a = alea(2, 5), b = alea(1, 7);
      return { q: `Développe : $(${a}x + ${b})^2$.`, r: `$${poly(a * a, 2 * a * b, b * b)}$`, d: 3 };
    },
    () => {
      const a = alea(2, 12);
      return choix([
        { q: `Factorise : $x^2 - ${a * a}$.`, r: `$(x - ${a})(x + ${a})$`, d: 3 },
        { q: `Factorise : $x^2 + ${2 * a}x + ${a * a}$.`, r: `$(x + ${a})^2$`, d: 3 },
        { q: `Factorise : $x^2 - ${2 * a}x + ${a * a}$.`, r: `$(x - ${a})^2$`, d: 3 },
      ]);
    },
    () => {
      const k = alea(2, 6), a = alea(1, 6);
      return { q: `Factorise : $${k}x^2 + ${k * a}x$.`, r: `$${k}x(x + ${a})$`, d: 3 };
    },
    () => {
      const a = relatif(-9, 9), b = relatif(-9, 9);
      return { q: `Résous : $(x ${terme(-a)})(x ${terme(-b)}) = 0$.`, r: a === b ? `$x = ${a}$` : `$x = ${a}$ ou $x = ${b}$`, d: 3 };
    },
    () => {
      const d = choix([2, 3, 4, 5]), k = relatif(-9, 9), b = relatif(-9, 9);
      return { q: `Résous : $\\dfrac{x}{${d}} ${terme(b)} = ${k + b}$.`, r: `$x = ${d * k}$`, d: 3 };
    },
    () => {
      const x = relatif(-9, 9), a = alea(3, 9), c = alea(1, a - 1), b = relatif(-9, 9);
      return { q: `Résous : $${affine(a, b)} = ${affine(c, a * x + b - c * x)}$.`, r: `$x = ${x}$`, d: 3 };
    },
    () => {
      const a = alea(2, 6), b = relatif(-9, 9), s0 = relatif(-6, 8);
      const signe = choix(["<", ">", "≤", "≥"]);
      return { q: `Résous l’inéquation : $${affine(a, b)} ${signe} ${a * s0 + b}$.`, r: `$x ${signe} ${s0}$`, d: 3 };
    },
    () => {
      const a = alea(2, 6), b = relatif(-9, 9), x0 = relatif(-4, 4);
      return { q: `Résous l’inéquation : $-${a}x ${terme(b)} ≥ ${-a * x0 + b}$.`, r: `$x ≤ ${x0}$ (on change le sens de l’inégalité en divisant par un nombre négatif)`, d: 3 };
    },
    () => {
      const a = alea(2, 7), x = relatif(-6, 6);
      return { q: `Calcule $(x + ${a})^2$ pour $x = ${x}$.`, r: `$${(x + a) ** 2}$`, d: 2 };
    },
    () => {
      const a = alea(2, 6), b = alea(1, 12), x = alea(2, 15);
      return { q: `Je pense à un nombre. Je le multiplie par $${a}$ puis je retranche $${b}$. Je trouve $${a * x - b}$. Quel est ce nombre ?`, r: `$${x}$`, d: 3 };
    },
    () => {
      const x = relatif(-9, 9), y = relatif(-9, 9);
      return { q: `Résous le système : $x + y = ${x + y}$ et $x - y = ${x - y}$.`, r: `$x = ${x}$ et $y = ${y}$`, d: 3 };
    },
    () => {
      const a = alea(2, 9);
      return { q: `Développe et réduis : $(x + ${a})^2 - x^2$.`, r: `$${affine(2 * a, a * a)}$`, d: 3 };
    },
  ],

  // ---------------------------------------------------------------- 3e-04
  "3e-04": [
    () => {
      const a = relatif(-6, 6), b = relatif(-9, 9), x = relatif(-6, 8);
      return { q: `Soit $f(x) = ${affine(a, b)}$. Calcule $f(${x})$.`, r: `$${a * x + b}$`, d: 2 };
    },
    () => {
      const a = relatif(2, 6), b = relatif(-9, 9), x = relatif(-6, 8);
      const c = a * x + b;
      return { q: `Soit $f(x) = ${affine(a, b)}$. Quel est l’antécédent de $${c}$ par $f$ ?`, r: `$${affine(a, b)} = ${c}$ donne $x = ${x}$`, d: 3 };
    },
    () => {
      const a = relatif(-9, 9), x = relatif(2, 12);
      return { q: `Soit $f$ la fonction linéaire définie par $f(x) = ${coef(a)}$. Calcule $f(${x})$.`, r: `$${a * x}$`, d: 1 };
    },
    () => {
      const a = relatif(2, 9), x = alea(2, 9);
      return { q: `$f$ est une fonction linéaire telle que $f(${x}) = ${a * x}$. Donne l’expression de $f(x)$.`, r: `$f(x) = ${coef(a)}$`, d: 2 };
    },
    () => {
      const a = relatif(-5, 5), b = relatif(-9, 9);
      const x1 = alea(-4, 2), dx = alea(1, 4);
      const x2 = x1 + dx;
      const [p, q] = lettres(2);
      return { q: `La droite passant par $${p}(${x1} ; ${a * x1 + b})$ et $${q}(${x2} ; ${a * x2 + b})$ représente une fonction affine. Quel est son coefficient directeur ?`, r: `$\\dfrac{${a * x2 + b} - ${entreParentheses(a * x1 + b)}}{${x2} - ${entreParentheses(x1)}} = ${a}$`, d: 3 };
    },
    () => {
      const a = relatif(-6, 6), b = relatif(-9, 9);
      return choix([
        { q: `Quelle est l’ordonnée à l’origine de la droite d’équation $y = ${affine(a, b)}$ ?`, r: `$${b}$`, d: 1 },
        { q: `Soit $f(x) = ${affine(a, b)}$. Calcule $f(0)$.`, r: `$${b}$`, d: 1 },
        { q: `Quel est le coefficient directeur de la droite d’équation $y = ${affine(a, b)}$ ?`, r: `$${a}$`, d: 1 },
      ]);
    },
    () => {
      const b = relatif(-9, 9), a = relatif(-6, 6);
      return { q: `$f$ est une fonction affine telle que $f(0) = ${b}$ et $f(1) = ${a + b}$. Donne l’expression de $f(x)$.`, r: `$f(x) = ${affine(a, b)}$`, d: 3 };
    },
    () => {
      const a = relatif(-4, 5), b = relatif(-9, 9), x = relatif(-5, 6);
      const oui = pile();
      const y = a * x + b + (oui ? 0 : alea(1, 3));
      const [p] = lettres(1);
      return { q: `Le point $${p}(${x} ; ${y})$ appartient-il à la droite d’équation $y = ${affine(a, b)}$ ?`, r: oui ? `Oui : pour $x = ${x}$, on trouve bien $y = ${y}$.` : `Non : pour $x = ${x}$, on trouve $y = ${a * x + b}$ et non $${y}$.`, d: 3 };
    },
    () => {
      const b = choix([5, 8, 10, 12, 15, 20]), a = alea(2, 9), x = alea(2, 12);
      const [lieu, unite] = choix([["une salle de sport", "mois"], ["un abonnement de téléphone", "mois"], ["un club de natation", "séances"]]);
      return { q: `Pour ${lieu}, on paie $${b}$ € d’inscription plus $${a}$ € par ${unite === "mois" ? "mois" : "séance"}. Quel est le prix pour $${x}$ ${unite} ?`, r: `$${b} + ${a} × ${x} = ${b + a * x}$ €`, d: 2 };
    },
    () => {
      const a = relatif(-6, 6), b = relatif(-9, 9);
      return { q: `La fonction $f(x) = ${affine(a, b)}$ est-elle croissante ou décroissante ?`, r: a > 0 ? `Croissante : son coefficient directeur $${a}$ est positif.` : `Décroissante : son coefficient directeur $${a}$ est négatif.`, d: 2 };
    },
    () => {
      const x = relatif(-6, 8);
      const a = alea(1, 5), c = alea(1, 5) + a, b = relatif(-9, 9);
      const d = a * x + b - c * x;
      return { q: `Soit $f(x) = ${affine(a, b)}$ et $g(x) = ${affine(c, d)}$. Pour quelle valeur de $x$ a-t-on $f(x) = g(x)$ ?`, r: `$x = ${x}$`, d: 3 };
    },
    () => {
      const a = relatif(2, 6), x = alea(2, 6);
      const [p] = lettres(1);
      return { q: `Une droite passe par l’origine et par $${p}(${x} ; ${a * x})$. Quelle est l’expression de la fonction linéaire qu’elle représente ?`, r: `$f(x) = ${coef(a)}$`, d: 2 };
    },
  ],

  // ---------------------------------------------------------------- 3e-05
  "3e-05": [
    () => {
      const [a, b, c, m, n] = lettres(5);
      let p, q;
      do { q = alea(3, 8); p = alea(1, q - 1); } while (pgcd(p, q) !== 1);
      const u = alea(1, 4), v = alea(1, 4);
      return { q: `Dans le triangle $${a}${b}${c}$, $${m} \\in [${a}${b}]$ et $${n} \\in [${a}${c}]$ avec $(${m}${n}) ∥ (${b}${c})$. On a $${a}${m} = ${p * u}$, $${a}${b} = ${q * u}$ et $${a}${c} = ${q * v}$. Calcule $${a}${n}$.`, r: `$\\dfrac{${a}${n}}{${a}${c}} = \\dfrac{${a}${m}}{${a}${b}}$ donc $${a}${n} = ${p * v}$`, d: 3 };
    },
    () => {
      const [a, b, c, m, n] = lettres(5);
      let p, q;
      do { q = alea(3, 8); p = alea(1, q - 1); } while (pgcd(p, q) !== 1);
      const u = alea(1, 4), w = alea(1, 4);
      return { q: `Dans le triangle $${a}${b}${c}$, $${m} \\in [${a}${b}]$ et $${n} \\in [${a}${c}]$ avec $(${m}${n}) ∥ (${b}${c})$. On a $${a}${m} = ${p * u}$ cm, $${a}${b} = ${q * u}$ cm et $${b}${c} = ${q * w}$ cm. Calcule $${m}${n}$.`, r: `$${m}${n} = ${p * w}$ cm`, d: 3 };
    },
    () => {
      const [a, b, c, m, n] = lettres(5);
      let p, q;
      do { q = alea(3, 8); p = alea(1, q - 1); } while (pgcd(p, q) !== 1);
      const u = alea(1, 4), w = alea(1, 4);
      return { q: `Dans le triangle $${a}${b}${c}$, $${m} \\in [${a}${b}]$ et $${n} \\in [${a}${c}]$ avec $(${m}${n}) ∥ (${b}${c})$. On a $${a}${m} = ${p * u}$ cm, $${a}${b} = ${q * u}$ cm et $${m}${n} = ${p * w}$ cm. Calcule $${b}${c}$.`, r: `$${b}${c} = ${q * w}$ cm`, d: 3 };
    },
    () => {
      const [a, b, c, m, n] = lettres(5);
      let p, q;
      do { q = alea(3, 8); p = alea(1, q - 1); } while (pgcd(p, q) !== 1);
      const u = alea(2, 4), v = alea(1, 4);
      const ok = pile();
      const an = ok ? p * v : p * v + 1;
      return { q: `Dans le triangle $${a}${b}${c}$, $${m} \\in [${a}${b}]$ et $${n} \\in [${a}${c}]$. On a $${a}${m} = ${p * u}$, $${a}${b} = ${q * u}$, $${a}${n} = ${an}$ et $${a}${c} = ${q * v}$. Les droites $(${m}${n})$ et $(${b}${c})$ sont-elles parallèles ?`, r: ok ? `Oui : $\\dfrac{${a}${m}}{${a}${b}} = \\dfrac{${p * u}}{${q * u}} = \\dfrac{${an}}{${q * v}} = \\dfrac{${a}${n}}{${a}${c}}$` : `Non : $\\dfrac{${p * u}}{${q * u}} = \\dfrac{${p}}{${q}}$ mais $\\dfrac{${an}}{${q * v}} \\neq \\dfrac{${p}}{${q}}$.`, d: 3 };
    },
    () => {
      const [a, b, c, m, n] = lettres(5);
      return { q: `Dans le triangle $${a}${b}${c}$, $${m} \\in [${a}${b}]$ et $${n} \\in [${a}${c}]$ avec $(${m}${n}) ∥ (${b}${c})$. Écris l’égalité des rapports donnée par le théorème de Thalès.`, r: `$\\dfrac{${a}${m}}{${a}${b}} = \\dfrac{${a}${n}}{${a}${c}} = \\dfrac{${m}${n}}{${b}${c}}$`, d: 2 };
    },
    () => {
      const k = choix([2, 3, 4, 5, 1.5, 2.5, 0.5]);
      const l = choix([2, 4, 6, 8, 10, 12]);
      return choix([
        { q: `Un segment mesure $${l}$ cm. On l’agrandit avec un coefficient $${dec(k, 1)}$. Quelle est sa nouvelle longueur ?`, r: `$${nb(l * k)}$ cm`, d: 1 },
        { q: `Un rectangle d’aire $${l}$ cm² est transformé par un agrandissement de coefficient $${dec(k, 1)}$. Quelle est sa nouvelle aire ?`, r: `$${l} × ${dec(k, 1)}^2 = ${nb(l * k * k)}$ cm²`, d: 3 },
        { q: `Un solide de volume $${l}$ cm³ est transformé par un agrandissement de coefficient $${choix([2, 3])}$. Par quel nombre son volume est-il multiplié ?`, r: `Par le cube du coefficient.`, d: 3 },
      ].slice(0, 2));
    },
    () => {
      const a = alea(2, 12), k = choix([2, 3, 4, 5, 1.5, 2.5]);
      return { q: `Un segment mesure $${a}$ cm. Son agrandissement mesure $${nb(a * k)}$ cm. Quel est le coefficient d’agrandissement ?`, r: `$${nb(a * k)} ÷ ${a} = ${dec(k, 1)}$`, d: 2 };
    },
    () => {
      const [d, k] = choix([[2, "1/2"], [3, "1/3"], [4, "1/4"], [5, "1/5"], [10, "1/10"]]);
      const L = d * alea(2, 12);
      return { q: `Une figure est réduite avec le coefficient $${k}$. Un segment de $${L}$ cm mesure alors combien de centimètres ?`, r: `$${L / d}$ cm`, d: 2 };
    },
    () => {
      const k = choix([2, 3, 4, 5]);
      const A = alea(2, 12) * (pile() ? 1 : 5);
      return { q: `Une figure d’aire $${A}$ cm² est agrandie avec le coefficient $${k}$. Quelle est l’aire de l’agrandissement ?`, r: `$${A} × ${k}^2 = ${A * k * k}$ cm²`, d: 3 };
    },
    () => {
      const [o, a, b, c, e] = lettres(5);
      let p, q;
      do { q = alea(3, 8); p = alea(1, q - 1); } while (pgcd(p, q) !== 1);
      const u = alea(1, 3), w = alea(1, 4);
      return { q: `Les droites $(${a}${b})$ et $(${c}${e})$ sont parallèles. Les droites $(${a}${e})$ et $(${b}${c})$ se coupent en $${o}$, avec $${o}${a} = ${p * u}$, $${o}${e} = ${q * u}$ et $${a}${b} = ${p * w}$. Calcule $${c}${e}$.`, r: `$${c}${e} = ${q * w}$`, d: 3 };
    },
    () => {
      const e = choix([25, 50, 100, 200]);
      const H = alea(2, 30);
      return { q: `Une maquette est à l’échelle $1/${e}$. Un monument mesure $${H}$ m de haut. Quelle est la hauteur de la maquette, en cm ?`, r: `$${nb((H * 100) / e)}$ cm`, d: 2 };
    },
  ],

  // ---------------------------------------------------------------- 3e-06
  "3e-06": [
    () => {
      const [a, b, c] = lettres(3);
      const [f, num, den] = choix([["cos", `${a}${b}`, `${b}${c}`], ["sin", `${a}${c}`, `${b}${c}`], ["tan", `${a}${c}`, `${a}${b}`]]);
      const mot = { cos: "côté adjacent sur hypoténuse", sin: "côté opposé sur hypoténuse", tan: "côté opposé sur côté adjacent" }[f];
      return { q: `Le triangle $${a}${b}${c}$ est rectangle en $${a}$. Exprime $${f}(\\widehat{${a}${b}${c}})$ à l’aide des côtés.`, r: `$${f}(\\widehat{${a}${b}${c}}) = \\dfrac{${num}}{${den}}$ (${mot})`, d: 2 };
    },
    () => {
      const [a, b, c] = choix(TRIPLETS);
      const [x, y, z] = lettres(3);
      const [f, n, d, nom] = choix([
        ["cos", a, c, `${x}${y}`], ["sin", b, c, `${x}${z}`], ["tan", b, a, `${x}${z}`],
      ]);
      const cote = { cos: `${x}${y} = ${a}`, sin: `${x}${z} = ${b}`, tan: `${x}${z} = ${b}` }[f];
      return { q: `Le triangle $${x}${y}${z}$ est rectangle en $${x}$ avec $${x}${y} = ${a}$ cm, $${x}${z} = ${b}$ cm et $${y}${z} = ${c}$ cm. Donne $${f}(\\widehat{${x}${y}${z}})$ sous forme de fraction irréductible.`, r: `$${rat(n, d)}$`, d: 3 };
    },
    () => {
      const ang = choix([20, 25, 30, 35, 40, 50, 55, 60, 65]);
      const h = alea(5, 20);
      const [x, y, z] = lettres(3);
      return choix([
        { q: `Le triangle $${x}${y}${z}$ est rectangle en $${x}$, $\\widehat{${x}${y}${z}} = ${ang}°$ et $${y}${z} = ${h}$ cm. Calcule $${x}${y}$ au dixième près.`, r: `$${x}${y} = ${h} × cos(${ang}°) ≈ ${fixe(h * Math.cos(rad(ang)))}$ cm`, d: 3 },
        { q: `Le triangle $${x}${y}${z}$ est rectangle en $${x}$, $\\widehat{${x}${y}${z}} = ${ang}°$ et $${y}${z} = ${h}$ cm. Calcule $${x}${z}$ au dixième près.`, r: `$${x}${z} = ${h} × sin(${ang}°) ≈ ${fixe(h * Math.sin(rad(ang)))}$ cm`, d: 3 },
        { q: `Le triangle $${x}${y}${z}$ est rectangle en $${x}$, $\\widehat{${x}${y}${z}} = ${ang}°$ et $${x}${y} = ${h}$ cm. Calcule $${x}${z}$ au dixième près.`, r: `$${x}${z} = ${h} × tan(${ang}°) ≈ ${fixe(h * Math.tan(rad(ang)))}$ cm`, d: 3 },
      ]);
    },
    () => {
      const [a, b, c] = choix(TRIPLETS);
      const [x, y, z] = lettres(3);
      const [f, num, den, nom] = choix([["cos", a, c, "adjacent"], ["sin", b, c, "opposé"], ["tan", b, a, "opposé"]]);
      const ang = Math.round((Math.atan2(b, a) * 180) / Math.PI);
      return { q: `Le triangle $${x}${y}${z}$ est rectangle en $${x}$ avec $${x}${y} = ${a}$ cm et $${x}${z} = ${b}$ cm. Donne une valeur approchée au degré de $\\widehat{${x}${y}${z}}$ (utilise la tangente).`, r: `$tan(\\widehat{${x}${y}${z}}) = ${b}/${a}$ donc $\\widehat{${x}${y}${z}} ≈ ${ang}°$`, d: 3 };
    },
    () => {
      const [v, ex] = choix([
        ["cos(60°)", "1/2"], ["sin(30°)", "1/2"], ["tan(45°)", "1"], ["cos(30°)", "\\dfrac{sqrt(3)}{2}"],
        ["sin(60°)", "\\dfrac{sqrt(3)}{2}"], ["sin(45°)", "\\dfrac{sqrt(2)}{2}"], ["cos(45°)", "\\dfrac{sqrt(2)}{2}"], ["tan(60°)", "sqrt(3)"],
      ]);
      return { q: `Donne la valeur exacte de $${v}$.`, r: `$${ex}$`, d: 3 };
    },
    () => {
      const [a, b, c] = choix([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]);
      return { q: `Pour un angle aigu $x$, on sait que $cos(x) = ${a}/${c}$. Calcule $sin(x)$.`, r: `$sin(x) = ${b}/${c}$ (car $cos^2 + sin^2 = 1$)`, d: 3 };
    },
    () => {
      const x = alea(5, 80);
      return { q: `Complète : $sin(${x}°) = cos(\\ldots)$.`, r: `$${90 - x}°$`, d: 3 };
    },
    () => {
      const d = alea(10, 40), ang = choix([25, 30, 35, 40, 45, 50]);
      return { q: `À $${d}$ m du pied d’un arbre, on voit son sommet sous un angle de $${ang}°$. Quelle est la hauteur de l’arbre (au dixième de mètre près) ?`, r: `$${d} × tan(${ang}°) ≈ ${fixe(d * Math.tan(rad(ang)))}$ m`, d: 3 };
    },
    () => {
      const L = choix([3, 4, 5, 6]), ang = choix([60, 65, 70, 75]);
      return { q: `Une échelle de $${L}$ m forme un angle de $${ang}°$ avec le sol. À quelle hauteur touche-t-elle le mur (au dixième de mètre près) ?`, r: `$${L} × sin(${ang}°) ≈ ${fixe(L * Math.sin(rad(ang)))}$ m`, d: 3 };
    },
    () => {
      const [a, b, c] = lettres(3);
      const mot = choix([["l’hypoténuse", `[${a}${c}]`, b], ["le côté opposé à l’angle $\\widehat{" + a + c + b + "}$", `[${a}${b}]`, b]]);
      return { q: `Le triangle $${a}${b}${c}$ est rectangle en $${b}$. Quel est son côté le plus long (l’hypoténuse) ?`, r: `Le côté $[${a}${c}]$.`, d: 1 };
    },
    () => {
      const [a, b, c] = choix([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]);
      return { q: `Dans un triangle rectangle, $sin(x) = ${b}/${c}$ et $cos(x) = ${a}/${c}$. Calcule $tan(x)$.`, r: `$tan(x) = \\dfrac{sin(x)}{cos(x)} = ${b}/${a}$`, d: 3 };
    },
  ],

  // ---------------------------------------------------------------- 3e-07
  "3e-07": [
    () => {
      const n = choix([7, 9, 11, 13]);
      const v = Array.from({ length: n }, () => alea(1, 40));
      const tri = [...v].sort((a, b) => a - b);
      return { q: `Donne la médiane de cette série : ${liste(v)}.`, r: `Série rangée : ${tri.join(" ; ")}. La médiane est $${tri[(n - 1) / 2]}$.`, d: 2 };
    },
    () => {
      const n = choix([8, 10, 12]);
      const v = Array.from({ length: n }, () => alea(1, 40));
      const tri = [...v].sort((a, b) => a - b);
      const q1 = tri[Math.ceil(n / 4) - 1], q3 = tri[Math.ceil((3 * n) / 4) - 1];
      return { q: `Donne le premier et le troisième quartile de cette série : ${liste(v)}.`, r: `Série rangée : ${tri.join(" ; ")}. $Q_1 = ${q1}$ et $Q_3 = ${q3}$.`, d: 3 };
    },
    () => {
      const n = choix([8, 12]);
      const v = Array.from({ length: n }, () => alea(1, 40));
      const tri = [...v].sort((a, b) => a - b);
      const q1 = tri[Math.ceil(n / 4) - 1], q3 = tri[Math.ceil((3 * n) / 4) - 1];
      return { q: `Pour la série rangée ${liste(tri)}, calcule l’écart interquartile.`, r: `$Q_3 - Q_1 = ${q3} - ${q1} = ${q3 - q1}$`, d: 3 };
    },
    () => {
      let v, e;
      do {
        v = [alea(5, 12), alea(8, 16), alea(10, 19)];
        e = [alea(1, 6), alea(1, 6), alea(1, 6)];
      } while ((v[0] * e[0] + v[1] * e[1] + v[2] * e[2]) % (e[0] + e[1] + e[2]) !== 0 || new Set(v).size < 3);
      const total = e[0] + e[1] + e[2];
      return { q: `Dans un contrôle, $${e[0]}$ élèves ont eu $${v[0]}$, $${e[1]}$ ont eu $${v[1]}$ et $${e[2]}$ ont eu $${v[2]}$. Quelle est la moyenne de la classe ?`, r: `$(${v.map((x, i) => `${x} × ${e[i]}`).join(" + ")}) ÷ ${total} = ${(v[0] * e[0] + v[1] * e[1] + v[2] * e[2]) / total}$`, d: 3 };
    },
    () => {
      const k = alea(2, 12);
      const [somme, comb] = [k, Array.from({ length: 6 }, (_, i) => i + 1).reduce((s, a) => s + Array.from({ length: 6 }, (_, j) => j + 1).filter((b) => a + b === k).length, 0)];
      return { q: `On lance deux dés équilibrés à six faces. Quelle est la probabilité que la somme des deux faces soit $${k}$ ?`, r: `$${simpl(comb, 36)}$`, d: 3 };
    },
    () => {
      const r = alea(2, 6), b = alea(2, 5);
      const n = r + b;
      return { q: `Une urne contient $${r}$ boules rouges et $${b}$ boules bleues. On tire deux boules l’une après l’autre, sans remise. Quelle est la probabilité de tirer deux boules rouges ?`, r: `$\\dfrac{${r}}{${n}} × \\dfrac{${r - 1}}{${n - 1}} = ${rat(r * (r - 1), n * (n - 1))}$`, d: 3 };
    },
    () => {
      const r = alea(2, 6), b = alea(2, 6);
      const n = r + b;
      return { q: `Une urne contient $${r}$ boules rouges et $${b}$ boules bleues. On tire une boule, on la remet, puis on en tire une seconde. Quelle est la probabilité d’obtenir deux boules rouges ?`, r: `$\\dfrac{${r}}{${n}} × \\dfrac{${r}}{${n}} = ${rat(r * r, n * n)}$`, d: 3 };
    },
    () => {
      const pa = choix([0.1, 0.2, 0.3, 0.25, 0.15]), pb = choix([0.4, 0.5, 0.35, 0.45, 0.6]);
      return choix([
        { q: `$A$ et $B$ sont deux événements incompatibles avec $P(A) = ${dec(pa, 2)}$ et $P(B) = ${dec(pb, 2)}$. Calcule $P(A \\text{ ou } B)$.`, r: `$${dec(pa + pb, 2)}$`, d: 3 },
        { q: `La probabilité d’un événement $A$ est $${dec(pa, 2)}$. Quelle est la probabilité de l’événement contraire ?`, r: `$${dec(1 - pa, 2)}$`, d: 2 },
      ]);
    },
    () => {
      const [e1, p1, d1] = choix([["« pile »", 1, 2], ["« face »", 1, 2]]);
      const [e2, p2, d2] = choix([["un 6", 1, 6], ["un nombre pair", 1, 2], ["un multiple de 3", 1, 3], ["un nombre supérieur à 4", 1, 3], ["un nombre impair", 1, 2]]);
      return { q: `On lance une pièce équilibrée et un dé équilibré à six faces. Quelle est la probabilité d’obtenir ${e1} et ${e2} ?`, r: `$${rat(p1 * p2, d1 * d2)}$`, d: 3 };
    },
    () => {
      const N = choix([30, 60, 80, 120, 150, 200, 250]);
      const k = alea(5, N - 5);
      return { q: `Sur $${N}$ élèves interrogés, $${k}$ préfèrent les mathématiques. Quelle est la fréquence en pourcentage, arrondie au dixième ?`, r: `$${k}/${N} ≈ ${fixe((100 * k) / N)}\\,\\%$`, d: 3 };
    },
    () => {
      const n = alea(5, 8);
      const v = Array.from({ length: n }, () => alea(1, 30));
      const moy = v.reduce((s, x) => s + x, 0) / n;
      return { q: `Calcule la moyenne de cette série, arrondie au dixième : ${liste(v)}.`, r: `$${fixe(moy)}$`, d: 3 };
    },
  ],

  // ---------------------------------------------------------------- 3e-08
  "3e-08": [
    () => {
      const x = relatif(-8, 8), y = relatif(-8, 8), a = relatif(-6, 6), b = relatif(-6, 6);
      const [p] = lettres(1);
      return { q: `Dans un repère, on applique la translation de vecteur $(${a} ; ${b})$ au point $${p}(${x} ; ${y})$. Quelles sont les coordonnées de son image $${p}'$ ?`, r: `$${p}'(${x + a} ; ${y + b})$`, d: 3 };
    },
    () => {
      const x = relatif(-8, 8), y = relatif(-8, 8);
      const [angle, nom, img] = choix([
        ["90°", "de centre $O$, d’angle $90°$ dans le sens direct (anti-horaire)", `(${-y} ; ${x})`],
        ["180°", "de centre $O$ et d’angle $180°$", `(${-x} ; ${-y})`],
        ["-90°", "de centre $O$, d’angle $90°$ dans le sens horaire", `(${y} ; ${-x})`],
      ]);
      const [p] = lettres(1);
      return { q: `Dans un repère d’origine $O$, quelle est l’image du point $${p}(${x} ; ${y})$ par la rotation ${nom} ?`, r: `$${img}$`, d: 3 };
    },
    () => {
      const k = choix([2, 3, -1, -2, 4]);
      const x = relatif(-6, 6), y = relatif(-6, 6);
      const [p] = lettres(1);
      return { q: `Dans un repère d’origine $O$, on applique l’homothétie de centre $O$ et de rapport $${k}$ au point $${p}(${x} ; ${y})$. Donne les coordonnées de l’image.`, r: `$(${k * x} ; ${k * y})$`, d: 3 };
    },
    () => {
      const r = alea(1, 9);
      return { q: `Donne la valeur exacte du volume d’une boule de rayon $${r}$ cm.`, r: `$\\dfrac{4}{3} × π × ${r}^3 = ${rat(4 * r ** 3, 3)}π$ cm³`, d: 3 };
    },
    () => {
      const r = alea(2, 15);
      return { q: `Donne la valeur exacte de l’aire d’une sphère de rayon $${r}$ cm.`, r: `$4 × π × ${r}^2 = ${4 * r * r}π$ cm²`, d: 3 };
    },
    () => {
      const [a, b, c] = [alea(3, 12), alea(3, 12), alea(3, 12)];
      const [face, d1, d2] = choix([["ABCD", a, b], ["ABFE", a, c], ["ADHE", b, c]]);
      return { q: `On coupe un pavé droit de dimensions $${a}$ cm, $${b}$ cm et $${c}$ cm par un plan parallèle à une face de dimensions $${d1}$ cm et $${d2}$ cm. Quelle est la nature de la section, et quelles sont ses dimensions ?`, r: `Un rectangle de $${d1}$ cm sur $${d2}$ cm.`, d: 3 };
    },
    () => {
      const k = choix([2, 3, 4, 5]);
      const V = alea(2, 12) * (pile() ? 1 : 3);
      return { q: `Un cône de volume $${V}$ cm³ est agrandi avec un coefficient $${k}$. Quel est le volume du cône obtenu ?`, r: `$${V} × ${k}^3 = ${V * k ** 3}$ cm³`, d: 3 };
    },
    () => {
      const k = choix([2, 3, 4, 5]);
      return choix([
        { q: `Une homothétie de rapport $${k}$ multiplie les longueurs par combien ? Et les aires ?`, r: `Les longueurs par $${k}$ et les aires par $${k * k}$.`, d: 3 },
        { q: `Une homothétie de rapport $1/${k}$ multiplie les longueurs par combien ? Et les aires ?`, r: `Les longueurs par $1/${k}$ et les aires par $1/${k * k}$.`, d: 3 },
      ]);
    },
    () => {
      const n = choix([3, 4, 5, 6, 8, 9, 10, 12]);
      return { q: `Quel est le plus petit angle de rotation (de centre le centre du polygone) qui transforme un polygone régulier à $${n}$ côtés en lui-même ?`, r: `$360° ÷ ${n} = ${nb(360 / n)}°$`, d: 3 };
    },
    () => {
      const r = alea(2, 9), h = alea(3, 12);
      return choix([
        { q: `Donne l’arrondi à l’unité du volume d’un cône de rayon $${r}$ cm et de hauteur $${h}$ cm.`, r: `$\\dfrac{1}{3} × π × ${r}^2 × ${h} ≈ ${nb(Math.round((Math.PI * r * r * h) / 3))}$ cm³`, d: 3 },
        { q: `Donne l’arrondi à l’unité du volume d’une boule de rayon $${r}$ cm.`, r: `$\\dfrac{4}{3} × π × ${r}^3 ≈ ${nb(Math.round((4 * Math.PI * r ** 3) / 3))}$ cm³`, d: 3 },
      ]);
    },
    () => {
      const [mot, conserve] = choix([
        ["Une translation", "les longueurs, les angles et les aires"],
        ["Une rotation", "les longueurs, les angles et les aires"],
        ["Une symétrie axiale", "les longueurs, les angles et les aires"],
        ["Une symétrie centrale", "les longueurs, les angles et les aires"],
      ]);
      return { q: `${mot} conserve-t-elle les longueurs, les angles et les aires ?`, r: `Oui : elle conserve ${conserve}.`, d: 2 };
    },
  ],

  // ---------------------------------------------------------------- 3e-09
  "3e-09": [
    () => {
      const [p1, p2] = choix([[10, 10], [20, 20], [50, 50], [25, 25], [10, 20], [20, 10], [50, 20], [30, 30]]);
      const c = (1 + p1 / 100) * (1 - p2 / 100);
      const v = (c - 1) * 100;
      return { q: `Un prix augmente de $${p1}\\,\\%$ puis baisse de $${p2}\\,\\%$. Quelle est l’évolution globale en pourcentage ?`, r: `$${dec(1 + p1 / 100, 2)} × ${dec(1 - p2 / 100, 2)} = ${dec(c, 4)}$, soit ${v >= 0 ? "une hausse" : "une baisse"} de $${dec(Math.abs(v), 2)}\\,\\%$`, d: 3 };
    },
    () => {
      const p = choix([10, 20, 25, 50]);
      const P0 = choix([40, 60, 80, 100, 120, 160, 200, 240]);
      return { q: `Après une baisse de $${p}\\,\\%$, un article coûte $${nb(P0 * (1 - p / 100))}$ €. Quel était son prix initial ?`, r: `$${nb(P0 * (1 - p / 100))} ÷ ${dec(1 - p / 100, 2)} = ${P0}$ €`, d: 3 };
    },
    () => {
      const b = choix([2, 3, 4, 5]), d = choix([2, 3, 4, 5, 6]);
      const a = alea(1, b - 1) || 1, c = alea(1, 3), e = alea(2, 4);
      // a/b - c/d × e
      const total = a * d - c * e * b;
      return { q: `Calcule : $${a}/${b} - ${c}/${d} × ${e}$.`, r: `$${rat(a * d - c * e * b, b * d)}$`, d: 3 };
    },
    () => {
      const a = relatif(-6, 6), b = relatif(-6, 6), c = relatif(-6, 6), e = alea(1, 9);
      return { q: `Calcule : $${entreParentheses(a)}^2 - ${entreParentheses(b)} × ${entreParentheses(c)} + ${e}$.`, r: `$${a * a - b * c + e}$`, d: 3 };
    },
    () => {
      const [a, b] = choix([[4, 3], [2, 3], [3, 4], [5, 2], [6, 3], [2, 6], [8, 3], [9, 2]]);
      const m = alea(3, 6), n = alea(-4, -1);
      let c = a * b, e = m + n;
      if (c >= 10) { c /= 10; e += 1; }
      return { q: `Donne l’écriture scientifique de $(${a} × 10^{${m}}) × (${b} × 10^{${n}})$.`, r: `$${dec(c, 2)} × 10^{${e}}$`, d: 3 };
    },
    () => {
      const N = choix([200, 300, 400, 500, 600, 800, 1000, 1200]);
      const p = choix([5, 10, 15, 20, 25, 30, 35, 40, 45]);
      const [lieu, qui] = choix([["un collège", "élèves"], ["un lycée", "élèves"], ["une ville", "habitants"]]);
      return { q: `Dans ${lieu}, $${nb(N)}$ ${qui} sont inscrits et $${p}\\,\\%$ d’entre eux sont demi-pensionnaires. Combien cela fait-il de demi-pensionnaires ?`, r: `$${nb((N * p) / 100)}$`, d: 2 };
    },
    () => {
      const base = choix([20, 40, 60, 80, 100, 200, 400]);
      const p = choix([5, 10, 15, 20, 25, 30, 40, 50, 60]);
      return { q: `Une quantité passe de $${base}$ à $${nb(base * (1 + p / 100))}$. Quel est le taux d’évolution en pourcentage ?`, r: `$\\dfrac{${nb(base * (1 + p / 100))} - ${base}}{${base}} = ${dec(p / 100, 2)}$, soit $${p}\\,\\%$`, d: 3 };
    },
    () => {
      const C = choix([500, 1000, 1500, 2000, 2500, 5000]);
      const t = choix([1, 2, 2.5, 3, 4]);
      return { q: `On place $${nb(C)}$ € sur un livret à $${dec(t, 1)}\\,\\%$ par an. Quel est le montant des intérêts au bout d’un an ?`, r: `$${nb(C)} × ${dec(t / 100, 3)} = ${nb((C * t) / 100)}$ €`, d: 3 };
    },
    () => {
      const a = alea(1, 4), b = alea(1, 4), c = alea(2, 6);
      return { q: `Calcule : $10^{${a}} × 10^{-${b}} ÷ 10^{-${c}}$.`, r: `$10^{${a - b + c}} = ${nb(10 ** (a - b + c), 6)}$`, d: 3 };
    },
    () => {
      const [a, b] = choix([[1, 3], [2, 3], [1, 6], [5, 6], [1, 7], [2, 7], [3, 7], [1, 9], [4, 9], [5, 9], [1, 11], [3, 11], [5, 12]]);
      return { q: `Donne l’arrondi au centième de $${a}/${b}$.`, r: `$${a}/${b} ≈ ${dec(Math.round((a / b) * 100) / 100, 2)}$`, d: 2 };
    },
    () => {
      const HT = choix([50, 100, 150, 200, 250, 300, 500]);
      const p = choix([10, 20]);
      return { q: `Un article coûte $${HT}$ € hors taxes et $${nb(HT * (1 + p / 100))}$ € toutes taxes comprises. Quel est le taux de TVA ?`, r: `$${p}\\,\\%$`, d: 3 };
    },
    () => {
      const [a, b, c] = [alea(2, 9), alea(2, 9), alea(2, 9)];
      return { q: `Calcule : $${a} + ${b} × (${c} - ${c + 2}) ^ 2$.`.replace(" ^ 2", "^2"), r: `$${a + b * 4}$`, d: 3 };
    },
  ],
};
