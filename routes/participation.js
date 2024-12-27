// routes/participation.js
const express = require("express");
const router = express.Router();
const participationController = require("../controllers/participationController");

router.get("/", participationController.getAllParticipation);
router.get("/:id", participationController.getParticipationById);
router.post("/", participationController.createParticipation);
router.put("/:id", participationController.updateParticipation);
router.delete("/:id", participationController.deleteParticipation);

module.exports = router;
