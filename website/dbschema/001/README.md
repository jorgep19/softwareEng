This is the database schema 001
for the following tables:



desc Version;
+----------+--------------+------+-----+-------------------+-----------------------------+
| Field    | Type         | Null | Key | Default           | Extra                       |
+----------+--------------+------+-----+-------------------+-----------------------------+
| verID    | varchar(255) | NO   | PRI |                   |                             |
| verStamp | timestamp    | NO   |     | CURRENT_TIMESTAMP | on update CURRENT_TIMESTAMP |
| verInfo  | text         | NO   |     | NULL              |                             |
+----------+--------------+------+-----+-------------------+-----------------------------+


desc CustomerType;
+-----------+----------------------+------+-----+---------+----------------+
| Field     | Type                 | Null | Key | Default | Extra          |
+-----------+----------------------+------+-----+---------+----------------+
| ctypeID   | smallint(5) unsigned | NO   | PRI | NULL    | auto_increment |
| ctypeType | varchar(255)         | NO   | UNI | NULL    |                |
+-----------+----------------------+------+-----+---------+----------------+


desc CustomerRegistrationMode;
+---------+----------------------+------+-----+---------+----------------+
| Field   | Type                 | Null | Key | Default | Extra          |
+---------+----------------------+------+-----+---------+----------------+
| crmID   | smallint(5) unsigned | NO   | PRI | NULL    | auto_increment |
| crmMode | varchar(255)         | YES  | UNI | NULL    |                |
+---------+----------------------+------+-----+---------+----------------+



desc Customer;
+-------------------+----------------------+------+-----+---------------------+-----------------------------+
| Field             | Type                 | Null | Key | Default             | Extra                       |
+-------------------+----------------------+------+-----+---------------------+-----------------------------+
| cusID             | int(10) unsigned     | NO   | PRI | NULL                | auto_increment              |
| ctypeID           | smallint(5) unsigned | NO   | MUL | NULL                |                             |
| cusFirst          | varchar(255)         | NO   | MUL |                     |                             |
| cusLast           | varchar(255)         | NO   |     |                     |                             |
| cusMI             | char(1)              | NO   |     |                     |                             |
| cusEmail          | varchar(255)         | NO   | MUL |                     |                             |
| crmID             | smallint(5) unsigned | NO   | MUL | NULL                |                             |
| cusDateRegistered | datetime             | NO   | MUL | 0000-00-00 00:00:00 |                             |
| cusDateModified   | timestamp            | NO   | MUL | CURRENT_TIMESTAMP   | on update CURRENT_TIMESTAMP |
+-------------------+----------------------+------+-----+---------------------+-----------------------------+


desc CustomerPassword;
+-------------------------+------------------+------+-----+-------------------+-----------------------------+
| Field                   | Type             | Null | Key | Default           | Extra                       |
+-------------------------+------------------+------+-----+-------------------+-----------------------------+
| cuspID                  | int(10) unsigned | NO   | PRI | NULL              | auto_increment              |
| cusID                   | int(10) unsigned | NO   | MUL | NULL              |                             |
| cuspPassword            | varchar(255)     | NO   | MUL |                   |                             |
| cuspDateModified        | timestamp        | NO   | MUL | CURRENT_TIMESTAMP | on update CURRENT_TIMESTAMP |
| cuspResetKey            | varchar(255)     | NO   |     |                   |                             |
| cuspDateResetKeyExpires | datetime         | YES  |     | NULL              |                             |
+-------------------------+------------------+------+-----+-------------------+-----------------------------+


desc CustomerRasPi;
+----------------+------------------+------+-----+---------------------+----------------+
| Field          | Type             | Null | Key | Default             | Extra          |
+----------------+------------------+------+-----+---------------------+----------------+
| crpID          | int(10) unsigned | NO   | PRI | NULL                | auto_increment |
| cusID          | int(10) unsigned | NO   | MUL | NULL                |                |
| crpDescription | varchar(255)     | NO   | MUL | Raspberry Pi        |                |
| crpDateAdded   | datetime         | NO   | MUL | 0000-00-00 00:00:00 |                |
+----------------+------------------+------+-----+---------------------+----------------+


desc SensorType;
+-----------------+----------------------+------+-----+---------------------+----------------+
| Field           | Type                 | Null | Key | Default             | Extra          |
+-----------------+----------------------+------+-----+---------------------+----------------+
| sentID          | smallint(5) unsigned | NO   | PRI | NULL                | auto_increment |
| sentDescription | varchar(255)         | YES  | MUL | NULL                |                |
| sentDateAdded   | datetime             | NO   | MUL | 0000-00-00 00:00:00 |                |
+-----------------+----------------------+------+-----+---------------------+----------------+


