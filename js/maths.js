// Mise en forme des textes : les formules écrites entre $...$ sont rendues par KaTeX.
//
// Dans les fichiers de questions on écrit les maths de façon simple :
//   3/4  ->  fraction        sqrt(2)  ->  racine carrée
//   ×  ÷  ²  °  π  ∥  ⊥     ->  symboles
//   12,5 ->  virgule décimale correctement espacée

export function pretraiter(math) {
  return math
    .replace(/(\d),(\d)/g, "$1{,}$2")
    .replace(/(\d) (?=\d{3}\b)/g, "$1\\,")
    .replace(/−/g, "-")
    .replace(/×/g, "\\times ")
    .replace(/÷/g, "\\div ")
    .replace(/²/g, "^2")
    .replace(/³/g, "^3")
    .replace(/°/g, "^\\circ ")
    .replace(/π/g, "\\pi ")
    .replace(/∥/g, "\\parallel ")
    .replace(/⊥/g, "\\perp ")
    .replace(/≈/g, "\\approx ")
    .replace(/≠/g, "\\neq ")
    .replace(/≤/g, "\\leq ")
    .replace(/≥/g, "\\geq ")
    .replace(/→/g, "\\to ")
    .replace(/…/g, "\\ldots ")
    .replace(/\b(cos|sin|tan)\b/g, "\\$1 ")
    .replace(/%/g, "\\%")
    .replace(/(\d+)\/(\d+)/g, "\\dfrac{$1}{$2}")
    .replace(/sqrt\(([^()]*)\)/g, "\\sqrt{$1}");
}

function echapper(texte) {
  return texte
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/ ([?!:;»])/g, " $1")
    .replace(/« /g, "« ");
}

export function formater(texte) {
  return texte
    .split(/(\$[^$]+\$)/g)
    .map((morceau) => {
      const estFormule = morceau.length > 2 && morceau.startsWith("$") && morceau.endsWith("$");
      if (!estFormule) return echapper(morceau);

      const source = morceau.slice(1, -1);
      if (globalThis.katex) {
        try {
          return globalThis.katex.renderToString(pretraiter(source), { throwOnError: false });
        } catch {
          // On retombe sur le texte brut ci-dessous.
        }
      }
      return `<span class="maths-brut">${echapper(source)}</span>`;
    })
    .join("");
}
