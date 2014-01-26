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
+---------+----------------------+------+-----+---------+----------------+
| Field   | Type                 | Null | Key | Default | Extra          |
+---------+----------------------+------+-----+---------+----------------+
| raspsID | int(10) unsigned     | NO   | PRI | NULL    | auto_increment |
| crpID   | int(10) unsigned     | NO   | MUL | NULL    |                |
| sentID  | smallint(5) unsigned | NO   | MUL | NULL    |                |
+---------+----------------------+------+-----+---------+----------------+


desc RasPiSensorData;
+-----------------+------------------+------+-----+---------------------+----------------+
| Field           | Type             | Null | Key | Default             | Extra          |
+-----------------+------------------+------+-----+---------------------+----------------+
| raspsdID        | int(10) unsigned | NO   | PRI | NULL                | auto_increment |
| raspsID         | int(10) unsigned | NO   | MUL | NULL                |                |
| raspsdValue     | varchar(255)     | NO   | MUL | NULL                |                |
| raspsdDateAdded | datetime         | NO   | MUL | 0000-00-00 00:00:00 |                |
+-----------------+------------------+------+-----+---------------------+----------------+


