-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 16, 2024 at 06:50 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `training_institute`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `password`, `created_at`) VALUES
(3, 'as', 'aarsanaarsan008@gmail.com', '1234', '2024-02-14 09:58:26'),
(8, 'Aarsan', 'hello@1234', 'hello@1234', '2024-02-15 04:15:44');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `course` varchar(255) NOT NULL,
  `fees` varchar(255) NOT NULL,
  `duration` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `course`, `fees`, `duration`, `created_at`) VALUES
(27, 'Frontend Stack', '3200', '5 weeks', '2024-02-15 04:43:15'),
(30, 'Mean Stack', '3200', '10 weeks', '2024-02-15 04:43:33'),
(31, 'Full Stack developer', '200', '2 weeks', '2024-02-15 12:41:57'),
(32, 'Backend ', '3000', '2 weeks', '2024-02-15 12:42:17'),
(34, '.net Developer ', '55', '7 weeks', '2024-02-15 16:41:39'),
(38, 'MEVN Stck', '9393', '4 weeks', '2024-02-15 17:14:54');

-- --------------------------------------------------------

--
-- Table structure for table `shedule`
--

CREATE TABLE `shedule` (
  `id` int(11) NOT NULL,
  `course` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `starttime` varchar(255) NOT NULL,
  `endtime` varchar(255) NOT NULL,
  `venue` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shedule`
--

INSERT INTO `shedule` (`id`, `course`, `date`, `starttime`, `endtime`, `venue`, `created_at`) VALUES
(1, 'Backend ', '2024-02-17', '17:06', '17:14', 'room 21', '2024-02-15 11:33:56'),
(3, 'Hello', '14-14-2002', '2020', '05:21', 'room202', '2024-02-15 11:43:03'),
(5, 'Frontend Stack', '2024-02-09', '18:47', '18:49', 'Room 22', '2024-02-15 13:14:52'),
(7, 'Mean Stack', '2024-02-18', '10:48', '22:56', 'Room 22', '2024-02-15 17:16:13');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `student_name` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `age` int(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `course` varchar(255) NOT NULL,
  `joined_date` varchar(255) NOT NULL,
  `fees` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `student_name`, `gender`, `age`, `email`, `course`, `joined_date`, `fees`, `username`, `password`, `created_at`) VALUES
(8, 'Hwwewwwwllo ', 'Male', 27, 'jo.@exdwwwwwaddpwle.com', 'Frontend Stack', '2024-02-13', '2000', 'Weweew', 'weewew', '2024-02-15 09:14:54'),
(9, 'Hwwewwwwwllo ', 'Male', 25, 'jo.@exdwwwwwwaddpwle.com', 'Mevn Stack', '2024-02-13', '20000', 'Weweew', 'weewew', '2024-02-15 09:14:58'),
(10, 'Aarsan', 'Male', 25, 'jo.@exdwwwwwwwaddpwle.com', 'Frontend Stack', '2024-02-13', '20000', 'Weweew', 'weewew', '2024-02-15 09:15:02'),
(11, 'Aarsan', 'Male', 23, 'aarsan@2002', 'Mevn Stack', '2024-03-01', '20000', 'aarsan', 'aarsan', '2024-02-15 12:51:21'),
(13, 'jbjj', 'Male', 67, 'hshs', 'Mean Stack', '2024-03-09', '7779898', 'yyy', 'jjjj', '2024-02-15 16:44:23'),
(18, 'Shyam', 'Male', 23, 'ashyam@gmail.com', 'Frontend Stack', '2024-03-01', '2222', 'aarsan', 'ssda2', '2024-02-15 17:15:39'),
(21, 'A', 'Male', 23, 'jo.@exdwwwwwaddpwle.co', 'Frontend Stack', '2024-02-24', '33', '333', '33', '2024-02-16 05:35:48');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shedule`
--
ALTER TABLE `shedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `shedule`
--
ALTER TABLE `shedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
