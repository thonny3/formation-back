const db = require('../db');

const getAllSupport = () => db.query('SELECT * FROM support');

const getSupportById = (id_support) => db.query('SELECT * FROM support WHERE id_support = ?', [id_support]);

const createSupport = (support) => db.query('INSERT INTO support (type, url, id_cours) VALUES ?', [support.map(s => [s.type, s.url, s.id_cours])]);

const updateSupport = (id_support, support) => db.query('UPDATE support SET ? WHERE id_support = ?', [support, id_support]);

const deleteSupport = (id_support) => db.query('DELETE FROM support WHERE id_support = ?', [id_support]);


module.exports = { 
  getAllSupport, 
  getSupportById, 
  createSupport, 
  updateSupport, 
  deleteSupport
};
