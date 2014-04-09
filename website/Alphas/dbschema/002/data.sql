
INSERT INTO
   Customer(cusFirst, cusLast, cusEmail, cusPassword) 
VALUES
   ('John', 'Doe', 'support@abovotec.com', sha1(aes_encrypt('pass', 'pass')))
;


 select * from Customer\G;
*************************** 1. row ***************************
           cusID: 1
        cusFirst: John
         cusLast: Doe
           cusMI:
        cusEmail: support@abovotec.com
     cusPassword: e1848d6a31730a85d5bde8cf0fefa1be3c61ebfb
      cusRegDate: 0000-00-00 00:00:00
      cusModDate: 2014-02-27 00:25:32
cusLastLoginDate: 0000-00-00 00:00:00


INSERT INTO PhoneCarrier    (pcName, pcEmailToSmsUrl) VALUES
    ('att', 'txt.att.net'),    ('verizon', 'vtext.com'),    ('tmobile', 'tmomail.net');


 select * from PhoneCarrier;
+------+---------+-----------------+
| pcID | pcName  | pcEmailToSmsUrl |
+------+---------+-----------------+
|    1 | att     | txt.att.net     |
|    2 | verizon | vtext.com       |
|    3 | tmobile | tmomail.net     |
+------+---------+-----------------+


== Insert Sensor Types

INSERT INTO SensorType VALUES (1, 'Temperature'), (2, 'Motion'), (3, 'Luminosity');

MariaDB [abovotec_home]> select * from SensorType;
+---------+-------------+
| stypeID | stypeDesc   |
+---------+-------------+
|       3 | Luminosity  |
|       2 | Motion      |
|       1 | Temperature |
+---------+-------------+


== Adding a device to a customer 
INSERT INTO Device (cusID, devDesc, devAddedDate) SELECT cusID, 'Garage_PI', NOW() FROM Customer where cusEmail = 'support@abovotec.com';


select * from Device;
+-------+-------+-----------+---------------------+
| devID | cusID | devDesc   | devAddedDate        |
+-------+-------+-----------+---------------------+
|     1 |     1 | Garage_PI | 2014-02-27 00:55:25 |
+-------+-------+-----------+---------------------+


== Adding a temp sensor to the "garage PI"

INSERT INTO Sensor(cusID, devID, stypeID, sensDesc) SELECT c.cusID, devID, stypeID, 'Garage_Temp' FROM Customer c, Device, SensorType WHERE cusEmail = 'support@abovotec.com' AND devDesc = 'Garage_PI' AND stypeDesc = 'Temperature';


=== View all properties of this sensor 

 select * from Sensor natural join Device natural join SensorType natural join Customer\G;
*************************** 1. row ***************************
           cusID: 1
         stypeID: 1
           devID: 1
          sensID: 1
        sensDesc: Garage_Temp
         devDesc: Garage_PI
    devAddedDate: 2014-02-27 00:55:25
       stypeDesc: Temperature
        cusFirst: John
         cusLast: Doe
           cusMI:
        cusEmail: support@abovotec.com
     cusPassword: e1848d6a31730a85d5bde8cf0fefa1be3c61ebfb
      cusRegDate: 0000-00-00 00:00:00
      cusModDate: 2014-02-27 00:25:32
cusLastLoginDate: 0000-00-00 00:00:00


== Adding data o this sensor
INSERT INTO SensorData (cusID, sensID, sdataValue, sdataRecordedDate) SELECT c.cusID, sensID, 10, now() from Customer c, Device, Sensor where cusEmail = 'support@abovotec.com' and devDesc = 'Garage_Pi' AND sensDesc = 'Garage_Temp';


 select * from SensorData;
+---------+-------+--------+------------+---------------------+
| sdataID | cusID | sensID | sdataValue | sdataRecordedDate   |
+---------+-------+--------+------------+---------------------+
|       1 |     1 |      1 | 10         | 2014-02-27 01:06:48 |
+---------+-------+--------+------------+---------------------+

