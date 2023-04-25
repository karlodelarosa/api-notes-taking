CREATE DATABASE `notes-db`;
USE `notes-db`;

CREATE TABLE user (
    `id` INT NOT NULL auto_increment PRIMARY KEY,
    `name` VARCHAR(32) NOT NULL,
    `surname` VARCHAR(32) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE note (
    `id` INT NOT NULL auto_increment PRIMARY KEY,
    `title` VARCHAR(32) NOT NULL,
    `content` VARCHAR(300) NOT NULL,
    `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE label (
    `id` INT NOT NULL auto_increment PRIMARY KEY,
    `name` VARCHAR(32) NOT NULL
);

CREATE TABLE note_label (
    `noteId` INT NOT NULL,
    `labelId` INT NOT NULL,
    FOREIGN KEY (noteId) REFERENCES note(id),
    FOREIGN KEY (labelId) REFERENCES label(id),
    primary key (noteId, labelId)
);

INSERT INTO user (`name`, `surname`, `password`) VALUES ('admin', 'master', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8');