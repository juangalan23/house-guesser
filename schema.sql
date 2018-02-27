DROP DATABASE IF EXISTS housing;

CREATE DATABASE housing;

USE housing;

CREATE TABLE houses (
  id int NOT NULL AUTO_INCREMENT,
  zpid int NOT NULL,
  housevalue int,
  street varchar (200),
  state varchar (20),
  city varchar (200),
  zipcode int,
  bedrooms int,
  bathrooms int,
  year int,
  PRIMARY KEY (ID)
);

CREATE TABLE pictures (
  id int NOT NULL AUTO_INCREMENT,
  zpid int NOT NULL,
  link varchar (200),
  PRIMARY KEY (ID),
  UNIQUE (link)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
