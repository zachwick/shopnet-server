-- phpMyAdmin SQL Dump
-- version 4.2.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 16, 2014 at 03:06 PM
-- Server version: 5.5.39-MariaDB-2
-- PHP Version: 5.6.0-1+b1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `shopnet`
--

-- --------------------------------------------------------

--
-- Table structure for table `Datapoint`
--

CREATE TABLE IF NOT EXISTS `Datapoint` (
`id` int(10) unsigned NOT NULL,
  `node_id` int(11) NOT NULL,
  `temp` float NOT NULL,
  `humidity` float NOT NULL,
  `pressure` float NOT NULL,
  `light` float NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Datapoint`
--

INSERT INTO `Datapoint` (`id`, `node_id`, `temp`, `humidity`, `pressure`, `light`, `timestamp`) VALUES
(1, 8, 71.1, 44.1, 1631.7, 1.3, '2014-09-16 12:54:45'),
(2, 8, 71.1, 44.1, 1631.7, 1.3, '2014-09-16 13:00:45'),
(3, 8, 74.9, 42.5, 1515.5, 3, '2014-09-16 17:14:30'),
(4, 8, 68.5, 54.7, 259.5, 0.6, '2014-10-16 13:51:41'),
(5, 8, 68.6, 56.1, 259.2, 0.2, '2014-10-16 13:51:46'),
(6, 8, 68.6, 55.2, 264.2, 0.4, '2014-10-16 13:51:51'),
(7, 8, 68.7, 54.6, 259.2, 0.2, '2014-10-16 13:51:56'),
(8, 8, 68.7, 54.4, 260, 0.4, '2014-10-16 13:52:01'),
(9, 8, 68.7, 54.3, 262.5, 0.7, '2014-10-16 13:52:06'),
(10, 8, 68.7, 54.2, 262.2, 0.3, '2014-10-16 13:52:12'),
(11, 8, 68.7, 54.1, 261.7, 0.6, '2014-10-16 13:52:17'),
(12, 8, 68.7, 54, 264, 0.1, '2014-10-16 13:52:22'),
(13, 8, 68.7, 54.1, 261.5, 0.4, '2014-10-16 13:52:27'),
(14, 8, 68.7, 54.2, 261.2, 0.3, '2014-10-16 13:52:32'),
(15, 8, 68.6, 54.2, 260.5, 0.2, '2014-10-16 13:52:37'),
(16, 8, 68.6, 54.3, 262, 0.4, '2014-10-16 13:52:43'),
(17, 8, 68.6, 54.3, 259.5, 0.3, '2014-10-16 13:52:48'),
(18, 8, 68.6, 55.2, 260.7, 0.4, '2014-10-16 13:52:53'),
(19, 8, 68.6, 56.2, 261.2, 0.2, '2014-10-16 13:52:58');

-- --------------------------------------------------------

--
-- Table structure for table `Node`
--

CREATE TABLE IF NOT EXISTS `Node` (
`id` int(10) unsigned NOT NULL,
  `lat` float(10,0) NOT NULL DEFAULT '0',
  `lon` float(10,0) NOT NULL DEFAULT '0',
  `site_id` int(11) NOT NULL,
  `macaddr` varchar(33) NOT NULL,
  `node_location` varchar(10) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Node`
--

INSERT INTO `Node` (`id`, `lat`, `lon`, `site_id`, `macaddr`, `node_location`) VALUES
(8, 0, 0, 8, '90A2DA0F4BD0', 'Desk Top');

-- --------------------------------------------------------

--
-- Table structure for table `Site`
--

CREATE TABLE IF NOT EXISTS `Site` (
`id` int(10) unsigned NOT NULL,
  `name` varchar(50) NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `temp_sp` float NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Site`
--

INSERT INTO `Site` (`id`, `name`, `user_id`, `temp_sp`) VALUES
(8, 'zwick shop', 1, 10.7);

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE IF NOT EXISTS `User` (
`id` int(10) unsigned NOT NULL,
  `username` varchar(15) NOT NULL,
  `email` varchar(35) NOT NULL,
  `privilege` int(11) NOT NULL,
  `password` varchar(33) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`id`, `username`, `email`, `privilege`, `password`) VALUES
(1, 'admin', 'zach@zachwick.com', 2, '21232f297a57a5a743894a0e4a801fc3');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Datapoint`
--
ALTER TABLE `Datapoint`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Node`
--
ALTER TABLE `Node`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Site`
--
ALTER TABLE `Site`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Datapoint`
--
ALTER TABLE `Datapoint`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `Node`
--
ALTER TABLE `Node`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `Site`
--
ALTER TABLE `Site`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
