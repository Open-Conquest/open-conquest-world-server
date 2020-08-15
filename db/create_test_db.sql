DROP DATABASE IF EXISTS master;
CREATE DATABASE master;
USE master;

-- change password to char binary 60 in sequelize model
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(60),
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
);

CREATE TABLE `army` (
  `army_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`army_id`),
  UNIQUE KEY `army_id_UNIQUE` (`army_id`)
);

CREATE TABLE `player` (
  `player_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `user_id` int(11) NOT NULL,
  `army_id` int(11),
  PRIMARY KEY (`player_id`),
  UNIQUE KEY `player_id_UNIQUE` (`player_id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `player_user_idx` (`user_id`),
  KEY `player_army_idx` (`army_id`),
  CONSTRAINT `player_army` FOREIGN KEY (`army_id`) REFERENCES `army` (`army_id`),
  CONSTRAINT `player_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
);

CREATE TABLE `resources` (
  `resources_id` int(11) NOT NULL AUTO_INCREMENT,
  `player_id` int(11) NOT NULL,
  `gold` int(11) NOT NULL,
  PRIMARY KEY (`resources_id`),
  UNIQUE KEY `player_id_UNIQUE` (`player_id`),
  UNIQUE KEY `resources_id_UNIQUE` (`resources_id`),
  CONSTRAINT `resources_player` FOREIGN KEY (`player_id`) REFERENCES `player` (`player_id`)
);

CREATE TABLE `map` (
  `map_id` int(11) NOT NULL AUTO_INCREMENT,
  `map_name` varchar(45) NOT NULL,
  `max_rows` int(11) NOT NULL,
  `max_cols` int(11) NOT NULL,
  PRIMARY KEY (`map_id`)
);

CREATE TABLE `tile` (
  `tile_id` int(11) NOT NULL AUTO_INCREMENT,
  `map_id` int(11) NOT NULL,
  `tile_type` int(11) NOT NULL,
  `tile_row` int(11) NOT NULL,
  `tile_col` int(11) NOT NULL,
  PRIMARY KEY (`tile_id`),
  UNIQUE KEY `tile_id_UNIQUE` (`tile_id`),
  KEY `tile_map_idx` (`map_id`),
  CONSTRAINT `tile_map` FOREIGN KEY (`map_id`) REFERENCES `map` (`map_id`)
);

CREATE TABLE `unit` (
  `unit_id` int(11) NOT NULL,
  `attack` int(11) NOT NULL,
  `defense` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `level` int(11) NOT NULL,
  `gold_cost` int(11) NOT NULL,
  PRIMARY KEY (`unit_id`),
  UNIQUE KEY `unit_id_UNIQUE` (`unit_id`)
);

CREATE TABLE `army_units` (
  `army_units_id` int(11) NOT NULL AUTO_INCREMENT,
  `army_id` int(11) NOT NULL,
  `unit_id` int(11) NOT NULL,
  `unit_count` int(11) NOT NULL,
  PRIMARY KEY (`army_units_id`),
  UNIQUE KEY `army_units_id_UNIQUE` (`army_units_id`),
  KEY `army_units_army_id_idx` (`army_id`),
  KEY `army_units_unit_id_idx` (`unit_id`),
  CONSTRAINT `army_units_army_id` FOREIGN KEY (`army_id`) REFERENCES `army` (`army_id`),
  CONSTRAINT `army_units_unit_id` FOREIGN KEY (`unit_id`) REFERENCES `unit` (`unit_id`)
);

CREATE TABLE `march` (
  `march_id` int(11) NOT NULL AUTO_INCREMENT,
  `army_id` int(11) NOT NULL,
  `start_tile_id` int(11) NOT NULL,
  `end_tile_id` int(11) NOT NULL,
  `end_time` datetime DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `speed_modifier` float DEFAULT '1',
  PRIMARY KEY (`march_id`),
  UNIQUE KEY `march_id_UNIQUE` (`march_id`),
  UNIQUE KEY `army_id_UNIQUE` (`army_id`),
  KEY `march_end_tile_idx` (`end_tile_id`),
  KEY `march_start_tile_idx` (`start_tile_id`),
  KEY `march_army_idx` (`army_id`),
  CONSTRAINT `march_army` FOREIGN KEY (`army_id`) REFERENCES `army` (`army_id`),
  CONSTRAINT `march_end_tile` FOREIGN KEY (`end_tile_id`) REFERENCES `tile` (`tile_id`),
  CONSTRAINT `march_start_tile` FOREIGN KEY (`start_tile_id`) REFERENCES `tile` (`tile_id`)
);

CREATE TABLE `city` (
  `city_id` int(11) NOT NULL AUTO_INCREMENT,
  `player_id` int(11) NOT NULL,
  `city_name` varchar(45) NOT NULL,
  `city_level` int(11) NOT NULL,
  `tile_id` int(11) NOT NULL,
  PRIMARY KEY (`city_id`),
  UNIQUE KEY `city_id_UNIQUE` (`city_id`),
  UNIQUE KEY `city_name_UNIQUE` (`city_name`),
  KEY `city_player_idx` (`player_id`),
  KEY `city_tile_idx` (`tile_id`),
  CONSTRAINT `city_player` FOREIGN KEY (`player_id`) REFERENCES `player` (`player_id`),
  CONSTRAINT `city_tile` FOREIGN KEY (`tile_id`) REFERENCES `tile` (`tile_id`)
);

CREATE TABLE `building` (
  `building_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`building_id`),
  UNIQUE KEY `building_id_UNIQUE` (`building_id`),
);

CREATE TABLE `city_building` (
  `city_building_id` int(11) NOT NULL AUTO_INCREMENT,
  `city_id` int(11) NOT NULL,
  `building_id` varchar(45) NOT NULL,
  PRIMARY KEY (`city_building_id`),
  UNIQUE KEY `city_building_id_UNIQUE` (`city_building_id`),
  KEY `building_city_idx` (`city_id`),
  KEY `building_idx` (`building_id`),
  CONSTRAINT `city_id` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`),
  CONSTRAINT `building_id` FOREIGN KEY (`building_id`) REFERENCES `building` (`building_id`)
);

# CREAT THE BASIC UNIT TYPES WIZARD AND BEAR
SET @wizard_unit_id = 0;
SET @bear_unit_id = 1;
INSERT INTO unit (unit_id, attack, defense, name, level, gold_cost) VALUES (@wizard_unit_id, 100, 50, "Wizard", 1, 100);
INSERT INTO unit (unit_id, attack, defense, name, level, gold_cost) VALUES (@bear_unit_id, 30, 200, "Bear", 1, 150);		