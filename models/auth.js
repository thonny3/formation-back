const db = require('../db');

const getEmailUtilisateur = (email) => db.query("SELECT * FROM utilisateur WHERE email = ?", [email]);
module.exports = { getEmailUtilisateur };