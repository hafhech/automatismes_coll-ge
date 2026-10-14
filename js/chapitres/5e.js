// Générateurs de questions, 5e.

import {
  alea, choix, pile, dec, melanger, pgcd, ppcm, fraction, simpl, lettres, liste, nb, milliers,
  entreParentheses, coef, terme, affine, chiffresDistincts, U,
} from "../outils.js";

const symbole = (a, b) => (a < b ? "<" : a > b ? ">" : "=");
const relatif = (min, max) => { let n = 0; while (n === 0) n = alea(min, max); return n; };

export default {
  // ---------------------------------------------------------------- 5e-01
  "5e-01": [
    () => {
      const a = relatif(-15, 15);
      const b = relatif(-15, 15);
      return { q: `Calcule : $${a} + ${entreParentheses(b)}$.`, r: `$${a + b}$`, d: a * b > 0 ? 1 : 2 };
    },
    () => {
      const a = relatif(-15, 15);
      const b = relatif(-15, 15);
      return { q: `Calcule : $${a} - ${entreParentheses(b)}$.`, r: `$${a - b}$`, d: 3 };
    },
    () => {
      const x = choix([relatif(-30, 30), relatif(-99, 99) / 10]);
      return { q: `Quel est l’opposé de $${dec(x, 1)}$ ?`, r: `$${dec(-x, 1)}$`, d: 1 };
    },
    () => {
      const a = relatif(-20, 20);
      let b = relatif(-20, 20);
      if (b === a) b = a + 1 || 3;
      return { q: `Compare $${a}$ et $${b}$.`, r: `$${a} ${symbole(a, b)} ${b}$`, d: 1 };
    },
    () => {
      const nombres = [...new Set(Array.from({ length: 4 }, () => alea(-20, 20)))];
      const tri = [...nombres].sort((a, b) => a - b);
      return { q: `Range dans l’ordre croissant : ${liste(melanger(nombres))}.`, r: `$${tri.join(" < ")}$`, d: 2 };
    },
    () => {
      const x = relatif(-25, 25);
      return { q: `Quelle est la distance à zéro de $${x}$ ?`, r: `$${Math.abs(x)}$`, d: 1 };
    },
    () => {
      const x = alea(-12, 12);
      const n = alea(2, 9);
      const gauche = pile();
      return {
        q: `Sur une droite graduée, quel nombre est situé à $${n}$ unités ${gauche ? "à gauche" : "à droite"} de $${x}$ ?`,
        r: `$${gauche ? x - n : x + n}$`,
        d: 2,
      };
    },
    () => {
      const t = alea(-12, 3);
      const v = alea(3, 12);
      const monte = pile();
      return {
        q: `Il fait $${t}$ °C. La température ${monte ? "monte" : "baisse"} de $${v}$ °C. Quelle température fait-il ensuite ?`,
        r: `$${monte ? t + v : t - v}$ °C`,
        d: 2,
      };
    },
    () => {
      const a = relatif(-12, 12);
      const b = relatif(-12, 12);
      const c = relatif(-12, 12);
      return { q: `Calcule : $${a} + ${entreParentheses(b)} + ${entreParentheses(c)}$.`, r: `$${a + b + c}$`, d: 3 };
    },
    () => {
      const a = relatif(-99, 99) / 10;
      const b = relatif(-99, 99) / 10;
      const bb = b < 0 ? `(${dec(b, 1)})` : dec(b, 1);
      return { q: `Calcule : $${dec(a, 1)} + ${bb}$.`, r: `$${dec(a + b, 1)}$`, d: 3 };
    },
    () => {
      const a = relatif(-12, 12);
      const c = relatif(-12, 12);
      return { q: `Complète : $${entreParentheses(a)} + \\ldots = ${c}$.`, r: `$${c - a}$`, d: 3 };
    },
    () => {
      const [pt] = lettres(1);
      const x = relatif(-9, 9);
      const y = relatif(-9, 9);
      const [mot, v] = choix([["l’abscisse", x], ["l’ordonnée", y]]);
      return { q: `Dans un repère, le point $${pt}(${x} ; ${y})$ est placé. Quelle est ${mot} de $${pt}$ ?`, r: `$${v}$`, d: 1 };
    },
    () => {
      const s = alea(-40, 30);
      const m = alea(10, 60);
      const depot = pile();
      return {
        q: `Le solde d’un compte est de $${s}$ €. On ${depot ? "dépose" : "retire"} $${m}$ €. Quel est le nouveau solde ?`,
        r: `$${depot ? s + m : s - m}$ €`,
        d: 2,
      };
    },
  ],

  // ---------------------------------------------------------------- 5e-02
  "5e-02": [
    () => {
      const d = alea(3, 12);
      const a = alea(1, d - 1);
      const b = alea(1, d - 1);
      return { q: `Calcule : $${a}/${d} + ${b}/${d}$.`, r: `$${simpl(a + b, d)}$`, d: 1 };
    },
    () => {
      const d = alea(3, 12);
      const a = alea(2, d + 2);
      const b = alea(1, a - 1);
      return { q: `Calcule : $${a}/${d} - ${b}/${d}$.`, r: `$${simpl(a - b, d)}$`, d: 1 };
    },
    () => {
      const d1 = alea(2, 6);
      const k = alea(2, 4);
      const a = alea(1, d1 - 1) || 1;
      const b = alea(1, d1 * k - 1);
      const n = a * k + b;
      return { q: `Calcule : $${a}/${d1} + ${b}/${d1 * k}$.`, r: `$${simpl(n, d1 * k)}$`, d: 2 };
    },
    () => {
      const [d1, d2] = choix([[2, 3], [2, 5], [3, 4], [3, 5], [4, 5], [2, 7], [3, 7], [5, 6], [3, 8], [4, 9], [5, 8]]);
      const a = alea(1, d1 - 1);
      const b = alea(1, d2 - 1);
      const m = ppcm(d1, d2);
      return { q: `Calcule : $${a}/${d1} + ${b}/${d2}$.`, r: `$${simpl(a * (m / d1) + b * (m / d2), m)}$`, d: 3 };
    },
    () => {
      const d1 = alea(2, 6);
      const k = alea(2, 4);
      const a = alea(1, d1 - 1);
      const b = alea(1, a * k - 1);
      return { q: `Calcule : $${a}/${d1} - ${b}/${d1 * k}$.`, r: `$${simpl(a * k - b, d1 * k)}$`, d: 2 };
    },
    () => {
      const a = alea(1, 7), b = alea(2, 9), c = alea(1, 7), d = alea(2, 9);
      return { q: `Calcule : $${a}/${b} × ${c}/${d}$.`, r: `$${simpl(a * c, b * d)}$`, d: 2 };
    },
    () => {
      const d = alea(3, 9);
      const a = alea(1, d - 1);
      const n = alea(2, 9);
      return { q: `Calcule : $${a}/${d} × ${n}$.`, r: `$${simpl(a * n, d)}$`, d: 2 };
    },
    () => {
      const d = alea(3, 9);
      const a = alea(1, d - 1);
      const t = d * alea(2, 12);
      return { q: `Calcule $${a}/${d}$ de $${t}$.`, r: `$${(a * t) / d}$`, d: 2 };
    },
    () => {
      const d = alea(3, 12);
      const a = alea(1, d - 1);
      return { q: `Calcule : $1 - ${a}/${d}$.`, r: `$${simpl(d - a, d)}$`, d: 2 };
    },
    () => {
      const g = alea(2, 9);
      const [a, b] = choix([[1, 2], [2, 3], [3, 4], [3, 5], [5, 6], [2, 5], [4, 5], [3, 7], [5, 8], [7, 9], [1, 3], [1, 4]]);
      return { q: `Simplifie la fraction $${a * g}/${b * g}$ au maximum.`, r: `$${a}/${b}$`, d: 2 };
    },
    () => {
      const [prenom, vol, unite] = choix([["Paul", "litre", "de jus"], ["Nora", "litre", "de lait"], ["Karim", "kilo", "de farine"]]);
      const d = choix([2, 4, 8]);
      const a = 1;
      const b = alea(1, d - 1);
      return {
        q: `${prenom} utilise $${a}/${d}$ ${vol} ${unite}, puis encore $${b}/${d}$ ${vol}. Quelle quantité cela fait-il en tout ?`,
        r: `$${simpl(a + b, d)}$ ${vol}`,
        d: 3,
      };
    },
    () => {
      const d = alea(3, 9);
      const a = alea(1, d - 1);
      const e = alea(1, 3);
      return { q: `Calcule : $${e} + ${a}/${d}$ et donne le résultat sous forme d’une seule fraction.`, r: `$${e * d + a}/${d}$`, d: 3 };
    },
  ],

  // ---------------------------------------------------------------- 5e-03
  "5e-03": [
    () => {
      const a = alea(2, 20), b = alea(2, 9), c = alea(2, 9);
      return choix([
        { q: `Calcule : $${a} + ${b} × ${c}$.`, r: `$${a + b * c}$`, d: 1 },
        { q: `Calcule : $${a + b * c} - ${b} × ${c}$.`, r: `$${a}$`, d: 2 },
      ]);
    },
    () => {
      const a = alea(2, 15), b = alea(2, 15), c = alea(2, 9);
      return { q: `Calcule : $(${a} + ${b}) × ${c}$.`, r: `$${(a + b) * c}$`, d: 1 };
    },
    () => {
      const b = alea(2, 9), c = alea(2, 9);
      const a = b + c + alea(2, 20);
      return choix([
        { q: `Calcule : $${a} - ${b} - ${c}$.`, r: `$${a - b - c}$`, d: 2 },
        { q: `Calcule : $${a} - (${b} + ${c})$.`, r: `$${a - b - c}$`, d: 2 },
        { q: `Calcule : $${a} - (${b + c} - ${c})$.`, r: `$${a - b}$`, d: 3 },
      ]);
    },
    () => {
      const a = alea(2, 9), b = alea(2, 9), c = alea(2, 9), q = alea(2, 9);
      return { q: `Calcule : $${a} × ${b} - ${c * q} ÷ ${c}$.`, r: `$${a * b - q}$`, d: 3 };
    },
    () => {
      const a = alea(2, 9), b = alea(2, 9), c = alea(2, 9), e = alea(2, 5);
      return { q: `Calcule : $${a} × (${b} + ${c} × ${e})$.`, r: `$${a * (b + c * e)}$`, d: 3 };
    },
    () => {
      const a = alea(2, 9), b = alea(1, 12), x = alea(1, 9);
      return { q: `Calcule $${a}x + ${b}$ pour $x = ${x}$.`, r: `$${a * x + b}$`, d: 2 };
    },
    () => {
      const a = alea(2, 7), b = alea(1, 12), x = alea(-5, -1);
      return { q: `Calcule $${a}x + ${b}$ pour $x = ${x}$.`, r: `$${a * x + b}$`, d: 3 };
    },
    () => {
      const [l1, l2] = choix([["c", "c"], ["a", "a"], ["x", "x"]]);
      return choix([
        { q: `Écris le périmètre d’un carré de côté $${l1}$.`, r: `$4 × ${l1}$ (ou $4${l1}$)`, d: 2 },
        { q: `Écris l’aire d’un carré de côté $${l1}$.`, r: `$${l1} × ${l1}$ (ou $${l1}^2$)`, d: 2 },
        { q: `Écris le périmètre d’un rectangle de longueur $L$ et de largeur $l$.`, r: `$2 × (L + l)$`, d: 2 },
        { q: `Écris l’aire d’un rectangle de longueur $L$ et de largeur $l$.`, r: `$L × l$`, d: 2 },
        { q: `Écris le périmètre d’un triangle équilatéral de côté $${l1}$.`, r: `$3 × ${l1}$`, d: 2 },
      ]);
    },
    () => {
      const [mot, k] = choix([["le double", 2], ["le triple", 3], ["le quadruple", 4], ["le quintuple", 5]]);
      const n = alea(1, 12);
      const plus = pile();
      return {
        q: `Écris l’expression : ${mot} de $x$, ${plus ? "augmenté" : "diminué"} de $${n}$.`,
        r: `$${k}x ${plus ? "+" : "-"} ${n}$`,
        d: 2,
      };
    },
    () => {
      const a = alea(2, 9), b = alea(2, 9);
      return choix([
        { q: `Réduis : $${a}x + ${b}x$.`, r: `$${a + b}x$`, d: 2 },
        { q: `Réduis : $${a + b}x - ${b}x$.`, r: `$${a}x$`, d: 2 },
        { q: `Réduis : $${a}x + ${b} + ${a + 1}x$.`, r: `$${2 * a + 1}x + ${b}$`, d: 3 },
      ]);
    },
    () => {
      const n = choix([3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 25]);
      const a = choix([98, 99, 101, 102, 198, 199, 201, 998, 999, 1001]);
      const base = a < 150 ? 100 : a < 500 ? 200 : 1000;
      const ecart = Math.abs(base - a);
      const s = a < base ? "-" : "+";
      return {
        q: `Calcule astucieusement : $${n} × ${a}$.`,
        r: `$${n} × (${base} ${s} ${ecart}) = ${milliers(n * base)} ${s} ${n * ecart} = ${milliers(n * a)}$`,
        d: 3,
      };
    },
    () => {
      const k = alea(2, 9), a = alea(1, 9);
      const plus = pile();
      return { q: `Développe : $${k}(x ${plus ? "+" : "-"} ${a})$.`, r: `$${k}x ${plus ? "+" : "-"} ${k * a}$`, d: 3 };
    },
    () => {
      const a = alea(2, 6), b = alea(1, 9), x = alea(1, 6);
      const rhs = pile() ? a * x + b : a * x + b + alea(1, 4);
      const oui = a * x + b === rhs;
      return {
        q: `Le nombre $${x}$ est-il solution de l’égalité $${a}x + ${b} = ${rhs}$ ?`,
        r: oui ? `Oui : $${a} × ${x} + ${b} = ${rhs}$.` : `Non : $${a} × ${x} + ${b} = ${a * x + b}$, et non $${rhs}$.`,
        d: 3,
      };
    },
  ],

  // ---------------------------------------------------------------- 5e-04
  "5e-04": [
    () => {
      const x1 = alea(2, 9);
      const c = choix([2, 3, 4, 5, 6, 1.5, 2.5, 0.5]);
      let x2 = alea(2, 15);
      if (x2 === x1) x2 += 1;
      return { q: `Dans un tableau de proportionnalité, à $${x1}$ correspond $${dec(x1 * c, 2)}$. Quel est le coefficient de proportionnalité, puis quel nombre correspond à $${x2}$ ?`, r: `Coefficient $${dec(c, 2)}$ ; à $${x2}$ correspond $${dec(x2 * c, 2)}$.`, d: 2 };
    },
    () => {
      const p = choix([5, 10, 15, 20, 25, 30, 40, 50, 75]);
      const n = choix([20, 40, 60, 80, 100, 120, 160, 200, 240, 300, 400, 600]);
      return { q: `Calcule $${p}\\,\\%$ de $${n}$.`, r: `$${nb((n * p) / 100)}$`, d: p === 10 || p === 50 || p === 25 ? 2 : 3 };
    },
    () => {
      const prix = choix([20, 40, 60, 80, 100, 120, 160, 200, 240]);
      const p = choix([10, 20, 25, 50, 5, 15]);
      const hausse = pile();
      return {
        q: `Un article coûte $${prix}$ €. Son prix ${hausse ? "augmente" : "diminue"} de $${p}\\,\\%$. Quel est son nouveau prix ?`,
        r: `$${nb(hausse ? prix + (prix * p) / 100 : prix - (prix * p) / 100)}$ €`,
        d: 3,
      };
    },
    () => {
      const n = choix([4, 5, 10, 20, 25, 50, 100]);
      const k = alea(1, n - 1);
      const [sujet, verbe] = choix([["personnes d’un groupe", "jouent au football"], ["élèves d’une classe", "sont des filles"], ["questions d’un test", "sont réussies"]]);
      return { q: `Sur $${n}$ ${sujet}, $${k}$ ${k > 1 ? verbe : verbe.replace("jouent", "joue").replace("sont", "est").replace("réussies", "réussie")}. Quel pourcentage cela représente-t-il ?`, r: `$${nb((100 * k) / n)}\\,\\%$`, d: 3 };
    },
    () => {
      const n = choix([2, 4, 5, 10, 20, 25, 50]);
      const k = alea(1, n - 1);
      return { q: `Écris $${k}/${n}$ sous la forme d’un pourcentage.`, r: `$${nb((100 * k) / n)}\\,\\%$`, d: 2 };
    },
    () => {
      const v = choix([12, 15, 18, 20, 24, 30, 40, 45, 60, 80, 90]);
      const t = choix([0.5, 1, 1.5, 2, 2.5, 3, 4]);
      return { q: `Un véhicule roule à $${v}$ km/h à vitesse constante pendant $${dec(t, 1)}$ h. Quelle distance parcourt-il ?`, r: `$${nb(v * t)}$ km`, d: 2 };
    },
    () => {
      const v = choix([12, 15, 20, 30, 40, 60, 80]);
      const t = choix([2, 3, 4, 5]);
      return { q: `Un cycliste a parcouru $${v * t}$ km à la vitesse constante de $${v}$ km/h. Combien de temps a-t-il roulé ?`, r: `$${t}$ h`, d: 3 };
    },
    () => {
      const e = choix([20, 50, 100, 200, 500]);
      const c = alea(2, 12);
      return { q: `Sur un plan à l’échelle $1/${e}$, une longueur mesure $${c}$ cm. Quelle est la longueur réelle, en mètres ?`, r: `$${nb((c * e) / 100)}$ m`, d: 3 };
    },
    () => {
      const [objet, p] = choix([["pizzas", 8.5], ["places de concert", 12], ["kg de cerises", 6.5], ["livres", 7.5], ["billets de train", 9]]);
      const n1 = choix([2, 4, 5]);
      const n2 = alea(3, 9);
      return { q: `$${n1}$ ${objet} coûtent $${nb(p * n1)}$ €. Combien coûtent $${n2}$ ${objet} ?`, r: `$${nb(p * n2)}$ €`, d: 2 };
    },
    () => {
      const [objet, p] = choix([["kg de pommes", 2.4], ["m de tissu", 3.5], ["L d’essence", 1.8]]);
      const n1 = choix([2.5, 1.5, 3.5]);
      const n2 = alea(3, 8);
      return { q: `$${dec(n1, 1)}$ ${objet} coûtent $${nb(p * n1, 2)}$ €. Combien coûtent $${n2}$ ${objet} ?`, r: `$${nb(p * n2, 2)}$ €`, d: 3 };
    },
    () => {
      const x = [alea(2, 4), alea(5, 8), alea(9, 12)];
      const c = alea(2, 6);
      const y = x.map((v) => v * c);
      const oui = pile();
      if (!oui) y[alea(0, 2)] += alea(1, 3);
      return {
        q: `Ce tableau est-il un tableau de proportionnalité ? Première ligne : ${liste(x)}. Seconde ligne : ${liste(y)}.`,
        r: oui ? `Oui : on multiplie toujours par $${c}$.` : `Non : on ne passe pas toujours de la première ligne à la seconde avec le même nombre.`,
        d: 3,
      };
    },
  ],

  // ---------------------------------------------------------------- 5e-05
  "5e-05": [
    () => {
      const a = alea(20, 100), b = alea(20, 130 - a < 20 ? 40 : 130 - a);
      const c = 180 - a - b;
      if (c <= 0) return { q: `Dans un triangle, deux angles mesurent $50°$ et $60°$. Combien mesure le troisième ?`, r: `$70°$`, d: 2 };
      return { q: `Dans un triangle, deux angles mesurent $${a}°$ et $${b}°$. Combien mesure le troisième ?`, r: `$${c}°$`, d: 2 };
    },
    () => {
      const [a, b, c] = lettres(3);
      const y = alea(20, 80);
      return choix([
        { q: `Le triangle $${a}${b}${c}$ est isocèle en $${a}$ et $\\widehat{${a}${b}${c}} = ${y}°$. Combien mesure $\\widehat{${a}${c}${b}}$ ?`, r: `$${y}°$`, d: 3 },
        { q: `Le triangle $${a}${b}${c}$ est isocèle en $${a}$ et $\\widehat{${a}${b}${c}} = ${y}°$. Combien mesure $\\widehat{${b}${a}${c}}$ ?`, r: `$180° - 2 × ${y}° = ${180 - 2 * y}°$`, d: 3 },
        { q: `Le triangle $${a}${b}${c}$ est isocèle en $${a}$ et $\\widehat{${b}${a}${c}} = ${2 * y}°$. Combien mesure $\\widehat{${a}${b}${c}}$ ?`, r: `$(180° - ${2 * y}°) ÷ 2 = ${90 - y}°$`, d: 3 },
      ]);
    },
    () => {
      const c = alea(2, 20);
      const [a, b, e] = lettres(3);
      return choix([
        { q: `Le triangle $${a}${b}${e}$ est équilatéral de côté $${c}$ cm. Quel est son périmètre ?`, r: `$${3 * c}$ cm`, d: 1 },
        { q: `Quelle est la mesure de chaque angle d’un triangle équilatéral ?`, r: `$60°$`, d: 1 },
      ]);
    },
    () => {
      const x = alea(5, 85);
      const [a, b, c] = lettres(3);
      return { q: `Le triangle $${a}${b}${c}$ est rectangle en $${a}$ et $\\widehat{${a}${b}${c}} = ${x}°$. Combien mesure $\\widehat{${a}${c}${b}}$ ?`, r: `$${90 - x}°$`, d: 2 };
    },
    () => {
      const a = alea(2, 12), b = alea(2, 12);
      const c = choix([a + b, a + b - 1, a + b + 1, Math.abs(a - b), alea(Math.abs(a - b) + 1, a + b - 1) || 3]);
      if (c <= 0) return { q: `Peut-on construire un triangle de côtés $3$ cm, $4$ cm et $5$ cm ?`, r: `Oui : $5 < 3 + 4$.`, d: 3 };
      const cotes = [a, b, c].sort((x, y) => x - y);
      const ok = cotes[2] < cotes[0] + cotes[1];
      return {
        q: `Peut-on construire un triangle dont les côtés mesurent $${melanger([a, b, c]).join("$ cm, $")}$ cm ?`,
        r: ok
          ? `Oui : $${cotes[2]} < ${cotes[0]} + ${cotes[1]}$.`
          : cotes[2] === cotes[0] + cotes[1]
            ? `Non : $${cotes[2]} = ${cotes[0]} + ${cotes[1]}$, le triangle serait aplati (points alignés).`
            : `Non : $${cotes[2]} > ${cotes[0]} + ${cotes[1]} = ${cotes[0] + cotes[1]}$.`,
        d: 3,
      };
    },
    () => {
      const x = alea(20, 160);
      const [mot, v] = choix([
        ["son angle correspondant", x], ["son angle alterne-interne", x], ["son angle opposé par le sommet", x],
        ["l’angle adjacent qui forme avec lui un angle plat", 180 - x],
      ]);
      return { q: `Deux droites parallèles sont coupées par une sécante. Un angle mesure $${x}°$. Combien mesure ${mot} ?`, r: `$${v}°$`, d: 2 };
    },
    () => {
      const a = alea(3, 15), b = alea(2, 20);
      return { q: `Un triangle isocèle a deux côtés de $${a}$ cm et sa base mesure $${b}$ cm. Quel est son périmètre ?`, r: `$${2 * a + b}$ cm`, d: 1 };
    },
    () => {
      const [a, b, c] = lettres(3);
      return choix([
        { q: `Dans le triangle $${a}${b}${c}$, comment s’appelle la droite qui passe par $${a}$ et est perpendiculaire à $(${b}${c})$ ?`, r: `La hauteur issue de $${a}$.`, d: 2 },
        { q: `Dans le triangle $${a}${b}${c}$, comment s’appelle le segment qui relie $${a}$ au milieu de $[${b}${c}]$ ?`, r: `La médiane issue de $${a}$.`, d: 2 },
        { q: `Dans le triangle $${a}${b}${c}$, comment s’appelle la droite perpendiculaire à $[${b}${c}]$ passant par son milieu ?`, r: `La médiatrice de $[${b}${c}]$.`, d: 2 },
        { q: `Dans le triangle $${a}${b}${c}$, comment s’appelle la demi-droite qui partage l’angle $\\widehat{${b}${a}${c}}$ en deux angles égaux ?`, r: `La bissectrice de l’angle $\\widehat{${b}${a}${c}}$.`, d: 2 },
        { q: `Les médiatrices du triangle $${a}${b}${c}$ se coupent en un point. Que peut-on dire de ce point ?`, r: `C’est le centre du cercle circonscrit au triangle.`, d: 3 },
      ]);
    },
    () => {
      const [a, b, c] = lettres(3);
      return choix([
        { q: `Le triangle $${a}${b}${c}$ est rectangle en $${a}$. Comment s’appelle le côté $[${b}${c}]$ ?`, r: `L’hypoténuse.`, d: 1 },
        { q: `Le triangle $${a}${b}${c}$ est isocèle en $${a}$. Quels côtés ont la même longueur ?`, r: `$${a}${b} = ${a}${c}$`, d: 1 },
        { q: `Le triangle $${a}${b}${c}$ est isocèle en $${a}$. Quels angles sont égaux ?`, r: `$\\widehat{${a}${b}${c}} = \\widehat{${a}${c}${b}}$`, d: 2 },
      ]);
    },
    () => {
      const [a, b, c] = lettres(3);
      const x = alea(20, 80), y = alea(20, 90);
      return { q: `Dans le triangle $${a}${b}${c}$, on a $\\widehat{${a}} = ${x}°$ et $\\widehat{${b}} = ${y}°$. Combien mesure $\\widehat{${c}}$ ?`, r: `$\\widehat{${c}} = ${180 - x - y}°$`, d: 2 };
    },
  ],

  // ---------------------------------------------------------------- 5e-06
  "5e-06": [
    () => {
      const [a, b, c, e] = lettres(4);
      const x = alea(3, 15), y = alea(3, 15);
      const [q, r] = choix([
        [`Combien mesure $${c}${e}$ ?`, `$${c}${e} = ${x}$ cm`],
        [`Combien mesure $${e}${a}$ ?`, `$${e}${a} = ${y}$ cm`],
      ]);
      return { q: `$${a}${b}${c}${e}$ est un parallélogramme avec $${a}${b} = ${x}$ cm et $${b}${c} = ${y}$ cm. ${q}`, r, d: 2 };
    },
    () => {
      const [a, b, c, e] = lettres(4);
      const x = alea(30, 150);
      return choix([
        { q: `$${a}${b}${c}${e}$ est un parallélogramme et $\\widehat{${e}${a}${b}} = ${x}°$. Combien mesure $\\widehat{${b}${c}${e}}$ ?`, r: `$${x}°$ (angles opposés)`, d: 2 },
        { q: `$${a}${b}${c}${e}$ est un parallélogramme et $\\widehat{${e}${a}${b}} = ${x}°$. Combien mesure $\\widehat{${a}${b}${c}}$ ?`, r: `$180° - ${x}° = ${180 - x}°$ (angles consécutifs)`, d: 3 },
      ]);
    },
    () => {
      const a = alea(3, 20), b = alea(3, 20);
      return { q: `Un parallélogramme a des côtés de $${a}$ cm et $${b}$ cm. Quel est son périmètre ?`, r: `$2 × (${a} + ${b}) = ${2 * (a + b)}$ cm`, d: 1 };
    },
    () => {
      const [a, b, c, e, o] = lettres(5);
      const x = alea(3, 20) * 2;
      return { q: `Les diagonales $[${a}${c}]$ et $[${b}${e}]$ du parallélogramme $${a}${b}${c}${e}$ se coupent en $${o}$. On a $${a}${c} = ${x}$ cm. Combien mesure $${a}${o}$ ?`, r: `$${a}${o} = ${x / 2}$ cm`, d: 2 };
    },
    () => {
      const [m, o, n] = lettres(3);
      const x = alea(2, 15);
      return choix([
        { q: `$${n}$ est le symétrique de $${m}$ par rapport à $${o}$ et $${m}${o} = ${x}$ cm. Combien mesure $${m}${n}$ ?`, r: `$${m}${n} = ${2 * x}$ cm`, d: 2 },
        { q: `$${n}$ est le symétrique de $${m}$ par rapport à $${o}$ et $${m}${n} = ${2 * x}$ cm. Combien mesure $${o}${n}$ ?`, r: `$${o}${n} = ${x}$ cm`, d: 2 },
      ]);
    },
    () => {
      const x = relatif(-9, 9), y = relatif(-9, 9);
      const [m] = lettres(1);
      return { q: `Dans un repère d’origine $O$, on a $${m}(${x} ; ${y})$. Quelles sont les coordonnées du symétrique de $${m}$ par rapport à $O$ ?`, r: `$(${-x} ; ${-y})$`, d: 3 };
    },
    () => {
      const L = alea(2, 20);
      return choix([
        { q: `Un segment mesure $${L}$ cm. Combien mesure son symétrique par rapport à un point ?`, r: `$${L}$ cm`, d: 1 },
        { q: `Que peut-on dire d’une droite et de sa symétrique par rapport à un point ?`, r: `Elles sont parallèles.`, d: 2 },
        { q: `Un angle mesure $${L * 5}°$. Combien mesure son symétrique par rapport à un point ?`, r: `$${L * 5}°$`, d: 1 },
        { q: `Un cercle a un rayon de $${L}$ cm. Quel est le rayon de son symétrique par rapport à un point ?`, r: `$${L}$ cm`, d: 1 },
      ]);
    },
    () => {
      const [a, b, c, e] = lettres(4);
      const [prop, nature] = choix([
        ["ses diagonales se coupent en leur milieu", "un parallélogramme"],
        ["ses diagonales se coupent en leur milieu et ont la même longueur", "un rectangle"],
        ["ses diagonales se coupent en leur milieu et sont perpendiculaires", "un losange"],
        ["ses diagonales se coupent en leur milieu, ont la même longueur et sont perpendiculaires", "un carré"],
        ["ses côtés opposés sont parallèles deux à deux", "un parallélogramme"],
        ["ses côtés opposés sont égaux deux à deux", "un parallélogramme"],
        ["ses quatre côtés ont la même longueur", "un losange"],
      ]);
      return { q: `Le quadrilatère $${a}${b}${c}${e}$ est tel que ${prop}. Quelle est sa nature (la plus précise possible) ?`, r: `C’est ${nature}.`, d: 3 };
    },
    () => {
      const [a, b, c, e] = lettres(4);
      const [prop, nature] = choix([
        ["avoir un angle droit", "un rectangle"],
        ["avoir deux côtés consécutifs de même longueur", "un losange"],
        ["avoir des diagonales de même longueur", "un rectangle"],
        ["avoir des diagonales perpendiculaires", "un losange"],
      ]);
      return { q: `Le parallélogramme $${a}${b}${c}${e}$ a une propriété de plus : ${prop}. Que peut-on dire de lui ?`, r: `C’est ${nature}.`, d: 3 };
    },
    () => {
      const [forme, n] = choix([
        ["un parallélogramme", 1], ["un rectangle", 1], ["un losange", 1], ["un carré", 1], ["un cercle", 1],
        ["un triangle équilatéral", 0], ["un trapèze isocèle", 0], ["un hexagone régulier", 1], ["un pentagone régulier", 0], ["un triangle quelconque", 0],
      ]);
      return { q: `Combien ${forme} possède-t-il de centre de symétrie ?`.replace(/possède-t-il/, "possède-t-il").replace("Combien un", "Combien de centres de symétrie un").replace("Combien une", "Combien de centres de symétrie une").replace(" possède-t-il de centre de symétrie ?", " possède-t-il ?"), r: `$${n}$`, d: 2 };
    },
    () => {
      const n = alea(3, 12);
      return { q: `Un polygone régulier a $${n}$ côtés. A-t-il un centre de symétrie ?`, r: n % 2 === 0 ? "Oui (le nombre de côtés est pair)." : "Non (le nombre de côtés est impair).", d: 3 };
    },
    () => {
      const c = alea(2, 20);
      return { q: `Un losange a un côté de $${c}$ cm. Quel est son périmètre ?`, r: `$${4 * c}$ cm`, d: 1 };
    },
    () => {
      const x = alea(60, 100), y = alea(60, 110), z = alea(60, 120);
      return { q: `Dans un quadrilatère, trois angles mesurent $${x}°$, $${y}°$ et $${z}°$. Combien mesure le quatrième ? (La somme des angles vaut $360°$.)`, r: `$${360 - x - y - z}°$`, d: 2 };
    },
  ],

  // ---------------------------------------------------------------- 5e-07
  "5e-07": [
    () => {
      const b = alea(3, 20), h = alea(2, 15);
      return { q: `Calcule l’aire d’un parallélogramme de base $${b}$ cm et de hauteur $${h}$ cm.`, r: `$${b * h}$ cm²`, d: 1 };
    },
    () => {
      const b = alea(2, 15) * 2, h = alea(2, 15);
      return { q: `Calcule l’aire d’un triangle de base $${b}$ cm et de hauteur $${h}$ cm.`, r: `$${b} × ${h} ÷ 2 = ${(b * h) / 2}$ cm²`, d: 2 };
    },
    () => {
      const r = alea(2, 15);
      return choix([
        { q: `Donne la valeur exacte de l’aire d’un disque de rayon $${r}$ cm.`, r: `$${r * r}π$ cm²`, d: 3 },
        { q: `Donne la valeur exacte du périmètre d’un cercle de rayon $${r}$ cm.`, r: `$${2 * r}π$ cm`, d: 3 },
        { q: `Donne la valeur exacte du périmètre d’un cercle de diamètre $${2 * r}$ cm.`, r: `$${2 * r}π$ cm`, d: 3 },
      ]);
    },
    () => {
      const L = alea(2, 15), l = alea(2, 12), h = alea(2, 10);
      return { q: `Calcule le volume d’un pavé droit de dimensions $${L}$ cm, $${l}$ cm et $${h}$ cm.`, r: `$${L * l * h}$ cm³`, d: 2 };
    },
    () => {
      const c = alea(2, 10);
      return { q: `Calcule le volume d’un cube d’arête $${c}$ cm.`, r: `$${c}^3 = ${c ** 3}$ cm³`, d: 2 };
    },
    () => {
      const b = alea(2, 10) * 2, h = alea(2, 10), H = alea(3, 15);
      return { q: `Un prisme droit a pour base un triangle de base $${b}$ cm et de hauteur $${h}$ cm. Sa hauteur est $${H}$ cm. Calcule son volume.`, r: `$(${b} × ${h} ÷ 2) × ${H} = ${((b * h) / 2) * H}$ cm³`, d: 3 };
    },
    () => {
      const A = alea(4, 50), H = alea(2, 15);
      return { q: `Un prisme droit a une base d’aire $${A}$ cm² et une hauteur de $${H}$ cm. Quel est son volume ?`, r: `$${A * H}$ cm³`, d: 2 };
    },
    () => {
      const r = alea(2, 10), h = alea(2, 15);
      return { q: `Donne la valeur exacte du volume d’un cylindre de rayon $${r}$ cm et de hauteur $${h}$ cm.`, r: `$${r * r * h}π$ cm³`, d: 3 };
    },
    () => {
      const x = alea(2, 90);
      const [de, vers, f, sens] = choix([["L", "dm³", 1, 1], ["dm³", "L", 1, 1], ["m³", "L", 1000, 1], ["cm³", "mL", 1, 1], ["L", "cm³", 1000, 1], ["mL", "cm³", 1, 1]]);
      return { q: `Convertis $${x}$ ${de} en ${vers}.`, r: `$${nb(x * f)}$ ${vers}`, d: 3 };
    },
    () => {
      const x = alea(2, 40);
      const [de, vers, f] = choix([["m²", "dm²", 100], ["dm²", "cm²", 100], ["cm²", "mm²", 100], ["m²", "cm²", 10000]]);
      return { q: `Convertis $${x}$ ${de} en ${vers}.`, r: `$${nb(x * f)}$ ${vers}`, d: 3 };
    },
    () => {
      const a = alea(3, 12), b = alea(2, 8), c = alea(2, 6), e = alea(2, 6);
      return { q: `Une figure est formée d’un rectangle de $${a}$ cm sur $${b}$ cm et d’un rectangle de $${c}$ cm sur $${e}$ cm, sans recouvrement. Quelle est son aire ?`, r: `$${a * b} + ${c * e} = ${a * b + c * e}$ cm²`, d: 3 };
    },
    () => {
      const b = alea(3, 12), h = alea(3, 12);
      return choix([
        { q: `Un parallélogramme a une aire de $${b * h}$ cm² et une base de $${b}$ cm. Quelle est sa hauteur ?`, r: `$${h}$ cm`, d: 3 },
        { q: `Un triangle a une aire de $${(b * h) / 2}$ cm² et une base de $${b}$ cm. Quelle est sa hauteur ?`, r: `$${h}$ cm`, d: 3 },
      ].filter((_, i) => i === 0 || (b * h) % 2 === 0));
    },
    () => {
      const c = choix([20, 25, 50]);
      const L = alea(2, 6) * (100 / c < 5 ? 1 : 1), l = alea(2, 6);
      const nL = (L * 100) / c, nl = (l * 100) / c;
      return { q: `On carrelle une pièce rectangulaire de $${L}$ m sur $${l}$ m avec des carreaux carrés de $${c}$ cm de côté. Combien de carreaux faut-il ?`, r: `$${nL} × ${nl} = ${nL * nl}$ carreaux`, d: 3 };
    },
  ],

  // ---------------------------------------------------------------- 5e-08
  "5e-08": [
    () => {
      const n = choix([3, 4, 5]);
      const m = alea(6, 16);
      let v;
      do {
        v = Array.from({ length: n - 1 }, () => alea(Math.max(1, m - 5), m + 5));
        v.push(m * n - v.reduce((somme, x) => somme + x, 0));
      } while (v[n - 1] < 0 || v[n - 1] > 25);
      return { q: `Calcule la moyenne de ces valeurs : ${liste(v)}.`, r: `$(${v.join(" + ")}) ÷ ${n} = ${m}$`, d: 2 };
    },
    () => {
      const n = alea(4, 7);
      const v = Array.from({ length: n }, () => alea(1, 30));
      return { q: `Calcule l’étendue de cette série : ${liste(v)}.`, r: `$${Math.max(...v)} - ${Math.min(...v)} = ${Math.max(...v) - Math.min(...v)}$`, d: 2 };
    },
    () => {
      const N = choix([4, 5, 10, 20, 25, 50]);
      const k = alea(1, N - 1);
      return { q: `Dans un groupe de $${N}$ élèves, $${k}$ ${k > 1 ? "portent" : "porte"} des lunettes. Quelle est la fréquence des élèves qui portent des lunettes ? Donne-la en pourcentage.`, r: `$${k}/${N} = ${nb((100 * k) / N)}\\,\\%$`, d: 3 };
    },
    () => {
      const e = Array.from({ length: alea(3, 5) }, () => alea(2, 15));
      return { q: `Dans un tableau, les effectifs sont ${liste(e)}. Quel est l’effectif total ?`, r: `$${e.join(" + ")} = ${e.reduce((s, x) => s + x, 0)}$`, d: 1 };
    },
    () => {
      const r = alea(1, 9), b = alea(1, 9);
      const [c1, c2] = choix([["rouge", "bleu"], ["vert", "jaune"], ["noir", "blanc"]]);
      const jetons = (n, c) => `$${n}$ jeton${n > 1 ? "s" : ""} ${c}${n > 1 ? "s" : ""}`;
      return { q: `Un sac contient ${jetons(r, c1)} et ${jetons(b, c2)}. On tire un jeton au hasard. Quelle est la probabilité qu’il soit ${c1} ?`, r: `$${simpl(r, r + b)}$`, d: 2 };
    },
    () => {
      const [ev, n] = choix([
        ["un nombre pair", 3], ["un nombre impair", 3], ["un multiple de 3", 2], ["un nombre supérieur ou égal à 5", 2],
        ["le nombre 6", 1], ["un nombre inférieur à 3", 2], ["un nombre premier", 3], ["un nombre différent de 1", 5],
      ]);
      return { q: `On lance un dé équilibré à six faces. Quelle est la probabilité d’obtenir ${ev} ?`, r: `$${simpl(n, 6)}$`, d: 2 };
    },
    () => {
      const p = choix([[1, 4], [3, 10], [2, 5], [7, 10], [1, 3], [0.2], [0.35], [0.6], [0.45]]);
      if (p.length === 2) return { q: `La probabilité de gagner à un jeu est $${p[0]}/${p[1]}$. Quelle est la probabilité de perdre ?`, r: `$${simpl(p[1] - p[0], p[1])}$`, d: 2 };
      return { q: `La probabilité de gagner à un jeu est $${dec(p[0], 2)}$. Quelle est la probabilité de perdre ?`, r: `$${dec(1 - p[0], 2)}$`, d: 2 };
    },
    () => {
      const x = choix([["1,2", false], ["-0,3", false], ["0,4", true], ["3/2", false], ["0", true], ["1", true], ["2/3", true], ["7/5", false], ["0,95", true], ["-1", false], ["5/4", false], ["1/8", true]]);
      return { q: `Une probabilité peut-elle être égale à $${x[0]}$ ?`, r: x[1] ? "Oui : elle est comprise entre $0$ et $1$." : "Non : une probabilité est toujours comprise entre $0$ et $1$.", d: 2 };
    },
    () => {
      const N = choix([20, 25, 40, 50, 200]);
      const k = alea(1, N - 1);
      return { q: `Sur un échantillon de $${N}$ personnes, $${k}$ préfèrent le chocolat. Quelle est la fréquence en pourcentage ?`, r: `$${nb((100 * k) / N)}\\,\\%$`, d: 3 };
    },
    () => {
      const a = alea(5, 19), b = alea(5, 19);
      const bb = (a + b) % 2 === 0 ? b : b + 1;
      return { q: `Léa a obtenu $${a}$ puis $${bb}$ à deux contrôles. Quelle est sa moyenne ?`, r: `$${(a + bb) / 2}$`, d: 1 };
    },
    () => {
      const n = alea(8, 30);
      const k = choix([2, 3, 4, 5]);
      const nb = Math.floor(n / k);
      return { q: `On tire au hasard un jeton numéroté de $1$ à $${n}$. Combien de jetons portent un multiple de $${k}$ ?`, r: `$${nb}$`, d: 3 };
    },
  ],
};
