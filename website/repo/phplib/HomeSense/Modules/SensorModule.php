<?php
/**
*  Home Sense SensorModule class
*
*  Handles requests related to a Raspberry Pi sensor
*  @author Andrei Sura 
*/

class SensorModule {

   public function __construct() {
      echo "\n<br /> call constr SensorModule";
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
      return $data;
   }

}


