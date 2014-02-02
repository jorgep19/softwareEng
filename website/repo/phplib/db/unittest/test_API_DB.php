<?php
/**
*  Unit test for the `API_DB` class
*
*  @author Andrei Sura
*/

require_once 'API_DB.php';


class UNIT_DB_API {

   public function __construct() {
      echo "\n Unit test: API_DB";
   }

   public function testConnectSuccess() {
      $url = API_DB::createDbUrl(
         $_SERVER['HS_DB_HOST]',
         $_SERVER['HS_DB_USER'],
         $_SERVER['HS_DB_PASS']);

      $con = API_DB::connect($url);
      $this->con = $con;
   }

   public function testConnectError() {
      $url = 'maria://invalid:pass@abovotec.com/abovotec_home';
      $con = API_DB::connect($url);
   }

   public function run() {
      $this->testConnectSuccess();
      $this->testConnectError();
   }

}
 

$test = new TEST_DB_API_Maria();
$test->run();
