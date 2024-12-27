// routes/support.js
const express = require("express");
const router = express.Router();
const supportController = require("../controllers/supportController");

router.get("/", supportController.getAllSupport);
router.get("/:id", supportController.getSupportById);
router.post("/",supportController.upload.array('files', 1), supportController.createSupport);
router.delete("/:id", supportController.deleteSupport);

module.exports = router;
