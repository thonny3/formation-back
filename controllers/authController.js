const Auth = require("../models/auth.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const loginUtilisateur = async (req, res) => {
  try {
    const [rows] = await Auth.getEmailUtilisateur(req.body.email);
    if (rows.length == 0) {
      return res
        .status(401)
        .json({ message: "Votre email ou mot de passe est incorrecte." });
    }

    const match = bcrypt.compareSync(req.body.mot_de_passe, rows[0].mot_de_passe);
    if (match) {
      const accessToken = generateAccessToken(rows[0]);
      const refreshToken = generateRefreshToken(rows[0]);
      const utilisateur = {
        id_utilisateur: rows[0].id_utilisateur,
        nom: rows[0].nom,
        email: rows[0].email,
        role: rows[0].role,
      }
      return res.json({ accessToken, refreshToken, utilisateur });
    } else {
      return res.status(401).send("Votre email ou mot de passe est incorrecte !");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const refreshToken = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
    try {
      if (err) {
        return res.sendStatus(401);
      }

      const [rows] = await Auth.getEmailUtilisateur(user.email);

      if (rows.length == 0) {
        return res
          .status(401)
          .json({ message: "Votre email ou mot de passe est incorrecte." });
      }

      if (rows[0].mot_de_passe !== user.mot_de_passe) {
        return res
          .status(401)
          .json({ message: "Votre email ou mot de passe est incorrecte." });
      }

      delete user.iat;
      delete user.exp;

      const accessToken = generateAccessToken(user);
      res.json({ accessToken: accessToken });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1y" });
};

const tokenAuthentification = (req, res, next) => {
  var authHeader = req.headers["authorization"];
  var token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }
    req.user = user;
    next();
  });
};

const generatePassword = (pwd) => {
  return bcrypt.hash(pwd, 8);
};

module.exports = {
  tokenAuthentification,
  refreshToken,
  loginUtilisateur,
  generatePassword,
};
