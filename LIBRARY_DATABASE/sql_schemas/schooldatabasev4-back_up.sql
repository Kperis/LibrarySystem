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
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `App_user`
--

LOCK TABLES `App_user` WRITE;
/*!40000 ALTER TABLE `App_user` DISABLE KEYS */;
INSERT INTO `App_user` VALUES (1,3,'Πανωραία','Γρηγοριάδου',60,'Admin',NULL,NULL,_binary '\0'),(2,4,'Υάκινθος','Μακαριάδης',40,'Admin',NULL,NULL,_binary '\0'),(3,2,'Μαύρος','Ρέγκας',61,'Admin',NULL,NULL,_binary '\0'),(4,1,'Βενέτιος-Λάζαρος','Δανέζης',60,'Admin',NULL,NULL,_binary '\0'),(5,2,'Βαγιανή','Μάντου',11,'Μαθητής',NULL,3,_binary '\0'),(6,4,'Παγώνα','Βασιλειάδη',10,'Μαθητής',NULL,2,_binary '\0'),(7,3,'Γαλάτιος','Μοσχόπουλος',13,'Μαθητής',NULL,1,_binary '\0'),(8,1,'Ανθούλης','Ντόκος',30,'Καθηγητής',NULL,4,_binary '\0'),(9,3,'Ιορδανία-Βαλέρια','Καλαμάρα',14,'Μαθητής',NULL,1,_binary '\0'),(10,1,'Θεοφανία','Δήμου',33,'Καθηγητής',NULL,4,_binary '\0'),(11,2,'Αυξέντιος-Ελευθέριος','Τσιαμίτας',17,'Μαθητής',NULL,3,_binary '\0'),(12,1,'Δημήτριος','Κατσαμάνης',11,'Μαθητής',NULL,4,_binary '\0'),(13,2,'Νεκτάριος','Μηλιώρης',14,'Μαθητής',NULL,3,_binary '\0'),(14,2,'Τίτος','Κατσαβός',15,'Μαθητής',NULL,3,_binary '\0'),(15,4,'Δράκων','Ακριτίδης',12,'Μαθητής',NULL,2,_binary '\0'),(16,1,'Φανούριος','Καμποσάκης',14,'Μαθητής',NULL,4,_binary '\0'),(17,3,'Ζηνόβιος','Βαρακλής',13,'Μαθητής',NULL,1,_binary '\0'),(18,2,'Φιλιώ','Διακουμή',13,'Μαθητής',NULL,3,_binary '\0'),(19,1,'Φιλομήλα','Κολαΐτου',54,'Καθηγητής',NULL,4,_binary '\0'),(20,1,'Αντίγονος','Κεσαλίδης',16,'Μαθητής',NULL,4,_binary '\0'),(21,1,'Ρωμανός','Κοντός',13,'Μαθητής',NULL,4,_binary '\0'),(22,3,'Γαλάτεια','Κουτσονίκα',57,'Καθηγητής',NULL,1,_binary '\0'),(23,2,'Ευμένιος','Δινεζάκης',18,'Μαθητής',NULL,3,_binary '\0'),(24,3,'Πλάτων','Περρώτης',10,'Μαθητής',NULL,1,_binary '\0'),(25,4,'Ταξιαρχία','Χωριανοπούλου',14,'Μαθητής',NULL,2,_binary '\0'),(26,2,'Αγλαΐα','Κωνσταντοπούλου',15,'Μαθητής',NULL,3,_binary '\0'),(27,1,'Φερενίκη','Μπεκάκου',27,'Καθηγητής',NULL,4,_binary '\0'),(28,2,'Ταξιάρχης','Φυδάνης',18,'Μαθητής',NULL,3,_binary '\0'),(29,3,'Θουκυδίδης','Τσανδήλας',13,'Μαθητής',NULL,1,_binary '\0'),(30,2,'Δίκαιος-Βενέτιος','Μελιτσόπουλος',16,'Μαθητής',NULL,3,_binary '\0'),(31,1,'Εμμανουήλ','Σταθόπουλος',15,'Μαθητής',NULL,4,_binary '\0'),(32,4,'Ρεβέκα','Καψή',29,'Καθηγητής',NULL,2,_binary '\0'),(33,2,'Δαβιδούλα','Ξενίδη',10,'Μαθητής',NULL,3,_binary '\0'),(34,3,'Σαββούλα-Ζησούλα','Πέτρου',28,'Καθηγητής',NULL,1,_binary '\0'),(35,4,'Φιλοθέη','Πάντζιου',17,'Μαθητής',NULL,2,_binary '\0'),(36,4,'Ταξίαρχος','Ισέρης',12,'Μαθητής',NULL,2,_binary '\0'),(37,2,'Λαοκράτης','Μητσόπουλος',12,'Μαθητής',NULL,3,_binary '\0'),(38,2,'Θεόκλητος','Βιολάτος',18,'Μαθητής',NULL,3,_binary '\0'),(39,2,'Αυγέρης','Χατζησάββας',18,'Μαθητής',NULL,3,_binary '\0'),(40,3,'Στέφανος','Νέλος',54,'Καθηγητής',NULL,1,_binary '\0'),(41,4,'Χρυσοβαλάντου','Κάκκα',16,'Μαθητής',NULL,2,_binary '\0'),(42,4,'Ουρανία','Φραγκουδάκη',54,'Καθηγητής',NULL,2,_binary '\0'),(43,1,'Φανούριος','Αναστόπουλος',16,'Μαθητής',NULL,4,_binary '\0'),(44,3,'Προκόπιος-Επαμεινώνδας','Λιθοξοΐδης',18,'Μαθητής',NULL,1,_binary '\0'),(45,4,'Βαρσάμος','Γκούσκος',65,'Καθηγητής',NULL,2,_binary '\0'),(46,2,'Πασχάλης','Δραζιώτης',17,'Μαθητής',NULL,3,_binary '\0'),(47,3,'Λουλουδένια','Γαλάνη',53,'Καθηγητής',NULL,1,_binary '\0'),(48,2,'Γερασιμούλα-Αικατερίνη','Δαγλή',11,'Μαθητής',NULL,3,_binary '\0'),(49,2,'Ερμιόνη-Βαλεντίνα','Μπαφίτη',18,'Μαθητής',NULL,3,_binary '\0'),(50,3,'Ματθίλδη-Ρεβέκα','Παπαχρήστου',13,'Μαθητής',NULL,1,_binary '\0'),(51,1,'Αθανάσιος','Ράπτης',14,'Μαθητής',NULL,4,_binary '\0'),(52,1,'Αργυρούλα','Αγγελίδου',65,'Καθηγητής',NULL,4,_binary '\0'),(53,3,'Πασχάλης','Καπετάνιος',18,'Μαθητής',NULL,1,_binary '\0'),(54,1,'Αδαμάντιος','Λυγκούρας',13,'Μαθητής',NULL,4,_binary '\0'),(55,4,'Πάρις','Καλαμπαλίκης',13,'Μαθητής',NULL,2,_binary '\0'),(56,2,'Θεοφίλη-Λουλουδένια','Σκούμπρου',11,'Μαθητής',NULL,3,_binary '\0'),(57,2,'Αρίσταρχος','Λαφατζής',18,'Μαθητής',NULL,3,_binary '\0'),(58,2,'Σεμίνα','Βασιλοπούλου',17,'Μαθητής',NULL,3,_binary '\0'),(59,2,'Αργυρούλα','Δουλάμη',12,'Μαθητής',NULL,3,_binary '\0'),(60,3,'Αλέξιος','Κελλάρης',50,'Καθηγητής',NULL,1,_binary '\0'),(61,2,'Εφραίμ','Σωτηράλης',14,'Μαθητής',NULL,3,_binary '\0'),(62,4,'Ταξιαρχία','Βερβίτη',25,'Καθηγητής',NULL,2,_binary '\0'),(63,1,'Αγγελής','Αγαλιώτης',18,'Μαθητής',NULL,4,_binary '\0'),(64,1,'Νεόκλεια','Ελευθερίου',14,'Μαθητής',NULL,4,_binary '\0'),(65,1,'Λογοθέτης','Πουφτσής',11,'Μαθητής',NULL,4,_binary '\0'),(66,4,'Θουκυδίδης','Λιόλιος',17,'Μαθητής',NULL,2,_binary '\0'),(67,1,'Αντώνιος','Παπαδόπουλος',13,'Μαθητής',NULL,4,_binary '\0'),(68,2,'Λεμονής','Θωμάς',16,'Μαθητής',NULL,3,_binary '\0'),(69,3,'Ελισσαίος','Κατσαμάνης',12,'Μαθητής',NULL,1,_binary '\0'),(70,3,'Νεκτάριος','Παπαγεωργίου',17,'Μαθητής',NULL,1,_binary '\0'),(71,1,'Μεταξία','Οικονόμου',29,'Καθηγητής',NULL,4,_binary '\0'),(72,4,'Παύλος','Ταβερναράκης',15,'Μαθητής',NULL,2,_binary '\0'),(73,4,'Χρυσοβαλάντου','Φασατάκη',52,'Καθηγητής',NULL,2,_binary '\0'),(74,1,'Ρίζος','Κριάλης',13,'Μαθητής',NULL,4,_binary '\0'),(75,2,'Αγαθή','Μαμαλά',11,'Μαθητής',NULL,3,_binary '\0'),(76,1,'Ήβη','Ρούσσου',11,'Μαθητής',NULL,4,_binary '\0'),(77,1,'Μακάριος','Ντότης',34,'Καθηγητής',NULL,4,_binary '\0'),(78,4,'Γλυκερία','Παπαγεωργίου',17,'Μαθητής',NULL,2,_binary '\0'),(79,3,'Ευάγγελος','Φούσκας',10,'Μαθητής',NULL,1,_binary '\0'),(80,1,'Γαληνός-Σωτήριος','Σπανδωνίδης',13,'Μαθητής',NULL,4,_binary '\0'),(81,2,'Ντανιέλα-Δροσιά','Κατσιμάνη',17,'Μαθητής',NULL,3,_binary '\0'),(82,3,'Θησεύς','Μαντζώρος',48,'Καθηγητής',NULL,1,_binary '\0'),(83,4,'Ναπολέων','Σωτηράλης',14,'Μαθητής',NULL,2,_binary '\0'),(84,3,'Φρίξος','Κυμπάρης',17,'Μαθητής',NULL,1,_binary '\0'),(85,4,'Χαρά','Παπανώτα',14,'Μαθητής',NULL,2,_binary '\0'),(86,1,'Μαριλένα','Ξενίδη',12,'Μαθητής',NULL,4,_binary '\0'),(87,4,'Αριστέα','Βασιλοπούλου',14,'Μαθητής',NULL,2,_binary '\0'),(88,3,'Λογοθέτης','Θεοδοσίου',10,'Μαθητής',NULL,1,_binary '\0'),(89,1,'Ιουλιανή','Πέττα',11,'Μαθητής',NULL,4,_binary '\0'),(90,2,'Σταύρος','Καρακυρίου',54,'Καθηγητής',NULL,3,_binary '\0'),(91,4,'Θεοδότη','Παπαδημητροπούλου',15,'Μαθητής',NULL,2,_binary '\0'),(92,3,'Θεμιστοκλής','Πουλογιαννόπουλος',31,'Καθηγητής',NULL,1,_binary '\0'),(93,1,'Ιάσων','Λουλάκης',16,'Μαθητής',NULL,4,_binary '\0'),(94,2,'Μεγακλής','Καρακαστανιάς',16,'Μαθητής',NULL,3,_binary '\0'),(95,2,'Ελπίς','Μπαρκούτα',17,'Μαθητής',NULL,3,_binary '\0'),(96,4,'Ιουλιανή','Σακκή',15,'Μαθητής',NULL,2,_binary '\0'),(97,2,'Νεοκλής','Χατζόπουλος',40,'Καθηγητής',NULL,3,_binary '\0'),(98,1,'Γαλάτιος','Δουλάμης',12,'Μαθητής',NULL,4,_binary '\0'),(99,1,'Χαρίλαος','Τζιάρας',10,'Μαθητής',NULL,4,_binary '\0'),(100,2,'Λεωνίδας','Καραλής',12,'Μαθητής',NULL,3,_binary '\0'),(101,4,'Αναγνώστης','Θεοδωρόπουλος',18,'Μαθητής',NULL,2,_binary '\0'),(102,3,'Ιούλιος','Λέλεκας',14,'Μαθητής',NULL,1,_binary '\0'),(103,2,'Αγνή','Γούλα',13,'Μαθητής',NULL,3,_binary '\0'),(104,1,'Απόστολος','Τσώτσης',12,'Μαθητής',NULL,4,_binary '\0'),(105,NULL,'Eren','Yeager',42,'Main_Admin',NULL,NULL,_binary '');
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
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Authentication`
--

LOCK TABLES `Authentication` WRITE;
/*!40000 ALTER TABLE `Authentication` DISABLE KEYS */;
INSERT INTO `Authentication` VALUES (1,4,'ftarnaris','Z#$4U1DfHQ'),(2,8,'savvoula10','NQ5zbxLu(R'),(3,10,'lrafios','*4PEtqrM^7'),(4,12,'persefoni61','qU_8rMnWv4'),(5,16,'mlogotheti','r*1IOGc+b7'),(6,19,'dpippas','k08c)kY*&_'),(7,20,'pigi94',')3Oc4*1xhJ'),(8,21,'asimakis26','e8R#bh+v$e'),(9,27,'kalypso45','d6iY1Vgz^n'),(10,31,'erato18','k+1ZKxF9m^'),(11,43,'jtyralis','(0DM+mtAp1'),(12,51,'petra18','it!tPXba&4'),(13,52,'koniari.fereniki','yGy1Linpa*'),(14,54,'kellaris.valeria','N!@y6Je+15'),(15,63,'rpiperidi','CJ4WwIqa*m'),(16,64,'loulakis.erasmia','YPWO2vIl)%'),(17,65,'ilektra40','&c2TVKj@$3'),(18,67,'neofytos.varaklis','(4EZ^rnESG'),(19,71,'karkanaki.euanthia','!&6oKCfEwi'),(20,74,'vlassi.pelagia','5bvgZP(l%N'),(21,76,'taularidou.vyron','7@3OZ0pFG%'),(22,77,'akalidis.ilias','%r3PqFfmQ2'),(23,80,'ioulios74','_i%h1ZSe7('),(24,86,'kyriakos92','&M6EJn4aSo'),(25,89,'iokasti.romaiou','Ki1X!Yave_'),(26,93,'alkistis.kolchouris','^*2AiB(978'),(27,98,'kakka.athinagoras','!ho3WE%bk9'),(28,99,'vartholomaios.vlachos','&w5vJU@q5T'),(29,104,'danai.chronopoulou','!05vSqv^(a'),(30,3,'aggelopoulos.asterios','Ji&3DOx5B!'),(31,5,'anthimos85','s17Cbegl%b'),(32,11,'kourakos.isavella','BtL4R7oOI!'),(33,13,'kalaitzopoulou.euthalia','86Q)Z#mo%O'),(34,14,'martha.sempepou','(yCW7Jzn6a'),(35,18,'polychronia09','k(00mCvp3P'),(36,23,'nausika.kostopoulou',')xn5ZQ6taI'),(37,26,'utamiolakis','Yd0enAX8I('),(38,28,'eulampia54','FQ1rxhd8Z^'),(39,30,'achilleas.sempepou','4W7ErwjS7+'),(40,33,'jmantou','2bYZcf3B*8'),(41,37,'rodamanthi.frogakis','23M#_83i)0'),(42,38,'dimosthenis.xirodima','H+H1CiCV#6'),(43,39,'skordakis.merkourios','vvOWgTSK)3'),(44,46,'mplanas.argyrios','(VWy*m8gl2'),(45,48,'edamala','h9TwgHRi%$'),(46,49,'kassiani73','&P68PY%k5D'),(47,56,'gkouris','%$!4Ptgh#e'),(48,57,'alexandraki.uakinthi','86wbw#Nd#m'),(49,58,'chasapi.amfitriti','*8Dg1e9!TS'),(50,59,'kymparis.sozousa','j*2Ex3$z*A'),(51,61,'chara.choleva',')&5yU%he!#'),(52,68,'zpapakosta','^3EItJIcvU'),(53,75,'ntaizi.mpofos','^2B(^g3@so'),(54,81,'bpolychronis','(wglRzjKq7'),(55,90,'christofori.stylianos','j4d7B3W$^6'),(56,94,'margaris.aristea','$x$OV#xo+1'),(57,95,'varelidou.minerva','qnIi!&#o#5'),(58,97,'zchondrolidis','XkQ6IfQ8#3'),(59,100,'sfyrlas.klearchos','jj5SfwV8E!'),(60,103,'eutychios94','h5_KUtEo&R'),(61,1,'methodios50','%u+2JcljSp'),(62,7,'apollonia36','AG1(4wJdF7'),(63,9,'tsoura.anna','I80kBklG%M'),(64,17,'leonidas.fotopoulos','s!*u28EaqB'),(65,22,'karantzopoulos.laurentios','i_6#NpMx%u'),(66,24,'sozousa.voutsina','_0Sl+#zcrQ'),(67,29,'vlasios.rokas',')aLU$^qig8'),(68,34,'athanasia08','VCW*Kne+)1'),(69,40,'euthymios49','mwL*Wqvl@5'),(70,44,'andriani26','*p*+3JsXUP'),(71,47,'theologos.fokas','5s2aPRNr$_'),(72,50,'christos07','1Vg0X&#jG('),(73,53,'ieremias.gkaliou','9fz7O+J&k*'),(74,60,'iosifina29','^9LBwj!pf)'),(75,69,'giannis40','jusUlW)o(9'),(76,70,'augeris31','+VQv7Tapn7'),(77,79,'vkoutsourelis','%NU2v0V4r8'),(78,82,'koufaki.thekla','3+$MPpV@&e'),(79,84,'nchouliaras','_EXNP%3j8@'),(80,88,'isidora36','y#S56VQsQd'),(81,92,'alkinoi84','72AmFAm1)u'),(82,102,'karamanos.nathanail','v35R3fVG@z'),(83,2,'eukleidis38','Xo7RXm!h##'),(84,6,'rfotopoulos','R1PU6zcW+L'),(85,15,'pmanousopoulou','+hLqTcYTQ4'),(86,25,'theotokis68','!)8yGZcLld'),(87,32,'pantelia70','(xHzDass_9'),(88,35,'zidianakis.chrysostomi','X5g_Nnij*G'),(89,36,'mastoras.ioannis','TX70@MGxx+'),(90,41,'emmanouil.orfaniotis','*sZ5XHidj3'),(91,42,'iokasti84','gq7$G3Ld$r'),(92,45,'mauroudis06','*f$1SZib#D'),(93,55,'polyzois45','Ha&4NK$Gf*'),(94,62,'zrodis','!n07%gE0e8'),(95,66,'ierotheos04','4nDCoxvd$A'),(96,72,'nikolopoulos.sotiris','&9C+yQ9h#o'),(97,73,'archontia.papadimitropoulou','B$8DpCqDS%'),(98,78,'thasitou.ino','Lnn53Kv2%9'),(99,83,'gmpliatsiou','ug_2@Qu!u*'),(100,85,'mouselimis.eusevia','!GlX$!FqY1'),(101,87,'kalitsounakis.xanthos','O6&J+Kbb!Z'),(102,91,'giannis.kostakis','wz4Gwht9L)'),(103,96,'kimon.kapsi','t&C4CeUe^5'),(104,101,'breppa','55mnXkcr#U'),(105,105,'test','test');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Phone`
--

LOCK TABLES `Phone` WRITE;
/*!40000 ALTER TABLE `Phone` DISABLE KEYS */;
INSERT INTO `Phone` VALUES (1,1,'210 8800186'),(2,1,'2380193557'),(3,1,'(+30) 2073 729152'),(4,2,'6979902421'),(5,3,'6982 047367'),(6,4,'2105167078'),(7,4,'210 3363655');
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
  PRIMARY KEY (`school_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `School`
--

LOCK TABLES `School` WRITE;
/*!40000 ALTER TABLE `School` DISABLE KEYS */;
INSERT INTO `School` VALUES (1,'29o Γυμνάσιο','Καβάλα','loudovikos43@example.org','Γαλανοπούλου 60',0),(2,'18o Δημοτικό','Μεσολόγγι','avramidis.ilias@example.org','Κονοπίνας 36',0),(3,'18o Λύκειο','Αθήνα','schronopoulou@example.org','Πλατεία Σερβιανών 975-367',0),(4,'4o Δημοτικό','Αργοστόλι','zacharias85@example.net','Ρουσσοσπιτίου 80',0);
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

-- Dump completed on 2023-06-02 12:30:00
