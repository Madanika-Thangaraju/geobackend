-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 12, 2026 at 07:08 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `geohomefinder`
--

-- --------------------------------------------------------

--
-- Table structure for table `call_requests`
--

CREATE TABLE `call_requests` (
  `id` int(11) NOT NULL,
  `tenant_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `status` enum('pending','accepted','rejected') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `call_requests`
--

INSERT INTO `call_requests` (`id`, `tenant_id`, `owner_id`, `status`, `created_at`) VALUES
(1, 8, 12, 'accepted', '2026-01-29 08:31:00'),
(2, 8, 12, 'accepted', '2026-01-29 08:33:18'),
(3, 16, 12, 'pending', '2026-01-30 05:50:11'),
(4, 16, 16, 'accepted', '2026-01-30 05:56:14'),
(5, 20, 16, 'accepted', '2026-02-02 07:42:05'),
(6, 21, 16, 'accepted', '2026-02-06 06:26:18'),
(7, 16, 8, 'pending', '2026-02-06 06:56:55'),
(8, 22, 8, 'pending', '2026-02-06 08:21:29'),
(9, 16, 24, 'accepted', '2026-02-11 06:52:34'),
(10, 16, 20, 'pending', '2026-02-11 06:53:11'),
(11, 17, 16, 'accepted', '2026-02-11 06:54:40'),
(12, 17, 24, 'accepted', '2026-02-11 06:57:28'),
(13, 24, 24, 'accepted', '2026-02-11 07:56:39');

-- --------------------------------------------------------

--
-- Table structure for table `contact_requests`
--

CREATE TABLE `contact_requests` (
  `id` int(11) NOT NULL,
  `tenant_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `conversations`
--

CREATE TABLE `conversations` (
  `id` int(11) NOT NULL,
  `user1_id` int(11) NOT NULL,
  `user2_id` int(11) NOT NULL,
  `property_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `conversations`
--

INSERT INTO `conversations` (`id`, `user1_id`, `user2_id`, `property_id`, `created_at`) VALUES
(3, 8, 12, 8, '2026-01-28 12:14:20'),
(4, 12, 16, 8, '2026-01-30 05:49:51'),
(5, 16, 16, 9, '2026-01-30 05:56:09'),
(6, 16, 20, 9, '2026-02-02 06:00:35'),
(7, 8, 16, 6, '2026-02-02 10:15:58'),
(8, 16, 21, 9, '2026-02-06 06:25:42');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `conversation_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `type` enum('text','image','location') DEFAULT 'text',
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `conversation_id`, `sender_id`, `content`, `type`, `is_read`, `created_at`) VALUES
(7, 3, 8, 'Hey anu', 'text', 0, '2026-01-28 12:14:20'),
(8, 3, 12, 'Yes madhu', 'text', 0, '2026-01-28 12:15:20'),
(9, 3, 12, 'Hi anu', 'text', 0, '2026-01-29 09:02:31'),
(10, 3, 12, 'Hi madhu', 'text', 0, '2026-01-29 09:02:38'),
(11, 3, 8, '📅 Requested a tour for 2026-01-30 at 10:00 AM', 'text', 0, '2026-01-29 09:12:48'),
(12, 3, 12, '😊', 'text', 0, '2026-01-29 09:14:06'),
(13, 3, 12, '📅 Requested a tour for 2026-01-30 at 10:00 AM', 'text', 0, '2026-01-29 09:14:55'),
(14, 3, 8, '📍 My Location: https://www.google.com/maps?q=11.0092331,77.0818895', 'text', 0, '2026-01-29 09:19:16'),
(15, 3, 8, '📍 My Location: https://www.google.com/maps?q=11.0092331,77.0818895', 'text', 0, '2026-01-29 09:19:16'),
(16, 3, 8, '📍 My Location: https://www.google.com/maps?q=11.0092331,77.0818895', 'text', 0, '2026-01-29 09:19:16'),
(17, 3, 8, '📍 My Location: https://www.google.com/maps?q=11.0092331,77.0818895', 'text', 0, '2026-01-29 09:19:16'),
(18, 3, 8, '📍 My Location: https://www.google.com/maps?q=11.0092331,77.0818895', 'text', 0, '2026-01-29 09:19:16'),
(19, 3, 8, '📍 My Location: https://www.google.com/maps?q=11.0092331,77.0818895', 'text', 0, '2026-01-29 09:19:16'),
(20, 3, 8, '📍 My Location: https://www.google.com/maps?q=11.0092331,77.0818895', 'text', 0, '2026-01-29 09:19:16'),
(21, 3, 8, '📍 My Location: https://www.google.com/maps?q=11.0092331,77.0818895', 'text', 0, '2026-01-29 09:19:16'),
(22, 3, 8, '📍 My Location: https://www.google.com/maps?q=11.0092331,77.0818895', 'text', 0, '2026-01-29 09:19:16'),
(23, 3, 12, '📍 My Location: https://www.google.com/maps?q=11.0092331,77.0818895', 'text', 0, '2026-01-29 09:19:46'),
(24, 3, 8, '🤝 vanakkam', 'text', 0, '2026-01-29 09:25:22'),
(25, 4, 16, 'Hello', 'text', 0, '2026-01-30 05:49:51'),
(26, 5, 16, 'Hello mam', 'text', 0, '2026-01-30 05:56:09'),
(27, 6, 20, 'Hello mam', 'text', 0, '2026-02-02 06:00:35'),
(28, 7, 16, 'Hello', 'text', 0, '2026-02-02 10:15:58'),
(29, 5, 16, 'Hello mam', 'text', 0, '2026-02-02 10:17:39'),
(30, 5, 16, '📅 Requested a tour for 2026-02-03 at 10:00 AM', 'text', 0, '2026-02-02 10:17:46'),
(31, 5, 16, '📍 My Location: https://www.google.com/maps?q=11.0160076,76.9996997', 'text', 0, '2026-02-02 10:17:46'),
(32, 8, 21, '📅 Requested a tour for 2026-02-07 at 10:00 AM', 'text', 0, '2026-02-06 06:25:42'),
(33, 8, 21, 'Hii😍', 'text', 0, '2026-02-06 06:25:58'),
(34, 8, 16, 'Hii', 'text', 0, '2026-02-06 06:53:44');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `property_id` int(11) DEFAULT NULL,
  `type` enum('like','save','view','message','tour_accepted','tour_rejected','call_accepted','call_rejected') NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `sender_id`, `property_id`, `type`, `message`, `is_read`, `created_at`) VALUES
