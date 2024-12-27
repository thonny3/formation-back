const db = require("../db");

const getAllCours = () => db.query(`SELECT * FROM cours;`);

const getCoursById = (id_cours) => db.query(`SELECT panier.id_pan,cours.image_couverture,cours.titre FROM cours WHERE id_cours = ?;`, [id_cours]);

const createCours = (cours) => db.query("INSERT INTO cours SET ?", cours);

const updateCours = (id_cours, cours) => db.query("UPDATE cours SET ? WHERE id_cours = ?", [cours, id_cours]);

const deleteCours = (id_cours) => db.query("DELETE FROM cours WHERE id_cours = ?", [id_cours]);

const getAllUserCours = (id_user) => db.query("SELECT * FROM cours WHERE id_instructeur = ?", [id_user]);

const getChapitresByCours = (id_cours) => db.query(`SELECT * FROM chapitre WHERE id_cours = ?;`, [id_cours]);

const getListPubCours = () => db.query("SELECT cours.id_cours, cours.titre,cours.prix,cours.image_couverture,cours.description, utilisateur.nom, COUNT(video.id_video) AS nombre_videos FROM cours LEFT JOIN chapitre ON cours.id_cours = chapitre.id_cours LEFT JOIN video ON chapitre.id_chap = video.id_chap LEFT JOIN utilisateur ON cours.id_instructeur = utilisateur.id_utilisateur GROUP BY cours.id_cours, cours.titre, utilisateur.nom  ORDER BY RAND() LIMIT 0, 25; ")

// Nouvelle méthode pour insérer des chapitres
const createChapitres = (chapitres, id_cours) => {
  const values = chapitres.map(chapitre => [
    chapitre.titre || null, // Si le titre est vide, insérer null
    id_cours
  ]);
  return db.query("INSERT INTO chapitre (titre, id_cours) VALUES ?", [values]);
};

module.exports = {
  getAllCours,
  getCoursById,
  createCours,
  updateCours,
  deleteCours,
  getAllUserCours,
  createChapitres, // Assurez-vous que cette méthode est exportée
  getChapitresByCours,
  getListPubCours
};
