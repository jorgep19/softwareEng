<?php
/**
*  Home Sense DeviceModule class
*
*  Handles requests related to a Raspberry Pi device
*
*  @author Andrei Sura 
*/

class DeviceModule {

   public function __construct() {
      echo "\n <br />call constr DeviceModule";
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

}


