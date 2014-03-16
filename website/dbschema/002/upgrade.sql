
USE abovotec_home;

-- Stores customer details
CREATE TABLE Customer (
   cusID integer unsigned NOT NULL AUTO_INCREMENT,
   cusFirst varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
   cusLast varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
   cusMI char(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
   cusEmail varchar(255) NOT NULL DEFAULT '',
   cusPassword varchar(255) NOT NULL DEFAULT '',
   cusRegDate datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
   cusModDate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   cusLastLoginDate datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
 PRIMARY KEY (cusID),
 UNIQUE KEY (cusEmail),
 KEY (cusFirst, cusLast),
 KEY (cusRegDate),
 KEY (cusModDate),
 KEY (cusLastLoginDate)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Stores profile picture just for fun
CREATE TABLE CustomerPicture (
   cuspicID integer unsigned NOT NULL AUTO_INCREMENT,
   cusID integer unsigned NOT NULL,
   cuspicPicture blob,
 PRIMARY KEY(cuspicID)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- stores PhoneCarrier types
CREATE TABLE PhoneCarrier (
   pcID smallint unsigned NOT NULL AUTO_INCREMENT,
   pcName varchar(255) NOT NULL,
   pcEmailToSmsUrl varchar(255),
 PRIMARY KEY(pcID),
 UNIQUE KEY(pcName)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- stores types of phone numbers
CREATE TABLE PhoneNumberType (
   phtID smallint unsigned NOT NULL AUTO_INCREMENT,
   phtDesc varchar(255),
 PRIMARY KEY(phtID),
 UNIQUE KEY(phtDesc)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- stores customer phone numbers
CREATE TABLE PhoneNumber (
   phID integer unsigned NOT NULL AUTO_INCREMENT,
   cusID integer unsigned NOT NULL,
   pcID smallint unsigned NOT NULL,
   phtID smallint unsigned NOT NULL, 
   phNumber varchar(255) NOT NULL,
 PRIMARY KEY(phID),
 KEY(cusID),
 KEY(pcID),
 KEY(phNumber), 
 CONSTRAINT `fk_PhoneNumber_cusID` FOREIGN KEY (cusID) REFERENCES Customer (cusID),
 CONSTRAINT `fk_PhoneNumber_pcID` FOREIGN KEY (pcID) REFERENCES PhoneCarrier (pcID)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Stores mapping between a customer and a Raspberry Pi device
CREATE TABLE Device (
   devID integer unsigned NOT NULL AUTO_INCREMENT,
   cusID integer unsigned NOT NULL,
   devDesc varchar(255) NOT NULL,
   devAddedDate datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
 PRIMARY KEY (devID),
 KEY (cusID),
 UNIQUE KEY (cusID, devDesc),
 KEY (devAddedDate),
 CONSTRAINT `fk_Device_cusID` FOREIGN KEY (cusID) REFERENCES Customer (cusID)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



-- Sensor: stores types of sensors we can attach to
CREATE TABLE SensorType (
   stypeID smallint unsigned NOT NULL AUTO_INCREMENT,
   stypeDesc varchar(255),
 PRIMARY KEY (stypeID),
 UNIQUE KEY (stypeDesc)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Stores the mapping between a CustomerRasPi  device and sensors
CREATE TABLE Sensor (
   sensID integer unsigned NOT NULL AUTO_INCREMENT,
   cusID integer unsigned NOT NULL,
   devID integer unsigned NOT NULL,
   stypeID smallint unsigned NOT NULL,
   sensDesc varchar(255) NOT NULL,
 PRIMARY KEY(sensID),
 KEY (cusID),
 KEY (devID),
 KEY (stypeID),
 UNIQUE KEY(devID, stypeID, sensDesc),
 CONSTRAINT `fk_Sensor_cusID` FOREIGN KEY (cusID) REFERENCES Customer (cusID),
 CONSTRAINT `fk_Sensor_devID` FOREIGN KEY (devID) REFERENCES Device (devID),
 CONSTRAINT `fk_Sensor_stypeID` FOREIGN KEY (stypeID) REFERENCES SensorType (stypeID)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- stores various values from different sensor types
CREATE TABLE SensorData (
   sdataID integer unsigned NOT NULL AUTO_INCREMENT,
   cusID integer unsigned NOT NULL,
   sensID integer unsigned NOT NULL,
   sdataValue varchar(255) NOT NULL,
   sdataRecordedDate datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
 PRIMARY KEY(sdataID),
 KEY (cusID),
 KEY (sensID),
 KEY (sdataRecordedDate),
 CONSTRAINT `fk_SensorData_cusID` FOREIGN KEY (cusID) REFERENCES Customer (cusID),
 CONSTRAINT `fk_SensorData_sensID` FOREIGN KEY (sensID) REFERENCES Sensor (sensID)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


