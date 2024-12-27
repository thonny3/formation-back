-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 27 août 2024 à 14:45
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `formation`
--

-- --------------------------------------------------------

--
-- Structure de la table `cours`
--

DROP TABLE IF EXISTS `cours`;
CREATE TABLE IF NOT EXISTS `cours` (
  `id_cours` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(45) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `prix` decimal(10,0) DEFAULT NULL,
  `date_creation` date DEFAULT NULL,
  `id_instructeur` int(11) NOT NULL,
  PRIMARY KEY (`id_cours`),
  KEY `fk_cours_utilisateur1_idx` (`id_instructeur`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `cours`
--

INSERT INTO `cours` (`id_cours`, `titre`, `description`, `prix`, `date_creation`, `id_instructeur`) VALUES
(1, 'WEB DEVELOPPEMENT', 'Technologie Avance', '450000', '2024-08-26', 1),
(2, 'ADMINISTRATION SYSTEME ET RESEAU', 'Securisation Informatique', '2350000', '2024-08-27', 2),
(3, 'ADMINISTRATION SYSTEME ET RESEAU', 'Firewall (Pfsense)', '2350000', '2024-08-27', 2);

-- --------------------------------------------------------

--
-- Structure de la table `examen`
--

DROP TABLE IF EXISTS `examen`;
CREATE TABLE IF NOT EXISTS `examen` (
  `id_examen` int(11) NOT NULL AUTO_INCREMENT,
  `date_examen` date DEFAULT NULL,
  `heure_examen` time DEFAULT NULL,
  `duree` time DEFAULT NULL,
  `lien` varchar(255) DEFAULT NULL,
  `id_cours` int(11) NOT NULL,
  PRIMARY KEY (`id_examen`),
  KEY `fk_examen_cours1_idx` (`id_cours`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `examen`
--

INSERT INTO `examen` (`id_examen`, `date_examen`, `heure_examen`, `duree`, `lien`, `id_cours`) VALUES
(1, '2024-01-02', '15:30:00', '03:00:00', 'http://examen', 1),
(2, '2024-01-02', '16:30:00', '02:30:00', 'http://examen', 2);

-- --------------------------------------------------------

--
-- Structure de la table `inscription`
--

DROP TABLE IF EXISTS `inscription`;
CREATE TABLE IF NOT EXISTS `inscription` (
  `id_inscription` int(11) NOT NULL AUTO_INCREMENT,
  `date_inscription` date DEFAULT NULL,
  `id_utilisateur` int(11) NOT NULL,
  `id_cours` int(11) NOT NULL,
  PRIMARY KEY (`id_inscription`),
  KEY `fk_inscription_utilisateur1_idx` (`id_utilisateur`),
  KEY `fk_inscription_cours1_idx` (`id_cours`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `inscription`
--

INSERT INTO `inscription` (`id_inscription`, `date_inscription`, `id_utilisateur`, `id_cours`) VALUES
(1, '2024-01-02', 1, 2),
(2, '2024-01-02', 2, 3);

-- --------------------------------------------------------

--
-- Structure de la table `livre`
--

DROP TABLE IF EXISTS `livre`;
CREATE TABLE IF NOT EXISTS `livre` (
  `id_livre` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(45) DEFAULT NULL,
  `auteur` varchar(45) DEFAULT NULL,
  `prix` decimal(10,0) DEFAULT NULL,
  `type` enum('numerique','physique') DEFAULT NULL,
  `stock` int(11) DEFAULT '0',
  PRIMARY KEY (`id_livre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `livre`
--

INSERT INTO `livre` (`id_livre`, `titre`, `auteur`, `prix`, `type`, `stock`) VALUES
(2, 'Dragon', 'tino', '7000', 'physique', 8),
(3, 'Bruno', 'Test', '5000', 'physique', 4);

-- --------------------------------------------------------

--
-- Structure de la table `paiement`
--

DROP TABLE IF EXISTS `paiement`;
CREATE TABLE IF NOT EXISTS `paiement` (
  `id_paiement` int(11) NOT NULL AUTO_INCREMENT,
  `montant` decimal(10,0) DEFAULT NULL,
  `date_paiement` date DEFAULT NULL,
  `methode_paiement` enum('carte_credit','mobile_money') DEFAULT NULL,
  `id_utilisateur` int(11) NOT NULL,
  PRIMARY KEY (`id_paiement`),
  KEY `fk_paiement_utilisateur1_idx` (`id_utilisateur`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `paiement`
--

INSERT INTO `paiement` (`id_paiement`, `montant`, `date_paiement`, `methode_paiement`, `id_utilisateur`) VALUES
(1, '250000', '2024-08-27', 'carte_credit', 1),
(2, '250000', '2024-08-27', 'carte_credit', 1),
(3, '280000', '2024-08-27', 'carte_credit', 2);

-- --------------------------------------------------------

--
-- Structure de la table `participation`
--

DROP TABLE IF EXISTS `participation`;
CREATE TABLE IF NOT EXISTS `participation` (
  `id_participation` int(11) NOT NULL AUTO_INCREMENT,
  `score` decimal(10,0) DEFAULT NULL,
  `id_utilisateur` int(11) NOT NULL,
  `id_cours` int(11) NOT NULL,
  `id_examen` int(11) NOT NULL,
  PRIMARY KEY (`id_participation`),
  KEY `fk_participation_utilisateur1_idx` (`id_utilisateur`),
  KEY `fk_participation_cours1_idx` (`id_cours`),
  KEY `fk_participation_examen1_idx` (`id_examen`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `participation`
--

INSERT INTO `participation` (`id_participation`, `score`, `id_utilisateur`, `id_cours`, `id_examen`) VALUES
(1, '18', 1, 2, 1),
(2, '20', 2, 2, 2);

-- --------------------------------------------------------

--
-- Structure de la table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
CREATE TABLE IF NOT EXISTS `quiz` (
  `id_quiz` int(11) NOT NULL AUTO_INCREMENT,
  `question` text,
  `reponse` text,
  `id_cours` int(11) NOT NULL,
  PRIMARY KEY (`id_quiz`),
  KEY `fk_quiz_cours1_idx` (`id_cours`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `quiz`
--

INSERT INTO `quiz` (`id_quiz`, `question`, `reponse`, `id_cours`) VALUES
(1, 'Que signifie CSS ?', 'Cascade Sytle Sheet', 1),
(2, 'Que signifie PHP ?', 'Personal Home Page', 1);

-- --------------------------------------------------------

--
-- Structure de la table `support`
--

DROP TABLE IF EXISTS `support`;
CREATE TABLE IF NOT EXISTS `support` (
  `id_support` int(11) NOT NULL AUTO_INCREMENT,
  `type` enum('PDF','autre') DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `id_cours` int(11) NOT NULL,
  PRIMARY KEY (`id_support`),
  KEY `fk_support_cours1_idx` (`id_cours`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `support`
--

INSERT INTO `support` (`id_support`, `type`, `url`, `id_cours`) VALUES
(1, 'PDF', 'uploads/support/installation 3.PNG', 1);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mot_de_passe` varchar(255) DEFAULT NULL,
  `date_inscription` date DEFAULT NULL,
  `role` enum('admin','user') DEFAULT NULL,
  `telephone` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_utilisateur`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id_utilisateur`, `nom`, `email`, `mot_de_passe`, `date_inscription`, `role`, `telephone`) VALUES
(1, 'SOARAKOTO', 'soarakout@gmail.com', '$2a$08$0Copyt/4WH8zLJPoSkOC6uD3sEKx6bXQwQZaEXxa7vC6UxwnLrlLu', '2024-08-26', 'admin', '03406909007'),
(2, 'BOTAK', 'soarakout@gmail.com', '$2a$08$3MAXchzK3Naet7Ul.4kUOe/xK9UmN5eE3VaGO7jdxzU8TIPM93lTG', '2024-08-26', 'admin', '03406909007'),
(3, 'THONY', 'soarakout@gmail.com', '$2a$08$FGaxodvAdnfUdIvJ7s1LieFSKnVBQ9J6BFoTmN2V1o4zVgSGqln/G', '2024-08-26', 'admin', '03406909007');

-- --------------------------------------------------------

--
-- Structure de la table `video`
--

DROP TABLE IF EXISTS `video`;
CREATE TABLE IF NOT EXISTS `video` (
  `id_video` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL,
  `titre` varchar(45) DEFAULT NULL,
  `duree` time DEFAULT NULL,
  `id_cours` int(11) NOT NULL,
  PRIMARY KEY (`id_video`),
  KEY `fk_video_cours_idx` (`id_cours`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `video`
--

INSERT INTO `video` (`id_video`, `url`, `titre`, `duree`, `id_cours`) VALUES
(1, 'uploads/video/ARRICH -  Veloma maboto ( NOUVEAUTE GASY 2024 )Label imad music.mp4', 'PHP', '11:20:00', 1),
(2, 'uploads/video/Seysey x Lima  - Jamais (CLIP VIDEO)_2.mp4', 'PHP', '11:20:00', 1),
(3, 'uploads/video/Adele - Easy on Me.mp4', 'PHP', '11:20:00', 1);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `cours`
--
ALTER TABLE `cours`
  ADD CONSTRAINT `fk_cours_utilisateur1` FOREIGN KEY (`id_instructeur`) REFERENCES `utilisateur` (`id_utilisateur`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `examen`
--
ALTER TABLE `examen`
  ADD CONSTRAINT `fk_examen_cours1` FOREIGN KEY (`id_cours`) REFERENCES `cours` (`id_cours`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `inscription`
--
ALTER TABLE `inscription`
  ADD CONSTRAINT `fk_inscription_cours1` FOREIGN KEY (`id_cours`) REFERENCES `cours` (`id_cours`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_inscription_utilisateur1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `paiement`
--
ALTER TABLE `paiement`
  ADD CONSTRAINT `fk_paiement_utilisateur1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `participation`
--
ALTER TABLE `participation`
  ADD CONSTRAINT `fk_participation_cours1` FOREIGN KEY (`id_cours`) REFERENCES `cours` (`id_cours`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_participation_examen1` FOREIGN KEY (`id_examen`) REFERENCES `examen` (`id_examen`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_participation_utilisateur1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `quiz`
--
ALTER TABLE `quiz`
  ADD CONSTRAINT `fk_quiz_cours1` FOREIGN KEY (`id_cours`) REFERENCES `cours` (`id_cours`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `support`
--
ALTER TABLE `support`
  ADD CONSTRAINT `fk_support_cours1` FOREIGN KEY (`id_cours`) REFERENCES `cours` (`id_cours`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `video`
--
ALTER TABLE `video`
  ADD CONSTRAINT `fk_video_cours` FOREIGN KEY (`id_cours`) REFERENCES `cours` (`id_cours`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
