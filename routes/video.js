// routes/video.js
const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");
const auth = require('../controllers/authController')
router.get("/stream/:id", videoController.streamVideo);
router.get("/", videoController.getAllVideo);
router.get("/:id", videoController.getVideoById);
router.post("/",auth.tokenAuthentification,videoController.upload.array('files', 1), videoController.createVideo);
router.delete("/:id", videoController.deleteVideo);
router.get("/cours/:id", videoController.getVideoCorse);
router.get("/count/:id", videoController.getCountVideo);

module.exports = router;
