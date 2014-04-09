
-- CREATE DATABASE HomeSense;

USE abovotec_home;


-- Stores database modification log
CREATE TABLE Version (
   verID varchar(255) NOT NULL DEFAULT '',
   verStamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   verInfo text NOT NULL,
  PRIMARY KEY (verID)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO Version (verID, verInfo)
   VALUES('001', 'Creating initial version of tables')
; 

-- Stores types of customers: business, individual... 
CREATE TABLE CustomerType(
   ctypeID smallint unsigned NOT NULL AUTO_INCREMENT,
   ctypeType varchar(255) NOT NULL,
 PRIMARY KEY (ctypeID),
 UNIQUE KEY (ctypeType)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Stores types of registration modes: through website, mobile app ...
CREATE TABLE CustomerRegistrationMode (
   crmID smallint unsigned NOT NULL AUTO_INCREMENT,
   crmMode varchar(255),
 PRIMARY KEY (crmID),
 UNIQUE KEY(crmMode)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Stores customer details
CREATE TABLE Customer (
   cusID integer unsigned NOT NULL AUTO_INCREMENT,
   ctypeID smallint unsigned NOT NULL,
   cusFirst varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
   cusLast varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
   cusMI char(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
   cusEmail varchar(255) NOT NULL DEFAULT '',
   crmID smallint unsigned NOT NULL,
   cusDateRegistered datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
   cusDateModified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 PRIMARY KEY (cusID),
 UNIQUE KEY (cusEmail),
 KEY (cusFirst, cusLast),
 KEY (cusDateRegistered),
 KEY (cusDateModified),
 KEY (ctypeID),
 KEY (crmID),
 CONSTRAINT `fk_Customer_ctypeID` FOREIGN KEY (ctypeID) REFERENCES CustomerType (ctypeID),
 CONSTRAINT `fk_Customer_crmID` FOREIGN KEY (crmID) REFERENCES CustomerRegistrationMode (crmID)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Stores customer passwords and key for password resets
CREATE TABLE CustomerPassword (
   cuspID integer unsigned NOT NULL AUTO_INCREMENT,
   cusID integer unsigned NOT NULL,
   cuspPassword varchar(255) NOT NULL DEFAULT '',
   cuspDateModified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   cuspResetKey varchar(255),
   cuspDateResetKeyExpires datetime,
 PRIMARY KEY(cuspID),
 KEY (cusID),
 KEY (cuspPassword),
 KEY (cuspDateModified),
 CONSTRAINT `fk_CustomerPassword_cusID` FOREIGN KEY (cusID) REFERENCES Customer (cusID)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Stores mapping between a customer and a Raspberry Pi device
CREATE TABLE CustomerRasPi (
   crpID integer unsigned NOT NULL AUTO_INCREMENT,
   cusID integer unsigned NOT NULL,
   crpDescription varchar(255) NOT NULL DEFAULT 'Raspberry Pi',
   crpDateAdded datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
 PRIMARY KEY (crpID),
 KEY (cusID),
 UNIQUE KEY (crpDescription),
 KEY (crpDateAdded),
 CONSTRAINT `fk_CustomerRasPi_cusID` FOREIGN KEY (cusID) REFERENCES Customer (cusID)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Sensor: stores types of sensors we can attach to
CREATE TABLE SensorType (
   sentID smallint unsigned NOT NULL AUTO_INCREMENT,
   sentDescription varchar(255),
   sentDateAdded datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
 PRIMARY KEY (sentID),
 UNIQUE KEY (sentDescription),
 KEY (sentDateAdded)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Stores the mapping between a CustomerRasPi and sensors
CREATE TABLE RasPiSensor (
   raspsID integer unsigned NOT NULL AUTO_INCREMENT,
   crpID integer unsigned NOT NULL,
   sentID smallint unsigned NOT NULL,
   raspsDescription varchar(255) NOT NULL,
 PRIMARY KEY(raspsID),
 KEY (crpID),
 KEY (sentID),
 UNIQUE KEY(crpID, sentID, raspsDescription),
 CONSTRAINT `fk_RasPiSensor_crpID` FOREIGN KEY (crpID) REFERENCES CustomerRasPi (crpID),
 CONSTRAINT `fk_RasPiSensor_sentID` FOREIGN KEY (sentID) REFERENCES SensorType (sentID)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- stores various values from different sensor types
CREATE TABLE RasPiSensorData (
   raspsdID integer unsigned NOT NULL AUTO_INCREMENT,
   raspsID integer unsigned NOT NULL,
   raspsdValue varchar(255) NOT NULL,
   raspsdDateAdded datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
 PRIMARY KEY(raspsdID),
 KEY (raspsID),
 KEY (raspsdValue),
 KEY (raspsdDateAdded),
 CONSTRAINT `fk_RasPiSensorData_raspsID` FOREIGN KEY (raspsID) REFERENCES RasPiSensor (raspsID)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- stores PhoneCarrier types
CREATE TABLE PhoneCarrier (
   pcID smallint unsigned NOT NULL AUTO_INCREMENT,
   pcName varchar(255) NOT NULL,
   pcEmailToSmsUrl varchar(255),
   pcDateAdded datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
 PRIMARY KEY(pcID),
 UNIQUE KEY(pcName)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- stores customer phone numbers
CREATE TABLE PhoneNumber (
   phnID integer unsigned NOT NULL AUTO_INCREMENT,
   cusID integer unsigned NOT NULL,
   pcID smallint unsigned NOT NULL,
   phnNumber varchar(255) NOT NULL,
 PRIMARY KEY(phnID),
 KEY(cusID),
 KEY(pcID),
 KEY(phnNumber), 
 CONSTRAINT `fk_PhoneNumber_cusID` FOREIGN KEY (cusID) REFERENCES Customer (cusID),
 CONSTRAINT `fk_PhoneNumber_pcID` FOREIGN KEY (pcID) REFERENCES PhoneCarrier (pcID)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


 
