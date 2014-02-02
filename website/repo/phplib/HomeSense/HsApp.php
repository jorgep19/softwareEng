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
      echo "\n run run";
   }
}
