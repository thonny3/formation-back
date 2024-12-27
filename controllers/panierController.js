const Panier = require('../models/panier');


const createPanier = async (req, res) => {
  try {
    const result = await Panier.createPanier(req.body);
    res.status(201).json({
      message: `Cours a ajouté panier !`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deletePanier = async (req, res) => {
    try {
      const result = await Panier.deletePanier(req.params.id);
      if (result.affectedRows === 0)
        return res
          .status(404)
          .json({ message: `Le numèro ${req.params.id} n'associe à aucun panier.` });
      res.json({ message: "panier a été supprimer" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
const getPayementByUser = async (req, res) => {
    try {
      const [rows] = await Panier.getPayementByUser(req.params.id);
      if (rows.length === 0)
        return res
          .status(404)
          .json({ message: `Le numèro ${req.params.id} n'associe à aucun panier.` });
      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = {
    createPanier,
    deletePanier,
    getPayementByUser
 
  };
  