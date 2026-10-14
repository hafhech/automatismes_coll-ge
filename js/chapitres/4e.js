// Générateurs de questions, 4e.

import {
  alea, choix, pile, dec, melanger, pgcd, ppcm, fraction, simpl, lettres, liste, nb, milliers,
  entreParentheses, coef, terme, affine, duree, U, fixe,
} from "../outils.js";

const relatif = (min, max) => { let n = 0; while (n === 0) n = alea(min, max); return n; };

// Fraction irréductible avec son signe : (-6, 8) -> « -3/4 ».
function rat(n, d) {
  if (d < 0) { n = -n; d = -d; }
  const g = pgcd(Math.abs(n), d) || 1;
  const a = n / g, b = d / g;
  return b === 1 ? String(a) : `${a}/${b}`;
}
function ratProduit(a, b, c, d) { return rat(a * c, b * d); }
function ratSomme(a, b, c, d) { const m = ppcm(b, d); return rat(a * (m / b) + c * (m / d), m); }

const TRIPLETS = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41], [6, 8, 10]];
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

// Fraction propre irréductible [numérateur, dénominateur].
function fr() {
  let a, b;
  do { b = alea(2, 9); a = alea(1, b - 1); } while (pgcd(a, b) !== 1);
  return [a, b];
}

function triplet(kMax = 4) {
  const [a, b, c] = choix(TRIPLETS);
  const k = alea(1, Math.max(1, Math.min(kMax, Math.floor(60 / c))));
  return [a * k, b * k, c * k];
}

