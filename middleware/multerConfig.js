// middlewares/upload.js
const multer = require('multer');
const path = require('path');

// Configuration de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/image_cours/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

// Filtrer les fichiers pour n'autoriser que les images
const fileFilter = (req, file, cb) => {
  
  const filetypes = /png|jpeg|jpg/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Seules les images au format png ou jpeg sont autorisées !'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 3000000 }, // Limite de taille à 3 Mo
  fileFilter: fileFilter
});

module.exports = upload;
