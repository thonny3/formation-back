// models/quiz.js
const db = require("../db");

const getAllQuiz = () => db.query(`SELECT * FROM quiz;`);

const getQuizById = (id_quiz) => db.query(`SELECT * FROM quiz WHERE id_quiz = ?;`, [id_quiz])

const createQuiz = (quiz) => db.query("INSERT INTO quiz SET ?", quiz);

const updateQuiz = (id_quiz, quiz) => db.query("UPDATE quiz SET ? WHERE id_quiz = ?", [quiz, id_quiz]);

const deleteQuiz = (id_quiz) => db.query("DELETE FROM quiz WHERE id_quiz = ?", [id_quiz]);

module.exports = {
  getAllQuiz,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz
};
