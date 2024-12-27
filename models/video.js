const db = require('../db');

const getAllVideo = () => db.query('SELECT * FROM video');

const getVideoById = (id) => db.query('SELECT * FROM video WHERE id_video = ?', [id]);

const createVideo = (video) => db.query('INSERT INTO video (url, titre, duree, id_chap) VALUES ?', [video.map(v => [v.url, v.titre, v.duree, v.id_chap])]);

const updateVideo = (id, video) => db.query('UPDATE video SET ? WHERE id_video = ?', [video, id]);

const deleteVideo = (id) => db.query('DELETE FROM video WHERE id_video = ?', [id]);

const getVideoCorse = (id_chap) => db.query('SELECT * FROM video WHERE id_chap = ?', [id_chap]);

const getCountVideo  = (id_cours) =>db.query("SELECT COUNT(*) AS nb_video FROM video WHERE id_cours=?",[id_cours])

module.exports = { 
  getAllVideo, 
  getVideoById, 
  createVideo, 
  updateVideo, 
  deleteVideo,
  getVideoCorse,
  getCountVideo
};
