USE cue_db;

INSERT INTO cueSheets (productionTitle,productionYear, type, productionDuration, musicDuration, createdAt, updatedAt) 
VALUES ("Black Panther", 2017,"Film",  7200, 140, NOW(), NOW()),
("Iron Man", 2011, "Film",  7800, 140, NOW(), NOW());


INSERT INTO cues (duration, usage,cueSheetId, songId, createdAt, updatedAt)
VALUES (40, "theme", 1, 1, NOW(), NOW()),
(17, "background", 1, 2, NOW(), NOW()), 
(33, "background", 1, 3, NOW(), NOW()),
(50, "background", 1, 4, NOW(), NOW()),
(40, "background", 2, 1, NOW(), NOW()),
(17, "vocal", 2, 2, NOW(), NOW()), 
(33, "theme", 2, 3, NOW(), NOW()),
(50, "background", 2, 4, NOW(), NOW());


INSERT INTO songs (songTitle, artists,fingerprintId, createdAt, updatedAt) 
VALUES ("Test title 1", "Drake", 882282, NOW(), NOW()), 
("Test title 2 ", "Drake", 882283, NOW(), NOW()),
("Test title 3", "Drake", 882284, NOW(), NOW()),
("Test title 4", "Drake", 882285, NOW(), NOW());

INSERT INTO shareholders (shareholderName, affiliation, ipiNumber, createdAt, updatedAt) 
VALUES ("Aubrey Graham", "SOCAN", "8291273-ph",  NOW(), NOW()), 
("Noah Shabib", "ASCAP", "8392470-hj", NOW(), NOW()), 
("Nineteen85", "BMI", "903723-sj", NOW(), NOW());

INSERT INTO shareholderSongs (shares, role, songId, shareholderId, createdAt, updatedAt) 
VALUES 
-- song 1 
(40, "CA- Composer/Author", 1, 1,  NOW(), NOW()), 
(30,"CA- Composer/Author", 1, 2,  NOW(), NOW()),
(30, "CA- Composer/Author", 1, 3,  NOW(), NOW()),
-- song 2
(40, "CA- Composer/Author", 2, 1,  NOW(), NOW()), 
(30, "CA- Composer/Author", 2, 2,  NOW(), NOW()),
(30, "CA- Composer/Author", 2, 3,  NOW(), NOW()),
-- song 3
(40, "CA- Composer/Author", 3, 1,  NOW(), NOW()), 
(30, "CA- Composer/Author", 3, 2,  NOW(), NOW()),
(30, "CA- Composer/Author", 3, 3,  NOW(), NOW()),
-- song 4
(40, "CA- Composer/Author", 4, 1,  NOW(), NOW()), 
(30, "CA- Composer/Author", 4, 2,  NOW(), NOW()),
(30, "CA- Composer/Author", 4, 3,  NOW(), NOW());


INSERT INTO `cue_db`.`cues` (`id`, `duration`, `usage`, `createdAt`, `updatedAt`, `cueSheetId`, `songId`) VALUES ('1', '40', 'theme', '2018-10-27 00:29:08', '2018-10-27 00:29:08', '1', '1');
INSERT INTO `cue_db`.`cues` (`id`, `duration`, `usage`, `createdAt`, `updatedAt`, `cueSheetId`, `songId`) VALUES ('2', '17', 'background', '2018-10-27 00:29:08', '2018-10-27 00:29:08', '1', '2');
INSERT INTO `cue_db`.`cues` (`id`, `duration`, `usage`, `createdAt`, `updatedAt`, `cueSheetId`, `songId`) VALUES ('3', '33', 'background', '2018-10-27 00:29:08', '2018-10-27 00:29:08', '1', '3');
INSERT INTO `cue_db`.`cues` (`id`, `duration`, `usage`, `createdAt`, `updatedAt`, `cueSheetId`, `songId`) VALUES ('4', '50', 'background', '2018-10-27 00:29:08', '2018-10-27 00:29:08', '1', '4');
INSERT INTO `cue_db`.`cues` (`id`, `duration`, `usage`, `createdAt`, `updatedAt`, `cueSheetId`, `songId`) VALUES ('5', '40', 'background', '2018-10-27 00:29:08', '2018-10-27 00:29:08', '2', '1');
INSERT INTO `cue_db`.`cues` (`id`, `duration`, `usage`, `createdAt`, `updatedAt`, `cueSheetId`, `songId`) VALUES ('6', '17', 'vocal', '2018-10-27 00:29:08', '2018-10-27 00:29:08', '2', '2');
INSERT INTO `cue_db`.`cues` (`id`, `duration`, `usage`, `createdAt`, `updatedAt`, `cueSheetId`, `songId`) VALUES ('7', '33', 'theme', '2018-10-27 00:29:08', '2018-10-27 00:29:08', '2', '3');
INSERT INTO `cue_db`.`cues` (`id`, `duration`, `usage`, `createdAt`, `updatedAt`, `cueSheetId`, `songId`) VALUES ('8', '50', 'background', '2018-10-27 00:29:08', '2018-10-27 00:29:08', '2', '4');
