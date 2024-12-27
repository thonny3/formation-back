// models/paiement.js
const db = require("../db");

const getAllPaiement = () => db.query(`SELECT * FROM paiement;`);

const getPaiementById = (id_paiement) => db.query(`SELECT * FROM paiement WHERE id_paiement = ?;`, [id_paiement])

const createPaiement = (paiement) => db.query("INSERT INTO paiement SET ?", paiement);

const updatePaiement = (id_paiement, paiement) => db.query("UPDATE paiement SET ? WHERE id_paiement = ?", [paiement, id_paiement]);

const deletePaiement = (id_paiement) => db.query("DELETE FROM paiement WHERE id_paiement = ?", [id_paiement]);

module.exports = {
  getAllPaiement,
  getPaiementById,
  createPaiement,
  updatePaiement,
  deletePaiement
};
