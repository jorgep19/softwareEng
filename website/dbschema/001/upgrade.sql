
CREATE DATABASE HomeSense;

USE HomeSense;


-- Stores database modification log
CREATE TABLE Version (
   verID varchar(255) NOT NULL DEFAULT '',
   verStamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   verInfo text NOT NULL,
  PRIMARY KEY (verID)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Stores types of customers: business, individual... 
CREATE TABLE CustomerType(
   custID integer unsigned NOT NULL AUTO_INCREMENT,
   custType varchar(255) NOT NULL,
 PRIMARY KEY (custID),
 UNIQUE KEY (custType)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Stores types of registration modes: through website, mobile app ...
CREATE TABLE CustomerRegistrationMode (
   crmID integer unsigned NOT NULL AUTO_INCREMENT,
   crmMode varchar(255),
 PRIMARY KEY (crmID),
 UNIQUE KEY(crmMode)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Stores customer details
CREATE TABLE Customer (
   cusID integer unsigned NOT NULL AUTO_INCREMENT,
   custID smallint unsigned NOT NULL,
   cusFirst varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
   cusLast varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
   cusMI char(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
   cusEmail varchar(255) NOT NULL DEFAULT '',
   crmID smallint unsigned NOT NULL,
   cusDateRegistered datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
   cusDateModified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 PRIMARY KEY (cusID),
 KEY (cusEmail),
 KEY (cusFirst, cusLast),
 KEY (cusDateRegistered),
 KEY (cusDateModified),
 KEY (custID),
 KEY (crmID)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Stores customer passwords and key for password resets
CREATE TABLE CustomerPassword (
   cuspID integer unsigned NOT NULL AUTO_INCREMENT,
   cuspPassword varchar(255) NOT NULL DEFAULT '',
   cuspDateModified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   cuspResetKey varchar(255) NOT NULL DEFAULT '',
   cuspDateResetKeyExpires datetime,
 PRIMARY KEY(cuspID),
 KEY (cuspPassword),
 KEY (cuspDateModified),
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Stores mapping between a customer and a Raspberry Pi device
CREATE TABLE CustomerRasPi (
   crpID integer unsigned NOT NULL AUTO_INCREMENT,
   cusID integer unsigned NOT NULL,
   crpDescription varchar(255) NOT NULL DEFAULT 'Raspberry Pi',
   crpDateAdded NOT NULL DEFAULT '0000-00-00 00:00:00',
 PRIMARY KEY (crpID),
 KEY (cusID),
 KEY (crpDescription),
 KEY (crpDateAdded),
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Sensor: stores types of sensors we can attach to
CREATE TABLE SensorType (
   sentID integer unsigned NOT NULL AUTO_INCREMENT,
   sentDescription varchar(255),
   sentDateAdded datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
 PRIMARY KEY (sentID),
 KEY (sentDescription),
 KEY (sentDateAdded),
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Stores the mapping between a CustomerRasPi and sensors
CREATE TABLE RasPiSensor (
   rpsID integer unsigned NOT NULL AUTO_INCREMENT,
   cusID integer unsigned NOT NULL,
   crpID integer unsigned NOT NULL,
   sentID smallint unsigned NOT NULL,
 PRIMARY KEY(rpsID)
 KEY (cusID),
 KEY (crpID),
 KEY (sentID)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



CREATE TABLE RasPiSensorData (
   rpsdID integer unsigned NOT NULL AUTO_INCREMENT,
   rpsdValue varchar(255) NOT NULL,
   rpsdDateAdded datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
 PRIMARY KEY(rpsdID),
 KEY (rpsdValue),
 KEY (rpsdDateAdded)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


