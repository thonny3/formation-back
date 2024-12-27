// routes/livre.js
const express = require("express");
const router = express.Router();
const livreController = require("../controllers/livreController");

router.get("/", livreController.getAllLivre);
router.get("/:id", livreController.getLivreById);
router.post("/", livreController.createLivre);
router.put("/:id", livreController.updateLivre);
router.delete("/:id", livreController.deleteLivre);

module.exports = router;
