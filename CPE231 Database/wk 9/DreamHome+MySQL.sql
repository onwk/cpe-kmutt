-- MySQL dump 10.13  Distrib 5.6.12, for Win64 (x86_64)
--
-- Host: localhost    Database: dreamhouse
-- ------------------------------------------------------
-- Server version	5.6.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `branch` (
  `branchNo` varchar(50) DEFAULT NULL,
  `street` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `postcode` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES ('B002','56 Cover Drive','London','NW10 6EU'),('B003','163 Main Street','Glasgow','G11 9QX'),('B004','32 Manse Road','Bristol','BS99 1NZ'),('B005','22 Deer Road','London','SW1 4EH'),('B007','16 Argyll Street','Aberdeen','AB2 3SU');
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `client` (
  `ID` int(11) DEFAULT NULL,
  `clientNo` varchar(50) DEFAULT NULL,
  `fName` varchar(30) DEFAULT NULL,
  `lName` varchar(30) DEFAULT NULL,
  `telNo` varchar(20) DEFAULT NULL,
  `Street` varchar(30) DEFAULT NULL,
  `City` varchar(30) DEFAULT NULL,
  `PostCode` varchar(10) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `JoinedOn` datetime DEFAULT NULL,
  `Region` varchar(30) DEFAULT NULL,
  `preType` varchar(5) DEFAULT NULL,
  `maxRent` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES (2,'CR56','Fred','Flintstone','555 1234','12 Rock Way','Bedrock','BD3 8RK','fred@flintyrock.com','2004-05-09 00:00:00',NULL,'House',450),(6,'CR62','Wilma','Flintstone','555 1234','12 Rock Way','Bedrock','BD3 8RK','wilma@flintyrock.com','2004-05-09 00:00:00',NULL,'Flat',350),(7,'CR74','Albert','Johnstone','555 6677','1 Way St.','Chicago','PO34 5FB','albie@johnstone.com','2004-05-09 00:00:00','(N/A)','Flat',450),(9,'CR77','Clark','Kent','555 9999','1 Super Way','Smallville','SM4 2ME','clark@supersite.com','2004-05-09 00:00:00','(N/A)','Flat',400),(10,'CR79','Joe','Bloggs','123 4567','5 High St','Paisley','PA2 2BB','joe@paisley.com','2004-05-10 00:00:00','London (North West)','House',450),(12,'CR83','Edward','Scissorhands','123 4567','1 Snip St.','Scissorland','SC1 2XX','eddie@scix.com','2004-05-21 00:00:00','(N/A)','House',300),(17,NULL,'Albert','Enistein','555 6789','12 Long Island Way','New Jersey','NJ44 2RD','bert@nuclearintent.com','2004-05-21 00:00:00','London (North West)',NULL,450),(18,NULL,'Snorrie','Sturrluson','333 4567','1 Vik Way','Rekjavik','RK22 3RD','snorrie@iceland.com','2004-05-21 00:00:00','(N/A)',NULL,400),(19,NULL,'Ferdinand','Oblogiotta','123 5555','12 Strumpetwise Street','Lagrange Orage','PP2 1BB','ferdy@orage.com','2004-05-31 00:00:00','(N/A)','House',450),(20,NULL,'Joe','Schmoe','123 45678','1 High St','Largs','KA30 9DD','joes@largy.com','2004-05-31 00:00:00','(N/A)','House',550),(21,NULL,'Bill','Gates','123 5555','1 Rich Street','Seattle','SE2 TTL','bill@gatesland.com','2004-06-01 00:00:00','London (South)','House',1000),(24,NULL,'Bruce','Wayne','555 6789','1 Wayne Manor','Gotham','BA01 TT0','wayne@batty.com','2004-11-22 00:00:00','Glasgow','House',900);
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `propertyforrent`
--

DROP TABLE IF EXISTS `propertyforrent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `propertyforrent` (
  `propertyNo` varchar(50) DEFAULT NULL,
  `street` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `postcode` varchar(50) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `rooms` int(11) DEFAULT NULL,
  `rent` int(11) DEFAULT NULL,
  `ownerNo` varchar(50) DEFAULT NULL,
  `staffNo` varchar(50) DEFAULT NULL,
  `branchNo` varchar(50) DEFAULT NULL,
  `picture` varchar(40) DEFAULT NULL,
  `floorPlan` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `propertyforrent`
--

LOCK TABLES `propertyforrent` WRITE;
/*!40000 ALTER TABLE `propertyforrent` DISABLE KEYS */;
INSERT INTO `propertyforrent` VALUES ('PA14','16 Holhead','Aberdeen','AB7 5SU','House',6,650,'CO46','SA9','B007','images/house2.jpg','images/plan1.jpg'),('PG16','5 Novar Drive','Glasgow','G12 9AX','Flat',4,450,'CO93','SG14','B003','images/house3.jpg','images/plan1.jpg'),('PG21','18 Dale Road','Glasgow','G12','House',5,600,'CO87','SG37','B003','images/house4.jpg','images/plan1.jpg'),('PG36','2 Manor Road','Glasgow','G32 4QX','Flat',3,375,'CO93','SG37','B003','images/house5.jpg','images/plan1.jpg'),('PG4','6 Lawrence Street','Glasgow','G11 9QX','Flat',3,350,'CO40','SA9','B003','images/house2.jpg','images/plan1.jpg'),('PG97','Muir Drive','Aberdeen','AB42 1DD','House',3,380,'CO46','SA9','B007','images/house1.jpg','images/plan1.jpg'),('PL94','6 Argyll Street','London','NW2','Flat',4,400,'CO87','SL41','B005','images/house3.jpg','images/plan1.jpg');
/*!40000 ALTER TABLE `propertyforrent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff` (
  `staffNo` varchar(50) DEFAULT NULL,
  `fName` varchar(50) DEFAULT NULL,
  `lName` varchar(50) DEFAULT NULL,
  `position` varchar(50) DEFAULT NULL,
  `sex` varchar(50) DEFAULT NULL,
  `DOB` datetime DEFAULT NULL,
  `salary` int(11) DEFAULT NULL,
  `branchNo` varchar(50) DEFAULT NULL,
  `Telephone` varchar(16) DEFAULT NULL,
  `Mobile` varchar(16) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES ('SA9','Mary','Howe','Assistant','F','1970-02-19 00:00:00',9000,'B007','1338','079555 12345','MaryHowe@Dreamhome.co.uk'),('SG14','David','Ford','Supervisor','M','1958-03-24 00:00:00',18000,'B003','0223','079555 12344','DavidFord@Dreamhome.co.uk'),('SG37','Ann','Beech','Assistant','F','1960-11-10 00:00:00',12000,'B003','0224','079555 12346','AnnBeech@Dreamhome.co.uk'),('SG5','Susan','Brand','Manager','F','1940-06-03 00:00:00',24000,'B003','0225','079555 12347','SusanBrand@Dreamhome.co.uk'),('SL21','John','White','Manager','M','1945-10-01 00:00:00',30000,'B005','1512','090555 12345','JohnWhite@Dreamhome.co.uk'),('SL41','Julie','Lee','Assistant','F','1965-06-13 00:00:00',9000,'B005','1514','090555 12346','JulieLee@Dreamhome.co.uk');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `viewing`
--

DROP TABLE IF EXISTS `viewing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `viewing` (
  `ID` int(11) DEFAULT NULL,
  `clientID` int(11) DEFAULT NULL,
  `propertyNo` varchar(10) DEFAULT NULL,
  `viewDate` datetime DEFAULT NULL,
  `viewHour` tinyint(4) DEFAULT NULL,
  `Comment` varchar(255) DEFAULT NULL,
  `WishToRent` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viewing`
--

LOCK TABLES `viewing` WRITE;
/*!40000 ALTER TABLE `viewing` DISABLE KEYS */;
INSERT INTO `viewing` VALUES (2,2,'PA14','2004-07-01 00:00:00',11,NULL,'\0'),(3,7,'PG36','2004-07-01 00:00:00',12,NULL,'\0'),(4,9,'PG4','2004-07-01 00:00:00',12,'Tidy but too small','\0'),(5,10,'PA14','2004-07-02 00:00:00',10,NULL,'\0'),(6,12,'PG4','2004-07-02 00:00:00',14,NULL,'\0'),(7,6,'PA14','2004-06-20 00:00:00',12,NULL,'\0'),(8,6,'PG21','2004-06-21 00:00:00',13,NULL,'\0'),(11,6,'PA14','2004-06-20 00:00:00',12,NULL,'\0'),(12,9,'PG21','2004-11-22 00:00:00',9,'Not bad at all.','\0'),(13,9,'PG36','2004-11-23 00:00:00',9,'Kitchen too small.','\0'),(14,9,'PG16','2004-11-23 00:00:00',9,NULL,'\0'),(15,24,'PG21','2004-11-25 00:00:00',11,NULL,'\0');
/*!40000 ALTER TABLE `viewing` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-07-30 22:24:51
