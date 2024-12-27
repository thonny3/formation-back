// controllers/ParticipationController.js
const Participation = require('../models/participation')

const getAllParticipation = async (req, res) => {
  try {
    const [rows] = await Participation.getAllParticipation();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getParticipationById = async (req, res) => {
  try {
    const [rows] = await Participation.getParticipationById(req.params.id);
    if (rows.length === 0)
      return res
        .status(404)
        .json({ message: `Le numèro ${req.params.id} n'associe à aucun Participation.` });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createParticipation = async (req, res) => {
  try {
    const result = await Participation.createParticipation(req.body);
    res.status(201).json({
      message: `Participation N°: ${result[0].insertId} a été enregistré.`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateParticipation = async (req, res) => {
  try {

    const result = await Participation.updateParticipation(req.params.id, req.body);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: `Le numèro ${req.params.id} n'associe à aucun Participation.` });
    res.json({ message: `Participation n° : ${req.params.id} mis à jour.`});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteParticipation = async (req, res) => {
  try {
    const result = await Participation.deleteParticipation(req.params.id);
    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ message: `Le numèro ${req.params.id} n'associe à aucun Participation.` });
    res.json({ message: `Participation n° : ${req.params.id} a été supprimé.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllParticipation,
  getParticipationById,
  createParticipation,
  updateParticipation,
  deleteParticipation
};
