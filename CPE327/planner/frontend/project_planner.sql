-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 05, 2021 at 05:45 PM
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
-- Database: `project_planner`
--

-- --------------------------------------------------------

--
-- Table structure for table `assign`
--

CREATE TABLE `assign` (
  `id` int(11) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `taskTaskId` int(11) DEFAULT NULL,
  `userUserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `epic`
--

CREATE TABLE `epic` (
  `epicId` int(11) NOT NULL,
  `taskId` int(11) NOT NULL,
  `epicName` varchar(255) NOT NULL,
  `startDate` date DEFAULT NULL,
  `dueDate` date DEFAULT NULL,
  `completeDate` date DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `projectId` int(11) NOT NULL,
  `projectName` varchar(255) NOT NULL,
  `ownerId` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `startDate` datetime NOT NULL,
  `dueDate` datetime NOT NULL,
  `completeDate` date DEFAULT NULL,
  `projectStatusProjectStatusId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `project_status`
--

CREATE TABLE `project_status` (
  `projectStatusId` int(11) NOT NULL,
  `projectStatus` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `project_status`
--

INSERT INTO `project_status` (`projectStatusId`, `projectStatus`) VALUES
(1, 'in progress'),
(2, 'done'),
(3, 'late');

-- --------------------------------------------------------

--
-- Table structure for table `project_user_role`
--

CREATE TABLE `project_user_role` (
  `projectUserRoleid` int(11) NOT NULL,
  `role` enum('manager','employee') NOT NULL DEFAULT 'employee',
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `userUserId` int(11) DEFAULT NULL,
  `projectProjectId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `taskId` int(11) NOT NULL,
  `taskName` varchar(255) NOT NULL,
  `startDate` datetime NOT NULL,
  `dueDate` datetime NOT NULL,
  `completeDate` datetime DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `onwerId` int(11) DEFAULT NULL,
  `projectProjectId` int(11) DEFAULT NULL,
  `taskStatusIdTaskStatusId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `task_status`
--

CREATE TABLE `task_status` (
  `taskStatusId` int(11) NOT NULL,
  `taskStatus` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `task_status`
--

INSERT INTO `task_status` (`taskStatusId`, `taskStatus`) VALUES
(1, 'todo'),
(2, 'in progress'),
(3, 'done');

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

CREATE TABLE `test` (
  `projectid` int(11) NOT NULL,
  `projectname` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `startdate` date DEFAULT NULL,
  `duedate` date DEFAULT NULL,
  `member` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userId` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `job` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `organization` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `image` varchar(255) DEFAULT 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg',
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assign`
--
ALTER TABLE `assign`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_e4c8716b41c069f6d2606a11c69` (`taskTaskId`),
  ADD KEY `FK_4d8d10a364122ecc812e4d01b7d` (`userUserId`);

--
-- Indexes for table `epic`
--
ALTER TABLE `epic`
  ADD PRIMARY KEY (`epicId`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`projectId`),
  ADD KEY `FK_9691dc79333edf6e87b83f264dc` (`projectStatusProjectStatusId`);

--
-- Indexes for table `project_status`
--
ALTER TABLE `project_status`
  ADD PRIMARY KEY (`projectStatusId`);

--
-- Indexes for table `project_user_role`
--
ALTER TABLE `project_user_role`
  ADD PRIMARY KEY (`projectUserRoleid`),
  ADD KEY `FK_8616d936062669b06659a8db865` (`userUserId`),
  ADD KEY `FK_fd098322ebf57015cca297690b8` (`projectProjectId`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`taskId`),
  ADD KEY `FK_e71dd539ebaa75b6ddc3a5af7c4` (`projectProjectId`),
  ADD KEY `FK_f79fae5952d2242b41c5d1782ef` (`taskStatusIdTaskStatusId`);

--
-- Indexes for table `task_status`
--
ALTER TABLE `task_status`
  ADD PRIMARY KEY (`taskStatusId`);

--
-- Indexes for table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`projectid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assign`
--
ALTER TABLE `assign`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `epic`
--
ALTER TABLE `epic`
  MODIFY `epicId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `projectId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_status`
--
ALTER TABLE `project_status`
  MODIFY `projectStatusId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `project_user_role`
--
ALTER TABLE `project_user_role`
  MODIFY `projectUserRoleid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `taskId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `task_status`
--
ALTER TABLE `task_status`
  MODIFY `taskStatusId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `test`
--
ALTER TABLE `test`
  MODIFY `projectid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assign`
--
ALTER TABLE `assign`
  ADD CONSTRAINT `FK_4d8d10a364122ecc812e4d01b7d` FOREIGN KEY (`userUserId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_e4c8716b41c069f6d2606a11c69` FOREIGN KEY (`taskTaskId`) REFERENCES `task` (`taskId`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `FK_9691dc79333edf6e87b83f264dc` FOREIGN KEY (`projectStatusProjectStatusId`) REFERENCES `project_status` (`projectStatusId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `project_user_role`
--
ALTER TABLE `project_user_role`
  ADD CONSTRAINT `FK_8616d936062669b06659a8db865` FOREIGN KEY (`userUserId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_fd098322ebf57015cca297690b8` FOREIGN KEY (`projectProjectId`) REFERENCES `project` (`projectId`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `FK_e71dd539ebaa75b6ddc3a5af7c4` FOREIGN KEY (`projectProjectId`) REFERENCES `project` (`projectId`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_f79fae5952d2242b41c5d1782ef` FOREIGN KEY (`taskStatusIdTaskStatusId`) REFERENCES `task_status` (`taskStatusId`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
