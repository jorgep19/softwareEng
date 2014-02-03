<?php
/**
*  Home Sense application class
*
*  @author Andrei Sura 
*/


class HsApp {

   static $instance;


   public static function getInstance() {
      if (! $instance) {
         self::$instance = new HsApp();
      }
      return self::$instance;
   }

   public function run() {
      echo "\n <br /> run app \n";

      require_once 'phplib/db/unittest/test_API_DB.php';
   }
}
