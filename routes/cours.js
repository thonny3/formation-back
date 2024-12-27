// routes/cours.js
const express = require("express");
const upload = require('../middleware/multerConfig'); // Importez votre configuration multer
const router = express.Router();
const coursController = require("../controllers/coursController");
const auth = require('../controllers/authController')
router.get("/",auth.tokenAuthentification, coursController.getAllCours);
router.get("/:id",auth.tokenAuthentification, coursController.getCoursById);
router.post("/", upload.single('image_couverture'), coursController.createCours); // Utilisez le middleware ici
router.put("/:id",auth.tokenAuthentification, coursController.updateCours);
router.delete("/:id",auth.tokenAuthentification, coursController.deleteCours);
router.get("/user/:id",auth.tokenAuthentification,coursController.getAllUserCours)
router.get("/chapitre/:id",coursController.getChapitresByCours)
router.get("/all/list",coursController.getListPubCours)
module.exports = router;
