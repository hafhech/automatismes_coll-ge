// Questions de calcul mental fabriquées au hasard, niveau par niveau.
// Elles complètent les banques de questions : une série n'est donc jamais vide
// et le mode « Calcul mental » ne se répète pas.

const alea = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const choix = (liste) => liste[alea(0, liste.length - 1)];

// Nombre décimal écrit avec une virgule, sans zéros inutiles.
function dec(x, chiffres = 3) {
  return String(Number(x.toFixed(chiffres))).replace(".", ",");
}

// Terme signé pour écrire « ax + b » ou « a + (-b) ».
function terme(b) {
  return b < 0 ? `- ${-b}` : `+ ${b}`;
}

function entreParentheses(n) {
  return n < 0 ? `(${n})` : String(n);
}

const GENERATEURS = {
  "6e": [
    () => {
      const a = alea(2, 12);
      const b = alea(2, 12);
      return { q: `Calcule : $${a} × ${b}$.`, r: `$${a * b}$`, d: a > 9 || b > 9 ? 2 : 1 };
    },
    () => {
      const a = choix([5, 10, 15, 20, 25, 30, 35, 40, 45, 60, 65, 70, 75, 85, 90, 95]);
      return { q: `Complète : $${a} + … = 100$.`, r: `$${100 - a}$`, d: 1 };
    },
    () => {
      const m = alea(11, 399);
      const facteur = choix([10, 100]);
      const sens = choix(["×", "÷"]);
      const x = m / 10;
      const resultat = sens === "×" ? x * facteur : x / facteur;
      return { q: `Calcule : $${dec(x, 1)} ${sens} ${facteur}$.`, r: `$${dec(resultat)}$`, d: 2 };
    },
    () => {
      const n = alea(11, 99) * 2;
      return choix([
        { q: `Quelle est la moitié de $${n}$ ?`, r: `$${n / 2}$`, d: 1 },
        { q: `Quel est le double de $${n}$ ?`, r: `$${n * 2}$`, d: 1 },
      ]);
    },
    () => {
      const a = alea(11, 99);
      const b = alea(11, 99);
      return { q: `Calcule : $${dec(a / 10, 1)} + ${dec(b / 10, 1)}$.`, r: `$${dec((a + b) / 10, 1)}$`, d: 2 };
    },
  ],

  "5e": [
    () => {
      const a = alea(-12, 12) || 5;
      const b = alea(-12, 12) || -4;
      return { q: `Calcule : $${a} + ${entreParentheses(b)}$.`, r: `$${a + b}$`, d: 2 };
    },
    () => {
      const a = alea(-12, 12) || 7;
      const b = alea(-12, 12) || -3;
      return { q: `Calcule : $${a} - ${entreParentheses(b)}$.`, r: `$${a - b}$`, d: 2 };
    },
    () => {
      const pourcentage = choix([10, 20, 25, 50, 75]);
      const base = choix([20, 40, 60, 80, 120, 160, 200, 240]);
      return {
        q: `Calcule $${pourcentage} %$ de $${base}$.`,
        r: `$${(base * pourcentage) / 100}$`,
        d: pourcentage === 10 || pourcentage === 50 ? 1 : 2,
      };
    },
    () => {
      const a = alea(2, 9);
      const b = alea(2, 9);
      const c = alea(2, 9);
      return choix([
        { q: `Calcule : $${a} + ${b} × ${c}$.`, r: `$${a + b * c}$`, d: 1 },
        { q: `Calcule : $(${a} + ${b}) × ${c}$.`, r: `$${(a + b) * c}$`, d: 1 },
        { q: `Calcule : $${a * c + b} - ${a} × ${c}$.`, r: `$${b}$`, d: 2 },
      ]);
    },
    () => {
      const denominateur = alea(3, 10);
      const numerateur = alea(1, denominateur - 1);
      const n = denominateur * alea(2, 9);
      return { q: `Calcule $${numerateur}/${denominateur}$ de $${n}$.`, r: `$${(numerateur * n) / denominateur}$`, d: 2 };
    },
  ],

  "4e": [
    () => {
      const a = alea(-9, 9) || 4;
      const b = alea(-9, 9) || -6;
      return { q: `Calcule : $${entreParentheses(a)} × ${entreParentheses(b)}$.`, r: `$${a * b}$`, d: 1 };
    },
    () => {
      const a = alea(2, 5);
      const n = alea(2, a === 5 ? 3 : 4);
      return { q: `Calcule : $${a}^${n}$.`, r: `$${a ** n}$`, d: 1 };
    },
    () => {
      const x = alea(-6, 9);
      const a = alea(2, 9);
      const b = alea(-9, 9) || 3;
      return { q: `Résous : $${a}x ${terme(b)} = ${a * x + b}$.`, r: `$x = ${x}$`, d: 2 };
    },
    () => {
      const n = alea(11, 20);
      return { q: `Calcule : $${n}^2$.`, r: `$${n * n}$`, d: 2 };
    },
    () => {
      const a = alea(2, 7);
      const m = alea(2, 6);
      const n = alea(2, 6);
      return { q: `Écris sous la forme d’une seule puissance : $${a}^${m} × ${a}^${n}$.`, r: `$${a}^${m + n}$`, d: 3 };
    },
  ],

  "3e": [
    () => {
      const n = alea(2, 15);
      return { q: `Calcule : $sqrt(${n * n})$.`, r: `$${n}$`, d: 1 };
    },
    () => {
      const [nombre, resultat] = choix([
        [8, "2sqrt(2)"],
        [12, "2sqrt(3)"],
        [18, "3sqrt(2)"],
        [20, "2sqrt(5)"],
        [45, "3sqrt(5)"],
        [48, "4sqrt(3)"],
        [50, "5sqrt(2)"],
        [75, "5sqrt(3)"],
        [72, "6sqrt(2)"],
        [200, "10sqrt(2)"],
      ]);
      return { q: `Écris $sqrt(${nombre})$ sous la forme $a sqrt(b)$ avec $b$ le plus petit possible.`, r: `$${resultat}$`, d: 3 };
    },
    () => {
      const a = alea(1, 9);
      const signe = choix(["+", "-"]);
      return {
        q: `Développe : $(x ${signe} ${a})^2$.`,
        r: `$x^2 ${signe} ${2 * a}x + ${a * a}$`,
        d: 2,
      };
    },
    () => {
      const a = alea(2, 6);
      const b = alea(-9, 9) || 2;
      const x = alea(-5, 8);
      return { q: `Soit $f(x) = ${a}x ${terme(b)}$. Calcule $f(${x})$.`, r: `$${a * x + b}$`, d: 1 };
    },
    () => {
      const a = alea(2, 12);
      return { q: `Factorise : $x^2 - ${a * a}$.`, r: `$(x - ${a})(x + ${a})$`, d: 3 };
    },
  ],
};

// Renvoie une question de calcul mental pour le niveau demandé.
export function genererQuestion(niveau) {
  const liste = GENERATEURS[niveau] || GENERATEURS["6e"];
  return { ...choix(liste)(), chapitre: "Calcul mental" };
}
