DROP DATABASE postoffice;

CREATE DATABASE IF NOT EXISTS postoffice;
USE postoffice;

CREATE TABLE IF NOT EXISTS region (
	regionID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	regionName VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS postOffice (
	officeNo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	capacity INT NOT NULL,
	regionID INT NOT NULL, -- foreign key
	FOREIGN KEY (regionID) REFERENCES Region(regionID)
);

CREATE TABLE IF NOT EXISTS postOfficeStaff (
	staffNo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   	staffName VARCHAR(50) NOT NULL,
	staffPhoneNo CHAR(10),
	dateHired DATE NOT NULL,
	salary BIGINT NOT NULL,
	officeNo INT NOT NULL, -- foreign key
	FOREIGN KEY (officeNo) REFERENCES PostOffice(officeNo)
);

CREATE TABLE IF NOT EXISTS payment (
	transactionNo INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- foreign key
	total DECIMAL(10, 2), 
	payDate DATE,
    staffNo INT,
    FOREIGN KEY (staffNo) REFERENCES PostOfficeStaff(staffNo)
);

CREATE TABLE IF NOT EXISTS truck (
	plateNo CHAR(7) NOT NULL PRIMARY KEY,
	maxWeight INT NOT NULL,
	maxSize INT NOT NULL,
	yearPurchased INT NOT NULL,
	regionID INT NOT NULL, -- foreign key
	FOREIGN KEY (regionID) REFERENCES Region(regionID)
);

CREATE TABLE IF NOT EXISTS location (
	postCode CHAR(6) NOT NULL PRIMARY KEY,
 	address VARCHAR(50) NOT NULL,
	officeNo INT NOT NULL, -- foreign key
	FOREIGN KEY (officeNo) REFERENCES PostOffice(OfficeNo)
);

CREATE TABLE IF NOT EXISTS customer (
	email VARCHAR(50) NOT NULL PRIMARY KEY,
	custName VARCHAR(50) NOT NULL,
	postCode CHAR(6) NOT NULL, -- foreign key
	custPhoneNo CHAR(10),
	cardNo CHAR(16),
	FOREIGN KEY (postCode) REFERENCES Location(postCode)
);

CREATE TABLE IF NOT EXISTS package (
	packageID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	weight INT NOT NULL,
	size INT NOT NULL,
    price DECIMAL(5, 2),
	destination CHAR(6) NOT NULL,
	orderDate DATE NOT NULL,
	deliveryDate DATE, 
	senderEmail VARCHAR(50) NOT NULL, -- foreign key
	transactionNo INT,  -- foreign key
	plateNo CHAR(7),  -- foreign key
	FOREIGN KEY (senderEmail) REFERENCES Customer(email),
	FOREIGN KEY (transactionNo) REFERENCES Payment(transactionNo),
	FOREIGN KEY (plateNo) REFERENCES Truck(plateNo)
);

CREATE TABLE IF NOT EXISTS driver (
	staffNo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	staffName VARCHAR(50) NOT NULL,
	staffPhoneNo CHAR(10),
	dateHired DATE NOT NULL,
	licenseNo CHAR(15) NOT NULL,
	weeklyHours INT NOT NULL,
	plateNo CHAR(7), -- foreign key
	FOREIGN KEY (plateNo) REFERENCES Truck(plateNo)
);

CREATE TABLE IF NOT EXISTS visit (
	officeNo INT NOT NULL,
	plateNo CHAR(7) NOT NULL,
	visitDate DATE NOT NULL,
	PRIMARY KEY(officeNo, plateNo),
	FOREIGN KEY (officeNo) REFERENCES PostOffice(officeNo),
	FOREIGN KEY (plateNo) REFERENCES Truck(plateNo)
);