(1, 12, 8, 8, 'view', 'Someone viewed your property', 0, '2026-01-28 16:45:33'),
(2, 12, 8, 8, 'view', 'Someone viewed your property', 0, '2026-01-29 08:05:04'),
(3, 12, 8, 8, 'view', 'Someone viewed your property', 0, '2026-01-29 08:05:16'),
(4, 12, 8, 8, 'view', 'Someone viewed your property', 0, '2026-01-29 08:28:41'),
(5, 12, 8, 8, 'view', 'Someone viewed your property', 0, '2026-01-29 08:30:55'),
(6, 12, 8, 8, 'view', 'Someone viewed your property', 0, '2026-01-29 08:33:14'),
(7, 12, 8, 8, 'view', 'Someone viewed your property', 0, '2026-01-29 08:47:10'),
(8, 12, 8, 8, 'view', 'Someone viewed your property', 0, '2026-01-29 08:50:24'),
(9, 12, 8, 8, 'view', 'Someone viewed your property', 0, '2026-01-29 08:51:52'),
(10, 12, 8, 8, 'view', 'Someone viewed your property', 0, '2026-01-29 09:00:29'),
(11, 12, 8, 8, 'view', 'Someone viewed your property', 0, '2026-01-29 09:00:53'),
(12, 8, 12, 8, 'message', 'You have a new message', 0, '2026-01-29 09:02:31'),
(13, 8, 12, 8, 'message', 'You have a new message', 0, '2026-01-29 09:02:38'),
(14, 12, 8, 8, 'message', 'You have a new message', 0, '2026-01-29 09:12:48'),
(15, 8, 12, 8, 'message', 'You have a new message', 0, '2026-01-29 09:14:06'),
(16, 8, 12, 8, 'message', 'You have a new message', 0, '2026-01-29 09:14:55'),
(17, 12, 8, 8, 'view', 'Someone viewed your property', 0, '2026-01-29 09:18:51'),
(18, 12, 8, 8, 'message', 'You have a new message', 0, '2026-01-29 09:19:16'),
(19, 12, 8, 8, 'message', 'You have a new message', 0, '2026-01-29 09:19:16'),
(20, 12, 8, 8, 'message', 'You have a new message', 0, '2026-01-29 09:19:16'),
(21, 12, 8, 8, 'message', 'You have a new message', 0, '2026-01-29 09:19:16'),
(22, 12, 8, 8, 'message', 'You have a new message', 0, '2026-01-29 09:19:16'),
(23, 12, 8, 8, 'message', 'You have a new message', 0, '2026-01-29 09:19:16'),
(24, 12, 8, 8, 'message', 'You have a new message', 0, '2026-01-29 09:19:16'),
(25, 12, 8, 8, 'message', 'You have a new message', 0, '2026-01-29 09:19:16'),
(26, 12, 8, 8, 'message', 'You have a new message', 0, '2026-01-29 09:19:16'),
(27, 8, 12, 8, 'message', 'You have a new message', 0, '2026-01-29 09:19:46'),
(28, 12, 8, 8, 'view', 'Someone viewed your property', 0, '2026-01-29 09:24:57'),
(29, 12, 8, 8, 'message', 'You have a new message', 0, '2026-01-29 09:25:22'),
(30, 8, 16, 6, 'view', 'Someone viewed your property', 0, '2026-01-30 05:48:31'),
(31, 8, 16, 7, 'view', 'Someone viewed your property', 0, '2026-01-30 05:48:38'),
(32, 12, 16, 8, 'message', 'You have a new message', 0, '2026-01-30 05:49:51'),
(33, 8, 16, 6, 'like', 'Someone liked your property', 0, '2026-01-30 05:51:10'),
(34, 8, 16, 7, 'save', 'Someone saved your property', 0, '2026-01-30 05:51:12'),
(35, 8, 17, 6, 'view', 'Someone viewed your property', 0, '2026-01-30 06:02:10'),
(36, 8, 17, 6, 'view', 'Someone viewed your property', 0, '2026-01-30 06:02:30'),
(37, 8, 16, 6, 'view', 'Someone viewed your property', 0, '2026-01-30 06:10:38'),
(38, 8, 16, 6, 'view', 'Someone viewed your property', 0, '2026-01-30 06:12:49'),
(39, 16, 20, 9, 'view', 'Someone viewed your property', 1, '2026-02-02 05:59:43'),
(40, 16, 20, 9, 'message', 'You have a new message', 1, '2026-02-02 06:00:35'),
(41, 8, 16, 6, 'view', 'Someone viewed your property', 0, '2026-02-02 06:29:54'),
(42, 20, 16, 11, 'view', 'Someone viewed your property', 0, '2026-02-02 07:08:50'),
(43, 20, 16, 11, 'view', 'Someone viewed your property', 0, '2026-02-02 07:08:51'),
(44, 16, 20, 9, 'view', 'Someone viewed your property', 1, '2026-02-02 07:42:02'),
(45, 16, 20, 9, 'view', 'Someone viewed your property', 1, '2026-02-02 07:43:05'),
(46, 20, 16, 11, 'view', 'Someone viewed your property', 0, '2026-02-02 07:52:38'),
(47, 20, 16, 11, 'like', 'Someone liked your property', 0, '2026-02-02 07:53:00'),
(48, 20, 16, 11, 'save', 'Someone saved your property', 0, '2026-02-02 07:53:01'),
(49, 20, 16, 11, 'view', 'Someone viewed your property', 0, '2026-02-02 07:53:03'),
(50, 8, 16, 6, 'view', 'Someone viewed your property', 0, '2026-02-02 09:57:15'),
(51, 8, 16, 6, 'view', 'Someone viewed your property', 0, '2026-02-02 09:57:25'),
(52, 8, 16, 6, 'view', 'Someone viewed your property', 0, '2026-02-02 10:14:28'),
(53, 8, 16, 6, 'message', 'You have a new message', 0, '2026-02-02 10:15:58'),
(54, 16, 21, 12, 'save', 'Someone saved your property', 1, '2026-02-06 06:23:11'),
(55, 16, 21, 12, 'like', 'Someone liked your property', 1, '2026-02-06 06:23:14'),
(56, 16, 21, 12, 'save', 'Someone saved your property', 1, '2026-02-06 06:23:18'),
(57, 16, 21, 9, 'view', 'Someone viewed your property', 1, '2026-02-06 06:24:54'),
(58, 16, 21, 9, 'message', 'You have a new message', 1, '2026-02-06 06:25:42'),
(59, 16, 21, 9, 'message', 'You have a new message', 1, '2026-02-06 06:25:58'),
(60, 21, 16, 9, 'message', 'You have a new message', 0, '2026-02-06 06:53:44'),
(61, 8, 16, 6, 'view', 'Someone viewed your property', 0, '2026-02-06 06:56:53'),
(62, 16, 21, 9, 'view', 'Someone viewed your property', 1, '2026-02-06 06:57:53'),
(63, 8, 22, 6, 'view', 'Someone viewed your property', 0, '2026-02-06 08:21:00'),
(64, 16, 23, 9, 'view', 'Someone viewed your property', 0, '2026-02-11 06:30:08'),
(65, 24, 16, 14, 'view', 'Someone viewed your property', 0, '2026-02-11 06:52:21'),
(66, 20, 16, 11, 'view', 'Someone viewed your property', 0, '2026-02-11 06:53:06'),
(67, 24, 17, 14, 'view', 'Someone viewed your property', 0, '2026-02-11 06:54:30'),
(68, 16, 17, 9, 'view', 'Someone viewed your property', 0, '2026-02-11 06:54:37'),
(69, 17, 16, NULL, 'call_accepted', 'Owner has accepted your call request.', 1, '2026-02-11 06:55:22'),
(70, 24, 17, 14, 'view', 'Someone viewed your property', 0, '2026-02-11 06:57:27'),
(71, 16, 17, 12, 'view', 'Someone viewed your property', 0, '2026-02-11 06:59:29'),
(72, 24, 17, 16, 'view', 'Someone viewed your property', 0, '2026-02-11 06:59:38'),
(73, 17, 24, NULL, 'call_accepted', 'Owner has accepted your call request.', 0, '2026-02-11 07:03:31'),
(74, 16, 24, NULL, 'call_accepted', 'Owner has accepted your call request.', 0, '2026-02-11 07:03:32'),
(75, 24, 24, NULL, 'call_accepted', 'Owner has accepted your call request.', 0, '2026-02-11 07:56:58');

