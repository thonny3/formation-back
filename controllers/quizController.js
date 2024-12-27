// controllers/QuizController.js
const Quiz = require('../models/quiz')

const getAllQuiz = async (req, res) => {
  try {
    const [rows] = await Quiz.getAllQuiz();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuizById = async (req, res) => {
  try {
    const [rows] = await Quiz.getQuizById(req.params.id);
    if (rows.length === 0)
      return res
        .status(404)
        .json({ message: `Le numèro ${req.params.id} n'associe à aucun Quiz.` });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createQuiz = async (req, res) => {
  try {
    const result = await Quiz.createQuiz(req.body);
    res.status(201).json({
      message: `Quiz N°: ${result[0].insertId} a été enregistré.`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateQuiz = async (req, res) => {
  try {

    const result = await Quiz.updateQuiz(req.params.id, req.body);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: `Le numèro ${req.params.id} n'associe à aucun Quiz.` });
    res.json({ message: `Quiz n° : ${req.params.id} mis à jour.`});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const result = await Quiz.deleteQuiz(req.params.id);
    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ message: `Le numèro ${req.params.id} n'associe à aucun Quiz.` });
    res.json({ message: `Quiz n° : ${req.params.id} a été supprimé.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllQuiz,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz
};
