-- MySQL dump 10.13  Distrib 8.0.33, for Linux (x86_64)
--
-- Host: localhost    Database: schooldatabasev4
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.27-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `App_user`
--

DROP TABLE IF EXISTS `App_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `App_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `school_id` int(11) DEFAULT NULL,
  `first_name` varchar(40) NOT NULL,
  `last_name` varchar(40) NOT NULL,
  `age` int(10) unsigned DEFAULT NULL,
  `type` varchar(40) DEFAULT NULL,
  `card` int(11) DEFAULT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `approved` bit(1) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `fk_App_user_school` (`school_id`),
  CONSTRAINT `fk_App_user_school` FOREIGN KEY (`school_id`) REFERENCES `School` (`school_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=157 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `App_user`
--

LOCK TABLES `App_user` WRITE;
/*!40000 ALTER TABLE `App_user` DISABLE KEYS */;
INSERT INTO `App_user` VALUES (1,1,'Αυγουστίνα','Μπεκάκου',36,'Admin',NULL,NULL,_binary '\0'),(2,2,'Παναγιώτης','Αναστασάκης',45,'Admin',NULL,NULL,_binary ''),(3,3,'Λεονάρδος','Κωτσικόρης',41,'Admin',NULL,NULL,_binary '\0'),(4,4,'Νικολίτσα','Καλδή',53,'Admin',NULL,NULL,_binary ''),(5,3,'Γαβριήλ-Παναγιώτης','Σταματιάδης',57,'Καθηγητής',NULL,3,_binary '\0'),(6,3,'Γεώργιος-Αλέξανδρος','Προβής',12,'Μαθητής',NULL,3,_binary '\0'),(7,4,'Γιολάντα','Πατελλή',59,'Καθηγητής',NULL,4,_binary '\0'),(8,3,'Γενοβέφα','Λυρή',14,'Μαθητής',NULL,3,_binary '\0'),(9,2,'Ευρύκλεια','Σμιτ',17,'Μαθητής',NULL,2,_binary '\0'),(10,1,'Αντίγονος','Ανδρουλάκης',15,'Μαθητής',NULL,1,_binary '\0'),(11,1,'Κλεόπας','Δερμιτζάκης',12,'Μαθητής',NULL,1,_binary '\0'),(12,4,'Φρύνη','Σιόλου',15,'Μαθητής',NULL,4,_binary '\0'),(13,4,'Πολυχρόνιος','Στραβοσνίχης',10,'Μαθητής',NULL,4,_binary '\0'),(14,2,'Χαράλαμπος','Μανελίδης',17,'Μαθητής',22634658,2,_binary ''),(15,2,'Φωκίων','Ευστρατόπουλος',15,'Μαθητής',NULL,2,_binary '\0'),(16,4,'Νίκος','Βιλδός',14,'Μαθητής',NULL,4,_binary '\0'),(17,3,'Εριέτα','Ταμπορρίνο',13,'Μαθητής',NULL,3,_binary '\0'),(18,4,'Αγαπητός-Ευκλείδης','Φρογάκης',12,'Μαθητής',47552678,4,_binary ''),(19,2,'Σώζων-Ιωακείμ','Ψυχιάς',59,'Καθηγητής',NULL,2,_binary '\0'),(20,3,'Αγάθη','Φιδάνη',13,'Μαθητής',NULL,3,_binary '\0'),(21,2,'Άριστος','Ρήγας',16,'Μαθητής',24495533,2,_binary ''),(22,4,'Αύγουστος','Στραβοσνίχης',14,'Μαθητής',25285484,4,_binary ''),(23,2,'Λουδοβίκος','Φωτογλίδης',13,'Μαθητής',NULL,2,_binary '\0'),(24,1,'Σουλτάνα-Ιππολύτη','Χατζηχαρίστου',13,'Μαθητής',NULL,1,_binary '\0'),(25,2,'Χαρά-Ευανθία','Πορφυριάδου',14,'Μαθητής',NULL,2,_binary '\0'),(26,3,'Λαυρέντιος-Ανδρόνικος','Χριστακόπουλος',16,'Μαθητής',NULL,3,_binary '\0'),(27,4,'Σαλώμη','Λεντζίου',15,'Μαθητής',19629148,4,_binary ''),(28,2,'Θέμις','Μίχου',15,'Μαθητής',NULL,2,_binary '\0'),(29,3,'Μερκούριος','Ραγκούσης',13,'Μαθητής',NULL,3,_binary '\0'),(30,2,'Χιονιά','Γκούνη',15,'Μαθητής',10940773,2,_binary ''),(31,3,'Ισίδωρος','Βαρδάκης',16,'Μαθητής',NULL,3,_binary '\0'),(32,2,'Αχιλλέας','Γκαγκαουδάκης',15,'Μαθητής',81107153,2,_binary ''),(33,4,'Αγνή','Κατσαντώνη',39,'Καθηγητής',80133332,4,_binary ''),(34,1,'Αφέντρα','Νικολάτου',15,'Μαθητής',NULL,1,_binary '\0'),(35,2,'Αρχιμήδης','Νέλος',17,'Μαθητής',NULL,2,_binary '\0'),(36,2,'Περικλής-Σιρανούς','Κυπραίος',54,'Καθηγητής',18781801,2,_binary ''),(37,4,'Βησσαρία','Δρόσου',10,'Μαθητής',NULL,4,_binary '\0'),(38,4,'Βαλέρια','Ρέππα',11,'Μαθητής',92320687,4,_binary ''),(39,1,'Ευρύκλεια','Κοτρώτσου',13,'Μαθητής',NULL,1,_binary '\0'),(40,2,'Βαλάντης','Ζηματίκας',17,'Μαθητής',97442702,2,_binary ''),(41,4,'Γαλάτιος-Κλεομένης','Μόναχας',35,'Καθηγητής',38518570,4,_binary ''),(42,1,'Μιχαήλ','Κατεβάτης',11,'Μαθητής',NULL,1,_binary '\0'),(43,1,'Ευάγγελος','Τάσιος',46,'Καθηγητής',NULL,1,_binary '\0'),(44,4,'Μυρσίνη','Εμμανουήλ',52,'Καθηγητής',NULL,4,_binary '\0'),(45,3,'Φανουρία','Αγγελίδου',11,'Μαθητής',NULL,3,_binary '\0'),(46,4,'Σεβαστιανή','Γεωργή',12,'Μαθητής',NULL,4,_binary '\0'),(47,3,'Χριστοδούλα','Καλομοίρη',55,'Καθηγητής',NULL,3,_binary '\0'),(48,3,'Ελπίδα-Φιλιώ','Μπακοστεργίου',65,'Καθηγητής',NULL,3,_binary '\0'),(49,3,'Τριαντάφυλλος-Δημόκριτος','Αγγελής',14,'Μαθητής',NULL,3,_binary '\0'),(50,4,'Κυπαρισσία','Τσουνάκου',14,'Μαθητής',NULL,4,_binary '\0'),(51,2,'Μερκούριος','Κυριατσούλης',16,'Μαθητής',NULL,2,_binary '\0'),(52,1,'Μιχαήλ','Μπακοστεργίου',17,'Μαθητής',NULL,1,_binary '\0'),(53,1,'Αμφιθέα','Καλούδη',12,'Μαθητής',NULL,1,_binary '\0'),(54,1,'Παναγιώτης','Παπαροϊδάμης',16,'Μαθητής',NULL,1,_binary '\0'),(55,3,'Σουλτάνα','Αργυράκη',10,'Μαθητής',NULL,3,_binary '\0'),(56,3,'Αμβρόσιος','Μαυρουδής',15,'Μαθητής',NULL,3,_binary '\0'),(57,2,'Λυδία-Κομνηνή','Ιωακειμίδου',14,'Μαθητής',NULL,2,_binary '\0'),(58,4,'Βαρσάμος','Τολούδης',45,'Καθηγητής',34114274,4,_binary ''),(59,3,'Αύγουστος','Ταμιωλάκης',12,'Μαθητής',NULL,3,_binary '\0'),(60,1,'Μαρίνα-Αννίκα','Χονδρούδη',10,'Μαθητής',NULL,1,_binary '\0'),(61,4,'Φλώρα','Ευαγγελάκη',17,'Μαθητής',98227059,4,_binary ''),(62,3,'Κυριαζής','Χουλιάρας',41,'Καθηγητής',NULL,3,_binary '\0'),(63,4,'Ευπραξία','Λουμπούτσκου',14,'Μαθητής',28968540,4,_binary ''),(64,1,'Αντύπας','Τσακανίκας',12,'Μαθητής',NULL,1,_binary '\0'),(65,4,'Δημήτριος','Μοσχόπουλος',12,'Μαθητής',NULL,4,_binary '\0'),(66,4,'Ήρα','Κατσιγιάννη',17,'Μαθητής',NULL,4,_binary '\0'),(67,3,'Μικές','Καλιτσουνάκης',14,'Μαθητής',NULL,3,_binary '\0'),(68,2,'Φιλαρέτη','Παρασκευά',55,'Καθηγητής',NULL,2,_binary '\0'),(69,3,'Ιακωβίνα','Τρεντσίου',50,'Καθηγητής',NULL,3,_binary '\0'),(70,1,'Τρύφων','Κονδυλίδης',17,'Μαθητής',NULL,1,_binary '\0'),(71,3,'Παρασκευάς','Δίγκας',10,'Μαθητής',NULL,3,_binary '\0'),(72,3,'Ιάκωβος','Ντουλιάς',12,'Μαθητής',NULL,3,_binary '\0'),(73,2,'Φωτεινός-Θεοτόκης','Σταμόπουλος',18,'Μαθητής',NULL,2,_binary '\0'),(74,3,'Αντώνιος-Ηλίας','Γκιτσάκης',10,'Μαθητής',NULL,3,_binary '\0'),(75,2,'Λυγερή','Γιακαμόζη',13,'Μαθητής',27379076,2,_binary ''),(76,3,'Ιουλιανή','Φυτιλή',44,'Καθηγητής',NULL,3,_binary '\0'),(77,2,'Μάρκος','Πουλογιαννόπουλος',58,'Καθηγητής',35550042,2,_binary ''),(78,2,'Χάρις','Παπουδής',32,'Καθηγητής',47861321,2,_binary ''),(79,4,'Κυριάκος','Τυμβίου',60,'Καθηγητής',38068643,4,_binary ''),(80,1,'Ιάσων-Φρειδερίκος','Ζορμπάς',18,'Μαθητής',NULL,1,_binary '\0'),(81,3,'Παναγής','Χατζηγρηγοράκης',14,'Μαθητής',NULL,3,_binary '\0'),(82,3,'Κασσιανή','Αλεξανδράκη',18,'Μαθητής',NULL,3,_binary '\0'),(83,3,'Ευδοκία-Παντούλα','Τσακαλάκου',17,'Μαθητής',NULL,3,_binary '\0'),(84,2,'Κοραλία','Διοπούλου',58,'Καθηγητής',46068022,2,_binary ''),(85,1,'Σταύρος','Πάντος',45,'Καθηγητής',NULL,1,_binary '\0'),(86,1,'Γραμματική','Δημακογιάννη',15,'Μαθητής',NULL,1,_binary '\0'),(87,1,'Αννίκα','Σακκή',11,'Μαθητής',NULL,1,_binary '\0'),(88,4,'Τζανέτος','Τσέας',62,'Καθηγητής',79276391,4,_binary ''),(89,2,'Μένανδρος','Κωσταλής',16,'Μαθητής',81181172,2,_binary ''),(90,3,'Παυσανίας','Δουλάμης',18,'Μαθητής',NULL,3,_binary '\0'),(91,4,'Φίλιππος-Πύρρος','Πευκιανάκης',11,'Μαθητής',NULL,4,_binary '\0'),(92,4,'Σιρανούς','Κακοσαίος',15,'Μαθητής',NULL,4,_binary '\0'),(93,2,'Πασχάλης','Αναστασάκης',10,'Μαθητής',NULL,2,_binary '\0'),(94,1,'Θεοχάρης','Στεργιαλής',17,'Μαθητής',NULL,1,_binary '\0'),(95,1,'Κυδωνία','Κωστοπούλου',15,'Μαθητής',NULL,1,_binary '\0'),(96,3,'Ελένη-Σπυριδούλα','Μασίκα',12,'Μαθητής',NULL,3,_binary '\0'),(97,4,'Ευγενία','Παπατζήκα',18,'Μαθητής',NULL,4,_binary '\0'),(98,3,'Φώτιος','Καρτάς',10,'Μαθητής',NULL,3,_binary '\0'),(99,4,'Τριαντάφυλλη','Βαρθαλίτη',14,'Μαθητής',35200621,4,_binary ''),(100,4,'Χριστόφορος','Μαργαρώνης',65,'Καθηγητής',60368730,4,_binary ''),(101,1,'Χαρά','Κουτσούμπεη',17,'Μαθητής',NULL,1,_binary '\0'),(102,2,'Θεοδόσης','Καμποσάκης',33,'Καθηγητής',98406181,2,_binary ''),(103,3,'Βάιος','Μπαλάσκας',11,'Μαθητής',NULL,3,_binary '\0'),(104,1,'Ευθύμιος','Τερζίδης',16,'Μαθητής',NULL,1,_binary '\0'),(105,3,'Μιλτιάδης','Μποζίκης',15,'Μαθητής',NULL,3,_binary '\0'),(106,3,'Τριαντάφυλλος','Ευαγγελάτος',13,'Μαθητής',NULL,3,_binary '\0'),(107,3,'Εμμανουέλα','Μεξή',39,'Καθηγητής',NULL,3,_binary '\0'),(108,1,'Ανθούλης','Κιτινός',17,'Μαθητής',NULL,1,_binary '\0'),(109,4,'Ευτέρπη','Εμμανουηλίδου',40,'Καθηγητής',NULL,4,_binary '\0'),(110,3,'Λυκούργος','Σφούνης',42,'Καθηγητής',NULL,3,_binary '\0'),(111,2,'Πέτρα','Σάουερ',37,'Καθηγητής',55196317,2,_binary ''),(112,4,'Δημήτριος','Πετριτάκης',16,'Μαθητής',83482582,4,_binary ''),(113,4,'Βενέτιος-Γαλάτιος','Γιαννόπουλος',14,'Μαθητής',NULL,4,_binary '\0'),(114,3,'Διονύσιος','Μπραζιώτης',14,'Μαθητής',NULL,3,_binary '\0'),(115,2,'Χριστοδούλα-Ματίνα','Χατζή',16,'Μαθητής',40559822,2,_binary ''),(116,3,'Αρχιμήδης','Κλήμης',56,'Καθηγητής',NULL,3,_binary '\0'),(117,3,'Ζηνοβία','Μπενέτου',11,'Μαθητής',NULL,3,_binary '\0'),(118,4,'Ευτέρπη','Τσιούπρα',14,'Μαθητής',NULL,4,_binary '\0'),(119,3,'Λαέρτης','Βανδώρος',16,'Μαθητής',NULL,3,_binary '\0'),(120,3,'Γαβριήλ-Χρυσοβαλάντιος','Καλαργυρός',60,'Καθηγητής',NULL,3,_binary '\0'),(121,1,'Ελεονόρα','Κυρίτση',16,'Μαθητής',NULL,1,_binary '\0'),(122,4,'Ευφροσύνη','Παυλή',10,'Μαθητής',40292506,4,_binary ''),(123,3,'Αυγή','Μπαφίτη',17,'Μαθητής',NULL,3,_binary '\0'),(124,2,'Ευδόξιος','Ράλλης',51,'Καθηγητής',27292438,2,_binary ''),(125,3,'Σιρανούς','Λάππας',60,'Καθηγητής',NULL,3,_binary '\0'),(126,1,'Αμφιθέα-Αστέρω','Σαλέμη',16,'Μαθητής',NULL,1,_binary '\0'),(127,2,'Σαββούλα','Κατσούλα',17,'Μαθητής',65815790,2,_binary ''),(128,1,'Μιχαέλα','Βράσκου',18,'Μαθητής',NULL,1,_binary '\0'),(129,1,'Γρηγόριος','Περπινιάς',10,'Μαθητής',NULL,1,_binary '\0'),(130,1,'Πίνδαρος','Βουτσάς',39,'Καθηγητής',NULL,1,_binary '\0'),(131,4,'Τρυφωνία','Βαλεντή',12,'Μαθητής',27422612,4,_binary ''),(132,2,'Πέτρα','Βαζούρα',11,'Μαθητής',74358889,2,_binary ''),(133,4,'Μαριγώ-Ζαμπία','Βαρελίδου',15,'Μαθητής',NULL,4,_binary '\0'),(134,2,'Σώζων-Βαρσάμος','Κολοβός',52,'Καθηγητής',65662868,2,_binary ''),(135,1,'Νερατζιά','Βαμβουκάκη',17,'Μαθητής',NULL,1,_binary '\0'),(136,2,'Ραχήλ-Βλάσιος','Νασίκας',15,'Μαθητής',15701912,2,_binary ''),(137,2,'Άλκηστις','Δούβαλη',11,'Μαθητής',46134064,2,_binary ''),(138,3,'Παρθένα','Τρεντσίου',14,'Μαθητής',NULL,3,_binary '\0'),(139,2,'Πύρρος','Παναγιωτακόπουλος',18,'Μαθητής',NULL,2,_binary '\0'),(140,3,'Μαλαματένια','Κυριακούλη',13,'Μαθητής',NULL,3,_binary '\0'),(141,2,'Χρήστος','Κιτινός',54,'Καθηγητής',33463222,2,_binary ''),(142,2,'Ρωμανός','Δημησκής',12,'Μαθητής',60933926,2,_binary ''),(143,2,'Αρχιμήδης','Αποστολόπουλος',17,'Μαθητής',NULL,2,_binary '\0'),(144,4,'Ραχήλ','Μαρακάς',42,'Καθηγητής',NULL,4,_binary '\0'),(145,4,'Μελένια-Θεοφύλακτη','Μπακουλή',11,'Μαθητής',NULL,4,_binary '\0'),(146,1,'Στέργιος-Παντελής','Θεοδωρόπουλος',36,'Καθηγητής',NULL,1,_binary '\0'),(147,3,'Ευστάθιος','Βάσσης',15,'Μαθητής',NULL,3,_binary '\0'),(148,3,'Λυδία-Αλεξία','Κουτσιουμάρη',27,'Καθηγητής',NULL,3,_binary '\0'),(149,4,'Παύλος-Ασκληπιός','Δακαναλής',18,'Μαθητής',33646033,4,_binary ''),(150,2,'Ροδόφλος','Ορφανάκης',46,'Καθηγητής',NULL,2,_binary '\0'),(151,2,'Φιλιππία','Δαγλή',10,'Μαθητής',53530946,2,_binary ''),(152,1,'Μαρίνα','Ντανώλα',17,'Μαθητής',NULL,1,_binary '\0'),(153,1,'Φιλιώ','Σκρεμμύδα',10,'Μαθητής',NULL,1,_binary '\0'),(154,4,'Υβόννη','Κυργιά',14,'Μαθητής',NULL,4,_binary '\0'),(155,NULL,'Eren','Yeager',42,'Main_Admin',NULL,NULL,_binary ''),(156,2,'yolo','volo',18,'Μαθητής',NULL,2,_binary '\0');
/*!40000 ALTER TABLE `App_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Authentication`
--

DROP TABLE IF EXISTS `Authentication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Authentication` (
  `auth_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `username` varchar(40) NOT NULL,
  `password` varchar(40) NOT NULL,
  PRIMARY KEY (`auth_id`),
  UNIQUE KEY `username` (`username`),
  KEY `fk_Authentication_App_user` (`user_id`),
  CONSTRAINT `fk_Authentication_App_user` FOREIGN KEY (`user_id`) REFERENCES `App_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=157 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Authentication`
--

LOCK TABLES `Authentication` WRITE;
/*!40000 ALTER TABLE `Authentication` DISABLE KEYS */;
INSERT INTO `Authentication` VALUES (1,1,'thalis.drakaki','%)E7RmM$zl'),(2,10,'mitridis.eupraxia','MQKyqij_#1'),(3,11,'etsiaras','$@OQSqvP!3'),(4,24,'themistokleia.moraitis','e9TfxgcS^h'),(5,34,'dimitropoulos.polydora','a441W+#r*j'),(6,39,'rafail.patmanidis','n1Dp$gN7%s'),(7,42,'vasiliki.tzinieris','58C$NuRG%1'),(8,43,'apostolia68','_1eXWgDI7B'),(9,52,'sokratis45','95Y(YZpb!x'),(10,53,'symela37','hs^&E5Ewe&'),(11,54,'ntanola.veronika','a(d#e4WcUt'),(12,60,'mpekakou.apostolia','*r7ZEzT*m6'),(13,64,'kyritsis.augeris','@_2NSYjE)&'),(14,70,'bmantzoros','N+h_h8Cn%y'),(15,80,'chari.karampina','un(P4KrsBK'),(16,85,'mauromanolakis.themis','Nq^H3IjF+Q'),(17,86,'theofylakti29',')4mUJ&ShK&'),(18,87,'qvorlokas','+FD7XpJ+!o'),(19,94,'akoronidou','9fu_6RHO9#'),(20,95,'ualexandraki','PhA(3C$yFU'),(21,101,'gvasileiou','yIRAkOtO(4'),(22,104,'aristomenis.panopoulou','08k9Oy*K)S'),(23,108,'badamopoulou','#3BxPHfaX3'),(24,121,'zampeta.dardioti',')tySDzNt0P'),(25,126,'echorianopoulou','+0QjUFzXiu'),(26,128,'zmaniati','s0xA@)Dy@A'),(27,129,'apostolia12','!0U%dR+y**'),(28,130,'fasouli.rafail','#vLGXymon2'),(29,135,'mitsou.paschalis','G*_B2SjTa5'),(30,146,'tsopanidis.laskarina','U5nPbjf%(T'),(31,152,'timoleon13','3XzoOhN*@2'),(32,153,'tsentouros.iraklis','x0iAy+Yk)s'),(33,2,'mpermpatiotis.maurikios','_FrYcS&cp4'),(34,9,'kpolychronis','dK4Ecj9f#X'),(35,14,'hkaneli','$601RbS4l('),(36,15,'meletios.nitsotolis','@OK^pVJj*0'),(37,19,'aglaia39','^XnGKygrC4'),(38,21,'prodromia.douloufaki','vd3veN5rS+'),(39,23,'timoleon.giannakitsas','*F^X)YDeS1'),(40,25,'lito.karyda','MSC2nl%a&0'),(41,28,'qmitsou','n_$2FPVfR^'),(42,30,'atziavas','Jo3Wn7TK*@'),(43,32,'vchondroudi','_$6R0fvxq$'),(44,35,'mmpalli','a7BAzZwt&@'),(45,36,'mkargakou','PM2JBQg9M)'),(46,40,'moschopoulos.charis','B65TMIdH*)'),(47,51,'polychronis.theofilos','!9m&8MZbs9'),(48,57,'christina58','(3WEcEu0$7'),(49,68,'chrysovalanto.zeugitis','(CH5e1OoMa'),(50,73,'kchrysafi','^CuJhEa&47'),(51,75,'lfronimaki','L_3daDKw9c'),(52,77,'kotoulas.aimilianos','+^Qx)jGH5$'),(53,78,'virginia.dermitzakis','XId(0IrYaN'),(54,84,'faidra.giannes','))TuAqpv4K'),(55,89,'kesisi.markos','xkpq8OiG&R'),(56,93,'gstergialis','u4Xja0)6+v'),(57,102,'paris79','6+6XCBS79c'),(58,111,'meropi13','_0BgpEaGNQ'),(59,115,'adamantia06','De8WODrC%X'),(60,124,'michalis92','_#r8RZin&j'),(61,127,'rigoula04','WGRLljI4#9'),(62,132,'vlachonikoleas.roza','M&4Z7zdN$P'),(63,134,'andronikos65','%!KawSOi8G'),(64,136,'ino62','KF60BzoZg&'),(65,137,'provis.solon','d*i0CQkE)N'),(66,139,'alexia.koumara','^HVD&Ga795'),(67,141,'logothetis.christopoulos','#K7S&@bb@!'),(68,142,'faidon.piskopani','&2Diblf+3D'),(69,143,'maura.kaliampos','*6&Fym(jPg'),(70,150,'nikoloudaki.poulcheria','Xv!@5Zjwe1'),(71,151,'tstamatoukou','@e4A#$fk12'),(72,3,'adamantios.droulias','!57Lb9j7Gv'),(73,5,'roupakas.vrasidas','_L9ZEuuKDc'),(74,6,'xreppa','cz47_zVC6#'),(75,8,'lmaurommatis','VA$_8pDrg1'),(76,17,'archaulis.zisoula','CR6LDayKk#'),(77,20,'jktenidis','G66$GUxF$V'),(78,26,'drosos55','UHv%2+Lyg@'),(79,29,'preka.theodora','x$5Vq375$P'),(80,31,'lazaros.perakis','44A_fz%x%1'),(81,45,'mauroeidakos.stamatios','Kb$UY0JfaR'),(82,47,'katsaros.chaido',')&5OLayi#x'),(83,48,'fmengk','^9UAHyZqC@'),(84,49,'sevasti.tzinieris','mx0Qv6vV+$'),(85,55,'lazaria.stauridou','lf*NUK_q(3'),(86,56,'athinodora33','$y0^xO#tG%'),(87,59,'doukatzis.antonia','(9TdyPd&6%'),(88,62,'ukarampina','9M#0^Ia#uZ'),(89,67,'bsiouta','2*7OFdnG#D'),(90,69,'tufanti','j$7erWoqgn'),(91,71,'qvakalis','^%VYg7oaw9'),(92,72,'ptheodosiou','cG@v0LuLcP'),(93,74,'isavella26','@aM6He%Fj4'),(94,76,'lydia97','pKb25Qp&(Q'),(95,81,'patelli.minoas',')9OgIj2$37'),(96,82,'polykratis56','(qQ4HFDgVz'),(97,83,'sofoklis.triantakonstantis','u1_)h3Oo&R'),(98,90,'ftzouvelis','^qD67gxHI8'),(99,96,'themistokleia.grevenaris','1q69KO^y*)'),(100,98,'eustratia58','r3!Y(ZkT^8'),(101,103,'yvoulgaridou','LEPXaa7D_1'),(102,105,'prodromia93','epNlTg$n^2'),(103,106,'eutychia.androulidakis','$JS9W3AfV4'),(104,107,'metaxia73','7bQhhF3g^I'),(105,110,'alkistis73',')NZL%zhp0B'),(106,114,'markos38','jntCGa1a#0'),(107,116,'asimis92','*H9EKTzh3D'),(108,117,'andrikopoulos.kleio','9hy)7KxK1U'),(109,119,'lagopatis.fragkiskos','*8)4wS^bHU'),(110,120,'voukas.damiani','!1vMA!o*Wf'),(111,123,'eusevia.sempepou','aL^oQ3Lm&i'),(112,125,'douloufaki.chloi','D_7AE&ztRw'),(113,138,'aimilios21','lr(2Q1Dy^@'),(114,140,'violeta19','wb7HaAeS%)'),(115,147,'echatzisavvidis','Y7aM34Nv)K'),(116,148,'lytra.antipatros','ZP9C4Tsnw_'),(117,4,'imanousopoulou',')_Y3VVubtd'),(118,7,'rtarnaris','izTvy9H9@9'),(119,12,'orfanakis.afentra','dq6CsGm3g#'),(120,13,'vasileios.orfanakis','0ukFpjma!V'),(121,16,'kchristopoulos','4+M9@YPk&F'),(122,18,'alkiviadis.ananiadou','%SWLsqvFp2'),(123,22,'kleomenis74','7*ND0UBvEN'),(124,27,'foivi01','_oKhYHEAi2'),(125,33,'auxentios.polatidou','%8DGD1lQVr'),(126,37,'stamatis.fytili','O%QP0YZetG'),(127,38,'orfeas.zidianakis','O0JmMMWo%)'),(128,41,'sapfo30','o5qCIx+w#J'),(129,44,'petsi.symela','r7e9LZbiJ&'),(130,46,'paraskeuas70','6dg5qN5b%G'),(131,50,'vairamidou.anthi','%Ncti7MoP6'),(132,58,'sarri.sotiris','*9XVvzAG(v'),(133,61,'kmakariadis','#qIKgsJh!4'),(134,63,'malysandratou','*LkM3FQjG7'),(135,65,'eupraxia54','+Nt9&TEe0y'),(136,66,'veroniki.petropoulos','$6VfXHgIcP'),(137,79,'csevastou',')1*MPgxkB!'),(138,88,'vlachou.emmanouil','Bo6ZTBik^2'),(139,91,'klearchos98','JIk7Xxo)+z'),(140,92,'christos.fragkiadaki','w%7HJtAMa)'),(141,97,'samouil47','05wRkDd5)4'),(142,99,'kalliniki59','QbOU0viS&9'),(143,100,'miltiadis17','&qDpn7qY0_'),(144,109,'koronidou.dikaios','Lm(1!Bvx%c'),(145,112,'benotiadi','o$5kiQ5eaq'),(146,113,'dionysia49','!#!EwqEJN9'),(147,118,'ektoras63','^9DY6t808D'),(148,122,'eutychios.karatzikos','@2Uy$BYJ&d'),(149,131,'ino03','A32s4VTr@E'),(150,133,'koralia.symeonidou','Zp_9mAr2^_'),(151,144,'elessa.kafantaris','3dPvZy@K_y'),(152,145,'timoleon95','Z3CNEwQi#e'),(153,149,'tsonis.aggelis','Ok6S6!Yj_l'),(154,154,'manos.uakinthos','HC+g8vPw&3'),(155,155,'test','test'),(156,156,'yolo','yolo');
/*!40000 ALTER TABLE `Authentication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Authors`
--

DROP TABLE IF EXISTS `Authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Authors` (
  `author_id` int(11) NOT NULL AUTO_INCREMENT,
  `isbn` int(11) DEFAULT NULL,
  `first_name` varchar(40) DEFAULT NULL,
  `last_name` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`author_id`),
  UNIQUE KEY `unique_book_author` (`isbn`,`first_name`,`last_name`),
  CONSTRAINT `fk_Authors_Books` FOREIGN KEY (`isbn`) REFERENCES `Books` (`isbn`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Authors`
--

LOCK TABLES `Authors` WRITE;
/*!40000 ALTER TABLE `Authors` DISABLE KEYS */;
/*!40000 ALTER TABLE `Authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Books`
--

DROP TABLE IF EXISTS `Books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Books` (
  `isbn` int(11) NOT NULL,
  `page_count` int(10) unsigned DEFAULT NULL,
  `publisher` varchar(40) DEFAULT NULL,
  `title` varchar(40) NOT NULL,
  `summary` varchar(700) DEFAULT NULL,
  `cover_path` varchar(70) DEFAULT NULL,
  `m_cover_path` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`isbn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Books`
--

LOCK TABLES `Books` WRITE;
/*!40000 ALTER TABLE `Books` DISABLE KEYS */;
/*!40000 ALTER TABLE `Books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Borrow`
--

DROP TABLE IF EXISTS `Borrow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Borrow` (
  `borrow_id` int(11) NOT NULL AUTO_INCREMENT,
  `isbn` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `return_date` date DEFAULT NULL,
  `acquire_date` date NOT NULL,
  `active` bit(1) DEFAULT NULL,
  PRIMARY KEY (`borrow_id`),
  KEY `fk_Borrow_Books` (`isbn`),
  KEY `fk_Borrow_App_user` (`user_id`),
  CONSTRAINT `fk_Borrow_App_user` FOREIGN KEY (`user_id`) REFERENCES `App_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Borrow_Books` FOREIGN KEY (`isbn`) REFERENCES `Books` (`isbn`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Borrow`
--

LOCK TABLES `Borrow` WRITE;
/*!40000 ALTER TABLE `Borrow` DISABLE KEYS */;
/*!40000 ALTER TABLE `Borrow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Categories`
--

DROP TABLE IF EXISTS `Categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Categories` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `isbn` int(11) DEFAULT NULL,
  `category` varchar(40) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `unique_book_category` (`isbn`,`category`),
  CONSTRAINT `fk_Categories_Books` FOREIGN KEY (`isbn`) REFERENCES `Books` (`isbn`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Categories`
--

LOCK TABLES `Categories` WRITE;
/*!40000 ALTER TABLE `Categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `Categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Keywords`
--

DROP TABLE IF EXISTS `Keywords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Keywords` (
  `keyword_id` int(11) NOT NULL AUTO_INCREMENT,
  `isbn` int(11) DEFAULT NULL,
  `keyword` varchar(40) NOT NULL,
  PRIMARY KEY (`keyword_id`),
  UNIQUE KEY `unique_book_keyword` (`isbn`,`keyword`),
  CONSTRAINT `fk_Keywords_Books` FOREIGN KEY (`isbn`) REFERENCES `Books` (`isbn`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Keywords`
--

LOCK TABLES `Keywords` WRITE;
/*!40000 ALTER TABLE `Keywords` DISABLE KEYS */;
/*!40000 ALTER TABLE `Keywords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Phone`
--

DROP TABLE IF EXISTS `Phone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Phone` (
  `phone_id` int(11) NOT NULL AUTO_INCREMENT,
  `school_id` int(11) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`phone_id`),
  KEY `fk_Phone_school` (`school_id`),
  CONSTRAINT `fk_Phone_school` FOREIGN KEY (`school_id`) REFERENCES `School` (`school_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Phone`
--

LOCK TABLES `Phone` WRITE;
/*!40000 ALTER TABLE `Phone` DISABLE KEYS */;
INSERT INTO `Phone` VALUES (1,1,'6902112876'),(2,2,'(+30) 6999 153364'),(3,2,'6992731819'),(4,2,'2310454404'),(5,3,'2104779068'),(6,3,'+302521774044'),(7,4,'2102636708'),(8,4,'+30 6964 871528');
/*!40000 ALTER TABLE `Phone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Request`
--

DROP TABLE IF EXISTS `Request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Request` (
  `request_id` int(11) NOT NULL AUTO_INCREMENT,
  `date_of_request` date NOT NULL,
  `isbn` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`request_id`),
  KEY `fk_Request_Books` (`isbn`),
  KEY `fk_Request_App_user` (`user_id`),
  CONSTRAINT `fk_Request_App_user` FOREIGN KEY (`user_id`) REFERENCES `App_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Request_Books` FOREIGN KEY (`isbn`) REFERENCES `Books` (`isbn`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Request`
--

LOCK TABLES `Request` WRITE;
/*!40000 ALTER TABLE `Request` DISABLE KEYS */;
/*!40000 ALTER TABLE `Request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Review`
--

DROP TABLE IF EXISTS `Review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Review` (
  `review_id` int(11) NOT NULL AUTO_INCREMENT,
  `date_of_review` date NOT NULL,
  `score` int(10) unsigned DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `isbn` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `approved` bit(1) DEFAULT NULL,
  PRIMARY KEY (`review_id`),
  KEY `fk_Review_Books` (`isbn`),
  KEY `fk_Review_App_user` (`user_id`),
  CONSTRAINT `fk_Review_App_user` FOREIGN KEY (`user_id`) REFERENCES `App_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Review_Books` FOREIGN KEY (`isbn`) REFERENCES `Books` (`isbn`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Review`
--

LOCK TABLES `Review` WRITE;
/*!40000 ALTER TABLE `Review` DISABLE KEYS */;
/*!40000 ALTER TABLE `Review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `School`
--

DROP TABLE IF EXISTS `School`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `School` (
  `school_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `city` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `address` varchar(40) NOT NULL,
  `total_borrows` int(11) NOT NULL,
  `principal_first_name` varchar(40) DEFAULT NULL,
  `principal_last_name` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`school_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `School`
--

LOCK TABLES `School` WRITE;
/*!40000 ALTER TABLE `School` DISABLE KEYS */;
INSERT INTO `School` VALUES (1,'1o Νηπιαγωγείο','Κέρκυρα','okoufaki@example.org','Σιτοχωρίου 781',0,'Πανταζής','Τζιόρτζιος'),(2,'20o Γυμνάσιο','Κομοτηνή','merkourios.iosifidou@example.com','Κεχριών 6',0,'Ευδοκία-Στεφανία','Παπουτσοπούλου'),(3,'18o Νηπιαγωγείο','Κέρκυρα','lida55@example.org','Δαυγάτων 4',0,'Πολύμνια','Μαράκη'),(4,'25o Νηπιαγωγείο','Λάρισα','gerasimoula.pantzartzidis@example.net','Ανεμορράχης 942',0,'Ναθαναήλ','Ζιώγος');
/*!40000 ALTER TABLE `School` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Stores`
--

DROP TABLE IF EXISTS `Stores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Stores` (
  `store_id` int(11) NOT NULL AUTO_INCREMENT,
  `school_id` int(11) DEFAULT NULL,
  `isbn` int(11) DEFAULT NULL,
  `copies` int(11) NOT NULL,
  PRIMARY KEY (`store_id`),
  UNIQUE KEY `unique_book_school` (`isbn`,`school_id`),
  KEY `fk_Stores_School` (`school_id`),
  CONSTRAINT `fk_Stores_Books` FOREIGN KEY (`isbn`) REFERENCES `Books` (`isbn`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Stores_School` FOREIGN KEY (`school_id`) REFERENCES `School` (`school_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Stores`
--

LOCK TABLES `Stores` WRITE;
/*!40000 ALTER TABLE `Stores` DISABLE KEYS */;
/*!40000 ALTER TABLE `Stores` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-03 18:25:20
