// controllers/InscriptionController.js
const Inscription = require('../models/inscription')

const getAllInscription = async (req, res) => {
  try {
    const [rows] = await Inscription.getAllInscription();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getInscriptionById = async (req, res) => {
  try {
    const [rows] = await Inscription.getInscriptionById(req.params.id);
    if (rows.length === 0)
      return res
        .status(404)
        .json({ message: `Le numèro ${req.params.id} n'associe à aucun Inscription.` });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createInscription = async (req, res) => {
  try {
    const result = await Inscription.createInscription(req.body);
    res.status(201).json({
      message: `Inscription N°: ${result[0].insertId} a été enregistré.`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateInscription = async (req, res) => {
  try {

    const result = await Inscription.updateInscription(req.params.id, req.body);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: `Le numèro ${req.params.id} n'associe à aucun Inscription.` });
    res.json({ message: `Inscription n° : ${req.params.id} mis à jour.`});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteInscription = async (req, res) => {
  try {
    const result = await Inscription.deleteInscription(req.params.id);
    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ message: `Le numèro ${req.params.id} n'associe à aucun Inscription.` });
    res.json({ message: `Inscription n° : ${req.params.id} a été supprimé.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllInscription,
  getInscriptionById,
  createInscription,
  updateInscription,
  deleteInscription
};
