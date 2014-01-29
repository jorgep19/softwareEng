
-- Adding customer types
INSERT INTO CustomerType (ctypeID, ctypeType)
	VALUES(1, 'Person'), (2, 'Business');


-- Adding modes of registration
INSERT INTO CustomerRegistrationMode (crmID, crmMode)
	VALUES (1, 'Online'), (2, 'MobileApp');


-- Adding sensor types
INSERT INTO SensorType (sentID, sentDescription, sentDateAdded)
	VALUES (1, 'Temperature', NOW()), (2, 'Motion', NOW()), (3, 'Luminosity', NOW());


-- Adding Customers
INSERT INTO Customer (ctypeID, cusFirst, cusLast, cusMI, cusEmail, crmID, cusDateRegistered)
SELECT
	ctypeID, 'Tester', 'One', '', 'indera@gmail.com', crmID, NOW()
FROM
	CustomerType, CustomerRegistrationMode WHERE ctypeType = 'Person' AND crmMode = 'Online';

INSERT INTO Customer (ctypeID, cusFirst, cusLast, cusMI, cusEmail, crmID, cusDateRegistered) 
SELECT
	ctypeID, 'Tester', 'Two', 'A', 'mobilecus@test.com', crmID, NOW()
FROM
	CustomerType, CustomerRegistrationMode WHERE ctypeType = 'Person' AND crmMode = 'MobileApp';

INSERT INTO Customer (ctypeID, cusFirst, cusLast, cusMI, cusEmail, crmID, cusDateRegistered)
SELECT
	ctypeID, 'Corporate', 'Bob', 'B', 'invalid@test.com', crmID, NOW()
FROM
	CustomerType, CustomerRegistrationMode WHERE ctypeType = 'Business' AND crmMode = 'Online';
 
--  @TODO Adding Passwords


-- Associating a customer with a RasPi device

INSERT INTO CustomerRasPi (cusID, crpDescription, crpDateAdded)
SELECT
	cusID, 'My first RasPi device', NOW() FROM Customer WHERE cusEmail = 'indera@gmail.com';

INSERT INTO CustomerRasPi (cusID, crpDescription, crpDateAdded)
SELECT
	cusID, 'Tester Two RasPi device', NOW() FROM Customer WHERE cusEmail = 'mobilecus@test.com';

-- Adding a specific senor type to a specific RasPi device
INSERT INTO RasPiSensor (crpID, sentID, raspsDescription)
SELECT
	crpID, sentID, 'TempSens1'
FROM
	Customer, CustomerRasPi, SensorType
WHERE
	cusEmail = 'indera@gmail.com'
	AND crpDescription = 'My first RasPi device'
	AND sentDescription = 'Temperature';

INSERT INTO RasPiSensor (crpID, sentID, raspsDescription)
SELECT
	crpID, sentID, 'MotionAlarm'
FROM
	Customer, CustomerRasPi, SensorType
WHERE
	cusEmail = 'indera@gmail.com'
	AND crpDescription = 'My first RasPi device'
	AND sentDescription = 'Motion';


-- Add sensor data specifica to a RasPi device 
INSERT INTO RasPiSensorData (raspsID, raspsdValue, raspsdDateAdded) 
SELECT
	raspsID, 41, NOW()
FROM
	Customer
	NATURAL JOIN CustomerRasPi
	NATURAL JOIN RasPiSensor
	NATURAL JOIN SensorType
WHERE
	cusEmail = 'indera@gmail.com'
	AND crpDescription = 'My First RasPi device'
	AND sentDescription = 'Temperature'
	AND raspsDescription = 'TempSens1' 
;

INSERT INTO RasPiSensorData (raspsID, raspsdValue, raspsdDateAdded) 
SELECT
	raspsID, 46, NOW()
FROM
	Customer
	NATURAL JOIN CustomerRasPi
	NATURAL JOIN RasPiSensor
	NATURAL JOIN SensorType
WHERE
	cusEmail = 'indera@gmail.com'
	AND crpDescription = 'My First RasPi device'
	AND sentDescription = 'Temperature'
	AND raspsDescription = 'TempSens1' 
;

INSERT INTO RasPiSensorData (raspsID, raspsdValue, raspsdDateAdded) 
SELECT
	raspsID, 48, NOW()
FROM
	Customer
	NATURAL JOIN CustomerRasPi
	NATURAL JOIN RasPiSensor
	NATURAL JOIN SensorType
WHERE
	cusEmail = 'indera@gmail.com'
	AND crpDescription = 'My First RasPi device'
	AND sentDescription = 'Temperature'
	AND raspsDescription = 'TempSens1' 
;
