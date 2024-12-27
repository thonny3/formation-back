// models/livre.js
const db = require("../db");

const getAllLivre = () => db.query(`SELECT * FROM livre;`);

const getLivreById = (id_livre) => db.query(`SELECT * FROM livre WHERE id_livre = ?;`, [id_livre])

const createLivre = (livre) => db.query("INSERT INTO livre SET ?", livre);

const updateLivre = (id_livre, livre) =>
  db.query("UPDATE livre SET titre=?, auteur = ? , prix=?, type=?, stock=stock + ? WHERE id_livre = ?", 
                [livre["titre"],livre["auteur"],livre["prix"],livre["type"],livre["stock"], id_livre]);

const deleteLivre = (id_livre) =>
  db.query("DELETE FROM livre WHERE id_livre = ?", [id_livre]);

module.exports = {
  getAllLivre,
  getLivreById,
  createLivre,
  updateLivre,
  deleteLivre
};