export default {
  // ---------------------------------------------------------------- 4e-01
  "4e-01": [
    () => {
      const a = relatif(-12, 12), b = relatif(-12, 12);
      return { q: `Calcule : $${entreParentheses(a)} × ${entreParentheses(b)}$.`, r: `$${a * b}$`, d: Math.abs(a) < 6 && Math.abs(b) < 6 ? 1 : 2 };
    },
    () => {
      const b = relatif(-12, 12), q = relatif(-12, 12);
      return { q: `Calcule : $${entreParentheses(b * q)} ÷ ${entreParentheses(b)}$.`, r: `$${q}$`, d: 2 };
    },
    () => {
      const n = alea(3, 5);
      const f = Array.from({ length: n }, () => relatif(-9, 9));
      const negatifs = f.filter((x) => x < 0).length;
      return {
        q: `Sans calculer, donne le signe du produit : $${f.map(entreParentheses).join(" × ")}$.`,
        r: `${negatifs % 2 === 0 ? "Positif" : "Négatif"} : il y a ${negatifs} facteur${negatifs > 1 ? "s" : ""} négatif${negatifs > 1 ? "s" : ""}.`,
        d: 2,
      };
    },
    () => {
      const a = relatif(-9, 9), b = relatif(-9, 9), c = relatif(-9, 9);
      return { q: `Calcule : $${a} + ${entreParentheses(b)} × ${entreParentheses(c)}$.`, r: `$${a + b * c}$`, d: 3 };
    },
    () => {
      const a = relatif(-9, 9), b = relatif(-9, 9), c = relatif(-9, 9);
      return { q: `Calcule : $${entreParentheses(a)} × (${b} + ${entreParentheses(c)})$.`, r: `$${a * (b + c)}$`, d: 3 };
    },
    () => {
      const t = Array.from({ length: alea(4, 5) }, () => relatif(-15, 15));
      const ecrit = t.map((x, i) => (i === 0 ? String(x) : x < 0 ? `- ${-x}` : `+ ${x}`)).join(" ");
      return { q: `Calcule : $${ecrit}$.`, r: `$${t.reduce((s, x) => s + x, 0)}$`, d: 2 };
    },
    () => {
      const a = relatif(-9, 9), b = relatif(-9, 9);
      return { q: `Complète : $${entreParentheses(a)} × \\ldots = ${a * b}$.`, r: `$${b}$`, d: 2 };
    },
    () => {
      const v = alea(2, 6), n = alea(2, 8);
      return { q: `Chaque heure la température baisse de $${v}$ °C. De combien a-t-elle varié au bout de $${n}$ heures ?`, r: `$${n} × (-${v}) = ${-n * v}$ °C`, d: 2 };
    },
    () => {
      const a = relatif(-9, -1), b = relatif(1, 9), c = relatif(-9, 9);
      return { q: `Calcule : $${a} × (${b} - ${entreParentheses(c)})$.`, r: `$${a * (b - c)}$`, d: 3 };
    },
    () => {
      const a = relatif(-12, 12), b = relatif(-12, 12);
      return choix([
        { q: `Quel est le signe de $${entreParentheses(a)} × ${entreParentheses(b)}$ ?`, r: a * b > 0 ? "Positif." : "Négatif.", d: 1 },
        { q: `Le quotient $${entreParentheses(a * b)} ÷ ${entreParentheses(b)}$ est-il positif ou négatif ?`, r: a > 0 ? "Positif." : "Négatif.", d: 2 },
      ]);
    },
  ],

  // ---------------------------------------------------------------- 4e-02
  "4e-02": [
    () => {
      const [b, d] = choix([[2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [5, 6], [3, 7], [4, 9], [5, 8], [2, 9], [6, 7]]);
      const a = alea(1, b - 1), c = alea(1, d - 1);
      const plus = pile();
      return { q: `Calcule : $${a}/${b} ${plus ? "+" : "-"} ${c}/${d}$.`, r: `$${plus ? ratSomme(a, b, c, d) : ratSomme(a, b, -c, d)}$`, d: 3 };
    },
    () => {
      const [a, b] = fr(), [c, d] = fr();
      return { q: `Calcule : $${a}/${b} × ${c}/${d}$.`, r: `$${ratProduit(a, b, c, d)}$`, d: 2 };
    },
    () => {
      const [a, b] = fr(), [c, d] = fr();
      return { q: `Calcule : $${a}/${b} ÷ ${c}/${d}$.`, r: `$${ratProduit(a, b, d, c)}$`, d: 3 };
    },
    () => {
      const [e, tex] = choix([[alea(2, 9), null], [null, "frac"], [null, "dec"]]);
      if (e) return { q: `Quel est l’inverse de $${e}$ ?`, r: `$1/${e}$`, d: 2 };
      if (tex === "frac") {
        const a = alea(1, 9), b = alea(2, 9);
        const g = pgcd(a, b);
        return { q: `Quel est l’inverse de $${a / g}/${b / g}$ ?`, r: `$${rat(b / g, a / g)}$`, d: 2 };
      }
      const [x, inv] = choix([[0.5, 2], [0.25, 4], [0.2, 5], [0.1, 10], [0.125, 8], [0.4, "5/2"]]);
      return { q: `Quel est l’inverse de $${dec(x, 3)}$ ?`, r: `$${inv}$`, d: 3 };
    },
    () => {
      const a = alea(1, 5), b = alea(2, 7), c = alea(1, 5), d = alea(2, 7);
      return { q: `Calcule $${a}/${b}$ de $${c}/${d}$.`, r: `$${ratProduit(a, b, c, d)}$`, d: 3 };
    },
    () => {
      const [a, b, c, d, e, f] = [1, alea(2, 4), 1, alea(2, 5), alea(1, 3), alea(2, 5)];
      // a/b + c/d × e/f
      const produit = [c * e, d * f];
      const m = ppcm(b, produit[1]);
      const total = a * (m / b) + produit[0] * (m / produit[1]);
      return { q: `Calcule : $${a}/${b} + ${c}/${d} × ${e}/${f}$.`, r: `$${rat(total, m)}$`, d: 3 };
    },
    () => {
      const n = alea(2, 9), [a, b] = fr();
      return { q: `Calcule : $${n} - ${a}/${b}$.`, r: `$${rat(n * b - a, b)}$`, d: 2 };
    },
    () => {
      const d = choix([2, 3, 4, 5, 8]);
      const n = alea(2, 12);
      return { q: `Avec $${n}$ L d’eau, combien de verres de $1/${d}$ L peut-on remplir ?`, r: `$${n} ÷ 1/${d} = ${n * d}$ verres`, d: 3 };
    },
    () => {
      const [a, b] = [alea(1, 8), alea(2, 9)];
      const [c, d] = [alea(1, 8), alea(2, 9)];
      if (a * d === b * c || a >= b || c >= d) return { q: `Compare $3/4$ et $5/7$.`, r: `$3/4 > 5/7$`, d: 3 };
      return { q: `Compare $${a}/${b}$ et $${c}/${d}$.`, r: `$${a}/${b} ${a * d < b * c ? "<" : ">"} ${c}/${d}$`, d: 3 };
    },
    () => {
      const [a, b] = fr(), [c, d] = fr();
      const sa = pile() ? -a : a;
      return { q: `Calcule : $${sa}/${b} + (-${c}/${d})$.`, r: `$${ratSomme(sa, b, -c, d)}$`, d: 3 };
    },
    () => {
      const [b, d] = choix([[3, 5], [2, 5], [3, 4], [4, 5], [2, 7]]);
      const sport = choix(["football", "basket", "natation", "judo"]);
      return { q: `Dans une classe, $1/${b}$ des élèves font du ${sport} et $1/${d}$ font du tennis (aucun élève ne fait les deux). Quelle fraction de la classe cela représente-t-il ?`, r: `$${ratSomme(1, b, 1, d)}$`, d: 3 };
    },
  ],

  // ---------------------------------------------------------------- 4e-03
  "4e-03": [
    () => {
      const a = alea(2, 5), n = alea(2, a === 5 ? 3 : 4);
      return { q: `Calcule : $${a}^${n}$.`, r: `$${a ** n}$`, d: 1 };
    },
    () => {
      const a = alea(2, 5), n = alea(2, 4);
      return { q: `Calcule : $(-${a})^${n}$.`, r: `$${(-a) ** n}$`, d: 3 };
    },
    () => {
      const n = alea(-4, 6);
      const v = 10 ** n;
      return choix([
        { q: `Écris $10^{${n}}$ sous forme décimale.`, r: `$${dec(v, 6)}$`, d: 2 },
        { q: `Écris $${n >= 0 ? milliers(v) : dec(v, 6)}$ sous la forme d’une puissance de $10$.`, r: `$10^{${n}}$`, d: 2 },
      ]);
    },
    () => {
      const a = alea(2, 9), m = alea(2, 9), n = alea(2, 9);
      return { q: `Écris sous la forme d’une seule puissance : $${a}^{${m}} × ${a}^{${n}}$.`, r: `$${a}^{${m + n}}$`, d: 2 };
    },
    () => {
      const a = alea(2, 9), n = alea(2, 6), m = n + alea(1, 6);
      return { q: `Écris sous la forme d’une seule puissance : $${a}^{${m}} ÷ ${a}^{${n}}$.`, r: `$${a}^{${m - n}}$`, d: 3 };
    },
    () => {
      const a = alea(2, 9), m = alea(2, 5), n = alea(2, 5);
      return { q: `Écris sous la forme d’une seule puissance : $(${a}^{${m}})^{${n}}$.`, r: `$${a}^{${m * n}}$`, d: 3 };
    },
    () => {
      const a = alea(2, 6), n = alea(1, 4);
      return { q: `Écris $${a}^{-${n}}$ sous la forme d’une fraction.`, r: `$1/${a ** n}$`, d: 3 };
    },
    () => {
      const m = alea(11, 99) / 10;
      const e = alea(2, 6);
      return choix([
        { q: `Écris $${nb(m * 10 ** e)}$ en notation scientifique.`, r: `$${dec(m, 1)} × 10^{${e}}$`, d: 3 },
        { q: `Écris $${dec(m * 10 ** -e - 0, 9)}$ en notation scientifique.`, r: `$${dec(m, 1)} × 10^{-${e}}$`, d: 3 },
      ]);
    },
    () => {
      const x = alea(11, 99) / 10;
      const e = alea(1, 4);
      return { q: `Calcule : $${dec(x, 1)} × 10^{${e}}$.`, r: `$${nb(x * 10 ** e)}$`, d: 2 };
    },
    () => {
      const a = alea(2, 5), b = alea(2, 4);
      return { q: `Calcule : $${a}^3 + ${b}^2$.`, r: `$${a ** 3 + b ** 2}$`, d: 2 };
    },
    () => {
      const n = alea(2, 15);
      return choix([
        { q: `Calcule : $${n}^2$.`, r: `$${n * n}$`, d: 1 },
        { q: `Calcule : $${Math.min(n, 9)}^3$.`, r: `$${Math.min(n, 9) ** 3}$`, d: 2 },
      ]);
    },
    () => {
      const m = alea(-5, 6), n = alea(-5, 6);
      return { q: `Écris sous la forme d’une seule puissance de $10$ : $10^{${m}} × 10^{${n}}$.`, r: `$10^{${m + n}}$`, d: 3 };
    },
    () => {
      const [a, m, b, n] = choix([[2, 5, 5, 2], [2, 6, 6, 2], [3, 3, 2, 5], [2, 4, 4, 2], [3, 4, 4, 3], [2, 3, 3, 2], [2, 7, 7, 2]]);
      return { q: `Compare $${a}^${m}$ et $${b}^${n}$.`, r: `$${a}^${m} = ${a ** m}$ et $${b}^${n} = ${b ** n}$, donc $${a}^${m} ${a ** m > b ** n ? ">" : a ** m < b ** n ? "<" : "="} ${b}^${n}$.`, d: 3 };
    },
  ],

  // ---------------------------------------------------------------- 4e-04
  "4e-04": [
    () => {
      const a = alea(2, 9), b = relatif(-9, 9), x = relatif(-6, 6);
      return { q: `Calcule $${affine(a, b)}$ pour $x = ${x}$.`, r: `$${a * x + b}$`, d: 2 };
    },
    () => {
      const k = alea(2, 9), a = alea(1, 6), b = relatif(-9, 9);
      return { q: `Développe : $${k}(${affine(a, b)})$.`, r: `$${affine(k * a, k * b)}$`, d: 3 };
    },
    () => {
      const a = alea(2, 7), b = alea(2, 9), c = alea(1, a - 1), d = relatif(-9, 9);
      return { q: `Réduis : $${a}x + ${b} - ${coef(c)} ${terme(d)}$.`, r: `$${affine(a - c, b + d)}$`, d: 3 };
    },
    () => {
      const x = relatif(-9, 9), a = alea(2, 9), b = relatif(-9, 9);
      return { q: `Résous : $${affine(a, b)} = ${a * x + b}$.`, r: `$x = ${x}$`, d: 2 };
    },
    () => {
      const x = relatif(-12, 12), a = relatif(-12, 12);
      return choix([
        { q: `Résous : $x ${terme(a)} = ${x + a}$.`, r: `$x = ${x}$`, d: 1 },
        { q: `Résous : $${a > 0 ? a : -a}x = ${(a > 0 ? a : -a) * x}$.`, r: `$x = ${x}$`, d: 1 },
      ]);
    },
    () => {
      const x = relatif(-9, 9);
      const a = alea(3, 9), c = alea(1, a - 1);
      const b = relatif(-9, 9);
      const d = a * x + b - c * x;
      return { q: `Résous : $${affine(a, b)} = ${affine(c, d)}$.`, r: `$x = ${x}$`, d: 3 };
    },
    () => {
      const x = alea(2, 15), a = alea(2, 6), b = alea(1, 12);
      return { q: `Je pense à un nombre, je le multiplie par $${a}$ puis j’ajoute $${b}$. Je trouve $${a * x + b}$. Quel est ce nombre ?`, r: `$${x}$`, d: 3 };
    },
    () => {
      const a = alea(2, 7), b = relatif(-9, 9), x = relatif(-5, 6);
      const rhs = pile() ? a * x + b : a * x + b + alea(1, 5);
      const oui = a * x + b === rhs;
      return {
        q: `Le nombre $${x}$ est-il solution de l’équation $${affine(a, b)} = ${rhs}$ ?`,
        r: oui ? `Oui : $${a} × ${entreParentheses(x)} ${terme(b)} = ${rhs}$.` : `Non : on obtient $${a * x + b}$ et non $${rhs}$.`,
        d: 3,
      };
    },
    () => {
      const a = relatif(-6, 6), b = relatif(-6, 6);
      return { q: `Développe et réduis : $(x ${terme(a)})(x ${terme(b)})$.`, r: `$${poly(1, a + b, a * b)}$`, d: 3 };
    },
    () => {
      let a, b;
      do { a = alea(1, 5); b = alea(1, 9); } while (pgcd(a, b) !== 1);
      const k = alea(2, 6);
      return { q: `Factorise : $${k * a}x + ${k * b}$.`, r: `$${k}(${affine(a, b)})$`, d: 3 };
    },
    () => {
      const a = alea(1, 9), b = alea(2, 9);
      return { q: `Un rectangle a pour longueur $x + ${a}$ et pour largeur $x$. Écris son périmètre sous forme réduite.`, r: `$2(x + ${a} + x) = ${affine(4, 2 * a)}$`, d: 3 };
    },
    () => {
      const a = alea(2, 6), b = alea(1, 12), x = alea(2, 9);
      return { q: `Programme de calcul : choisir un nombre, le multiplier par $${a}$, puis ajouter $${b}$. Quel est le résultat avec $${x}$ ?`, r: `$${a * x + b}$`, d: 2 };
    },
  ],

  // ---------------------------------------------------------------- 4e-05
  "4e-05": [
    () => {
      const [a, b, c] = triplet();
      const [x, y, z] = lettres(3);
      return { q: `Le triangle $${x}${y}${z}$ est rectangle en $${x}$ avec $${x}${y} = ${a}$ cm et $${x}${z} = ${b}$ cm. Calcule $${y}${z}$.`, r: `$${y}${z}^2 = ${a}^2 + ${b}^2 = ${a * a + b * b}$, donc $${y}${z} = ${c}$ cm`, d: 2 };
    },
    () => {
      const [a, b, c] = triplet();
      const [x, y, z] = lettres(3);
      return { q: `Le triangle $${x}${y}${z}$ est rectangle en $${x}$ avec $${y}${z} = ${c}$ cm et $${x}${y} = ${a}$ cm. Calcule $${x}${z}$.`, r: `$${x}${z}^2 = ${c}^2 - ${a}^2 = ${c * c - a * a}$, donc $${x}${z} = ${b}$ cm`, d: 3 };
    },
    () => {
      const [a, b, c] = triplet(3);
      const [x, y, z] = lettres(3);
      const ok = pile();
      const cc = ok ? c : c + alea(1, 2);
      return {
        q: `Le triangle $${x}${y}${z}$ a pour côtés $${x}${y} = ${a}$ cm, $${x}${z} = ${b}$ cm et $${y}${z} = ${cc}$ cm. Est-il rectangle ?`,
        r: ok ? `Oui : $${a}^2 + ${b}^2 = ${a * a + b * b} = ${c}^2$, il est rectangle en $${x}$.` : `Non : $${a}^2 + ${b}^2 = ${a * a + b * b}$ et $${cc}^2 = ${cc * cc}$, ce n’est pas égal.`,
        d: 3,
      };
    },
    () => {
      const [a, b] = choix([[1, 1], [1, 2], [2, 3], [1, 3], [2, 2], [1, 4], [3, 3], [2, 4], [1, 5], [3, 5]]);
      const [x, y, z] = lettres(3);
      return { q: `Le triangle $${x}${y}${z}$ est rectangle en $${x}$ avec $${x}${y} = ${a}$ cm et $${x}${z} = ${b}$ cm. Donne la valeur exacte de $${y}${z}$.`, r: `$${y}${z} = sqrt(${a * a + b * b})$ cm`, d: 3 };
    },
    () => {
      const n = alea(2, 15);
      return choix([
        { q: `Calcule : $${n}^2$.`, r: `$${n * n}$`, d: 1 },
        { q: `Calcule : $sqrt(${n * n})$.`, r: `$${n}$`, d: 1 },
      ]);
    },
    () => {
      const [a, b, c] = triplet(3);
      const [x, y, z, t] = lettres(4);
      return { q: `Un rectangle $${x}${y}${z}${t}$ mesure $${a}$ cm sur $${b}$ cm. Calcule la longueur de sa diagonale.`, r: `$${c}$ cm`, d: 3 };
    },
    () => {
      const [x, y, z] = lettres(3);
      const [r, a, b] = choix([[x, y, z], [y, x, z], [z, x, y]]);
      return { q: `Le triangle $${x}${y}${z}$ est rectangle en $${r}$. Écris l’égalité de Pythagore.`, r: `$${a}${b}^2 = ${r}${a}^2 + ${r}${b}^2$`, d: 2 };
    },
    () => {
      const [x, y, z] = lettres(3);
      return { q: `Le triangle $${x}${y}${z}$ est rectangle en $${y}$. Comment s’appelle son hypoténuse ?`, r: `Le côté $[${x}${z}]$, opposé à l’angle droit.`, d: 1 };
    },
    () => {
      const [a, b, c] = triplet(2);
      return { q: `Une échelle de $${c}$ m est posée contre un mur. Son pied est à $${a}$ m du mur. À quelle hauteur touche-t-elle le mur ?`, r: `$${b}$ m`, d: 3 };
    },
    () => {
      const c = alea(2, 12);
      return { q: `Donne la valeur exacte de la diagonale d’un carré de côté $${c}$ cm.`, r: `$${c}sqrt(2)$ cm`, d: 3 };
    },
    () => {
      const a = alea(3, 12), b = alea(3, 12);
      const [x, y, z] = lettres(3);
      return { q: `Dans le triangle $${x}${y}${z}$ rectangle en $${x}$, $${x}${y} = ${a}$ et $${x}${z} = ${b}$. Calcule $${x}${y}^2 + ${x}${z}^2$.`, r: `$${a * a} + ${b * b} = ${a * a + b * b}$`, d: 1 };
    },
  ],

  // ---------------------------------------------------------------- 4e-06
  "4e-06": [
    () => {
      const [a, b, c] = lettres(3);
      return choix([
        { q: `Le triangle $${a}${b}${c}$ est rectangle en $${a}$. Exprime $cos(\\widehat{${a}${b}${c}})$ à l’aide des côtés.`, r: `$cos(\\widehat{${a}${b}${c}}) = \\dfrac{${a}${b}}{${b}${c}}$ (côté adjacent sur hypoténuse)`, d: 2 },
        { q: `Le triangle $${a}${b}${c}$ est rectangle en $${a}$. Exprime $cos(\\widehat{${a}${c}${b}})$ à l’aide des côtés.`, r: `$cos(\\widehat{${a}${c}${b}}) = \\dfrac{${a}${c}}{${b}${c}}$ (côté adjacent sur hypoténuse)`, d: 2 },
      ]);
    },
    () => {
      const [a, b, c] = triplet(3);
      const [x, y, z] = lettres(3);
      return { q: `Le triangle $${x}${y}${z}$ est rectangle en $${x}$ avec $${x}${y} = ${a}$ cm et $${y}${z} = ${c}$ cm. Donne $cos(\\widehat{${x}${y}${z}})$ sous forme de fraction irréductible.`, r: `$${fraction(a, c)}$`, d: 3 };
    },
    () => {
      const [a, c] = choix([[3, 5], [4, 5], [6, 10], [8, 10], [7, 25], [24, 25], [12, 15], [9, 15], [16, 20], [12, 20]]);
      const [x, y, z] = lettres(3);
      return { q: `Dans le triangle $${x}${y}${z}$ rectangle en $${x}$, $${x}${y} = ${a}$ cm et $${y}${z} = ${c}$ cm. Calcule $cos(\\widehat{${x}${y}${z}})$ sous forme décimale.`, r: `$${dec(a / c, 3)}$`, d: 3 };
    },
    () => {
      const cs = choix([0.5, 0.6, 0.8, 0.25, 0.4, 0.75]);
      const h = choix([4, 8, 12, 16, 20, 40]);
      const [x, y, z] = lettres(3);
      return { q: `Le triangle $${x}${y}${z}$ est rectangle en $${x}$, $cos(\\widehat{${x}${y}${z}}) = ${dec(cs, 2)}$ et $${y}${z} = ${h}$ cm. Calcule $${x}${y}$.`, r: `$${x}${y} = ${dec(cs, 2)} × ${h} = ${dec(cs * h, 2)}$ cm`, d: 3 };
    },
    () => {
      const c = alea(1, 9) / 10;
      const ang = Math.round((Math.acos(c) * 180) / Math.PI);
      return { q: `À la calculatrice, quel est l’arrondi au degré de l’angle $x$ tel que $cos(x) = ${dec(c, 1)}$ ?`, r: `$x ≈ ${ang}°$`, d: 3 };
    },
    () => {
      const ang = alea(2, 17) * 5;
      return { q: `À la calculatrice, donne l’arrondi au centième de $cos(${ang}°)$.`, r: `$${fixe(Math.cos((ang * Math.PI) / 180), 2)}$`, d: 3 };
    },
    () => {
      const [g, m] = lettres(2);
      const k = alea(2, 12);
      return { q: `Dans un triangle, $${g}$ est le centre de gravité et $${m}$ le milieu du côté opposé au sommet $A$. La médiane $[A${m}]$ mesure $${3 * k}$ cm. Calcule $A${g}$.`, r: `$A${g} = \\dfrac{2}{3} × ${3 * k} = ${2 * k}$ cm`, d: 3 };
    },
    () => {
      const [a, b, c, o] = lettres(4);
      const r = alea(2, 12);
      return { q: `$${o}$ est le centre du cercle circonscrit au triangle $${a}${b}${c}$ et $${o}${a} = ${r}$ cm. Combien mesurent $${o}${b}$ et $${o}${c}$ ?`, r: `$${o}${b} = ${o}${c} = ${r}$ cm`, d: 2 };
    },
    () => {
      const [a, b, c] = lettres(3);
      const [mot, nom] = choix([
        ["des trois médiatrices", "le centre du cercle circonscrit"],
        ["des trois hauteurs", "l’orthocentre"],
        ["des trois médianes", "le centre de gravité"],
        ["des trois bissectrices", "le centre du cercle inscrit"],
      ]);
      return { q: `Dans le triangle $${a}${b}${c}$, comment appelle-t-on le point de concours ${mot} ?`, r: `C’est ${nom}.`, d: 3 };
    },
    () => {
      const [a, b, c] = lettres(3);
      const h = alea(3, 20) * 2;
      return { q: `Le triangle $${a}${b}${c}$ est rectangle en $${a}$ et $${b}${c} = ${h}$ cm. Quel est le rayon de son cercle circonscrit ?`, r: `$${h / 2}$ cm : le centre est le milieu de l’hypoténuse.`, d: 3 };
    },
    () => {
      const [a, b, m] = lettres(3);
      const x = alea(2, 15);
      return { q: `Le point $${m}$ est équidistant de $${a}$ et de $${b}$, et $${m}${a} = ${x}$ cm. Où est situé $${m}$, et combien mesure $${m}${b}$ ?`, r: `Sur la médiatrice de $[${a}${b}]$ ; $${m}${b} = ${x}$ cm.`, d: 3 };
    },
  ],

  // ---------------------------------------------------------------- 4e-07
  "4e-07": [
    () => {
      const v = choix([12, 15, 18, 20, 30, 36, 40, 45, 60, 80, 90]);
      const t = choix([0.5, 1, 1.5, 2, 2.5, 3, 4]);
      const h = Math.floor(t), m = (t - h) * 60;
      return { q: `Un véhicule parcourt $${nb(v * t)}$ km en $${duree(h, m)}$. Quelle est sa vitesse moyenne en km/h ?`, r: `$${v}$ km/h`, d: 2 };
    },
    () => {
      const v = choix([12, 15, 18, 20, 30, 36, 40, 45, 60, 80, 90, 120]);
      const t = choix([0.5, 1, 1.5, 2, 2.5, 3, 4]);
      return { q: `Un train roule à $${v}$ km/h pendant $${dec(t, 1)}$ h. Quelle distance parcourt-il ?`, r: `$${nb(v * t)}$ km`, d: 2 };
    },
    () => {
      let v, d, min;
      do { v = choix([30, 40, 45, 60, 80, 90, 120]); d = alea(20, 300); min = (d * 60) / v; } while (!Number.isInteger(min) || min < 10);
      return { q: `Quelle est la durée d’un trajet de $${d}$ km à la vitesse moyenne de $${v}$ km/h ?`, r: `$${duree(Math.floor(min / 60), min % 60)}$`, d: 3 };
    },
    () => {
      const k = alea(1, 6);
      return choix([
        { q: `Convertis $${k * 18}$ km/h en m/s.`, r: `$${nb((k * 18) / 3.6)}$ m/s`, d: 3 },
        { q: `Convertis $${k * 5}$ m/s en km/h.`, r: `$${nb(k * 5 * 3.6)}$ km/h`, d: 3 },
      ]);
    },
    () => {
      const base = choix([20, 40, 50, 80, 100, 200]);
      const p = choix([10, 20, 25, 50]);
      return { q: `Un prix passe de $${base}$ € à $${nb(base + (base * p) / 100)}$ €. Quel est le pourcentage d’augmentation ?`, r: `$${p}\\,\\%$`, d: 3 };
    },
    () => {
      const p = choix([5, 10, 15, 20, 25, 30, 40, 50]);
      return choix([
        { q: `Quel est le coefficient multiplicateur associé à une hausse de $${p}\\,\\%$ ?`, r: `$${dec(1 + p / 100, 2)}$`, d: 3 },
        { q: `Quel est le coefficient multiplicateur associé à une baisse de $${p}\\,\\%$ ?`, r: `$${dec(1 - p / 100, 2)}$`, d: 3 },
      ]);
    },
    () => {
      const [q, r] = choix([
        () => { const d = alea(3, 20), t = alea(2, 30); return [`Un robinet débite $${d}$ L par minute. Quelle quantité d’eau coule en $${t}$ minutes ?`, `$${d * t}$ L`]; },
        () => { const p = choix([0.5, 1, 1.5, 2, 2.5, 3]), t = alea(2, 12); return [`Un appareil de $${dec(p, 1)}$ kW fonctionne pendant $${t}$ h. Quelle énergie consomme-t-il en kWh ?`, `$${nb(p * t)}$ kWh`]; },
        () => { const d = alea(5, 30), t = alea(2, 10); return [`Un débit de $${d}$ L par minute dure $${t}$ minutes. Quel volume cela fait-il, en litres ?`, `$${d * t}$ L`]; },
      ])();
      return { q, r, d: 2 };
    },
    () => {
      const d = alea(2, 20);
      return choix([
        { q: `Convertis un débit de $${d}$ L/min en L/h.`, r: `$${d * 60}$ L/h`, d: 3 },
        { q: `Convertis $${d}$ m³ en litres.`, r: `$${nb(d * 1000)}$ L`, d: 3 },
      ]);
    },
    () => {
      const base = choix([10, 20, 40, 50, 60, 80, 100, 150, 200, 300, 500]);
      const p = choix([20, 10]);
      return { q: `Un article coûte $${base}$ € hors taxes. La TVA est de $${p}\\,\\%$. Quel est son prix toutes taxes comprises ?`, r: `$${nb(base * (1 + p / 100))}$ €`, d: 3 };
    },
    () => {
      const n = choix([20, 24, 25, 40, 50, 60, 80, 200]);
      const p = choix([5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 80]);
      const k = (p * n) / 100;
      if (!Number.isInteger(k)) return { q: `Quel pourcentage de $20$ représente $5$ ?`, r: `$25\\,\\%$`, d: 3 };
      return { q: `Quel pourcentage de $${n}$ représente $${k}$ ?`, r: `$${p}\\,\\%$`, d: 3 };
    },
  ],

  // ---------------------------------------------------------------- 4e-08
  "4e-08": [
    () => {
      const c = alea(2, 10), h = 3 * alea(1, 5);
      return { q: `Calcule le volume d’une pyramide de hauteur $${h}$ cm dont la base est un carré de côté $${c}$ cm.`, r: `$\\dfrac{1}{3} × ${c * c} × ${h} = ${(c * c * h) / 3}$ cm³`, d: 3 };
    },
    () => {
      const r = alea(2, 9), k = alea(1, 6);
      return { q: `Donne la valeur exacte du volume d’un cône de rayon $${r}$ cm et de hauteur $${3 * k}$ cm.`, r: `$\\dfrac{1}{3} × π × ${r}^2 × ${3 * k} = ${r * r * k}π$ cm³`, d: 3 };
    },
    () => {
      const r = alea(2, 10), h = alea(2, 15);
      return { q: `Donne la valeur exacte du volume d’un cylindre de rayon $${r}$ cm et de hauteur $${h}$ cm.`, r: `$π × ${r}^2 × ${h} = ${r * r * h}π$ cm³`, d: 3 };
    },
    () => {
      const r = alea(2, 9), h = alea(2, 12);
      return { q: `Un cylindre a un rayon de $${r}$ cm et une hauteur de $${h}$ cm. Donne l’arrondi à l’unité de son volume, en cm³.`, r: `$${nb(Math.round(Math.PI * r * r * h))}$ cm³`, d: 3 };
    },
    () => {
      const r = alea(2, 10), h = alea(2, 12);
      return { q: `Donne la valeur exacte de l’aire latérale d’un cylindre de rayon $${r}$ cm et de hauteur $${h}$ cm.`, r: `$2 × π × ${r} × ${h} = ${2 * r * h}π$ cm²`, d: 3 };
    },
    () => {
      const n = alea(3, 8);
      const [solide, f, a, s] = choix([
        ["une pyramide dont la base a", n + 1, 2 * n, n + 1],
        ["un prisme droit dont la base a", n + 2, 3 * n, 2 * n],
      ]);
      const [mot, v] = choix([["faces", f], ["arêtes", a], ["sommets", s]]);
      return { q: `Combien ${/^[aeiouyé]/.test(mot) ? "d’" : "de "}${mot} possède ${solide} $${n}$ côtés ?`, r: `$${v}$`, d: 2 };
    },
    () => {
      const x = alea(2, 90) * 100;
      return choix([
        { q: `Convertis $${nb(x)}$ cm³ en litres.`, r: `$${nb(x / 1000)}$ L`, d: 3 },
        { q: `Convertis $${nb(x / 100)}$ L en cm³.`, r: `$${nb(x * 10)}$ cm³`, d: 3 },
      ]);
    },
    () => {
      const [k, mot] = choix([[2, "2"], [3, "3"], [4, "4"], [5, "5"], [10, "10"]]);
      return choix([
        { q: `On agrandit un solide en multipliant toutes ses longueurs par $${k}$. Par combien son volume est-il multiplié ?`, r: `$${k}^3 = ${k ** 3}$`, d: 3 },
        { q: `On agrandit une figure en multipliant ses longueurs par $${k}$. Par combien son aire est-elle multipliée ?`, r: `$${k}^2 = ${k * k}$`, d: 3 },
        { q: `On réduit un solide en multipliant toutes ses longueurs par $1/${k}$. Par combien son volume est-il multiplié ?`, r: `$1/${k ** 3}$`, d: 3 },
      ]);
    },
    () => {
      const r = alea(2, 9), h = alea(2, 15);
      return { q: `Un cylindre de rayon $${r}$ cm a un volume de $${r * r * h}π$ cm³. Quelle est sa hauteur ?`, r: `$${h}$ cm`, d: 3 };
    },
    () => {
      const r = alea(2, 10);
      return { q: `Dans le patron d’un cylindre de rayon $${r}$ cm, le rectangle a une longueur égale au périmètre d’un disque de base. Quelle est cette longueur ? (valeur exacte)`, r: `$${2 * r}π$ cm`, d: 3 };
    },
    () => {
      const [L, l, h] = [alea(2, 8) * 10, alea(2, 6) * 10, alea(2, 6) * 10];
      return { q: `Un aquarium a pour dimensions intérieures $${L}$ cm, $${l}$ cm et $${h}$ cm. Quelle est sa contenance en litres ?`, r: `$${nb((L * l * h) / 1000)}$ L`, d: 3 };
    },
    () => {
      const A = alea(2, 12) * 3, h = alea(2, 12);
      return { q: `Une pyramide a une base d’aire $${A}$ cm² et un volume de $${(A * h) / 3}$ cm³. Quelle est sa hauteur ?`, r: `$${h}$ cm`, d: 3 };
    },
  ],

  // ---------------------------------------------------------------- 4e-09
  "4e-09": [
    () => {
      const n = choix([5, 7, 9, 11]);
      const v = Array.from({ length: n }, () => alea(1, 30));
      const tri = [...v].sort((a, b) => a - b);
      return { q: `Donne la médiane de cette série : ${liste(v)}.`, r: `Série rangée : $${tri.join(" ; ")}$. La médiane est $${tri[(n - 1) / 2]}$.`, d: 2 };
    },
    () => {
      const n = choix([4, 6, 8]);
      const v = Array.from({ length: n }, () => alea(1, 30));
      const tri = [...v].sort((a, b) => a - b);
      const m = (tri[n / 2 - 1] + tri[n / 2]) / 2;
      return { q: `Donne la médiane de cette série : ${liste(v)}.`, r: `Série rangée : $${tri.join(" ; ")}$. La médiane est $${dec(m, 1)}$.`, d: 3 };
    },
    () => {
      const n = choix([4, 5, 6]);
      const m = alea(6, 18);
      let v;
      do {
        v = Array.from({ length: n - 1 }, () => alea(Math.max(1, m - 6), m + 6));
        v.push(m * n - v.reduce((s, x) => s + x, 0));
      } while (v[n - 1] < 0 || v[n - 1] > 30);
      return { q: `Calcule la moyenne de cette série : ${liste(v)}.`, r: `$${m}$`, d: 2 };
    },
    () => {
      const v = Array.from({ length: alea(5, 8) }, () => alea(1, 40));
      return { q: `Calcule l’étendue de cette série : ${liste(v)}.`, r: `$${Math.max(...v) - Math.min(...v)}$`, d: 1 };
    },
    () => {
      let v1, v2, n1, n2;
      do { v1 = alea(6, 14); v2 = alea(8, 18); n1 = alea(1, 5); n2 = alea(1, 5); } while ((v1 * n1 + v2 * n2) % (n1 + n2) !== 0 || v1 === v2);
      return { q: `Notes d’un contrôle : $${v1}$ (obtenu par $${n1}$ élèves) et $${v2}$ (obtenu par $${n2}$ élèves). Quelle est la moyenne ?`, r: `$(${v1} × ${n1} + ${v2} × ${n2}) ÷ ${n1 + n2} = ${(v1 * n1 + v2 * n2) / (n1 + n2)}$`, d: 3 };
    },
    () => {
      const r = alea(1, 9), b = alea(1, 9), v = alea(1, 9);
      return choix([
        { q: `Une urne contient $${r}$ boules rouges, $${b}$ bleues et $${v}$ vertes. On tire une boule au hasard. Quelle est la probabilité d’obtenir une boule rouge ?`, r: `$${simpl(r, r + b + v)}$`, d: 2 },
        { q: `Une urne contient $${r}$ boules rouges, $${b}$ bleues et $${v}$ vertes. On tire une boule au hasard. Quelle est la probabilité de ne pas obtenir de boule rouge ?`, r: `$${simpl(b + v, r + b + v)}$`, d: 3 },
      ]);
    },
    () => {
      const N = choix([6, 8, 10, 12, 20]);
      const faces = Array.from({ length: N }, (_, i) => i + 1);
      const k = choix([2, 3, 4, 5]);
      const m = alea(2, N - 1);
      const evs = [
        [`un nombre pair`, (x) => x % 2 === 0],
        [`un multiple de $${k}$`, (x) => x % k === 0],
        [`un nombre supérieur à $${m}$`, (x) => x > m],
        [`un nombre inférieur ou égal à $${m}$`, (x) => x <= m],
        [`un nombre premier`, (x) => [2, 3, 5, 7, 11, 13, 17, 19].includes(x)],
      ];
      const [nom, f] = choix(evs);
      const c = faces.filter(f).length;
      return { q: `On lance un dé équilibré à $${N}$ faces numérotées de $1$ à $${N}$. Quelle est la probabilité d’obtenir ${nom} ?`, r: `$${simpl(c, N)}$`, d: 3 };
    },
    () => {
      const [jeu, ev, c, N] = choix([
        [32, "un as", 4, 32], [32, "un cœur", 8, 32], [32, "une figure (valet, dame ou roi)", 12, 32], [32, "un roi rouge", 2, 32],
        [52, "un as", 4, 52], [52, "un cœur", 13, 52], [52, "une figure (valet, dame ou roi)", 12, 52], [52, "un roi", 4, 52],
      ]);
      return { q: `On tire une carte au hasard dans un jeu de $${jeu}$ cartes. Quelle est la probabilité d’obtenir ${ev} ?`, r: `$${simpl(c, N)}$`, d: 3 };
    },
    () => {
      const [a, b] = choix([[1, 4], [3, 10], [2, 5], [7, 10], [1, 3], [5, 8]]);
      return { q: `La probabilité qu’un événement se réalise est $${a}/${b}$. Quelle est la probabilité qu’il ne se réalise pas ?`, r: `$${simpl(b - a, b)}$`, d: 2 };
    },
    () => {
      const n = choix([20, 40, 50, 100, 200]);
      const k = alea(5, n - 5);
      return { q: `On lance $${n}$ fois une pièce et on obtient $${k}$ fois « pile ». Quelle est la fréquence de « pile » ?`, r: `$${k}/${n} = ${dec(k / n, 3)}$`, d: 2 };
    },
    () => {
      return choix([
        { q: `On lance deux fois de suite une pièce équilibrée. Quelle est la probabilité d’obtenir deux fois « pile » ?`, r: `$1/4$`, d: 3 },
        { q: `On lance deux fois de suite une pièce équilibrée. Quelle est la probabilité d’obtenir au moins une fois « pile » ?`, r: `$3/4$`, d: 3 },
        { q: `On lance deux fois de suite une pièce équilibrée. Quelle est la probabilité d’obtenir exactement une fois « pile » ?`, r: `$1/2$`, d: 3 },
      ]);
    },
  ],
};
