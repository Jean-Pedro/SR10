-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : ven. 21 juin 2024 à 23:21
-- Version du serveur :  10.5.19-MariaDB-0+deb11u2
-- Version de PHP : 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `sr10p001`
--

-- --------------------------------------------------------

--
-- Structure de la table `Administrateur`
--

CREATE TABLE `Administrateur` (
  `id_administrateur` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Administrateur`
--

INSERT INTO `Administrateur` (`id_administrateur`) VALUES
(813),
(2185),
(3196),
(3197),
(3198),
(3200),
(3453),
(4097),
(4211);

-- --------------------------------------------------------

--
-- Structure de la table `Adresse`
--

CREATE TABLE `Adresse` (
  `id_lieu` int(11) NOT NULL,
  `num` int(11) NOT NULL,
  `rue` varchar(100) NOT NULL,
  `ville` varchar(100) NOT NULL,
  `code_postal` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Adresse`
--

INSERT INTO `Adresse` (`id_lieu`, `num`, `rue`, `ville`, `code_postal`) VALUES
(1, 1, 'rue de la papaye', 'Compiègne', '60200'),
(2, 13, 'rue de Paris', 'Compiègne', '60200'),
(3, 27, 'boulvard Saint-Michel', 'Paris', '75005'),
(2042, 54, 'rue du ratio', 'Tourcoing', '59599'),
(2043, 45, 'rue de l\'espoir', 'Tourcoing', '59599'),
(2765, 54, 'rue de l\'empire', 'Kothal', '99999'),
(2766, 89, 'rue de l\'abnégation', 'Tourcoing', '59599'),
(2767, 896, 'rue de l\'abnégation', 'Tourcoing', '59599'),
(2769, 78, 'rue de la fortune', 'Saint-Sernin-sur-Rance', '12248'),
(2770, 45, 'rue de l\'empire', 'Paris', '75005'),
(2771, 124, 'carrefour de jeanne d\'arc', 'Troyes', '10420'),
(2772, 45, 'rue de la bonne foi', 'Tourcoing', '59599'),
(2774, 78, 'rue de la bonne fortune', 'Paris', '75005'),
(3597, 89, 'rue des paquerettes', 'Villeneuve-Saint-Georges', '94190'),
(3698, 5, 'rue Roger Couttolenc', 'Compiègne', '60200');

-- --------------------------------------------------------

--
-- Structure de la table `Candidat`
--

CREATE TABLE `Candidat` (
  `id_candidat` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Candidat`
--

INSERT INTO `Candidat` (`id_candidat`) VALUES
(7),
(249),
(454),
(497),
(1953),
(2438),
(2733),
(4098),
(4209),
(4210);

-- --------------------------------------------------------

--
-- Structure de la table `Candidature`
--

CREATE TABLE `Candidature` (
  `id_c` int(11) NOT NULL,
  `date_candidature` datetime NOT NULL,
  `offre` int(11) NOT NULL,
  `candidat` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Candidature`
--

INSERT INTO `Candidature` (`id_c`, `date_candidature`, `offre`, `candidat`) VALUES
(551, '2024-05-24 23:47:00', 842596, 7),
(1184, '2024-06-11 23:04:40', 28200, 7),
(1185, '2024-06-11 23:07:25', 842889, 497),
(1188, '2024-06-15 17:19:11', 843073, 7),
(1522, '2024-06-21 12:37:53', 843272, 497),
(1563, '2024-06-21 22:41:51', 843272, 7);

-- --------------------------------------------------------

--
-- Structure de la table `Etat_demande`
--

CREATE TABLE `Etat_demande` (
  `demande` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Etat_demande`
--

INSERT INTO `Etat_demande` (`demande`) VALUES
('acceptée'),
('en attente'),
('refusée');

-- --------------------------------------------------------

--
-- Structure de la table `Etat_Offre`
--

CREATE TABLE `Etat_Offre` (
  `etat` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Etat_Offre`
--

INSERT INTO `Etat_Offre` (`etat`) VALUES
('expirée'),
('non publiée'),
('publiée');

-- --------------------------------------------------------

--
-- Structure de la table `Fiche_Poste`
--

CREATE TABLE `Fiche_Poste` (
  `id_fiche` int(11) NOT NULL,
  `intitule` varchar(100) NOT NULL,
  `resp_hierarchique` varchar(100) NOT NULL,
  `rythme_travail` decimal(4,2) NOT NULL,
  `teletravail` tinyint(1) NOT NULL,
  `salaire_min` float NOT NULL,
  `salaire_max` float NOT NULL,
  `description` text NOT NULL,
  `type` varchar(30) NOT NULL,
  `statut` varchar(30) NOT NULL,
  `lieu` int(11) NOT NULL,
  `organisation` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Fiche_Poste`
--

INSERT INTO `Fiche_Poste` (`id_fiche`, `intitule`, `resp_hierarchique`, `rythme_travail`, `teletravail`, `salaire_min`, `salaire_max`, `description`, `type`, `statut`, `lieu`, `organisation`) VALUES
(1, 'ingénieur cybersécurité', 'Jean Jean', '35.00', 0, 1234.34, 4444.44, 'gère la cybersécurité de l\'association', 'cybersécurité', 'cadre', 1, 27332),
(2, 'technicien informatique', 'recruteur 1', '35.00', 0, 1400, 2000, 'répare les ordinateurs', 'informatique', 'technicien', 2, 7656),
(512, 'ingénieur informatique', 'Jean-Patrick Delamarre', '38.00', 1, 1500, 4000, 'gère l\'infra informatique', 'cybersécurité', 'programmeur', 2043, 7656),
(767, 'Poste de caissier', 'Jacques Dutronc', '35.00', 0, 1500, 2500, 'Caissier', 'Caissier ', 'Salarié', 2772, 652014051),
(1047, 'Ingénieur IA', 'Elon Musk', '12.00', 0, 12, 13, 'ouais', 'Caissier ', 'cadre', 1, 1428965);

-- --------------------------------------------------------

--
-- Structure de la table `Offre_Emploi`
--

CREATE TABLE `Offre_Emploi` (
  `num` int(11) NOT NULL,
  `date_validite` datetime NOT NULL,
  `indications` text NOT NULL,
  `fiche` int(11) NOT NULL,
  `etat` varchar(30) NOT NULL,
  `date_depot` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Offre_Emploi`
--

INSERT INTO `Offre_Emploi` (`num`, `date_validite`, `indications`, `fiche`, `etat`, `date_depot`) VALUES
(28200, '2024-08-04 00:00:00', 'CV, lettre de motivation', 2, 'publiée', '2024-04-23 00:00:00'),
(842596, '2024-06-11 00:00:00', 'CV', 1, 'publiée', '2024-04-13 00:00:00'),
(842889, '2024-06-15 00:00:00', 'CV, photo', 512, 'publiée', '2024-06-04 22:14:57'),
(843073, '2024-08-31 00:00:00', 'CV', 767, 'publiée', '2024-06-15 17:06:38'),
(843272, '2024-06-28 00:00:00', 'CV', 1047, 'publiée', '2024-06-18 22:58:59');

-- --------------------------------------------------------

--
-- Structure de la table `Organisation`
--

CREATE TABLE `Organisation` (
  `siren` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `siege_social` int(11) NOT NULL,
  `type` varchar(100) NOT NULL,
  `logo` varchar(100) NOT NULL,
  `etat_demande` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Organisation`
--

INSERT INTO `Organisation` (`siren`, `nom`, `siege_social`, `type`, `logo`, `etat_demande`) VALUES
(7656, 'Plastic Omnium', 2, 'SA à conseil d\'administration', 'plastic_omnium.png', 'acceptée'),
(8765, 'Restaurant le Palais', 3, 'SARL', 'resto_le_palais.png', 'acceptée'),
(27332, 'Les restos du coeur', 2043, 'association', 'resto_du_coeur.png', 'acceptée'),
(1428965, 'OpenAI', 3597, 'SARL', 'openai.png', 'acceptée'),
(65443654, 'SpaceX', 2769, 'SARL', 'spacex.webp', 'en attente'),
(196012231, 'UTC', 3698, 'établissement scientifique', 'SU-UTC18-70.jpg', 'acceptée'),
(322120916, 'Apple', 2774, 'SARL', 'apple.png', 'acceptée'),
(652014051, 'Carrefour', 2771, 'Eurl', 'carrefour.png', 'acceptée');

-- --------------------------------------------------------

--
-- Structure de la table `Piece_Dossier`
--

CREATE TABLE `Piece_Dossier` (
  `id_piece` int(11) NOT NULL,
  `type` varchar(100) NOT NULL,
  `candidature` int(11) NOT NULL,
  `fichier` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Piece_Dossier`
--

INSERT INTO `Piece_Dossier` (`id_piece`, `type`, `candidature`, `fichier`) VALUES
(497, 'CV', 551, 'CV_Johnny.pdf'),
(908, 'CV', 1184, 'CV_JP2B.jpg'),
(909, 'lettre de motivation', 1184, 'pass.js'),
(910, 'CV', 1185, 'Resume_Pontoire_Julien.pdf'),
(911, 'photo', 1185, 'PONTOIRE_Julien_20353.jpg'),
(914, 'CV', 1188, 'Resume_Pontoire_Julien.pdf'),
(1133, 'CV', 1522, 'Resume_Pontoire_Julien-2.pdf'),
(1154, 'CV', 1563, 'Resume_Pontoire_Julien-2-2.pdf');

-- --------------------------------------------------------

--
-- Structure de la table `Recruteur`
--

CREATE TABLE `Recruteur` (
  `id_recruteur` int(11) NOT NULL,
  `organisation` int(11) NOT NULL,
  `etat_demande` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Recruteur`
--

INSERT INTO `Recruteur` (`id_recruteur`, `organisation`, `etat_demande`) VALUES
(497, 7656, 'acceptée'),
(3200, 1428965, 'acceptée'),
(3453, 7656, 'acceptée'),
(4097, 7656, 'acceptée'),
(4210, 196012231, 'acceptée');

-- --------------------------------------------------------

--
-- Structure de la table `Role`
--

CREATE TABLE `Role` (
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Role`
--

INSERT INTO `Role` (`role`) VALUES
('admin'),
('candidat'),
('recruteur');

-- --------------------------------------------------------

--
-- Structure de la table `Statut_Poste`
--

CREATE TABLE `Statut_Poste` (
  `statut` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Statut_Poste`
--

INSERT INTO `Statut_Poste` (`statut`) VALUES
('cadre'),
('Cuisinier'),
('ETAM'),
('ouvrier'),
('programmeur'),
('Salarié'),
('Soldat'),
('technicien');

-- --------------------------------------------------------

--
-- Structure de la table `Type_Metier`
--

CREATE TABLE `Type_Metier` (
  `type` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Type_Metier`
--

INSERT INTO `Type_Metier` (`type`) VALUES
('Caissier '),
('chef de cuisine'),
('cybersécurité'),
('Guerrier'),
('informatique'),
('Surveillant');

-- --------------------------------------------------------

--
-- Structure de la table `Type_Organisation`
--

CREATE TABLE `Type_Organisation` (
  `nom` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Type_Organisation`
--

INSERT INTO `Type_Organisation` (`nom`) VALUES
('association'),
('établissement scientifique'),
('Eurl'),
('SA à conseil d\'administration'),
('SARL'),
('SAS'),
('SASU');

-- --------------------------------------------------------

--
-- Structure de la table `Utilisateur`
--

CREATE TABLE `Utilisateur` (
  `id_utilisateur` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `prenom` varchar(30) NOT NULL,
  `num_tel` varchar(15) NOT NULL,
  `date_creation` datetime NOT NULL,
  `last_login` datetime NOT NULL,
  `statut` tinyint(1) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Utilisateur`
--

INSERT INTO `Utilisateur` (`id_utilisateur`, `email`, `nom`, `prenom`, `num_tel`, `date_creation`, `last_login`, `statut`, `password`, `role`) VALUES
(7, 'johnny@gmail.com', 'Johnny', 'John', '08-84-38-39-39', '2024-04-02 00:00:00', '2024-06-21 22:37:57', 1, '$2b$10$oMDrfx1I6/2j7haSt5.0te3KRNQIVfx/urysZEHxn2gnzJUcCmhVm', 'candidat'),
(249, 'patrick@gmail.com', 'Sébastien', 'Patrick', '06-79-58-45-96', '2024-05-20 00:00:00', '2024-05-20 00:00:00', 1, '$2b$10$gd.81yEezmzIR1xZj7wCveKkTIJ5MFOFpCoAdUhuuEmbErtmmcJSG', 'candidat'),
(454, 'Jean-Pakdo@gmail.com', 'Pakdo', 'Jean', '04-44-44-44-44', '2024-05-20 00:00:00', '2024-05-20 00:00:00', 1, '$2b$10$8PiBEBMvX5NrW6J4Ay.A0OAHc6RfaEb0FRAFyuYyvfdyMIZYCnLKq', 'candidat'),
(497, 'Pak2BiaireJean@gmail.com', 'Pakdebiaire', 'Jean', '04-65-85-01-32', '2024-05-21 00:00:00', '2024-06-21 22:49:26', 1, '$2b$10$tqafopuvE6I2WnHw2EJlyOcXZgAnXJkqItZ5AHiLLp5oZlU.ihyTa', 'recruteur'),
(813, 'jbl@utc.fr', 'Leger', 'JeanBenoist', '04-40-40-40-40', '2024-05-21 00:00:00', '2024-06-21 23:09:59', 1, '$2b$10$sDcelJGGtqY53n/9XDl4PuPHDwZCYVrav8EfvYMb.yyZYA999NKzW', 'admin'),
(1953, 'JeanFriture@gmail.com', 'Delafrite', 'Jean', '06-12-74-85-35', '2024-05-28 00:00:00', '2024-05-28 00:00:00', 1, '$2b$10$DqMhN5AbsCt2zPC56cX8C.g9UA5mI2l6AKEeRQ/tvQV4JE7i0gboa', 'candidat'),
(2185, 'admintest@gmail.com', 'admin', 'test', '03-03-03-03-03', '2024-05-28 00:00:00', '2024-06-21 21:42:46', 1, '$2b$10$LnoGjOhcj39N.IhlkZPGZOFvpDfpSHlfky6VVC6PqAxogNJPMNUzS', 'admin'),
(2438, 'pontoirecarine@gmail.com', 'Pontoire', 'Carine', '06-42-85-35-97', '2024-05-31 00:00:00', '2024-05-31 00:00:00', 1, '$2b$10$cQx4H1VY5FTQRL2gs87i8.3kGmt8tCycKu0Ah.8.bQsbrxsWSWHe2', 'candidat'),
(2733, 'jeandelatesterie@gmail.com', 'LeTesteur', 'Jean', '04-05-06-07-08', '2024-06-04 00:00:00', '2024-06-21 21:42:46', 1, '$2b$10$MGAgSCVDQ3XtSvDqsZ5HZuC0wUj7y305aKhtD7Za0RGbTNH2celxW', 'candidat'),
(3196, 'SkywalkerAnakin@gmail.com', 'Anakin', 'Skywalker', '06-59-86-23-74', '2024-06-11 00:00:00', '2024-06-12 10:34:21', 1, '$2b$10$CmQBlapRcQ5itu/LaXSWBeD2VRCy6ox/8YgRjVdtZPASBKE0rtvFC', 'admin'),
(3197, 'fildup@gmail.com', 'Dupond', 'Filibert', '07-15-27-63-12', '2024-06-12 00:00:00', '2024-06-12 13:02:08', 1, '$2b$10$RFrxzxTOnFkbYRTpjpQTyO1M5qqe0eTHRs2RRCcyLwW0yYlbMYgZW', 'admin'),
(3198, 'julien.pontoire@etu.utc.fr', 'Pontoire', 'Julien', '07-56-95-12-36', '2024-06-15 00:00:00', '2024-06-15 17:20:44', 1, '$2b$10$H1sSrygrBShoW070tcb8HOjzpnmHEgpZWletZzFI3yFKYI5pJkw7K', 'admin'),
(3200, 'pontoirejulien@gmail.com', 'Pontoire', 'Julien2', '07-52-48-96-35', '2024-06-16 00:00:00', '2024-06-21 11:14:17', 1, '$2b$10$BQePaZYl7VbUq3df7oNQjeSlLNiZn8ayt6YxsvjuGj9Woo1BRiFL2', 'admin'),
(3453, 'quentin.fouinat-beal@etu.utc.fr', 'Fouinat--Beal', 'Quentin', '07-42-32-96-12', '2024-06-17 00:00:00', '2024-06-17 16:23:26', 1, '$2b$10$SrjGdBmhspWZTmUYwtJrwOinSOonjJlroZgXMLO16EINgtIB3fuo6', 'admin'),
(4097, 'fouinatquentin@gmail.com', 'P', 'J', '01-12-52-63-54', '2024-06-19 00:00:00', '2024-06-19 10:57:49', 1, '$2b$10$wB/v45Zkzn0YKxikvGMJr.1MfUsHvK9OnWw77W2my9r14EgZeZpdO', 'admin'),
(4098, 'MartinJeanEudes@gmail.com', 'Martin', 'Jean-Eudes', '07-42-63-59-75', '2024-06-21 00:00:00', '2024-06-21 12:08:05', 1, '$2b$10$.aTqsfjgswCnXyle9n8fUOZ13VG/djm2BABuVG6uoCKe6yh8UO96S', 'candidat'),
(4209, 'candidat.jean@gmail.com', 'Candidat', 'Jean', '01-02-03-04-05', '2024-06-21 00:00:00', '2024-06-21 22:59:04', 1, '$2b$10$5IvPXKRjluUk3vRBw7gGE.CMILNtnIRVrLaMEq5H8/iDlCQgRZHpC', 'candidat'),
(4210, 'recruteur.paul@gmail.com', 'Recruteur', 'Paul', '05-05-05-05-05', '2024-06-21 00:00:00', '2024-06-21 23:01:23', 1, '$2b$10$HZZiIbceQyEsZifX8jT1JurSDpgO35UlObzS5xhWQxckQhZy3Wfj2', 'recruteur'),
(4211, 'admin.jack@gmail.com', 'Admin', 'Jack', '09-08-07-06-05', '2024-06-21 00:00:00', '2024-06-21 23:06:31', 1, '$2b$10$3Ocs04ei.3EaoI1ElTTavO5Vw2UepKBOHvjo4hoDslgTnuiUq4df6', 'admin');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Administrateur`
--
ALTER TABLE `Administrateur`
  ADD PRIMARY KEY (`id_administrateur`);

--
-- Index pour la table `Adresse`
--
ALTER TABLE `Adresse`
  ADD PRIMARY KEY (`id_lieu`);

--
-- Index pour la table `Candidat`
--
ALTER TABLE `Candidat`
  ADD PRIMARY KEY (`id_candidat`);

--
-- Index pour la table `Candidature`
--
ALTER TABLE `Candidature`
  ADD PRIMARY KEY (`id_c`),
  ADD KEY `candidat` (`candidat`),
  ADD KEY `Candidature_ibfk_1` (`offre`);

--
-- Index pour la table `Etat_demande`
--
ALTER TABLE `Etat_demande`
  ADD PRIMARY KEY (`demande`);

--
-- Index pour la table `Etat_Offre`
--
ALTER TABLE `Etat_Offre`
  ADD PRIMARY KEY (`etat`);

--
-- Index pour la table `Fiche_Poste`
--
ALTER TABLE `Fiche_Poste`
  ADD PRIMARY KEY (`id_fiche`),
  ADD KEY `type` (`type`),
  ADD KEY `statut` (`statut`),
  ADD KEY `lieu` (`lieu`),
  ADD KEY `organisation` (`organisation`);

--
-- Index pour la table `Offre_Emploi`
--
ALTER TABLE `Offre_Emploi`
  ADD PRIMARY KEY (`num`),
  ADD KEY `fiche` (`fiche`),
  ADD KEY `etat` (`etat`);

--
-- Index pour la table `Organisation`
--
ALTER TABLE `Organisation`
  ADD PRIMARY KEY (`siren`),
  ADD KEY `siege_social` (`siege_social`),
  ADD KEY `type` (`type`),
  ADD KEY `etat_demande` (`etat_demande`);

--
-- Index pour la table `Piece_Dossier`
--
ALTER TABLE `Piece_Dossier`
  ADD PRIMARY KEY (`id_piece`),
  ADD KEY `candidature` (`candidature`);

--
-- Index pour la table `Recruteur`
--
ALTER TABLE `Recruteur`
  ADD PRIMARY KEY (`id_recruteur`),
  ADD KEY `organisation` (`organisation`),
  ADD KEY `etat_demande` (`etat_demande`);

--
-- Index pour la table `Role`
--
ALTER TABLE `Role`
  ADD PRIMARY KEY (`role`);

--
-- Index pour la table `Statut_Poste`
--
ALTER TABLE `Statut_Poste`
  ADD PRIMARY KEY (`statut`);

--
-- Index pour la table `Type_Metier`
--
ALTER TABLE `Type_Metier`
  ADD PRIMARY KEY (`type`);

--
-- Index pour la table `Type_Organisation`
--
ALTER TABLE `Type_Organisation`
  ADD PRIMARY KEY (`nom`);

--
-- Index pour la table `Utilisateur`
--
ALTER TABLE `Utilisateur`
  ADD PRIMARY KEY (`id_utilisateur`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `num_tel` (`num_tel`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Adresse`
--
ALTER TABLE `Adresse`
  MODIFY `id_lieu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3699;

--
-- AUTO_INCREMENT pour la table `Candidature`
--
ALTER TABLE `Candidature`
  MODIFY `id_c` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1564;

--
-- AUTO_INCREMENT pour la table `Fiche_Poste`
--
ALTER TABLE `Fiche_Poste`
  MODIFY `id_fiche` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1083;

--
-- AUTO_INCREMENT pour la table `Offre_Emploi`
--
ALTER TABLE `Offre_Emploi`
  MODIFY `num` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=843298;

--
-- AUTO_INCREMENT pour la table `Piece_Dossier`
--
ALTER TABLE `Piece_Dossier`
  MODIFY `id_piece` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1155;

--
-- AUTO_INCREMENT pour la table `Utilisateur`
--
ALTER TABLE `Utilisateur`
  MODIFY `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4212;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Administrateur`
--
ALTER TABLE `Administrateur`
  ADD CONSTRAINT `Administrateur_ibfk_1` FOREIGN KEY (`id_administrateur`) REFERENCES `Utilisateur` (`id_utilisateur`);

--
-- Contraintes pour la table `Candidat`
--
ALTER TABLE `Candidat`
  ADD CONSTRAINT `Candidat_ibfk_1` FOREIGN KEY (`id_candidat`) REFERENCES `Utilisateur` (`id_utilisateur`);

--
-- Contraintes pour la table `Candidature`
--
ALTER TABLE `Candidature`
  ADD CONSTRAINT `Candidature_ibfk_1` FOREIGN KEY (`offre`) REFERENCES `Offre_Emploi` (`num`),
  ADD CONSTRAINT `Candidature_ibfk_2` FOREIGN KEY (`candidat`) REFERENCES `Candidat` (`id_candidat`);

--
-- Contraintes pour la table `Fiche_Poste`
--
ALTER TABLE `Fiche_Poste`
  ADD CONSTRAINT `Fiche_Poste_ibfk_1` FOREIGN KEY (`type`) REFERENCES `Type_Metier` (`type`),
  ADD CONSTRAINT `Fiche_Poste_ibfk_2` FOREIGN KEY (`statut`) REFERENCES `Statut_Poste` (`statut`),
  ADD CONSTRAINT `Fiche_Poste_ibfk_3` FOREIGN KEY (`lieu`) REFERENCES `Adresse` (`id_lieu`),
  ADD CONSTRAINT `Fiche_Poste_ibfk_4` FOREIGN KEY (`organisation`) REFERENCES `Organisation` (`siren`);

--
-- Contraintes pour la table `Offre_Emploi`
--
ALTER TABLE `Offre_Emploi`
  ADD CONSTRAINT `Offre_Emploi_ibfk_1` FOREIGN KEY (`fiche`) REFERENCES `Fiche_Poste` (`id_fiche`),
  ADD CONSTRAINT `Offre_Emploi_ibfk_2` FOREIGN KEY (`etat`) REFERENCES `Etat_Offre` (`etat`);

--
-- Contraintes pour la table `Organisation`
--
ALTER TABLE `Organisation`
  ADD CONSTRAINT `Organisation_ibfk_1` FOREIGN KEY (`siege_social`) REFERENCES `Adresse` (`id_lieu`),
  ADD CONSTRAINT `Organisation_ibfk_2` FOREIGN KEY (`type`) REFERENCES `Type_Organisation` (`nom`),
  ADD CONSTRAINT `Organisation_ibfk_3` FOREIGN KEY (`etat_demande`) REFERENCES `Etat_demande` (`demande`);

--
-- Contraintes pour la table `Piece_Dossier`
--
ALTER TABLE `Piece_Dossier`
  ADD CONSTRAINT `Piece_Dossier_ibfk_1` FOREIGN KEY (`candidature`) REFERENCES `Candidature` (`id_c`);

--
-- Contraintes pour la table `Recruteur`
--
ALTER TABLE `Recruteur`
  ADD CONSTRAINT `Recruteur_ibfk_1` FOREIGN KEY (`id_recruteur`) REFERENCES `Utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `Recruteur_ibfk_2` FOREIGN KEY (`organisation`) REFERENCES `Organisation` (`siren`),
  ADD CONSTRAINT `Recruteur_ibfk_3` FOREIGN KEY (`etat_demande`) REFERENCES `Etat_demande` (`demande`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
