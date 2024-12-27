// models/participation.js
const db = require("../db");

const getAllParticipation = () => db.query(`SELECT * FROM participation;`);

const getParticipationById = (id_participation) => db.query(`SELECT * FROM participation WHERE id_participation = ?;`, [id_participation])

const createParticipation = (participation) => db.query("INSERT INTO participation SET ?", participation);

const updateParticipation = (id_participation, participation) => db.query("UPDATE participation SET ? WHERE id_participation = ?", [participation, id_participation]);

const deleteParticipation = (id_participation) => db.query("DELETE FROM participation WHERE id_participation = ?", [id_participation]);

module.exports = {
  getAllParticipation,
  getParticipationById,
  createParticipation,
  updateParticipation,
  deleteParticipation
};


