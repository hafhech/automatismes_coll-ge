// Regroupe les générateurs de questions des quatre niveaux, par identifiant de chapitre.

import g6 from "./6e.js";
import g5 from "./5e.js";
import g4 from "./4e.js";
import g3 from "./3e.js";

export const GENERATEURS_CHAPITRES = { ...g6, ...g5, ...g4, ...g3 };
