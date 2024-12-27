const Fichiers = require('../models/fichiers');

const getAllFichiers = async (req, res) => {
  try {
    const [rows] = await Fichiers.getAllFichiers();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFichierById = async (req, res) => {
  try {
    const [rows] = await Fichiers.getFichierById(req.params.id);
    if (rows.length === 0) return res.status(404).json({ message: 'Fichier not found' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFichierByRappId = async (req, res) => {
  try {
    const [rows] = await Fichiers.getAllFichiersByRapp(req.params.rapp_id);
    if (rows.length === 0) return res.status(404).json({ message: 'Fichier not found' });
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFichier = async (req, res) => {
  try {
    const result = await Fichiers.createFichier(req.body);
    res.status(201).json({ fichier_id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateFichier = async (req, res) => {
  try {
    const result = await Fichiers.updateFichier(req.params.id, req.body);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Fichier not found' });
    res.json({ message: 'Fichier updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFichier = async (req, res) => {
  try {
    const result = await Fichiers.deleteFichier(req.params.id);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Fichier not found' });
    res.json({ message: 'Fichier deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllFichiers, getFichierById, createFichier, updateFichier, deleteFichier, getFichierByRappId };


const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Configuration de multer pour accepter uniquement les vidéos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Répertoire où les vidéos seront stockées
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  // Accepter uniquement les fichiers vidéo
  const filetypes = /mp4|avi|mkv|mov/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Seules les vidéos sont autorisées !'));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Route pour uploader la vidéo
app.post('/upload', upload.single('video'), (req, res) => {
  try {
    res.send('Vidéo uploadée avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
});