desc RasPiSensor;
+------------------+----------------------+------+-----+---------+----------------+
| Field            | Type                 | Null | Key | Default | Extra          |
+------------------+----------------------+------+-----+---------+----------------+
| raspsID          | int(10) unsigned     | NO   | PRI | NULL    | auto_increment |
| crpID            | int(10) unsigned     | NO   | MUL | NULL    |                |
| sentID           | smallint(5) unsigned | NO   | MUL | NULL    |                |
| raspsDescription | varchar(255)         | NO   |     | NULL    |                |
+------------------+----------------------+------+-----+---------+----------------+


desc RasPiSensorData;
+-----------------+------------------+------+-----+---------------------+----------------+
| Field           | Type             | Null | Key | Default             | Extra          |
+-----------------+------------------+------+-----+---------------------+----------------+
| raspsdID        | int(10) unsigned | NO   | PRI | NULL                | auto_increment |
| raspsID         | int(10) unsigned | NO   | MUL | NULL                |                |
| raspsdValue     | varchar(255)     | NO   | MUL | NULL                |                |
| raspsdDateAdded | datetime         | NO   | MUL | 0000-00-00 00:00:00 |                |
+-----------------+------------------+------+-----+---------------------+----------------+


============= Examples of data inserted 

SELECT * FROM CustomerType;
+---------+-----------+
| ctypeID | ctypeType |
+---------+-----------+
|       2 | Business  |
|       1 | Person    |
+---------+-----------+

SELECT * FROM CustomerRegistrationMode;
+-------+-----------+
| crmID | crmMode   |
+-------+-----------+
|     2 | MobileApp |
|     1 | Online    |
+-------+-----------+

SELECT * FROM SensorType;
+--------+-----------------+---------------------+
| sentID | sentDescription | sentDateAdded       |
+--------+-----------------+---------------------+
|      1 | Temperature     | 2014-01-29 14:07:46 |
|      2 | Motion          | 2014-01-29 14:07:46 |
|      3 | Luminosity      | 2014-01-29 14:07:46 |
+--------+-----------------+---------------------+


-- show all sensor for a user RasPi device
SELECT
	cusID, raspsID, cusEmail, cusDateRegistered, crpDescription, sentDescription, raspsDescription
FROM
	Customer
	NATURAL JOIN CustomerRasPi
	NATURAL JOIN RasPiSensor
	NATURAL JOIN SensorType
WHERE
	cusEmail = 'indera@gmail.com'
	AND crpDescription = 'My first RasPi device';
+-------+---------+------------------+---------------------+-----------------------+-----------------+------------------+
| cusID | raspsID | cusEmail         | cusDateRegistered   | crpDescription        | sentDescription | raspsDescription |
+-------+---------+------------------+---------------------+-----------------------+-----------------+------------------+
|     1 |       1 | indera@gmail.com | 2014-01-29 14:07:46 | My first RasPi device | Temperature     | TempSens1        |
|     1 |       2 | indera@gmail.com | 2014-01-29 14:07:46 | My first RasPi device | Motion          | MotionAlarm      |
+-------+---------+------------------+---------------------+-----------------------+-----------------+------------------+


-- show all data recorded for a sensor for a specific RasPi of a specific customer
SELECT
	cusID, raspsID, cusEmail, crpDescription, raspsDescription, raspsdValue, raspsdDateAdded
FROM
	Customer
	NATURAL JOIN CustomerRasPi
	NATURAL JOIN RasPiSensor
	NATURAL JOIN SensorType
	NATURAL JOIN RasPiSensorData
WHERE
	cusEmail = 'indera@gmail.com'
	AND crpDescription = 'My first RasPi device';
	AND raspsDescription = 'TempSens1'
;

+-------+---------+------------------+-----------------------+------------------+-------------+---------------------+
| cusID | raspsID | cusEmail         | crpDescription        | raspsDescription | raspsdValue | raspsdDateAdded     |
+-------+---------+------------------+-----------------------+------------------+-------------+---------------------+
|     1 |       1 | indera@gmail.com | My first RasPi device | TempSens1        | 41          | 2014-01-29 14:07:46 |
|     1 |       1 | indera@gmail.com | My first RasPi device | TempSens1        | 46          | 2014-01-29 14:07:46 |
|     1 |       1 | indera@gmail.com | My first RasPi device | TempSens1        | 48          | 2014-01-29 14:07:46 |
+-------+---------+------------------+-----------------------+------------------+-------------+---------------------+

