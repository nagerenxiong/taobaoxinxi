/*
SQLyog Ultimate v11.27 (32 bit)
MySQL - 5.7.17-log : Database - thinkjsplusmaster
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`thinkjsplusmaster` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `thinkjsplusmaster`;

/*Table structure for table `thinkjsplus_category` */

DROP TABLE IF EXISTS `thinkjsplus_category`;

CREATE TABLE `thinkjsplus_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `remark` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `thinkjsplus_category` */

insert  into `thinkjsplus_category`(`id`,`name`,`remark`) values (33,'童智乐玩具专营店','');

/*Table structure for table `thinkjsplus_thing` */

DROP TABLE IF EXISTS `thinkjsplus_thing`;

CREATE TABLE `thinkjsplus_thing` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `content` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `category_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `times` date DEFAULT NULL,
  `kdxx` text COLLATE utf8_unicode_ci,
  `khbz` text COLLATE utf8_unicode_ci,
  `sjbz` text COLLATE utf8_unicode_ci,
  `gmbz` text COLLATE utf8_unicode_ci,
  `jjll` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `yjll` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sjlj` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `thlj` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `shangpinId` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `thinkjsplus_thing` */

insert  into `thinkjsplus_thing`(`id`,`title`,`content`,`category_name`,`times`,`kdxx`,`khbz`,`sjbz`,`gmbz`,`jjll`,`yjll`,`sjlj`,`thlj`,`shangpinId`) values (31,'奥迪双钻超级飞侠玩具全套装1111大号变形机器人乐迪小爱小飞侠玩具',NULL,'童智乐玩具专营店',NULL,'kkkkkkkkkkkkkkkk','sdf','dgggggggggggggggggg','gfdg','12','12','1212','12','44988156624'),(32,'奥迪双钻陀螺玩222具飓风战魂3战斗王裂变烈风圣翼s合体暗绝元冥陀螺',NULL,'童智乐玩具专营店',NULL,'oooooooooooo','奥迪双钻陀螺玩具飓风战魂3战斗王裂变烈风圣翼s合体暗绝元冥陀螺','dddddddddddd','wwwwwwwwwwww','12','13','123123','123','520212583433');

/*Table structure for table `thinkjsplus_user` */

DROP TABLE IF EXISTS `thinkjsplus_user`;

CREATE TABLE `thinkjsplus_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `thinkjsplus_user` */

insert  into `thinkjsplus_user`(`id`,`username`,`password`) values (1,'admin','66666666666'),(3,'admin1','898989'),(4,'787878','787878'),(5,'adadadf','123123'),(6,'gggggggggggg','123123123123'),(7,'18867190033','123456');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
