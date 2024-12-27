// models/examen.js
const db = require("../db");

const getAllExamen = () => db.query(`SELECT * FROM examen;`);

const getExamenById = (id_examen) => db.query(`SELECT * FROM examen WHERE id_examen = ?;`, [id_examen])

const createExamen = (examen) => db.query("INSERT INTO examen SET ?", examen);

const updateExamen = (id_examen, examen) => db.query("UPDATE examen SET ? WHERE id_examen = ?", [examen, id_examen]);

const deleteExamen = (id_examen) => db.query("DELETE FROM examen WHERE id_examen = ?", [id_examen]);

module.exports = {
  getAllExamen,
  getExamenById,
  createExamen,
  updateExamen,
  deleteExamen
};
