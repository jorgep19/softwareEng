
The list of PostgreSQL tables used:
======

<pre>
homesense=> \dt                                                                                                                                                     List of relations
 Schema |       Name        | Type  |   Owner
--------+-------------------+-------+-----------
 public | customer          | table | homesense
 public | customer_picture  | table | homesense
 public | device            | table | homesense
 public | phone_carrier     | table | homesense
 public | phone_number      | table | homesense
 public | phone_number_type | table | homesense
 public | sensor            | table | homesense
 public | sensor_data       | table | homesense
 public | sensor_type       | table | homesense
(9 rows)




== Example of data:

 select * from Sensor_Type;
 stypeid |  stypedesc
---------+-------------
       1 | Temperature
       2 | Motion
       3 | Luminosity
       4 | Humidity
(4 rows)


select * from Customer;
 cusid | cusfirst | cuslast | cusmi |     cusemail     | cuspassword |         cusregdate
-------+----------+---------+-------+------------------+-------------+----------------------------
     1 | Andrei   | Sura    |       | indera@gmail.com | 12345       | 2014-04-13 01:14:36.199894


 select * from Device;
 devid | cusid | devactivated |  devdesc  |        devaddeddate
-------+-------+--------------+-----------+----------------------------
     1 |     1 | f            | Window_PI | 2014-04-13 01:15:15.941942

select * from Sensor;
 sensid | cusid | devid | stypeid |    sensdesc
--------+-------+-------+---------+----------------
      1 |     1 |     1 |       1 | Window_PI_Temp


 select * from Sensor_Data;
 sdataid | cusid | sensid | sdatavalue |     sdatarecordeddate
---------+-------+--------+------------+----------------------------
       1 |     1 |      1 | 20         | 2014-04-13 01:29:30.428522
       2 |     1 |      1 | 25         | 2014-04-13 01:32:36.276651
       3 |     1 |      1 | 30         | 2014-04-13 01:32:50.408777

</pre>
