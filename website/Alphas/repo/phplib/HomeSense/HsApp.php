<?php
/**
*  Home Sense application class
*
*  @author Andrei Sura 
*/

require_once 'HomeSense/Modules/CustomerModule.php';
require_once 'HomeSense/Modules/DeviceModule.php';
require_once 'HomeSense/Modules/SensorModule.php';
// echo 'path:' . get_include_path();

class HsApp {

   // how do we change the salt?
   const PASS_SALT = 123;

   // constants used for module names
   const MOD_CUSTOMER   = 'customer';
   const MOD_DEVICE     = 'device';
   const MOD_SENSOR     = 'sensor';


   static $SAFE_MODULES = array(
      self::MOD_CUSTOMER,
      self::MOD_DEVICE,
      self::MOD_SENSOR,
   );

   private $conn; 
   static $instance;

   public static function getInstance() {
      if (! $instance) {
         self::$instance = new HsApp();
      }
      return self::$instance;
   }

   private function __construct() {
      $this->setupConnection();      
   }

   private function setupConnection() {
      $urlObj = API_DB::createDbUrl(
         $_SERVER['HS_DB_HOST'],
         $_SERVER['HS_DB_USER'],
         $_SERVER['HS_DB_PASS']);

      $url = $urlObj->getUrl();
      $this->conn = API_DB::connect($url);
      $this->conn->useDB('abovotec_home');
   }

   /**
   *  Accessor for database connection attribute
   */ 
   public function getConn() {
      return $this->conn;
   }


   /**
   *  This version of the function expects the parameters `email` + `pass` in the request
   *  @see authorize()
   */
   public function authorizeRequest() {
      $email      = util::request('email');
      $pass       = util::request('pass');

      $errors = array();
      if (! $email) {
         $errors[] = 'No email specified';
      }
      if (! $pass) {
         $errors[] = 'No password specified';
      }

      if (! DbDao::customerExists($email)) {
         $errors[] = 'No such customer email';
      }

      if (! DbDao::isValidAuth($email, $pass)) {
         $errors[] = 'Invalid password specified';
      }

      return $errors;
   }

   /**
   *  Handles the request authorization
   *
   *  @TODO: decide if we need to use `setup_session.php` 
   */
   public function authorize() {
      // echo "\n<br /> run authorize()";
      return true;
   }

   /**
   *  Routes the request to a proper module
   *  to execute an action.
   */
   public function route() {
      $parts = explode('/', $_SERVER['REQUEST_URI']);
      array_shift($parts);
      array_shift($parts);

// print_r($parts);

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

         $action = $parts[1];

         // require the user to provide an action if module is specified
         switch($parts[0]) {
            case self::MOD_CUSTOMER :
               $module = new CustomerModule($action);
               break;
            case self::MOD_DEVICE :
               $module = new DeviceModule($action);
               break;
         case self::MOD_SENSOR:
               $module = new SensorModule($action);
               break;
    
         }
         if (! $module) {
            die('Error: internal error');
         }

         $errors = $module->validateAction();
         if (count($errors)) {
            die('Error: invalid module action.');
         }

         // @TODO: add error checking
         echo json_encode($module->run());
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
