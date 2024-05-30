-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           10.4.32-MariaDB - mariadb.org binary distribution
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.7.0.6850
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour m2l
CREATE DATABASE IF NOT EXISTS `m2l` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `m2l`;

-- Listage de la structure de table m2l. commandes
CREATE TABLE IF NOT EXISTS `commandes` (
  `cuid` varchar(36) DEFAULT NULL,
  `montant` float DEFAULT NULL,
  `puiduser` varchar(36) DEFAULT NULL,
  `produits` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Listage des données de la table m2l.commandes : ~15 rows (environ)
INSERT INTO `commandes` (`cuid`, `montant`, `puiduser`, `produits`) VALUES
	('f1e50329-afcb-442a-9cbc-7fb1b01f69fd', NULL, NULL, NULL),
	('f5e363fe-e082-49f8-81bf-7c6512cad97d', NULL, NULL, NULL),
	('280f0fc6-bdcf-4391-be7f-0e6fa766bb8a', NULL, NULL, NULL),
	('2151f7b3-8c44-40bd-abee-49252d31b62c', NULL, NULL, NULL),
	('f1e50329-afcb-442a-9cbc-7fb1b01f69fd', NULL, NULL, NULL),
	('f5e363fe-e082-49f8-81bf-7c6512cad97d', NULL, NULL, NULL),
	('280f0fc6-bdcf-4391-be7f-0e6fa766bb8a', NULL, NULL, NULL),
	('2151f7b3-8c44-40bd-abee-49252d31b62c', NULL, NULL, NULL),
	('7159ffd7-e83d-4a0c-88e4-f8aa099c7931', 40, NULL, '[{"puid":"08469ec8-be5d-4817-b5bb-11'),
	('cf30f313-ce7e-48e1-912a-93df9b8c2d84', 57, '443a8651-06dc-4997-872a-dda727355c02', '[{"puid":"08469ec8-be5d-4817-b5bb-11'),
	('e7fd05c1-bfe7-4bdb-a5ac-f8f9d2d7d4d7', 80, '443a8651-06dc-4997-872a-dda727355c02', '[{"puid":"08469ec8-be5d-4817-b5bb-11'),
	('d0e9c921-7761-4974-8a89-08bd6319d655', 17, '443a8651-06dc-4997-872a-dda727355c02', '[{"puid":"f9d844d8-f194-494e-aeff-40'),
	('c5a9b5c8-9ead-4ea9-9aba-081f66dc00e4', 17, '443a8651-06dc-4997-872a-dda727355c02', '[{"puid":"f9d844d8-f194-494e-aeff-40'),
	('3875e067-4b56-4ebe-84af-0f6746fb31ff', 40, 'ce2b8983-fa05-41cc-91f2-c78a7e92a930', '[{"puid":"7861a533-aeac-43e5-b6c0-44'),
	('bea9c1e6-d080-40e0-b39b-dc44033c5bf8', 57, 'ce2b8983-fa05-41cc-91f2-c78a7e92a930', '[{"puid":"7861a533-aeac-43e5-b6c0-44');

-- Listage de la structure de table m2l. produit
CREATE TABLE IF NOT EXISTS `produit` (
  `puid` varchar(36) DEFAULT NULL,
  `nom` varchar(500) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `prix` float DEFAULT NULL,
  `quantite` int(11) DEFAULT NULL,
  `img` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Listage des données de la table m2l.produit : ~10 rows (environ)
INSERT INTO `produit` (`puid`, `nom`, `description`, `prix`, `quantite`, `img`) VALUES
	('500bb7fc-607b-47d1-a6c1-53a11ea7c3d5', 'alioune', 'Nous avons conçu ce kit pour découvrir le tir à l\'arc en loisir entre 5 et 10 m avec une pointe acier. Vous aurez de vraies sensations en famille ! Vous cherchez à découvrir le tir à l\'arc ? Nous avons développé le kit Disco 100 : arc, 2 flèches pointes acier, cible. Il conviendra aux droitiers et aux gauchers grâce à sa poignée visée centrale !', 0, 100, 'uploads\\8c31d54b604ee155cea19b840a3f3a8c'),
	('08469ec8-be5d-4817-b5bb-112c61b2f13e', 'CHAUSSURES DE RUNNING HOMME ADIDAS', 'Une chaussure de running confortable concue pour toutes les activités de course à pied.', 40, 178, 'uploads\\1a8c2d30c94f12c5b7b096632dd11e77'),
	('7861a533-aeac-43e5-b6c0-445ae1e12f52', 'CHAUSSURES DE RUNNING FEMME ADIDAS', 'Créée pour compléter ton jeu en salle, la chaussure adidas Court Flight t\'offre un maximum de confort avec sa semelle intermédiaire sur toute la longueur. Cette chaussure offre maintien et dynamisme. Les baskets Adidas court flight sont idéales pour le jeu en club et les compétitions.', 40, 365, 'uploads\\023d24f78097ea1bb1b3b3581831ba9c'),
	('f9d844d8-f194-494e-aeff-40791ed9225e', 'BALLON DE BASKET BT100 TAILLE 7 ORANGE Modif test', 'Ballon de basket de taille 7 officielle. Avec sa couche extérieur polyvinyl chloride moussé, il offre un bon toucher de balle, ainsi qu\'une bonne résistance. Adapté pour jouer au basket en extérieur ou en intérieur.', 20, 89, 'uploads\\6250fd0bf183a77cb617c11c9ac65078'),
	('fdd72870-df96-42c2-8ef0-4aec80a5b316', 'BALLON DE FOOT ADIDAS TAILLE 5', 'Ce ballon adidas UCL est inspiré du ballon de match officiel de l\'UEFA Champions League. Certifié FIFA Quality, idéal pour les entraînements et les matchs.', 40, 96, 'uploads\\52ce27e5e54860aeaf91f362122f54fc'),
	('2f770c18-a86d-408d-adb9-5f13fa2aed18', 'RAQUETTE DE TENNIS ADULTE TR100 NOIRE', 'Nos équipes de conception ont développé ce produit pour vous permettre de découvrir le tennis à petit prix.  Grâce à sa grande taille de tamis pour apporter de la tolérance, un manche ovale pour plus de confort et un cadre en aluminium pour une bonne résistance, la TR100 est idéale pour découvrir le tennis.', 13, 99, 'uploads\\97be8451fe4b4e19db68c258c46f4785'),
	('5e8429d1-e3eb-4cc4-81f1-ed689bcbda87', 'SET DE 2 RAQUETTES ET 3 BALLES TTB', 'Les 2 raquettes de ce set sont conçues pour appliquer vos premiers effets tout en garantissant un bon contrôle de balle. Elles sont vendues avec 3 balles.  Pour vos premiers échanges à l\'école ou en famille, notre set de tennis de table vous accompagne sur vos premiers effets et garantit un bon contrôle de balle.', 18, 93, 'uploads\\b98cfd08d331e03c25b18434da9a71f4'),
	('1367d46f-024a-409f-86ae-f2eb20fe3a23', 'SET RAQUETTES DE BADMINTON ET VOLANTS', 'Conçu pour la pratique du badminton loisir avec la possibilité de jouer de nuit grâce aux volants lumineux.', 35, 91, 'uploads\\1a18e6e1d9d6b45a5557224c72d672bc'),
	('774c8016-5a6c-4aef-8f78-2c751f1797b7', 'Modif test ajout', 'Modif test ajout', 30, 30, 'uploads\\ee6f3e4591e87e702a8c8bd4a2e038ec'),
	('28e5f39f-1420-4d37-a803-c95e30462784', 'test ajout', 'test ajout', 90, 90, 'uploads\\88cc7b003fb0cd67af39edb9fba88c9e');

-- Listage de la structure de table m2l. user
CREATE TABLE IF NOT EXISTS `user` (
  `uuid` varchar(36) DEFAULT NULL,
  `nom` varchar(500) DEFAULT NULL,
  `email` varchar(500) DEFAULT NULL,
  `mdp` varchar(500) DEFAULT NULL,
  `admin` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Listage des données de la table m2l.user : ~2 rows (environ)
INSERT INTO `user` (`uuid`, `nom`, `email`, `mdp`, `admin`) VALUES
	('443a8651-06dc-4997-872a-dda727355c02', 'marion', 'marion@gmail.com', '$2b$10$lBKPP39ra.E8VRAz0DgKveX2rpx8Guqu0z2H.8swN3gFaH9MQX3sq', 1),
	('ce2b8983-fa05-41cc-91f2-c78a7e92a930', 'test', 'test@gmail.com', '$2b$10$V5TbkEbEqSon8/Tw1Vbl8uqSxYZs6rGgtn6rpk5ENS27QlHUxMh3i', NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
