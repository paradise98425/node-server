-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 16, 2021 at 02:03 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `go-explore`
--

-- --------------------------------------------------------

--
-- Table structure for table `qr_setup`
--

CREATE TABLE `qr_setup` (
  `id` int(11) NOT NULL,
  `qr_code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `qr_setup`
--

INSERT INTO `qr_setup` (`id`, `qr_code`, `location_id`) VALUES
(1, 'FRELLSEN', 1),
(2, 'HANDELSSKOLE', 2),
(3, 'HIMMERLEV', 3),
(4, 'HTX', 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `qr_setup`
--
ALTER TABLE `qr_setup`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_qr_setup_location_location_id` (`location_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `qr_setup`
--
ALTER TABLE `qr_setup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `qr_setup`
--
ALTER TABLE `qr_setup`
  ADD CONSTRAINT `fk_qr_setup_location_location_id` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
