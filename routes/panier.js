// routes/livre.js
const express = require("express");
const router = express.Router();
const panierController = require("../controllers/panierController");

router.post("/",panierController.createPanier);
router.delete("/:id",panierController.deletePanier);
router.get("/:id",panierController.getPayementByUser);


module.exports = router;