-- --------------------------------------------------------

--
-- Table structure for table `owners`
--

CREATE TABLE `owners` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) DEFAULT NULL,
  `phone` varchar(15) NOT NULL,
  `otp` varchar(6) DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT 0,
  `location` varchar(255) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `listing_type` varchar(270) DEFAULT NULL,
  `property_type` varchar(270) DEFAULT NULL,
  `rent_price` decimal(10,2) DEFAULT NULL,
  `price` varchar(270) DEFAULT NULL,
  `deposit` decimal(10,2) DEFAULT NULL,
  `bedrooms` int(11) DEFAULT NULL,
  `bathrooms` int(11) DEFAULT NULL,
  `bhk` int(11) DEFAULT NULL,
  `sqft` varchar(270) DEFAULT NULL,
  `furnishing` enum('furnished','semi-furnished','unfurnished') DEFAULT NULL,
  `address` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `is_available` tinyint(1) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `status` enum('active','sold','pending') DEFAULT 'active',
  `floor_no` int(11) DEFAULT NULL,
  `parking_capacity` int(11) DEFAULT NULL,
  `is_main_road_facing` tinyint(1) DEFAULT 0,
  `washrooms` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`id`, `owner_id`, `title`, `description`, `listing_type`, `property_type`, `rent_price`, `price`, `deposit`, `bedrooms`, `bathrooms`, `bhk`, `sqft`, `furnishing`, `address`, `location`, `latitude`, `longitude`, `is_available`, `created_at`, `status`, `floor_no`, `parking_capacity`, `is_main_road_facing`, `washrooms`) VALUES
