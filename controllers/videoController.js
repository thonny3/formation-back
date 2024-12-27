const Video = require('../models/video');
const multer = require('multer');
const path = require('path');
const fs = require('fs')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/video/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  
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


const getAllVideo = async (req, res) => {
  try {
    const [rows] = await Video.getAllVideo();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVideoById = async (req, res) => {
  try {
    const [rows] = await Video.getVideoById(req.params.id);
    if (rows.length === 0) return res.status(404).json({ message: 'Cette video n\'existe pas .' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createVideo = async (req, res) => {
  try {

    if (req.files) {
      const videos = req.files.map((file) => ({
        url: `uploads/video/${file.originalname}`,
        titre : req.body.titre,
        duree : '11:20',
        id_chap: req.body.id_chap
      }));
      const result = await Video.createVideo(videos);
      res.status(201).json({ message: `Video n°: ${result[0].insertId} a été enregistré.`});
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteVideo = async (req, res) => {
  try {
    const result = await Video.deleteVideo(req.params.id);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Video ne pas trouver.' });
    res.json({ message: 'Video supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const streamVideo =  async (req, res)=>{
  try {
    const [rows] = await Video.getVideoById(req.params.id);
    const videoPath = path.join(__dirname, '../'+rows[0].url);
    const videoSize = fs.statSync(videoPath).size;
    
    const range = req.headers.range;
    if (!range) {
        return res.status(400).send("Requires Range header");
    }
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    if (start >= videoSize || end < start) {
        return res.status(416).send("Requested Range Not Satisfiable");
    }

    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);

    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
}


const getVideoCorse = async (req, res) => {
  try {
    const [rows] = await Video.getVideoCorse(req.params.id);
    if (rows.length === 0) return res.status(404).json({ message: 'Cette video n\'existe pas .' });
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCountVideo = async (req, res) => {
  try {
    const [rows] = await Video.getCountVideo(req.params.id);
    if (rows.length === 0) return res.status(404).json({ message: 'Cette video n\'existe pas .' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { getAllVideo, getVideoById, createVideo, deleteVideo, upload,streamVideo,getVideoCorse ,getCountVideo};

