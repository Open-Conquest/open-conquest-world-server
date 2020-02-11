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

CREATE TABLE `map` (
  `map_id` int(11) NOT NULL AUTO_INCREMENT,
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
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`army_id`),
  UNIQUE KEY `army_id_UNIQUE` (`army_id`),
  KEY `army_user_idx` (`user_id`),
  CONSTRAINT `army_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
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
  `army_id` int(11) NOT NULL,
  `unit_id` int(11) NOT NULL,
  `unit_count` int(11) NOT NULL,
  `army_units_id` int(11) NOT NULL AUTO_INCREMENT,
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
  `user_id` int(11) NOT NULL,
  `tile_id` int(11) NOT NULL,
  `city_name` varchar(45) NOT NULL,
  `city_level` int(11) NOT NULL,
  `city_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`city_id`),
  UNIQUE KEY `city_id_UNIQUE` (`city_id`),
  KEY `city_tile_idx` (`tile_id`),
  KEY `city_user` (`user_id`),
  CONSTRAINT `city_tile` FOREIGN KEY (`tile_id`) REFERENCES `tile` (`tile_id`),
  CONSTRAINT `city_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
);


INSERT INTO user (username) VALUES ("test_user_1");
INSERT INTO user (username) VALUES ("test_user_2");
INSERT INTO user (username) VALUES ("test_user_3");
INSERT INTO user (username) VALUES ("test_user_4");
INSERT INTO user (username) VALUES ("test_user_5");

INSERT INTO map () VALUES ();

SET @tile_type = 0;
DROP PROCEDURE IF EXISTS CreateTiles;
DELIMITER $$
CREATE PROCEDURE CreateTiles()
BEGIN
    DECLARE row_num INT;
    DECLARE col_num INT;
    SET row_num = 0;
    SET col_num = 0;
    row_loop:  LOOP
        IF row_num >= 10 THEN
			LEAVE row_loop;
		END IF;
        SET col_num = 0;
		col_loop: LOOP
			IF col_num >= 10 THEN
				LEAVE col_loop;
			END IF;
            SET @tile_type = ROUND((RAND() * (25-0))+0);
            SET @tile_type = 0;
            -- IF @tile_type > 1 THEN
-- 				SET @tile_type = 0;
-- 			ELSE
-- 				SET @tile_type = 1;
-- 			END IF;
			INSERT INTO tile (map_id, tile_type, tile_row, tile_col) VALUES (1, @tile_type, row_num, col_num);
			SET col_num = col_num + 1;
		END LOOP;
        SELECT row_num;
		SET row_num = row_num + 1;
	END LOOP;
END$$
DELIMITER ;
Call CreateTiles();

# Insert cities
SET @city_1_tile_id = 0;
SET @city_2_tile_id = 0;
SET @city_3_tile_id = 0;
SET @city_4_tile_id = 0;
SET @city_5_tile_id = 0;
SELECT tile_id FROM tile WHERE tile_row = 0 AND tile_col = 0 INTO @city_1_tile_id;
SELECT tile_id FROM tile WHERE tile_row = 2 AND tile_col = 4 INTO @city_2_tile_id;
SELECT tile_id FROM tile WHERE tile_row = 5 AND tile_col = 5 INTO @city_3_tile_id;
SELECT tile_id FROM tile WHERE tile_row = 5 AND tile_col = 8 INTO @city_4_tile_id;
SELECT tile_id FROM tile WHERE tile_row = 7 AND tile_col = 7 INTO @city_5_tile_id;

INSERT INTO city (user_id, tile_id, city_name, city_level) VALUES (1, @city_1_tile_id, "test_city_1", 1);
INSERT INTO city (user_id, tile_id, city_name, city_level) VALUES (2, @city_2_tile_id, "test_city_2", 2);
UPDATE tile SET tile_type = 1 WHERE (tile_id = @city_1_tile_id) OR (tile_id = @city_2_tile_id);

# Insert unit types
SET @wizard_unit_id = 0;
SET @bear_unit_id = 1;
INSERT INTO unit (unit_id, attack, defense, name, level, gold_cost) VALUES (@wizard_unit_id, 100, 50, "Wizard", 1, 100);
INSERT INTO unit (unit_id, attack, defense, name, level, gold_cost) VALUES (@bear_unit_id, 30, 200, "Bear", 1, 150);

# Insert armies
SET @user_1_army_id = 0;
SET @user_2_army_id = 0;

INSERT INTO army (user_id) VALUES (1);
INSERT INTO army (user_id) VALUES (2);
INSERT INTO army (user_id) VALUES (3);
INSERT INTO army (user_id) VALUES (4);
INSERT INTO army (user_id) VALUES (5);

SELECT army_id FROM army WHERE user_id = 1 INTO @user_1_army_id;
SELECT army_id FROM army WHERE user_id = 2 INTO @user_2_army_id;

# Insert units for armies
INSERT INTO army_units (army_id, unit_id, unit_count) VALUES (@user_1_army_id, @wizard_unit_id, 100);
INSERT INTO army_units (army_id, unit_id, unit_count) VALUES (@user_1_army_id, @bear_unit_id, 10);

INSERT INTO army_units (army_id, unit_id, unit_count) VALUES (@user_2_army_id, @wizard_unit_id, 50);
INSERT INTO army_units (army_id, unit_id, unit_count) VALUES (@user_2_army_id, @bear_unit_id, 30);

SELECT * FROM army JOIN army_units USING(army_id) JOIN unit USING(unit_id);

# Insert marches
INSERT INTO march (army_id, start_tile_id, end_tile_id, start_time, end_time) VALUES (@user_1_army_id, @city_1_tile_id, @city_2_tile_id, NOW(), DATE_ADD(NOW(), INTERVAL 1 MINUTE));
INSERT INTO march (army_id, start_tile_id, end_tile_id, start_time, end_time) VALUES (@user_2_army_id, @city_2_tile_id, @city_1_tile_id, NOW(), DATE_ADD(NOW(), INTERVAL 1 MINUTE));