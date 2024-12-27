// routes/inscription.js
const express = require("express");
const router = express.Router();
const inscriptionController = require("../controllers/inscriptionController");

router.get("/", inscriptionController.getAllInscription);
router.get("/:id", inscriptionController.getInscriptionById);
router.post("/", inscriptionController.createInscription);
router.put("/:id", inscriptionController.updateInscription);
router.delete("/:id", inscriptionController.deleteInscription);

module.exports = router;
