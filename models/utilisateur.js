// models/utilisateur.js
const db = require("../db");

const getAllUtilisateur = () => db.query(`SELECT id_utilisateur, nom, email, mot_de_passe, date_inscription, role, telephone, photo
  FROM utilisateur;`);

const getUtilisateurById = (id_utilisateur) => db.query(`SELECT id_utilisateur, nom, email, mot_de_passe, date_inscription, role, telephone, photo
  FROM utilisateur WHERE id_utilisateur = ?;`, [id_utilisateur])

const createUtilisateur = (utilisateur) => db.query("INSERT INTO utilisateur SET ?", utilisateur);

const updateUtilisateur = (id_utilisateur, utilisateur) =>
  db.query("UPDATE utilisateur SET ? WHERE id_utilisateur = ?", [utilisateur, id_utilisateur]);

const deleteUtilisateur = (id_utilisateur) =>
  db.query("DELETE FROM utilisateur WHERE id_utilisateur = ?", [id_utilisateur]);


const InsertOrUpdatePhotoUtilisateur = (photo, id_utilisateur) =>
  db.query("UPDATE utilisateur SET photo=? WHERE id_utilisateur = ?", [photo, id_utilisateur]);

module.exports = {
  getAllUtilisateur,
  getUtilisateurById,
  createUtilisateur,
  updateUtilisateur,
  deleteUtilisateur,
  InsertOrUpdatePhotoUtilisateur
};
