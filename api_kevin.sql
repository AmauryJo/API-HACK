-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : mer. 15 jan. 2025 à 14:49
-- Version du serveur : 8.0.35
-- Version de PHP : 8.2.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `api_kevin`
--

-- --------------------------------------------------------

--
-- Structure de la table `functionality`
--

CREATE TABLE `functionality` (
  `id` int NOT NULL,
  `functionality_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `functionality`
--

INSERT INTO `functionality` (`id`, `functionality_name`) VALUES
(1, 'login'),
(2, 'register'),
(3, 'password'),
(4, 'ddos'),
(5, 'log'),
(6, '/log/user'),
(7, '/log/functionnality'),
(8, 'mailchecker'),
(9, 'passwordchecker'),
(10, 'subdomainfinder'),
(11, 'randomimage'),
(12, 'crawler'),
(13, 'phishing');

-- --------------------------------------------------------

--
-- Structure de la table `logs`
--

CREATE TABLE `logs` (
  `id` int NOT NULL,
  `id_user` int NOT NULL,
  `id_functionnality` int DEFAULT NULL,
  `routes` varchar(100) NOT NULL,
  `method` varchar(20) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `logs`
--

INSERT INTO `logs` (`id`, `id_user`, `id_functionnality`, `routes`, `method`, `date`) VALUES
(23, 4, 1, '/auth/login', 'POST', '2024-10-31 15:05:22'),
(24, 4, 5, '/log', 'POST', '2024-10-31 15:10:20'),
(25, 4, 5, '/log', 'POST', '2024-10-31 15:10:28'),
(26, 4, 1, '/auth/login', 'POST', '2024-10-31 15:16:21'),
(28, 4, 6, '/log/user', 'POST', '2024-10-31 15:24:13'),
(29, 4, 6, '/log/user', 'POST', '2024-10-31 15:24:20'),
(30, 4, 7, '/log/functionnality', 'POST', '2024-10-31 15:26:03'),
(31, 4, 7, '/log/functionnality', 'POST', '2024-10-31 15:29:21'),
(32, 4, 7, '/log/functionnality', 'POST', '2024-10-31 15:30:00'),
(33, 4, 7, '/log/functionnality', 'POST', '2024-10-31 15:31:23'),
(34, 4, 7, '/log/functionnality', 'POST', '2024-10-31 15:31:43'),
(35, 4, 7, '/log/functionnality', 'POST', '2024-10-31 15:31:47'),
(36, 4, 7, '/log/functionnality', 'POST', '2024-10-31 15:33:23'),
(37, 4, 7, '/log/functionnality', 'POST', '2024-10-31 15:34:07'),
(38, 4, 7, '/log/functionnality', 'POST', '2024-10-31 15:34:15'),
(39, 4, 7, '/log/functionnality', 'POST', '2024-10-31 15:34:21'),
(40, 4, 1, '/auth/login', 'POST', '2024-11-18 10:40:35'),
(41, 4, 3, '/password', 'POST', '2024-11-18 10:40:46'),
(42, 4, 3, '/password', 'POST', '2024-11-18 10:40:53'),
(43, 4, 3, '/password', 'POST', '2024-11-18 10:40:57'),
(44, 4, 3, '/password', 'POST', '2024-11-18 10:41:00'),
(45, 4, 3, '/password', 'POST', '2024-11-18 10:41:06'),
(46, 4, 1, '/auth/login', 'POST', '2024-11-18 12:13:14'),
(47, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:13:23'),
(48, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:13:29'),
(49, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:13:36'),
(50, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:17:23'),
(51, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:17:25'),
(52, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:17:28'),
(53, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:17:29'),
(54, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:17:30'),
(55, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:17:31'),
(56, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:17:31'),
(57, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:17:32'),
(58, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:17:33'),
(59, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:17:34'),
(60, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:18:41'),
(61, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:18:52'),
(62, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:19:28'),
(63, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:19:31'),
(64, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:19:36'),
(65, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:22:22'),
(66, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:22:26'),
(67, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:22:31'),
(68, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:22:34'),
(69, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:22:40'),
(70, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:23:16'),
(71, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:23:54'),
(72, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:23:55'),
(73, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:24:07'),
(74, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:24:11'),
(75, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:25:00'),
(76, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:25:02'),
(77, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:25:49'),
(78, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:26:14'),
(79, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:26:22'),
(80, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:26:28'),
(81, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:26:56'),
(82, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:26:57'),
(83, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:26:59'),
(84, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:27:48'),
(85, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:27:51'),
(86, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:27:57'),
(87, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:28:18'),
(88, 4, NULL, '/mailchecker', 'POST', '2024-11-18 12:37:56'),
(89, 4, NULL, '/passwordchecker', 'POST', '2024-11-18 12:52:37'),
(90, 4, NULL, '/passwordchecker', 'POST', '2024-11-18 12:52:52'),
(91, 4, NULL, '/passwordchecker', 'POST', '2024-11-18 12:54:06'),
(92, 4, NULL, '/passwordchecker', 'POST', '2024-11-18 12:54:29'),
(93, 4, NULL, '/passwordchecker', 'POST', '2024-11-18 12:55:00'),
(94, 4, NULL, '/passwordchecker', 'POST', '2024-11-18 12:55:20'),
(95, 4, NULL, '/passwordchecker', 'POST', '2024-11-18 12:55:33'),
(96, 4, NULL, '/passwordchecker', 'POST', '2024-11-18 12:55:58'),
(97, 4, NULL, '/passwordchecker', 'POST', '2024-11-18 12:56:29'),
(98, 4, NULL, '/passwordchecker', 'POST', '2024-11-18 12:57:49'),
(99, 4, NULL, '/passwordchecker', 'POST', '2024-11-18 12:57:50'),
(100, 4, NULL, '/passwordchecker', 'POST', '2024-11-18 12:57:52'),
(101, 4, NULL, '/passwordchecker', 'POST', '2024-11-18 12:58:21'),
(102, 4, NULL, '/passwordchecker', 'POST', '2024-11-18 12:58:24'),
(103, 4, NULL, '/passwordchecker', 'POST', '2024-11-18 12:58:53'),
(104, 4, NULL, '/passwordchecker', 'POST', '2024-11-18 12:58:58'),
(105, 4, 1, '/auth/login', 'POST', '2024-11-18 13:01:16'),
(106, 4, 3, '/password', 'POST', '2024-11-18 13:02:56'),
(107, 4, 1, '/auth/login', 'POST', '2024-11-18 13:18:31'),
(108, 4, NULL, '/passwordchecker', 'POST', '2024-11-18 13:18:42'),
(109, 4, NULL, '/passwordchecker', 'POST', '2024-11-18 13:18:50'),
(110, 4, 1, '/auth/login', 'POST', '2024-11-18 13:19:36'),
(111, 4, 1, '/auth/login', 'POST', '2024-11-18 13:19:43'),
(112, 4, NULL, '/passwordchecker', 'POST', '2024-11-18 13:19:53'),
(113, 4, NULL, '/passwordchecker', 'POST', '2024-11-18 13:20:26'),
(114, 4, 1, '/auth/login', 'POST', '2024-11-18 13:37:43'),
(115, 4, 1, '/auth/login', 'POST', '2024-11-18 13:38:51'),
(116, 4, 1, '/auth/login', 'POST', '2024-11-18 15:26:49'),
(117, 4, 1, '/auth/login', 'POST', '2024-11-19 07:56:55'),
(118, 4, 1, '/auth/login', 'POST', '2024-11-20 08:55:11'),
(119, 4, 1, '/auth/login', 'POST', '2025-01-14 12:55:26'),
(120, 4, 1, '/auth/login', 'POST', '2025-01-14 13:46:23'),
(121, 4, 3, '/password', 'POST', '2025-01-14 15:01:32'),
(122, 4, 8, '/mailchecker', 'POST', '2025-01-14 15:03:24'),
(123, 4, NULL, '/randomimage', 'POST', '2025-01-14 15:03:37'),
(124, 4, 10, '/subdomainfinder', 'POST', '2025-01-15 08:17:22'),
(125, 4, 10, '/subdomainfinder', 'POST', '2025-01-15 08:18:49'),
(126, 4, 10, '/subdomainfinder', 'POST', '2025-01-15 08:20:52'),
(127, 4, NULL, '/crawler', 'POST', '2025-01-15 08:20:58'),
(128, 4, NULL, '/crawler', 'POST', '2025-01-15 08:21:31'),
(129, 4, NULL, '/crawler', 'POST', '2025-01-15 08:21:49'),
(130, 4, NULL, '/crawler', 'POST', '2025-01-15 08:22:10'),
(131, 4, NULL, '/crawler', 'POST', '2025-01-15 08:23:20'),
(132, 4, NULL, '/crawler', 'POST', '2025-01-15 08:23:35'),
(133, 4, NULL, '/crawler', 'POST', '2025-01-15 08:25:14'),
(134, 4, 12, '/crawler', 'POST', '2025-01-15 08:27:17'),
(135, 4, 12, '/crawler', 'POST', '2025-01-15 08:27:27'),
(136, 4, 12, '/crawler', 'POST', '2025-01-15 08:31:10'),
(137, 4, 12, '/crawler', 'POST', '2025-01-15 08:32:26'),
(138, 4, 13, '/phishing', 'POST', '2025-01-15 08:55:55'),
(139, 4, 13, '/phishing', 'GET', '2025-01-15 08:56:22'),
(140, 4, 13, '/phishing', 'GET', '2025-01-15 08:58:09'),
(141, 4, 13, '/phishing', 'POST', '2025-01-15 08:58:18'),
(142, 4, 13, '/phishing', 'GET', '2025-01-15 08:58:39'),
(143, 4, 13, '/phishing', 'GET', '2025-01-15 08:58:54'),
(144, 4, 13, '/phishing', 'GET', '2025-01-15 09:01:43'),
(145, 4, 13, '/phishing', 'GET', '2025-01-15 09:02:27'),
(146, 4, 13, '/phishing', 'GET', '2025-01-15 09:02:34'),
(147, 4, NULL, '/phishing?=https://facebook.com', 'GET', '2025-01-15 09:07:39'),
(148, 4, NULL, '/phishing?url=https://facebook.com', 'GET', '2025-01-15 09:07:59'),
(149, 4, NULL, '/phishing?url=https://facebook.com', 'GET', '2025-01-15 09:09:52'),
(150, 4, NULL, '/phishing?url=https://facebook.com', 'GET', '2025-01-15 09:10:17'),
(151, 4, NULL, '/phishing?url=https://facebook.com', 'GET', '2025-01-15 09:10:48'),
(152, 4, NULL, '/phishing?url=https://facebook.com', 'GET', '2025-01-15 09:11:22'),
(153, 4, NULL, '/phishing?url=https://facebook.com', 'GET', '2025-01-15 09:13:55'),
(154, 4, NULL, '/phishing?url=https://facebook.com', 'GET', '2025-01-15 09:15:56'),
(155, 4, NULL, '/phishing?urjl=https://facebook.com', 'GET', '2025-01-15 09:16:46'),
(156, 4, NULL, '/phishing?url=https://facebook.com', 'GET', '2025-01-15 09:16:50'),
(157, 4, NULL, '/phishing?url=https://facebook.com', 'GET', '2025-01-15 09:18:30'),
(158, 4, NULL, '/phishing?siteUrl=https://facebook.com', 'GET', '2025-01-15 09:18:49'),
(159, 4, NULL, '/phishing?url=https://facebook.com', 'GET', '2025-01-15 09:19:05'),
(160, 4, NULL, '/phishing?url=https://github.com/login', 'GET', '2025-01-15 09:20:03'),
(161, 4, NULL, '/phishing?url=https://github.com/login', 'GET', '2025-01-15 09:26:40'),
(162, 4, NULL, '/phishing?url=https://github.com/login', 'GET', '2025-01-15 09:28:16'),
(163, 4, NULL, '/phishing?url=https://github.com/login', 'GET', '2025-01-15 09:30:16'),
(164, 4, NULL, '/phishing?url=https://github.com/login', 'GET', '2025-01-15 09:30:59'),
(165, 4, NULL, '/phishing/datas', 'GET', '2025-01-15 09:56:39'),
(166, 4, NULL, '/phishing/datas', 'GET', '2025-01-15 09:56:51'),
(167, 4, NULL, '/phishing/datas', 'GET', '2025-01-15 09:56:51'),
(168, 4, NULL, '/phishing/datas', 'GET', '2025-01-15 09:57:27'),
(169, 4, NULL, '/phishing/submission', 'GET', '2025-01-15 09:57:32'),
(170, 4, NULL, '/phishing/submission', 'GET', '2025-01-15 09:57:35'),
(171, 4, NULL, '/phishing/submissions', 'GET', '2025-01-15 09:57:38'),
(172, 4, NULL, '/phishing?url=https://github.com/login', 'GET', '2025-01-15 10:03:23'),
(173, 4, NULL, '/phishing?url=https://github.com/login', 'GET', '2025-01-15 10:04:09'),
(174, 4, NULL, '/phishing?url=https://github.com/login', 'GET', '2025-01-15 10:04:32'),
(175, 4, NULL, '/phishing?url=https://github.com/login', 'GET', '2025-01-15 10:05:03'),
(176, 4, NULL, '/phishing?url=https://github.com/login', 'GET', '2025-01-15 10:06:07'),
(177, 4, NULL, '/phishing?url=https://github.com/login', 'GET', '2025-01-15 10:07:53'),
(178, 4, NULL, '/phishing?url=https://github.com/login', 'GET', '2025-01-15 10:08:24'),
(179, 4, NULL, '/phishing/', 'POST', '2025-01-15 10:13:11'),
(180, 4, NULL, '/phishing?url=https://github.com/login', 'GET', '2025-01-15 10:13:32'),
(181, 4, NULL, '/phishing/', 'POST', '2025-01-15 10:13:52'),
(182, 4, NULL, '/phishing?url=https://github.com/login', 'GET', '2025-01-15 10:13:57'),
(183, 4, NULL, '/phishing/', 'POST', '2025-01-15 10:14:05'),
(184, 4, NULL, '/phishing?url=https://github.com/login', 'GET', '2025-01-15 10:14:13'),
(185, 4, NULL, '/phishing?url=https://github.com/login', 'GET', '2025-01-15 10:14:49'),
(186, 4, NULL, '/phishing?url=https://github.com/login', 'GET', '2025-01-15 10:16:09'),
(187, 4, NULL, '/phishing?url=https://github.com/login', 'GET', '2025-01-15 10:16:27'),
(188, 4, NULL, '/phishing/', 'POST', '2025-01-15 10:17:33'),
(189, 4, NULL, '/phishing/submissions', 'GET', '2025-01-15 10:35:46'),
(190, 4, NULL, '/phishing?url=https://github.com/login', 'GET', '2025-01-15 10:45:19'),
(191, 4, NULL, '/phishing?url=https://github.com/login', 'GET', '2025-01-15 10:49:18'),
(192, 4, NULL, '/phishing?url=https://www.facebook.com', 'GET', '2025-01-15 12:34:08'),
(193, 4, NULL, '/phishing?url=https://www.facebook.com', 'GET', '2025-01-15 12:35:11'),
(194, 4, 4, '/ddos', 'POST', '2025-01-15 13:02:23'),
(195, 4, 4, '/ddos', 'POST', '2025-01-15 13:02:35'),
(196, 4, NULL, '/faker', 'POST', '2025-01-15 13:04:04'),
(197, 4, NULL, '/faker', 'POST', '2025-01-15 13:04:15'),
(198, 4, 8, '/mailchecker', 'POST', '2025-01-15 13:06:45'),
(199, 4, NULL, '/mailer', 'POST', '2025-01-15 13:08:41'),
(200, 4, 9, '/passwordchecker', 'POST', '2025-01-15 13:10:05'),
(201, 4, 3, '/password', 'POST', '2025-01-15 13:10:43'),
(202, 4, 3, '/password', 'POST', '2025-01-15 13:12:27'),
(203, 4, 11, '/randomimage', 'POST', '2025-01-15 13:13:51'),
(204, 4, 10, '/subdomainfinder', 'POST', '2025-01-15 13:15:26'),
(205, 4, 10, '/subdomainfinder', 'POST', '2025-01-15 13:15:54'),
(206, 4, 10, '/subdomainfinder', 'POST', '2025-01-15 13:16:00'),
(207, 4, 10, '/subdomainfinder', 'POST', '2025-01-15 13:16:36'),
(208, 4, 10, '/subdomainfinder', 'POST', '2025-01-15 13:17:41'),
(209, 4, 10, '/subdomainfinder', 'POST', '2025-01-15 13:19:26'),
(210, 4, 10, '/subdomainfinder', 'POST', '2025-01-15 13:19:33'),
(211, 4, 10, '/subdomainfinder', 'POST', '2025-01-15 13:19:44'),
(212, 4, 10, '/subdomainfinder', 'POST', '2025-01-15 13:19:59'),
(213, 4, 10, '/subdomainfinder', 'POST', '2025-01-15 13:20:15'),
(214, 4, 10, '/subdomainfinder', 'POST', '2025-01-15 13:20:25'),
(215, 4, NULL, '/phishing/', 'POST', '2025-01-15 13:22:21'),
(216, 4, 12, '/crawler', 'POST', '2025-01-15 13:26:02'),
(217, 4, 12, '/crawler', 'POST', '2025-01-15 13:26:19'),
(218, 4, 12, '/crawler', 'POST', '2025-01-15 13:29:53'),
(219, 4, 5, '/log', 'POST', '2025-01-15 13:32:06'),
(220, 4, 4, '/ddos', 'POST', '2025-01-15 13:44:07'),
(221, 4, 4, '/ddos', 'POST', '2025-01-15 13:44:12'),
(222, 4, 4, '/ddos', 'POST', '2025-01-15 13:44:31'),
(223, 4, 4, '/ddos', 'POST', '2025-01-15 13:59:36'),
(224, 4, 9, '/passwordchecker', 'POST', '2025-01-15 13:59:56'),
(225, 4, 10, '/subdomainfinder', 'POST', '2025-01-15 13:59:58'),
(226, 4, 12, '/crawler', 'POST', '2025-01-15 14:00:01'),
(227, 4, 6, '/log/user', 'POST', '2025-01-15 14:00:48'),
(228, 4, 6, '/log/user', 'POST', '2025-01-15 14:00:52'),
(229, 4, 6, '/log/user', 'POST', '2025-01-15 14:00:56'),
(230, 4, 6, '/log/user', 'POST', '2025-01-15 14:01:16'),
(231, 4, 7, '/log/functionnality', 'POST', '2025-01-15 14:01:20'),
(232, 4, 10, '/subdomainfinder', 'POST', '2025-01-15 14:07:26'),
(233, 4, 10, '/subdomainfinder', 'GET', '2025-01-15 14:07:30'),
(234, 4, NULL, '/subdomainfinder?domain=https://adrien.nertyrp.fr', 'GET', '2025-01-15 14:07:49'),
(235, 4, NULL, '/password?length=100', 'GET', '2025-01-15 14:08:54'),
(236, 4, NULL, '/mailchecker?mail=weatexweatex@gmail.com', 'GET', '2025-01-15 14:10:56'),
(237, 4, NULL, '/faker?sex=homme', 'GET', '2025-01-15 14:12:06'),
(238, 4, NULL, '/faker?sex=male', 'GET', '2025-01-15 14:12:12'),
(239, 4, NULL, '/passwordchecker?password=test', 'GET', '2025-01-15 14:13:12'),
(240, 4, NULL, '/crawler?nom=Yael%20Busser', 'GET', '2025-01-15 14:13:59'),
(241, 4, NULL, '/mailer?quantity=1&target=weatexweatex@gmail.com&content=testons&subject=sujet', 'GET', '2025-01-15 14:15:10'),
(242, 4, NULL, '/ddos?ip=142.251.36.14&amount=2', 'GET', '2025-01-15 14:15:55'),
(243, 4, 11, '/randomimage', 'GET', '2025-01-15 14:17:25'),
(244, 4, 5, '/log', 'GET', '2025-01-15 14:23:20'),
(245, 4, 5, '/log', 'GET', '2025-01-15 14:23:26'),
(246, 4, NULL, '/log/user?id_user=4&quantity=15', 'GET', '2025-01-15 14:23:32'),
(247, 4, NULL, '/log/user?id_user=4&quantity=15', 'GET', '2025-01-15 14:23:48'),
(248, 4, NULL, '/log/functionnality?id_functionnality=5', 'GET', '2025-01-15 14:23:59'),
(249, 4, 6, '/log/user', 'POST', '2025-01-15 14:24:34'),
(250, 4, 7, '/log/functionnality', 'POST', '2025-01-15 14:24:46'),
(251, 4, 5, '/log', 'GET', '2025-01-15 14:24:49'),
(252, 4, 5, '/log', 'POST', '2025-01-15 14:24:52'),
(253, 4, 11, '/randomimage', 'GET', '2025-01-15 14:25:07'),
(254, 4, 11, '/randomimage', 'GET', '2025-01-15 14:36:03'),
(255, 4, 2, '/auth/register', 'POST', '2025-01-15 14:44:41');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `created_at`) VALUES
(4, 'amaury2', '$2a$10$Syr0W2yxOpaLg8sY1SG37upHg6LCVjR3dUt4kCaBEy3TRkS1O1bPu', 'admin', '2024-10-31 08:26:05'),
(8, 'kevin', '$2a$10$qkxOiSIoqGzBrJmnWkTC0O24qL7Z0KFrEjhBYmNFZyYrxXrrMXrQS', 'admin', '2025-01-15 14:44:42');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `functionality`
--
ALTER TABLE `functionality`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_functionnality` (`id_functionnality`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `idx_username` (`username`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `functionality`
--
ALTER TABLE `functionality`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=256;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `logs`
--
ALTER TABLE `logs`
  ADD CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `logs_ibfk_2` FOREIGN KEY (`id_functionnality`) REFERENCES `functionality` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
