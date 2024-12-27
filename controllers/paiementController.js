// controllers/PaiementController.js
const Paiement = require('../models/paiement')

const getAllPaiement = async (req, res) => {
  try {
    const [rows] = await Paiement.getAllPaiement();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPaiementById = async (req, res) => {
  try {
    const [rows] = await Paiement.getPaiementById(req.params.id);
    if (rows.length === 0)
      return res
        .status(404)
        .json({ message: `Le numèro ${req.params.id} n'associe à aucun paiement.` });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPaiement = async (req, res) => {
  try {
    const result = await Paiement.createPaiement(req.body);
    res.status(201).json({
      message: `Votre paiement a été succès !`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPaiement,
  getPaiementById,
  createPaiement
};
