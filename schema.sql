DROP DATABASE IF EXISTS housing;

CREATE DATABASE housing;

USE housing;

CREATE TABLE houses (
  id int NOT NULL AUTO_INCREMENT,
  zpid int NOT NULL,
  quantity integer NOT NULL,
  description varchar(50) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE pictures (
  id int NOT NULL AUTO_INCREMENT,
  url varchar (200),
  zpid int NOT NULL,
  PRIMARY KEY (ID)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
