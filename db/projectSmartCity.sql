-- MariaDB dump 10.19  Distrib 10.11.5-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: projectSmartCity
-- ------------------------------------------------------
-- Server version	10.11.5-MariaDB-3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `MCUs`
--

DROP TABLE IF EXISTS `MCUs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MCUs` (
  `mcuId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `manufacturer` varchar(255) DEFAULT NULL,
  `architecture` varchar(50) DEFAULT NULL,
  `operatingVoltage` varchar(20) DEFAULT NULL,
  `clockSpeed` int(11) DEFAULT NULL,
  `memory` varchar(127) DEFAULT NULL,
  `wirelessConnectivity` varchar(255) DEFAULT NULL,
  `dimensions` varchar(50) DEFAULT NULL,
  `datasheetURL` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`mcuId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MCUs`
--

LOCK TABLES `MCUs` WRITE;
/*!40000 ALTER TABLE `MCUs` DISABLE KEYS */;
INSERT INTO `MCUs` VALUES
(1,'EPS8266','Espressif','Xtensa LX106','2.5~3.6V',160,'<50kB','WiFI','49*24.5*13mm','https://www.espressif.com/sites/default/files/documentation/0a-esp8266ex_datasheet_en.pdf');
/*!40000 ALTER TABLE `MCUs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MPs`
--

DROP TABLE IF EXISTS `MPs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MPs` (
  `mpId` int(11) NOT NULL AUTO_INCREMENT,
  `deviceId` int(11) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `address` varchar(255) NOT NULL,
  PRIMARY KEY (`mpId`),
  KEY `deviceId` (`deviceId`),
  CONSTRAINT `MPs_ibfk_1` FOREIGN KEY (`deviceId`) REFERENCES `devices` (`deviceId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MPs`
--

LOCK TABLES `MPs` WRITE;
/*!40000 ALTER TABLE `MPs` DISABLE KEYS */;
INSERT INTO `MPs` VALUES
(1,1,44.8657,20.6426,'Dr. Zarka Fogarasa 4/4, Pancevo'),
(2,1,44.864,20.641,'Negde, Pancevo');
/*!40000 ALTER TABLE `MPs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activeTokens`
--

DROP TABLE IF EXISTS `activeTokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activeTokens` (
  `tokenId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `token` varchar(16) DEFAULT NULL,
  `date` date DEFAULT curdate(),
  PRIMARY KEY (`tokenId`),
  KEY `userId` (`userId`),
  CONSTRAINT `activeTokens_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activeTokens`
--

LOCK TABLES `activeTokens` WRITE;
/*!40000 ALTER TABLE `activeTokens` DISABLE KEYS */;
INSERT INTO `activeTokens` VALUES
(1,1,'t5yaziwcoafevjvf','2023-11-03'),
(2,1,'sqq9ezqqyanurlqm','2023-11-03'),
(3,1,'he4p0e248m6j2lfi','2023-11-04');
/*!40000 ALTER TABLE `activeTokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `batteries`
--

DROP TABLE IF EXISTS `batteries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `batteries` (
  `batteryId` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `capacity` float DEFAULT NULL,
  `voltage` float DEFAULT NULL,
  `dimensions` varchar(127) DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `operatingTemperature` varchar(127) DEFAULT NULL,
  `datasheetURL` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`batteryId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batteries`
--

LOCK TABLES `batteries` WRITE;
/*!40000 ALTER TABLE `batteries` DISABLE KEYS */;
INSERT INTO `batteries` VALUES
(1,'Lithium Iron Phosphate',2300,3.2,'26.2 (Ø) x 65.6 (H) mm',80,'Charge: 0 ~ 55°C, Discharge: -20°C ~ 60°C','https://docs.rs-online.com/4ad1/0900766b812fdd10.pdf');
/*!40000 ALTER TABLE `batteries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `devices` (
  `deviceId` int(11) NOT NULL AUTO_INCREMENT,
  `sensors` varchar(64) DEFAULT NULL,
  `mcuId` int(11) DEFAULT NULL,
  `batteryId` int(11) DEFAULT NULL,
  PRIMARY KEY (`deviceId`),
  KEY `mcuId` (`mcuId`),
  KEY `batteryId` (`batteryId`),
  CONSTRAINT `devices_ibfk_1` FOREIGN KEY (`mcuId`) REFERENCES `MCUs` (`mcuId`),
  CONSTRAINT `devices_ibfk_2` FOREIGN KEY (`batteryId`) REFERENCES `batteries` (`batteryId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
INSERT INTO `devices` VALUES
(1,'1',1,1);
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logs`
--

DROP TABLE IF EXISTS `logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logs` (
  `logId` int(11) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT curdate(),
  `time` time DEFAULT curtime(),
  `userId` int(11) DEFAULT NULL,
  `text` text DEFAULT NULL,
  PRIMARY KEY (`logId`),
  KEY `userId` (`userId`),
  CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logs`
--

LOCK TABLES `logs` WRITE;
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;
INSERT INTO `logs` VALUES
(1,'2023-11-11','08:33:19',1,'Created logs table.');
/*!40000 ALTER TABLE `logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metrics`
--

DROP TABLE IF EXISTS `metrics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `metrics` (
  `metricId` int(11) NOT NULL AUTO_INCREMENT,
  `metric` varchar(128) DEFAULT NULL,
  `unit` varchar(32) DEFAULT NULL,
  `dangerZone` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`metricId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metrics`
--

LOCK TABLES `metrics` WRITE;
/*!40000 ALTER TABLE `metrics` DISABLE KEYS */;
INSERT INTO `metrics` VALUES
(1,'temperatura','°C','00|10|x|30|35'),
(2,'vlaznost','%','20|30|x|60|07'),
(3,'brzina vetra','m/s','-1|-1|x|17|27');
/*!40000 ALTER TABLE `metrics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensors`
--

DROP TABLE IF EXISTS `sensors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sensors` (
  `sensorId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `metrics` varchar(64) DEFAULT NULL,
  `voltage` float DEFAULT NULL,
  `CommunicationProtocol` varchar(64) DEFAULT NULL,
  `datasheetURL` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`sensorId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensors`
--

LOCK TABLES `sensors` WRITE;
/*!40000 ALTER TABLE `sensors` DISABLE KEYS */;
/*!40000 ALTER TABLE `sensors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(127) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `email` varchar(127) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL,
  `salt` varchar(64) DEFAULT NULL,
  `premissions` int(11) DEFAULT 1,
  `joined` date DEFAULT curdate(),
  `sex` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'Andrija Radivojev','2007-09-23','radivojevandrija007@gmail.com','$2b$10$A6pZbeW6eyWHX6lrqb7CIeBGvNlflIgjpvd0ShaYV/FkrE7tK5wZ.','$2b$10$A6pZbeW6eyWHX6lrqb7CIe',15,'2023-11-12',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-12 19:35:26
