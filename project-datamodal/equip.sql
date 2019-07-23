create database `me`;
use `me`;

CREATE TABLE `me`.`equip` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `money` INT NOT NULL,
  `picUrl` VARCHAR(45),
  `desc` TEXT,
  PRIMARY KEY (`id`)
)
DEFAULT CHARACTER SET = utf8mb4;