const Cours = require('../models/cours');

const getAllCours = async (req, res) => {
  try {
    const [rows] = await Cours.getAllCours();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCoursById = async (req, res) => {
  try {
    const [rows] = await Cours.getCoursById(req.params.id);
    if (rows.length === 0)
      return res
        .status(404)
        .json({ message: `Le numèro ${req.params.id} n'associe à aucun Cours.` });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCours = async (req, res) => {
  const { chapitres, ...coursData } = req.body; // Extraire les chapitres et les autres données du cours
  const imageCouverture = req.file ? req.file.path : null; // Récupérer le chemin de l'image de couverture

  try {
    // Inclure l'image de couverture dans les données du cours
    const result = await Cours.createCours({ ...coursData, image_couverture: imageCouverture });
    const id_cours = result[0].insertId; // ID du cours créé
    console.log(id_cours);

    // Si des chapitres sont fournis, les insérer
    if (chapitres && chapitres.length > 0) {
      await Cours.createChapitres(chapitres, id_cours); // Créer les chapitres associés au cours
    } else {
      // Si aucun chapitre n'est fourni, insérer un chapitre avec titre null
      const defaultChapitre = {
        titre: null, // Définit explicitement le titre à null
        description: `Chapitre basé sur le cours ${coursData.titre || "sans titre"}`, // Optionnel : ajouter une description
        id_cours: id_cours, // Associer le chapitre au cours créé
      };

      await Cours.createChapitres([defaultChapitre], id_cours); // Créer un chapitre avec titre null
    }

    res.status(201).json({
      message: `Cours N°: ${id_cours} a été enregistré avec ${chapitres ? chapitres.length : 1} chapitre(s).`,
      image_couverture: imageCouverture // Ajouter l'URL de l'image dans la réponse
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCours = async (req, res) => {
  try {
    const result = await Cours.updateCours(req.params.id, req.body);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: `Le numèro ${req.params.id} n'associe à aucun Cours.` });
    res.json({ message: `Cours n° : ${req.params.id} mis à jour.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCours = async (req, res) => {
  try {
    const result = await Cours.deleteCours(req.params.id);
    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ message: `Le numèro ${req.params.id} n'associe à aucun Cours.` });
    res.json({ message: `Cours n° : ${req.params.id} a été supprimé.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUserCours = async (req, res) => {
  try {
    const [rows] = await Cours.getAllUserCours(req.params.id);
    if (rows.length === 0)
      return res
        .status(404)
        .json({ message: `Le numèro ${req.params.id} n'associe à aucun Cours.` });
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getChapitresByCours = async (req, res) => {
  try {
    const [rows] = await Cours.getChapitresByCours(req.params.id);
    if (rows.length === 0)
      return res
        .json({ message: `Le numèro ${req.params.id} n'associe à aucun Cours.` ,status:205});
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getListPubCours = async (req, res) => {
  try {
    const [rows] = await Cours.getListPubCours();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCours,
  getCoursById,
  createCours,
  updateCours,
  deleteCours,
  getAllUserCours,
  getChapitresByCours,
  getListPubCours
};
