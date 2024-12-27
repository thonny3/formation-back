// models/paiement.js
const db = require("../db");

const getPayementByUser = (id_util) => db.query(`SELECT panier.id_pan,cours.titre,cours.description,cours.image_couverture,cours.prix,cours.id_cours FROM panier INNER JOIN cours WHERE panier.id_cours=cours.id_cours  AND panier.id_util = ?;`, [id_util])

const createPanier = (panier) => db.query("INSERT INTO panier SET ?", panier);


const deletePanier = (id_pan) => db.query("DELETE FROM panier WHERE id_pan = ?", [id_pan]);

module.exports = {
 getPayementByUser,
 createPanier,
 deletePanier
};