(2, 8, 'testtdsgahdsgagdayds', NULL, 'Sell', 'house', NULL, '4999899', NULL, 2, 2, 1, '131', 'unfurnished', '123131nhuoqghauodghsauogdiuwge2', NULL, NULL, NULL, 1, '2025-12-31 07:24:21', 'active', NULL, NULL, 0, NULL),
(3, 8, 'apatment new', NULL, 'Rent', 'apartment', 30000.00, NULL, 100000.00, 3, 3, 3, '2700', 'semi-furnished', 'D 3 , 5 add test , cbe -641402', NULL, NULL, NULL, 1, '2026-01-03 04:54:26', 'active', NULL, NULL, 0, NULL),
(4, 8, 'Test title', NULL, 'Sell', 'house', NULL, '50000', NULL, 3, 2, 2, '1200', 'semi-furnished', 'Coimbatore', NULL, 12.94203410, 80.20944190, 1, '2026-01-19 05:45:11', 'active', NULL, NULL, 0, NULL),
(6, 8, 'Test case', NULL, 'Sell', 'house', NULL, '100000', NULL, 3, 2, 3, '5000', 'unfurnished', 'Coimbatore, Tamil Nadu, India', 'Coimbatore', 10.99736910, 76.95888760, 1, '2026-01-20 07:45:38', 'active', NULL, NULL, 0, NULL),
(7, 8, '4BHK apartment', 'Detailed information about the promise of the day of the day of the day', 'Sell', 'house', NULL, '500000', NULL, 4, 3, 4, '3500', 'unfurnished', 'Pappampatti Pirivu, Trichy Road, Barathipuram, Coimbatore, Tamil Nadu, India', 'Pappampatti Pirivu', 11.00991800, 77.07993600, 1, '2026-01-28 07:54:59', 'active', NULL, NULL, 0, NULL),
(8, 12, '4BHK apartment in chennai', 'Detailed information please contact me on the way to your family and friends they are you are you doing well and you are you doing well', 'Sell', 'house', NULL, '100000', NULL, 3, 2, 4, '4500', 'semi-furnished', 'Pappampatti Pirivu, Trichy Road, Barathipuram, Coimbatore, Tamil Nadu, India', 'Pappampatti Pirivu', 11.00991800, 77.07993600, 1, '2026-01-28 11:39:46', 'active', NULL, NULL, 0, NULL),
(9, 16, 'Devas ladies hostel', 'Womens pg for students and working women', 'P', 'apartment', 15000.00, NULL, 30000.00, 2, 1, 2, '1200', '', 'peelamedu, Peelamedu, Coimbatore, Tamil Nadu, India', 'peelamedu', 11.02629470, 76.99939820, 1, '2026-01-30 05:55:40', 'active', NULL, NULL, 0, NULL),
(10, 16, 'Corporate Office', 'Office For rent with reception and conference room and Office setup available for rent', 'R', 'house', 50000.00, NULL, 200000.00, 0, 2, 3, '2000', '', 'dsignz media - Web Design and Development, 4th Street, NGP Nagar, Nehru Nagar West, Coimbatore, Tamil Nadu, India', 'dsignz media - Web Design and Development', 11.05028030, 77.03716950, 1, '2026-01-30 08:46:13', 'active', NULL, NULL, 0, NULL),
(11, 20, '4bhk apartment', 'Apartment for family', 'R', 'apartment', 20000.00, NULL, 30000.00, 4, 3, 4, '1400', 'semi-furnished', 'Hopes, Periyar Nagar, Chitra Nagar, Hope College, Coimbatore, Tamil Nadu, India', 'Hopes', 11.02332110, 77.01880210, 1, '2026-02-02 06:07:44', 'active', NULL, NULL, 0, NULL),
(12, 16, 'Vidhai school', ', is a specialized Montessori after-school workspace, playgroup, and activity center for children aged 3–9, offering STEM, arts, and mind games. Specific fee details are not publicly listed, so direct contact via 96886 20202 is recommended for current pricing.', 'C', 'office', NULL, '30000', NULL, NULL, NULL, NULL, '1400', '', 'R.S. Puram, Coimbatore, Tamil Nadu, India', 'R.S. Puram', 11.01016980, 76.95043730, 1, '2026-02-02 09:36:16', 'active', NULL, NULL, 0, NULL),
(13, 23, '3bhk land', 'Empty land', 'Sell', 'plot', NULL, '5000000', NULL, NULL, NULL, NULL, '1200', NULL, 'Tiruppur, Tamil Nadu, India', 'Tiruppur', 11.10852420, 77.34106560, 1, '2026-02-11 06:17:24', 'active', NULL, NULL, 0, NULL),
(14, 24, 'Cozy 2BHK Apartment in Peelamedu', 'A well-maintained 2BHK apartment perfect for families. Close to PSG Tech and Fun Mall.', 'Rent', 'apartment', 15000.00, '15000', 50000.00, 2, 2, 2, '1200', 'semi-furnished', '12, Avinashi Rd, Peelamedu, Coimbatore', 'Peelamedu', 11.02500000, 77.00000000, 1, '2026-02-11 06:48:02', 'active', 2, 1, 0, 2),
(15, 24, 'Luxury 3BHK Villa with Garden', 'Spacious independent villa with private garden and covered parking. Pet friendly.', 'Rent', 'villa', 35000.00, '35000', 200000.00, 3, 3, 3, '2400', '', '45, Green Avenue, Saravanampatti, Coimbatore', 'Saravanampatti', 11.08000000, 76.98000000, 1, '2026-02-11 06:48:02', 'active', 0, 2, 0, 3),
(16, 24, 'Compact 1BHK Studio near Gandhipuram', 'Budget-friendly studio apartment ideal for bachelors or students. Central location.', 'Rent', 'apartment', 8000.00, '8000', 30000.00, 1, 1, 1, '600', 'unfurnished', '8th Cross, Gandhipuram, Coimbatore', 'Gandhipuram', 11.01680000, 76.96000000, 1, '2026-02-11 06:48:02', 'active', 3, 0, 1, 1),
(17, 24, 'Modern 3BHK Flat', 'Brand new flat in a gated community with swimming pool and gym.', 'Sell', 'apartment', 0.00, '7500000', 0.00, 3, 3, 3, '1550', 'unfurnished', 'Royal Enclave, Vadavalli, Coimbatore', 'Vadavalli', 11.04500000, 76.90000000, 1, '2026-02-11 06:48:02', 'active', 4, 1, 0, 3),
(18, 24, 'Premium Residential Plot', '2400 sqft plot ready for construction. Clear titles and DTCP approved.', 'Sell', 'plot', 0.00, '4500000', 0.00, 0, 0, 0, '2400', 'unfurnished', 'Kovaipudur, Coimbatore', 'Kovaipudur', 10.94000000, 76.94000000, 1, '2026-02-11 06:48:02', 'active', 0, 0, 0, 0),
(19, 24, 'Prime Office Space on Avinashi Road', '1500 sqft office space on 1st floor. Main road facing, ideal for IT or consultancy.', 'Rent', 'office', 45000.00, '45000', 300000.00, 0, 2, 0, '1500', 'semi-furnished', 'Avinashi Road Opp. Airport, Coimbatore', 'Avinashi Road', 11.03500000, 77.03000000, 1, '2026-02-11 06:48:02', 'active', 1, 3, 1, 2),
(20, 24, 'Retail Shop in Sai Baba Colony', 'Ground floor shop in busy market area. High footfall.', 'Rent', 'shop', 20000.00, '20000', 150000.00, 0, 0, 0, '400', 'unfurnished', 'NSR Road, Sai Baba Colony, Coimbatore', 'Sai Baba Colony', 11.02800000, 76.94000000, 1, '2026-02-11 06:48:02', 'active', 0, 0, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `property_images`
--

CREATE TABLE `property_images` (
  `id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property_images`
--

INSERT INTO `property_images` (`id`, `property_id`, `image_url`, `created_at`) VALUES
(1, 2, 'blob:http://localhost:8081/a34e0a56-1218-4752-9cbd-8fce85cb9c46', '2025-12-31 07:24:21'),
(2, 3, 'blob:http://localhost:8081/a6a9cb34-0a85-4c49-86bf-1984de21ae69', '2026-01-03 04:54:26'),
(3, 4, 'file:///data/user/0/host.exp.exponent/cache/ImagePicker/99326508-2e4e-4a03-911e-26d685a560ea.jpeg', '2026-01-19 05:45:12'),
(5, 6, 'file:///data/user/0/host.exp.exponent/cache/ImagePicker/84f8e1b4-ea5f-482c-9140-3686b1d2f86d.jpeg', '2026-01-20 07:45:39'),
(6, 6, 'file:///data/user/0/host.exp.exponent/cache/ImagePicker/2b1cae12-0702-4030-a283-534ea853c0f7.jpeg', '2026-01-20 07:45:39'),
(7, 6, 'file:///data/user/0/host.exp.exponent/cache/ImagePicker/78ebc00c-1cf9-419e-ab5c-138b242eecf1.jpeg', '2026-01-20 07:45:39'),
(8, 7, 'file:///data/user/0/host.exp.exponent/cache/ImagePicker/3f4cf235-ce62-4e76-88a1-1d083c72a933.jpeg', '2026-01-28 07:55:00'),
(9, 8, 'file:///data/user/0/host.exp.exponent/cache/ImagePicker/5332f0e1-175b-4690-beca-f4e739c2cae8.jpeg', '2026-01-28 11:39:46'),
(10, 8, 'file:///data/user/0/host.exp.exponent/cache/ImagePicker/d410372e-2897-4b50-a7e8-45759602c216.jpeg', '2026-01-28 11:39:46'),
(11, 8, 'file:///data/user/0/host.exp.exponent/cache/ImagePicker/09f425cc-df84-4bc4-b275-d9a1b81f9c89.jpeg', '2026-01-28 11:39:46'),
(12, 8, 'file:///data/user/0/host.exp.exponent/cache/ImagePicker/9c93e11d-fbcf-40c3-8611-6fc3ff427fbb.jpeg', '2026-01-28 11:39:46'),
(13, 9, 'file:///data/user/0/host.exp.exponent/cache/ImagePicker/568a3e15-29c0-45f7-a692-3e1024c735b7.jpeg', '2026-01-30 05:55:40'),
(14, 10, 'file:///data/user/0/host.exp.exponent/cache/ImagePicker/eda2d396-d5f4-42e7-8b8a-24a24dffec64.jpeg', '2026-01-30 08:46:13'),
(15, 10, 'file:///data/user/0/host.exp.exponent/cache/ImagePicker/7917d84d-16a7-45e8-ae1e-01875f4b575f.jpeg', '2026-01-30 08:46:13'),
(16, 10, 'file:///data/user/0/host.exp.exponent/cache/ImagePicker/899089be-cb8f-40d8-945b-105f435302c0.jpeg', '2026-01-30 08:46:13'),
(17, 11, 'file:///data/user/0/host.exp.exponent/cache/ImagePicker/ababf676-c6bc-4e3b-a0de-5eb0906d207a.jpeg', '2026-02-02 06:07:44'),
(18, 12, 'file:///data/user/0/host.exp.exponent/cache/ImagePicker/29ae2dbc-3fa9-4331-8bc0-2b33751edf07.jpeg', '2026-02-02 09:36:16'),
(19, 13, 'file:///data/user/0/host.exp.exponent/cache/ImagePicker/21be0ba8-8677-436b-8c5c-6ce4545f5798.jpeg', '2026-02-11 06:17:24'),
(20, 14, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800', '2026-02-11 06:48:02'),
(21, 15, 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800', '2026-02-11 06:48:02'),
(22, 15, 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800', '2026-02-11 06:48:02'),
(23, 16, 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800', '2026-02-11 06:48:02'),
(24, 16, 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=800', '2026-02-11 06:48:02'),
(25, 16, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800', '2026-02-11 06:48:02'),
(26, 17, 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=800', '2026-02-11 06:48:02'),
(27, 17, 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=800', '2026-02-11 06:48:02'),
(28, 17, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800', '2026-02-11 06:48:02'),
(29, 18, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800', '2026-02-11 06:48:02'),
(30, 18, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800', '2026-02-11 06:48:02'),
(31, 19, 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=800', '2026-02-11 06:48:02'),
(32, 19, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800', '2026-02-11 06:48:02'),
(33, 19, 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=800', '2026-02-11 06:48:02'),
(34, 20, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800', '2026-02-11 06:48:02'),
(35, 20, 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=800', '2026-02-11 06:48:02'),
(36, 20, 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800', '2026-02-11 06:48:02');

-- --------------------------------------------------------

--
-- Table structure for table `property_likes`
--

CREATE TABLE `property_likes` (
  `id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property_likes`
--

INSERT INTO `property_likes` (`id`, `property_id`, `user_id`, `created_at`) VALUES
(4, 7, 8, '2026-01-28 11:31:22'),
(11, 9, 16, '2026-02-02 07:57:24');

-- --------------------------------------------------------

--
-- Table structure for table `recently_viewed_properties`
--

CREATE TABLE `recently_viewed_properties` (
  `id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `session_id` varchar(255) DEFAULT NULL,
  `last_viewed_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recently_viewed_properties`
--

INSERT INTO `recently_viewed_properties` (`id`, `property_id`, `user_id`, `ip_address`, `session_id`, `last_viewed_at`) VALUES
(1, 7, 8, '::ffff:172.30.51.112', NULL, '2026-01-29 06:16:12'),
(15, 8, 8, '::ffff:172.30.51.112', NULL, '2026-01-29 09:24:57'),
(16, 8, 12, '::ffff:172.30.51.112', NULL, '2026-01-28 11:42:39'),
(35, 6, 16, '::ffff:192.168.29.50', NULL, '2026-02-06 06:56:53'),
(36, 7, 16, '::ffff:192.168.29.50', NULL, '2026-01-30 05:48:38'),
(37, 9, 16, '::ffff:192.168.29.50', NULL, '2026-02-11 06:13:04'),
(39, 6, 17, '::ffff:192.168.29.50', NULL, '2026-01-30 06:02:30'),
(46, 10, 16, '::ffff:192.168.29.24', NULL, '2026-02-02 06:09:39'),
(50, 9, 20, '::ffff:192.168.29.23', NULL, '2026-02-02 07:43:05'),
(51, 11, 20, '::ffff:192.168.29.23', NULL, '2026-02-02 06:08:08'),
(54, 11, 16, '::ffff:192.168.29.23', NULL, '2026-02-11 06:53:06'),
(72, 12, 16, '::ffff:192.168.29.23', NULL, '2026-02-11 06:47:28'),
(82, 9, 21, '::ffff:192.168.29.51', NULL, '2026-02-06 06:57:53'),
(90, 6, 22, '::ffff:192.168.29.51', NULL, '2026-02-06 08:21:00'),
(93, 13, 23, '::ffff:192.168.29.50', NULL, '2026-02-11 06:18:13'),
(94, 9, 23, '::ffff:192.168.29.50', NULL, '2026-02-11 06:30:08'),
(96, 14, 16, '::ffff:192.168.29.50', NULL, '2026-02-11 06:52:21'),
(98, 14, 17, '::ffff:192.168.29.50', NULL, '2026-02-11 06:57:27'),
(99, 9, 17, '::ffff:192.168.29.50', NULL, '2026-02-11 06:54:37'),
(101, 12, 17, '::ffff:192.168.29.50', NULL, '2026-02-11 06:59:29'),
(102, 16, 17, '::ffff:192.168.29.50', NULL, '2026-02-11 06:59:38');

-- --------------------------------------------------------

--
-- Table structure for table `saved_properties`
--

CREATE TABLE `saved_properties` (
  `id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `notes` text DEFAULT NULL,
  `saved_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `saved_properties`
--

INSERT INTO `saved_properties` (`id`, `property_id`, `user_id`, `notes`, `saved_at`) VALUES
(3, 7, 8, '', '2026-01-28 08:47:00'),
(4, 7, 16, '', '2026-01-30 05:51:12'),
(8, 12, 21, '', '2026-02-06 06:23:18');

-- --------------------------------------------------------

--
-- Table structure for table `tour_requests`
--

CREATE TABLE `tour_requests` (
  `id` int(11) NOT NULL,
  `tenant_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `tour_date` date NOT NULL,
  `tour_time` varchar(50) NOT NULL,
  `message` text DEFAULT NULL,
  `status` enum('pending','accepted','rejected') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tour_requests`
--

INSERT INTO `tour_requests` (`id`, `tenant_id`, `owner_id`, `property_id`, `tour_date`, `tour_time`, `message`, `status`, `created_at`) VALUES
(1, 8, 12, 8, '2026-01-31', '10 am noon', 'Hi anu how are you. ??', 'accepted', '2026-01-29 08:29:17'),
(2, 8, 12, 8, '2026-01-30', '10:00 AM', 'Requested via chat quick action', 'accepted', '2026-01-29 09:12:48'),
(3, 12, 8, 8, '2026-01-30', '10:00 AM', 'Requested via chat quick action', 'pending', '2026-01-29 09:14:55'),
(4, 16, 16, 9, '2026-02-03', '10.am', '', 'accepted', '2026-02-02 05:54:19'),
(5, 16, 16, 9, '2026-02-03', '10:00 AM', 'Requested via chat quick action', 'rejected', '2026-02-02 10:17:46'),
(6, 21, 16, 9, '2026-02-07', '10:00 AM', 'Requested via chat quick action', 'accepted', '2026-02-06 06:25:42'),
(7, 21, 16, 9, '2026-02-08', '3pm', '', 'accepted', '2026-02-06 06:26:49'),
(8, 22, 8, 6, '2026-02-07', '10:00 pm', '', 'pending', '2026-02-06 08:21:21');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `otp` varchar(6) DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT 0,
  `location` varchar(255) DEFAULT NULL,
  `latitude` varchar(270) DEFAULT NULL,
  `longitude` varchar(270) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `image` longtext DEFAULT NULL,
  `push_enabled` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `otp`, `is_verified`, `location`, `latitude`, `longitude`, `created_at`, `updated_at`, `image`, `push_enabled`) VALUES
(8, 'madhu', 'madhu@gmail.com', '$2a$10$/HmTiu.zIlig/DuAstnZm.LHM0SOcl4yYlQazQCnFsDqZZ/5ARuQW', '9878787878', NULL, 0, NULL, NULL, NULL, '2025-12-30 05:45:56', '2025-12-30 05:45:56', NULL, 0),
(11, 'Sudharshan', 'suthir@gmail.com', '$2a$10$O38kjKfIROhnLlE9cAzPKOCzkd2N9obYQs2bgqWx98liZDXuuCrr.', '9562353252', NULL, 0, NULL, NULL, NULL, '2026-01-19 08:25:23', '2026-01-19 08:25:23', NULL, 0),
(12, 'Anu', 'anu@gmail.com', '$2a$10$Uw6ew45YjmM1g425vFTOteyV/C3Zm5Rgs17uXksdg3xYWv8dgoive', '9562353258', NULL, 0, NULL, NULL, NULL, '2026-01-19 08:26:29', '2026-01-19 08:26:29', NULL, 0),
(14, 'User', 'user@gmail.com', '$2a$10$keX210Wrrb30PE3G61OJPeozeYwfAUa1KH/TsDuIb8PeRFDFHNML6', '6522352552', NULL, 0, NULL, '11.0245417', '77.00642909999999', '2026-01-19 16:27:47', '2026-01-19 16:27:47', NULL, 0),
(16, 'Madanika ', 'madanikat51@gmail.com', '$2a$10$0kfm71/QXSTHY2UnSqLPTu2XfePZJgilD4hEQc4c1JmSE.8BhQKWG', '7418966767', NULL, 0, '', '10.9973128', '76.9664037', '2026-01-30 05:37:38', '2026-01-30 07:49:12', NULL, 0),
(17, 'Nandhu', 'nandhu@gmail.com', '$2a$10$rgPBrMVqWd8XUIv6sFIzCuxMbZ3lGRskPkGC8un.EiTbOQ8Z/oOki', '9791248678', NULL, 0, NULL, '10.9973691', '76.9588876', '2026-01-30 06:01:27', '2026-01-30 06:01:27', NULL, 0),
(20, 'Nandhu', 'nandhu27@gmail.com', '$2a$10$5V/ccpjYSr23ZVk1OvEKeOnG8SvnU.VemHvnNsA9osnBqsapSSHHe', '9791248679', NULL, 0, NULL, '11.3410364', '77.7171642', '2026-02-02 05:59:16', '2026-02-02 05:59:16', NULL, 0),
(21, 'Keerthu ', 'keerthu@gmail.com', '$2a$10$EjF7HJ8Ia0Hz7d/JPzxqxunoqvcO6oU5.ipJ3.THDTcMaKiqU4ZnO', '9384340275', NULL, 0, NULL, '11.1085242', '77.3410656', '2026-02-06 06:19:25', '2026-02-06 06:19:25', NULL, 0);
INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `otp`, `is_verified`, `location`, `latitude`, `longitude`, `created_at`, `updated_at`, `image`, `push_enabled`) VALUES
(22, 'Sapareshan ', 'sapareshan@gmail.com', '$2a$10$94MKtGU25.CrresqUF1rSu/FGPWiPcxC9uGc7yG9pENeXpnaz.Zb.', '7708082128', NULL, 0, 'Coimbatore, Tamil Nadu, India', '10.9973691', '76.9588876', '2026-02-06 08:20:55', '2026-02-06 08:22:21', 'data:image/jpeg;base64,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', 0);
INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `otp`, `is_verified`, `location`, `latitude`, `longitude`, `created_at`, `updated_at`, `image`, `push_enabled`) VALUES
(23, 'Laks', 'laks@gmail.com', '$2a$10$sLxBLocW.N/bDOalnQxfheqyXOt9PM0RripBpaj0bF1nBrye4E2LK', '9791248675', NULL, 0, NULL, '11.1085242', '77.3410656', '2026-02-11 06:16:13', '2026-02-11 06:16:13', NULL, 0),
(24, 'Seed Owner', 'seed_owner@example.com', '$2a$10$U0MpyUJv0zaQJl6nXnuJuOqRr5cLIBmDSpob278Qe20A/rf/810OG', '9876543210', NULL, 0, NULL, '11.0168', '76.9558', '2026-02-11 06:48:02', '2026-02-11 07:01:10', NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `call_requests`
--
ALTER TABLE `call_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tenant_id` (`tenant_id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Indexes for table `contact_requests`
--
ALTER TABLE `contact_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tenant_id` (`tenant_id`),
  ADD KEY `owner_id` (`owner_id`),
  ADD KEY `property_id` (`property_id`);

--
-- Indexes for table `conversations`
--
ALTER TABLE `conversations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_convo` (`user1_id`,`user2_id`,`property_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `owners`
--
ALTER TABLE `owners`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `properties_ibfk_1` (`owner_id`);

--
-- Indexes for table `property_images`
--
ALTER TABLE `property_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `property_id` (`property_id`);

--
-- Indexes for table `property_likes`
--
ALTER TABLE `property_likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_like` (`property_id`,`user_id`);

--
-- Indexes for table `recently_viewed_properties`
--
ALTER TABLE `recently_viewed_properties`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_view` (`property_id`,`user_id`);

--
-- Indexes for table `saved_properties`
--
ALTER TABLE `saved_properties`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_save` (`property_id`,`user_id`);

--
-- Indexes for table `tour_requests`
--
ALTER TABLE `tour_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tenant_id` (`tenant_id`),
  ADD KEY `owner_id` (`owner_id`),
  ADD KEY `property_id` (`property_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `call_requests`
--
ALTER TABLE `call_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `contact_requests`
--
ALTER TABLE `contact_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `conversations`
--
ALTER TABLE `conversations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `owners`
--
ALTER TABLE `owners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `properties`
--
ALTER TABLE `properties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `property_images`
--
ALTER TABLE `property_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `property_likes`
--
ALTER TABLE `property_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `recently_viewed_properties`
--
ALTER TABLE `recently_viewed_properties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `saved_properties`
--
ALTER TABLE `saved_properties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tour_requests`
--
ALTER TABLE `tour_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `call_requests`
--
ALTER TABLE `call_requests`
  ADD CONSTRAINT `call_requests_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `call_requests_ibfk_2` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `contact_requests`
--
ALTER TABLE `contact_requests`
  ADD CONSTRAINT `contact_requests_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `contact_requests_ibfk_2` FOREIGN KEY (`owner_id`) REFERENCES `owners` (`id`),
  ADD CONSTRAINT `contact_requests_ibfk_3` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`);

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `properties`
--
ALTER TABLE `properties`
  ADD CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `property_images`
--
ALTER TABLE `property_images`
  ADD CONSTRAINT `property_images_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tour_requests`
--
ALTER TABLE `tour_requests`
  ADD CONSTRAINT `tour_requests_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `tour_requests_ibfk_2` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `tour_requests_ibfk_3` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
