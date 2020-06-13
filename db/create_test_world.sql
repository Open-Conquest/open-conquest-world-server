-- A script to create the initial state of a world for alpha testing
-- What it does:
-- 		Creates a 10x10 map called "America"
-- 		Makes every tile in "America" grass
-- 		Creates the basic unit types of Wizard & Bear

USE master;

# CREATE MAP AMERICA
SET @map_id = 0;
SET @num_rows = 10;
SET @num_cols = 10;
INSERT INTO map (map_name, max_rows, max_cols) VALUES ('America', @num_rows, @num_cols);
SELECT map_id FROM map INTO @map_id;

# CREATE TILES FOR AMERICA
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
        IF row_num >= @num_rows THEN
			LEAVE row_loop;
		END IF;
        SET col_num = 0;
		col_loop: LOOP
			IF col_num >= @num_cols THEN
				LEAVE col_loop;
			END IF;
            SET @tile_type = ROUND((RAND() * (25-0))+0);
            SET @tile_type = 0;
			INSERT INTO tile (map_id, tile_type, tile_row, tile_col) VALUES (@map_id, @tile_type, row_num, col_num);
			SET col_num = col_num + 1;
		END LOOP;
        SELECT row_num;
		SET row_num = row_num + 1;
	END LOOP;
END$$
DELIMITER ;
Call CreateTiles();
