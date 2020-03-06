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

CREATE TABLE `player` (
  `player_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`player_id`),
  UNIQUE KEY `player_id_UNIQUE` (`player_id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `player_user_idx` (`user_id`),
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

CREATE TABLE `army` (
  `army_id` int(11) NOT NULL AUTO_INCREMENT,
  `player_id` int(11) NOT NULL,
  PRIMARY KEY (`army_id`),
  UNIQUE KEY `army_id_UNIQUE` (`army_id`),
  KEY `army_player_idx` (`player_id`),
  CONSTRAINT `army_player` FOREIGN KEY (`player_id`) REFERENCES `player` (`player_id`)
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

-- INSERT INTO user (username) VALUES ("test_user_1");
-- INSERT INTO user (username) VALUES ("test_user_2");

-- INSERT INTO map (`map_name`) VALUES ('America');

-- SET @tile_type = 0;
-- DROP PROCEDURE IF EXISTS CreateTiles;
-- DELIMITER $$
-- CREATE PROCEDURE CreateTiles()
-- BEGIN
--     DECLARE row_num INT;
--     DECLARE col_num INT;
--     SET row_num = 0;
--     SET col_num = 0;
--     row_loop:  LOOP
--         IF row_num >= 10 THEN
-- 			LEAVE row_loop;
-- 		END IF;
--         SET col_num = 0;
-- 		col_loop: LOOP
-- 			IF col_num >= 10 THEN
-- 				LEAVE col_loop;
-- 			END IF;
--             SET @tile_type = ROUND((RAND() * (25-0))+0);
--             SET @tile_type = 0;
--             -- IF @tile_type > 1 THEN
-- -- 				SET @tile_type = 0;
-- -- 			ELSE
-- -- 				SET @tile_type = 1;
-- -- 			END IF;
-- 			INSERT INTO tile (map_id, tile_type, tile_row, tile_col) VALUES (1, @tile_type, row_num, col_num);
-- 			SET col_num = col_num + 1;
-- 		END LOOP;
--         SELECT row_num;
-- 		SET row_num = row_num + 1;
-- 	END LOOP;
-- END$$
-- DELIMITER ;
-- Call CreateTiles();

-- # Insert cities
-- SET @city_1_tile_id = 0;
-- SET @city_2_tile_id = 0;
-- SELECT tile_id FROM tile WHERE tile_row = 0 AND tile_col = 0 INTO @city_1_tile_id;
-- SELECT tile_id FROM tile WHERE tile_row = 2 AND tile_col = 4 INTO @city_2_tile_id;

-- Old city insert scripts
-- INSERT INTO city (user_id, tile_id, city_name, city_level) VALUES (1, @city_1_tile_id, "test_city_1", 1);
-- INSERT INTO city (user_id, tile_id, city_name, city_level) VALUES (2, @city_2_tile_id, "test_city_2", 2);
-- UPDATE tile SET tile_type = 1 WHERE (tile_id = @city_1_tile_id) OR (tile_id = @city_2_tile_id);

# BRAND NEW SHIT
# Create unit types
-- SET @wizard_unit_id = 0;
-- SET @bear_unit_id = 1;
-- INSERT INTO unit (unit_id, attack, defense, name, level, gold_cost) VALUES (@wizard_unit_id, 100, 50, "Wizard", 1, 100);
-- INSERT INTO unit (unit_id, attack, defense, name, level, gold_cost) VALUES (@bear_unit_id, 30, 200, "Bear", 1, 150);		

# CREATING A SINGLE TEST USER
-- SET @user_1_id = 0;
-- SET @player_1_id = 0;
-- SET @player_1_army_id = 0;
-- # create new test user
-- INSERT INTO user (username, password) VALUES ('test_username', 'test_password');
-- SELECT user_id FROM user WHERE username = 'test_username' INTO @user_1_id;
-- # create new player for test user
-- INSERT INTO player (name, user_id) VALUES ('test_playername', @user_1_id);
-- SELECT player_id FROM player WHERE user_id = @user_1_id INTO @player_1_id;
-- # create new army for player
-- INSERT INTO army (player_id) VALUES (@player_1_id);
-- SELECT army_id FROM army WHERE player_id = @player_1_id INTO @player_1_army_id;
-- -- SELECT army_id FROM army WHERE user_id = 1 INTO @user_1_army_id;
-- -- SELECT army_id FROM army WHERE user_id = 2 INTO @user_2_army_id;

-- -- # Insert units for armies
-- INSERT INTO army_units (army_id, unit_id, unit_count) VALUES (@player_1_army_id, @wizard_unit_id, 100);
-- INSERT INTO army_units (army_id, unit_id, unit_count) VALUES (@player_1_army_id, @bear_unit_id, 10);

-- SELECT * FROM player JOIN army USING(player_id) JOIN army_units USING(army_id) JOIN unit USING(unit_id);

# MARK OLD
-- # Insert marches
-- INSERT INTO march (army_id, start_tile_id, end_tile_id, start_time, end_time) VALUES (@user_1_army_id, @city_1_tile_id, @city_2_tile_id, NOW(), DATE_ADD(NOW(), INTERVAL 1 MINUTE));
-- INSERT INTO march (army_id, start_tile_id, end_tile_id, start_time, end_time) VALUES (@user_2_army_id, @city_2_tile_id, @city_1_tile_id, NOW(), DATE_ADD(NOW(), INTERVAL 1 MINUTE));