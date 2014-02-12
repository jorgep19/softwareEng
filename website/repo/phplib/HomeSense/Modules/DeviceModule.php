<?php
/**
*  Home Sense DeviceModule class
*
*  Handles requests related to a Raspberry Pi device
*
*  @author Andrei Sura 
*/

class DeviceModule {
   private $conn;
   private $action;


   public function __construct() {
      echo "\n <br />call constr DeviceModule";
      $this->conn = HsApp::getInstance()->getConn();
      $this->action = $action;
   }

   public function validateAction() {
      $errors = array();

      echo "\n <br /> DeviceModule::validateAction()";
      return $errors;
   } 

   /**
   *  Parse module-specific request
   */
   public function run() {
      $data = array();

      echo "\n <br /> call DeviceModule::run()";
      // read/write the db...
      return $data;
   }

   /**
   *  Associate a Raspberry Pi Device with a specific sensor type.
   */
   public function doAddSensor($cusEmail, $deviceDescr, $sensorType, $sensorDescr) {
      $data = array();

      $query = <<<SQL
INSERT INTO RasPiSensor (crpID, sentID, raspsDescription)
SELECT
	crpID, sentID, ?
FROM
	Customer, CustomerRasPi, SensorType
WHERE
	cusEmail = ?
	AND crpDescription = ?
	AND sentDescription = ?
SQL;

      return $data;
   }

}
