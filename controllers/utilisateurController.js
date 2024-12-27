// controllers/utilisateurController.js
const Utilisateur = require('../models/utilisateur')
const Auth = require("./authController");

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profile/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  
  const filetypes = /png|jpeg|/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Seules les images au format png ou jpeg sont autorisées !'));
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });



const getAllUtilisateur = async (req, res) => {
  try {
    const [rows] = await Utilisateur.getAllUtilisateur();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUtilisateurById = async (req, res) => {
  try {
    const [rows] = await Utilisateur.getUtilisateurById(req.params.id);
    if (rows.length === 0)
      return res
        .status(404)
        .json({ message: `Le numèro ${req.params.id} n'associe à aucun utilisateur.` });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUtilisateur = async (req, res) => {
  try {
    const data = req.body;
    const mot_de_passe = await Auth.generatePassword(req.body.mot_de_passe);
    data["mot_de_passe"] = mot_de_passe;
    const result = await Utilisateur.createUtilisateur(data);
    res.status(201).json({
      message: `${req.body.nom} a été bien ajouté.`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUtilisateur = async (req, res) => {
  try {
    const data = req.body;
    const mot_de_passe = await Auth.generatePassword(req.body.mot_de_passe);
    data["mot_de_passe"] = mot_de_passe;
    const result = await Utilisateur.updateUtilisateur(req.params.id, data);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: `${req.params.id} n'associe à aucun Utilisateur.` });
    res.json({ message: "Utilisateur mis à jour." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const insertOrUpdatePhotoUtilisateur = async (req, res) => {
  try {
    if (req.files) {
      const photo = req.files.map((file) => ({
        photo: `uploads/profile/${file.originalname}`,
      }));
      const result = await Utilisateur.InsertOrUpdatePhotoUtilisateur(photo[0].photo, req.params.id);
      res.status(201).json({ message: `Mise en jour de la profile d'utilisateur n°: ${req.params.id} a été enregistré.`});
    }  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUtilisateur = async (req, res) => {
  try {
    const result = await Utilisateur.deleteUtilisateur(req.params.id);
    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ message: `Le numèro ${req.params.id} n'associe à aucun utilisateur.` });
    res.json({ message: "Utilisateur supprimé." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllUtilisateur,
  getUtilisateurById,
  createUtilisateur,
  updateUtilisateur,
  deleteUtilisateur,
  insertOrUpdatePhotoUtilisateur,
  upload
};
