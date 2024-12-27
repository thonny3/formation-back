// controllers/LivreController.js
const Livre = require('../models/livre')

const getAllLivre = async (req, res) => {
  try {
    const [rows] = await Livre.getAllLivre();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLivreById = async (req, res) => {
  try {
    const [rows] = await Livre.getLivreById(req.params.id);
    if (rows.length === 0)
      return res
        .status(404)
        .json({ message: `Le numèro ${req.params.id} n'associe à aucun Livre.` });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createLivre = async (req, res) => {
  try {
    const result = await Livre.createLivre(req.body);
    res.status(201).json({
      message: `Livre N°: ${result[0].insertId} a été enregistré.`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLivre = async (req, res) => {
  try {
    
    const result = await Livre.updateLivre(req.params.id, req.body);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: `Le numèro ${req.params.id} n'associe à aucun Livre.` });
    res.json({ message: `Livre n° : ${req.params.id} mis à jour.`});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLivre = async (req, res) => {
  try {
    const result = await Livre.deleteLivre(req.params.id);
    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ message: `Le numèro ${req.params.id} n'associe à aucun Livre.` });
    res.json({ message: `Livre n° : ${req.params.id} a été supprimé.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllLivre,
  getLivreById,
  createLivre,
  updateLivre,
  deleteLivre
};
