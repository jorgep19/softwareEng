<?php
/**
*  Home Sense CustomerModule class
*
*  Handles requests related to a customer
*  @author Andrei Sura 
*/

class CustomerModule {

   public function __construct() {
      echo "\n<br /> call constr CustomerModule";
   }

   public function validateAction() {
      $errors = array();

      echo "\n <br /> call CustomerModule::validateAction()";
      return $errors;
   } 


   /**
   *  Parse module-specific request
   */
   public function run() {
      $data = array();

      echo "\n <br /> call CustomerModule::run()";
      // read/write the db...
      return $data;
   }



}


