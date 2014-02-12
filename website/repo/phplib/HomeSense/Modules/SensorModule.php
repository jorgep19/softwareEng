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
      echo "\n<br /> call constr SensorModule";
      $this->conn = HsApp::getInstance()->getConn();
      $this->action = $action;
   }

   /**
   *  Validates the module action
   *  @return an arry of errors if any
   */
   public function validateAction() {
      $errors = array();

      echo "\n <br /> call SensorModule::validateAction()";
      return $errors;

   } 

   /**
   *  Parse module-specific request
   */
   public function run() {
      $data = array();

      echo "\n <br /> call SensorModule::run()";
      // read/write the db...

      switch ($this->action) {
         case 'put_data':
            $data = $this->doPutData();
            break;
         case 'get_data':
            $data = $this->doGetData();
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

      $val = util::request('val', 0);
      echo "\n <br /> doPutData(): value $val";
      
$query = <<<SQL
INSERT INTO RasPiSensorData (raspsID, raspsdValue, raspsdDateAdded) 
SELECT
	raspsID, ?, NOW()
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
SQL;

      $result = $this->conn->prepare($query)->execute($val);
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
      echo "\n <br /> doGetData() date: $date <br />\n";
      $query = <<<SQL
SELECT
   raspsdID, cusID, raspsID, cusEmail, crpDescription, raspsDescription, raspsdValue, raspsdDateAdded
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

}


