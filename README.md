# Automatismes

Séries de questions flash en mathématiques pour le rituel de début de cours, de la 6e à la 3e. Le site se projette au tableau : une question à la fois, un minuteur, puis la correction qui se déplie sous la question.

Aucun serveur ni compte à créer : ce sont de simples fichiers, hébergés gratuitement par GitHub Pages.

## Mettre le site en ligne

1. Créer un dépôt sur GitHub (par exemple `automatismes`), en public.
2. Y déposer tout le contenu de ce dossier (bouton **Add file → Upload files**, ou `git push`).
3. Dans le dépôt : **Settings → Pages → Build and deployment**. Choisir **Deploy from a branch**, la branche `main` et le dossier `/ (root)`, puis enregistrer.
4. Après une ou deux minutes, le site est disponible à l’adresse `https://<identifiant>.github.io/automatismes/`.

Chaque modification déposée sur `main` met le site à jour automatiquement.

## Organisation des fichiers

```
index.html            la page (structure uniquement)
css/
  base.css            couleurs, polices, motif du coin plié, boutons
  accueil.css         écran de choix (niveaux, chapitres, série)
  diapo.css           diaporama plein écran
js/
  main.js             point d'entrée : relie les morceaux
  reglages.js         options proposées (niveaux, durées...) et mémorisation
  accueil.js          construction de la page de choix
  selection.js        tirage des questions d'une série
  generateurs.js      questions de calcul mental fabriquées au hasard
  diapo.js            diaporama, minuteur, correction, clavier
  maths.js            affichage des formules
  donnees.js          chargement des questions
data/
  6e.json 5e.json 4e.json 3e.json     la liste des chapitres, et quelques questions écrites à la main
scripts/
  verifier.mjs        contrôle des questions avant publication
vendor/               KaTeX (formules) et polices Fraunces et Atkinson Hyperlegible, hébergés ici
                      pour que le site fonctionne même sans accès à des services extérieurs
```

## Comment les questions sont fabriquées

Chaque chapitre a plusieurs **modèles de questions** (dans `js/chapitres/<niveau>.js`) dont les nombres sont tirés au hasard à chaque série. Un chapitre peut ainsi produire plus de mille questions différentes : on peut le retravailler autant de fois qu’on veut sans retomber sur les mêmes. Les quelques questions écrites à la main dans `data/<niveau>.json` viennent s’y mêler.

### Ajouter un modèle à un chapitre

Dans `js/chapitres/6e.js`, chaque chapitre est une liste de petites fonctions. Un modèle ressemble à ceci :

```js
() => {
  const a = alea(2, 9);
  const b = alea(11, 99);
  return { q: `Calcule : $${a} × ${b}$.`, r: `$${a * b}$`, d: 2 };
},
```

- `alea(min, max)` tire un entier au hasard, `choix([...])` choisit dans une liste.
- `q` : l’énoncé, `r` : la correction, `d` : la difficulté (`1` facile, `2` moyen, `3` difficile).
- Les formules s’écrivent entre `$ ... $`. Raccourcis acceptés : `3/4` (fraction), `sqrt(2)` (racine), `×`, `÷`, `²`, `°`, `π`, `∥`, `⊥`, `≈`, `≠`, `≤`, `≥`, `cos`, `sin`, `tan`, `%`, et la virgule décimale (`12,5`). Le langage LaTeX fonctionne aussi (`\\dfrac{a}{b}`, avec un antislash doublé dans le fichier).
- Les fonctions utiles (`dec` pour écrire avec une virgule, `fraction`, `pgcd`, `lettres` pour des noms de points...) sont dans `js/outils.js`.

### Ajouter une question fixe

Dans `data/<niveau>.json`, un chapitre ressemble à ceci :

```json
{
  "id": "6e-04",
  "titre": "Nombres décimaux",
  "questions": [
    { "q": "Compare $3,07$ et $3,7$.", "r": "$3,07 < 3,7$", "d": 1 }
  ]
}
```

L’ordre des chapitres dans le fichier est l’ordre de la progression : c’est lui qui sert au mode « Depuis le début ». Pour **ajouter un chapitre**, il faut un bloc dans le fichier `.json` et le même `id` dans le fichier `js/chapitres/<niveau>.js`, avec au moins 6 modèles.

## Vérifier avant de publier

Avec [Node.js](https://nodejs.org) installé :

```
npm run verifier
```

Le script contrôle que chaque chapitre peut produire au moins une centaine de questions différentes, signale toute formule qui ne s’afficherait pas (ou toute virgule écrite comme un point), et simule plus d’un millier de séries pour s’assurer qu’aucune n’est incomplète ou ne contient deux fois la même question.

## Tester sur son ordinateur

Le navigateur refuse de lire les fichiers `data/*.json` quand `index.html` est ouvert par double-clic. Pour tester en local, lancer un petit serveur depuis ce dossier :

```
npm run serveur
```

puis ouvrir <http://localhost:8000>. (Sans Node : `python3 -m http.server 8000`.)

## Raccourcis pendant une série

| Touche | Action |
| --- | --- |
| Flèche droite, Page suivante | question suivante |
| Flèche gauche, Page précédente | question précédente |
| C | afficher ou masquer la correction |
| P | pause du minuteur |
| F | plein écran |
| Échap | quitter la série |

Quand le temps est écoulé, la correction s’affiche d’elle-même.

## Crédits

- [KaTeX](https://katex.org) (licence MIT) pour l’affichage des formules.
- [Fraunces](https://github.com/undercasetype/Fraunces) (licence SIL OFL) pour les titres et les questions.
- [Atkinson Hyperlegible](https://www.brailleinstitute.org/freefont/) (licence SIL OFL), police conçue pour la lisibilité, pour les textes courants.

## Changer les couleurs

Toute la palette est en tête de `css/base.css` (variables `--fond`, `--encre`, `--accent`...). La palette actuelle est un camaïeu de bleus. Modifier ces quelques valeurs change l’apparence de tout le site.
