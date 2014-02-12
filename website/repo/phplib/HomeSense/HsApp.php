<?php
/**
*  Home Sense application class
*
*  @author Andrei Sura 
*/


class HsApp {

   // constants used for module names
   const MOD_CUSTOMER   = 'customer';
   const MOD_DEVICE     = 'device';
   const MOD_SENSOR     = 'sensor';


   static $SAFE_MODULES = array(
      self::MOD_CUSTOMER,
      self::MOD_DEVICE,
      self::MOD_SENSOR,
   );

 
   static $instance;

   public static function getInstance() {
      if (! $instance) {
         self::$instance = new HsApp();
      }
      return self::$instance;
   }

   /**
   *  Handles the request authorization
   *
   *  @TODO: decide if we need to use `setup_session.php` 
   */
   public function authorize() {

   }

   /**
   *  Routes the request to a proper module
   *  to execute an action.
   */
   public function route() {
      $parts = explode('/', $_SERVER['REQUEST_URI']);
      array_shift($parts);
      print_r($parts);

      // Valid modules:
      //    customer => register, change_pass, add_device
      //    device   => add_sensor, delete_sensor
      //    sensor   => put_data, get_data, trigger_alarm

      // detect a module
      if (count($parts)) {
         if (! in_array($parts[0], self::$SAFE_MODULES)) {
            die('Error: invalid module.');
         }

         $module = NULL;

         // require the user to provide an action if module is specified
         switch($parts[0]) {
            case self::MOD_CUSTOMER :
               $mod = new CustomerModule();
               break;
            case self::MOD_DEVICE :
               $mod = new DeviceModule();
               break;
         }
         $errors = $module->validateAction();
         if (count($errors)) {
            die('Error: invalid module action.');
         }
      }

   }


   /**
   *  Groups all actions necessary to handle a request
   */
   public function run() {
      // require_once 'phplib/db/unittest/test_API_DB.php';

      $this->authorize();
      $this->route();
   }
}
