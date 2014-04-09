<?php
/**
*  Home Sense SensorModule class
*
*  Handles requests related to a Raspberry Pi sensor
*  @author Andrei Sura 
*/

class SensorModule {
   public $conn;
   public $action;

   public function __construct($action) {
      //echo "\n<br /> call constr SensorModule";
      $this->conn = HsApp::getInstance()->getConn();
      $this->action = $action;
   }

   /**
   *  Validates the module action
   *  @return an arry of errors if any
   */
   public function validateAction() {
      $errors = array();

// echo "\n <br /> call SensorModule::validateAction()";
      return $errors;

   } 

   /**
   *  Parse module-specific request
   */
   public function run() {
      $data = array();

      //echo "\n <br /> call SensorModule::run()";
      // read/write the db...

      switch ($this->action) {
         case 'put_data':
            $data = $this->doPutData();
            break;
         case 'get_data':
            $data = $this->doGetData();
            break;
         case 'get_sensor_data':
            $data = $this->doGetSensorData();
            break;
 
      }
      return $data;
   }

   /**
   *  Insert one data point for a specific sensor
   *
   *  @see #doGetData()
   */
   public function doPutData() {
      $data = array();

//die('ha');
      
      $value   = util::request('value');
      $date    = util::request('date');
      $email   = util::request('email');
      $device  = util::request('device');
      $sensor = util::request('sensor');

      // $obj = json_decode($json);

      $errors = array();


      if (! $value) {
         $errors[] = 'No `value` specified';
      }

      if (! $date) {
         $errors[] = 'No `date` specified';
      }
 
      if (! $email) {
         $errors[] = 'No `email` specified';
      }
      if (! $device) {
         $errors[] = 'No `device` specified';
      }
     
      // echo "\n <br /> doPutData(): value $val";
      
$query = <<<SQL
INSERT INTO RasPiSensorData (raspsID, raspsdValue, raspsdDateAdded) 
SELECT
	raspsID, ?, ?
FROM
	Customer
	NATURAL JOIN CustomerRasPi
	NATURAL JOIN RasPiSensor
	NATURAL JOIN SensorType
WHERE
	cusEmail = ?
	AND crpDescription = ?
	AND sentDescription = 'Temperature'
	AND raspsDescription = ? 
SQL;

      //echo $query;

      $result = $this->conn->prepare($query)->execute(
         $value, $date,
         $email,  $device, $sensor);

// print_r($result);

      if (! $result) {
         return array('error' => array("failed to insert: $val"));
      }
      
      $data = array('success' => array('raspsID' => $this->conn->lastInsertId()));
      return $data;
   }


   /**
   *  Retrieves an array of sensor data rows for a specific date. 
   */
   public function doGetData() {
      $date = util::request('date', '2014-02-01');
//echo "\n <br /> doGetData() date: $date <br />\n";

//SELECT
//   raspsdID, cusID, raspsID, cusEmail, crpDescription, raspsDescription, raspsdValue, raspsdDateAdded
 
 $query = <<<SQL
SELECT
  raspsdValue, raspsdDateAdded
FROM
	Customer
	NATURAL JOIN CustomerRasPi
	NATURAL JOIN RasPiSensor
	NATURAL JOIN SensorType
	NATURAL JOIN RasPiSensorData
WHERE
	cusEmail = 'indera@gmail.com'
	AND crpDescription = 'My first RasPi device'
	AND raspsDescription = 'TempSens1'
   AND raspsdDateAdded LIKE ?
SQL;

      $ps = $this->conn->prepare($query);

      $result = $ps->execute("$date%");

      $list = array();
      while ($row = $result->fetch()) {
         $id =  $row['raspsdID'];
         $list[$id] = $row;
      }

      return $list;
   }


   /**
   *  @see HsApp::authorizeRequest()
   */
   public function doGetSensorData() {
      $app = HsApp::getInstance();
      $errors = $app->authorizeRequest();

      $email      = util::request('email');
      $device     = util::request('device');
      $sensor     = util::request('sensor'); 
      $date1      = util::request('date1');
      $date2      = util::request('date2');

      if (! $device) {
         $errors[] = 'No device specified';
      }
      if (! $sensor) {
         $errors[] = 'No sensor specified';
      }
 
      if (count($errors)) {
        return $errors; 
      }


      // no dates specified
      $query1 = <<<SQL
SELECT
   raspsdID, cusID, raspsID, cusEmail, crpDescription, raspsDescription, raspsdValue, raspsdDateAdded
FROM
	Customer
	NATURAL JOIN CustomerRasPi
	NATURAL JOIN RasPiSensor
	NATURAL JOIN SensorType
	NATURAL JOIN RasPiSensorData
WHERE
	cusEmail = ?
	AND crpDescription = ?
	AND raspsDescription =  ?
SQL;

      $query2 = <<<SQL
SELECT
   raspsdID, cusID, raspsID, cusEmail, crpDescription, raspsDescription, raspsdValue, raspsdDateAdded
FROM
	Customer
	NATURAL JOIN CustomerRasPi
	NATURAL JOIN RasPiSensor
	NATURAL JOIN SensorType
	NATURAL JOIN RasPiSensorData
WHERE
	cusEmail = ?
	AND crpDescription = ?
	AND raspsDescription =  ?
   AND raspsdDateAdded BETWEEN ? AND ?
SQL;

      if (! $date1 && ! $date2) {
         $query = $query1;        
// echo $query;

         $ps = $this->conn->prepare($query);
         $result = $ps->execute($email, $device, $sensor);
      }
      else if ($date1 && $date2) {
         $query = $query2;
// echo $query;
         $ps = $this->conn->prepare($query);
         $result = $ps->execute($email, $device, $sensor, $date1, $date2);
      }

      $list = array();
      while ($row = $result->fetch()) {
         $id =  $row['raspsdID'];
         $list[$id] = $row;
      }

      return $list;
   }

}


