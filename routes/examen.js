// routes/examen.js
const express = require("express");
const router = express.Router();
const examenController = require("../controllers/examenController");

router.get("/", examenController.getAllExamen);
router.get("/:id", examenController.getExamenById);
router.post("/", examenController.createExamen);
router.put("/:id", examenController.updateExamen);
router.delete("/:id", examenController.deleteExamen);

module.exports = router;
