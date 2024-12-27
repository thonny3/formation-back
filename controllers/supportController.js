const Support = require('../models/support');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/support/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  
  const filetypes = /pdf|doc|pptx|/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Seules les documents sont autorisées !'));
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });


const getAllSupport = async (req, res) => {
  try {
    const [rows] = await Support.getAllSupport();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSupportById = async (req, res) => {
  try {
    const [rows] = await Support.getSupportById(req.params.id);
    if (rows.length === 0) return res.status(404).json({ message: 'Cette Support n\'existe pas .' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSupport = async (req, res) => {
  try {

    if (req.files) {
      const Supports = req.files.map((file) => ({
        url: `uploads/support/${file.originalname}`,
        type : req.body.type,
        id_cours: 1
      }));
      const result = await Support.createSupport(Supports);
      res.status(201).json({ message: `Support n°: ${result[0].insertId} a été enregistré.`});
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteSupport = async (req, res) => {
  try {
    const result = await Support.deleteSupport(req.params.id);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Support ne pas trouver.' });
    res.json({ message: 'Support supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllSupport, getSupportById, createSupport, deleteSupport, upload };

