// models/inscription.js
const db = require("../db");

const getAllInscription = () => db.query(`SELECT * FROM inscription;`);

const getInscriptionById = (id_inscription) => db.query(`SELECT * FROM inscription WHERE id_inscription = ?;`, [id_inscription])

const createInscription = (inscription) => db.query("INSERT INTO inscription SET ?", inscription);

const updateInscription = (id_inscription, inscription) => db.query("UPDATE inscription SET ? WHERE id_inscription = ?", [inscription, id_inscription]);

const deleteInscription = (id_inscription) => db.query("DELETE FROM inscription WHERE id_inscription = ?", [id_inscription]);

module.exports = {
  getAllInscription,
  getInscriptionById,
  createInscription,
  updateInscription,
  deleteInscription
};

