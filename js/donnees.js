// Chargement des banques de questions (un fichier JSON par niveau dans data/).

const cache = new Map();

export async function chargerNiveau(id) {
  if (cache.has(id)) return cache.get(id);

  const reponse = await fetch(`data/${id}.json`);
  if (!reponse.ok) {
    throw new Error(`Les questions du niveau ${id} sont introuvables (erreur ${reponse.status}).`);
  }

  const donnees = await reponse.json();
  cache.set(id, donnees);
  return donnees;
}
