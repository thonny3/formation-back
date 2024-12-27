// controllers/ExamenController.js
const Examen = require('../models/examen')

const getAllExamen = async (req, res) => {
  try {
    const [rows] = await Examen.getAllExamen();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getExamenById = async (req, res) => {
  try {
    const [rows] = await Examen.getExamenById(req.params.id);
    if (rows.length === 0)
      return res
        .status(404)
        .json({ message: `Le numèro ${req.params.id} n'associe à aucun Examen.` });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createExamen = async (req, res) => {
  try {
    const result = await Examen.createExamen(req.body);
    res.status(201).json({
      message: `Examen N°: ${result[0].insertId} a été enregistré.`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateExamen = async (req, res) => {
  try {

    const result = await Examen.updateExamen(req.params.id, req.body);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: `Le numèro ${req.params.id} n'associe à aucun Examen.` });
    res.json({ message: `Examen n° : ${req.params.id} mis à jour.`});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteExamen = async (req, res) => {
  try {
    const result = await Examen.deleteExamen(req.params.id);
    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ message: `Le numèro ${req.params.id} n'associe à aucun Examen.` });
    res.json({ message: `Examen n° : ${req.params.id} a été supprimé.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllExamen,
  getExamenById,
  createExamen,
  updateExamen,
  deleteExamen
};
