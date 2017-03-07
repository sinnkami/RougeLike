DROP DATABASE IF EXISTS `game-rouge`;
CREATE DATABASE `game-rouge`;
USE `game-rouge`;
CREATE TABLE `Score` (
  `id` int not null auto_increment,
  `game_name` varchar(10) not null,
  `score` varchar(100) not null,
  `level` int(11) not null,
  `maxhp` int(11) not null,
  `attack` int(11) not null,
  `defense` int(11) not null,
  PRIMARY KEY(`id`)
);
