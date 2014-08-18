-- phpMyAdmin SQL Dump
-- version 4.2.7deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 18, 2014 at 02:41 PM
-- Server version: 5.5.39-MariaDB-1
-- PHP Version: 5.6.0RC4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `dossier`
--

-- --------------------------------------------------------

--
-- Table structure for table `Datapoint`
--

CREATE TABLE IF NOT EXISTS `Datapoint` (
`id` int(10) unsigned NOT NULL,
  `node_id` int(11) NOT NULL,
  `methane` float(4,0) NOT NULL,
  `co2` float(4,0) NOT NULL,
  `temp` float NOT NULL,
  `amb_temp` float NOT NULL,
  `pipe_temp` float NOT NULL,
  `humidity` float NOT NULL,
  `pressure` float NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `vbatt` float NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `Datapoint`
--

INSERT INTO `Datapoint` (`id`, `node_id`, `methane`, `co2`, `temp`, `amb_temp`, `pipe_temp`, `humidity`, `pressure`, `timestamp`, `vbatt`) VALUES
(1, 1, 12, 2, 156.7, 96.8, 155, 78, 35, '2014-08-15 17:08:11', 3.02),
(2, 1, 36, 14, 256, 93, 216, 59, 36, '2014-08-15 17:08:25', 2.98),
(3, 2, 47, 43, 156.7, 96.8, 155, 78, 35, '2014-08-15 17:08:37', 3.2),
(4, 2, 36, 14, 256, 93, 216, 59, 36, '2014-08-15 17:08:48', 2.3);

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
  `well_id` varchar(10) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `Node`
--

INSERT INTO `Node` (`id`, `lat`, `lon`, `site_id`, `macaddr`, `well_id`) VALUES
(1, 0, 0, 1, '01234567891011121314151617181920', 'A1F250'),
(2, 0, 0, 1, '20191817161514131211109876543210', 'Z00912');

-- --------------------------------------------------------

--
-- Table structure for table `Site`
--

CREATE TABLE IF NOT EXISTS `Site` (
`id` int(10) unsigned NOT NULL,
  `name` varchar(50) NOT NULL,
  `user_id` int(10) unsigned NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `Site`
--

INSERT INTO `Site` (`id`, `name`, `user_id`) VALUES
(1, 'Test Site #1', 1),
(2, 'Test Site #2', 1),
(3, 'Test Site #3', 2),
(4, 'Test #4', 1);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`id`, `username`, `email`, `privilege`, `password`) VALUES
(1, 'admin', 'zwick@amfnano.com', 2, '21232f297a57a5a743894a0e4a801fc3'),
(2, 'zwick', 'zach@zachwick.com', 0, '436e53d48db9a24a3fe18932c00871e9'),
(3, 'tester', 'test@zachwick.com', 0, '098f6bcd4621d373cade4e832627b4f6');

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
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `Node`
--
ALTER TABLE `Node`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `Site`
--
ALTER TABLE `Site`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
