// routes/utilisateur.js
const express = require("express");
const router = express.Router();
const paiementController = require("../controllers/paiementController");

router.get("/", paiementController.getAllPaiement);
router.get("/:id", paiementController.getPaiementById);
router.post("/", paiementController.createPaiement);

module.exports = router;
