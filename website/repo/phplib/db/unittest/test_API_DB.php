<?php
/**
*  Unit test for the `API_DB` class
*
*  @author Andrei Sura
*/

class UNIT_API_DB {

   public $con = NULL;

   public function __construct() {
      echo "\n<br /> Unit test for API_DB.php";
   }

   public function testConnectSuccess() {
      $urlObj = API_DB::createDbUrl(
         $_SERVER['HS_DB_HOST'],
         $_SERVER['HS_DB_USER'],
         $_SERVER['HS_DB_PASS']);

      $url = $urlObj->getUrl();

      $con = API_DB::connect($url);
      $this->con = $con;
      assert(! is_null($con));
      echo "\n<br /> Succes connecting to the db";
   }

   public function testConnectError() {
      $url = 'mysql://invalid:pass@abovotec.com/abovotec_home';
      $con = NULL;
      try {
         $con = API_DB::connect($url);
      }
      catch (Exception $pdoe) {
         assert(null == $con);
         echo "\n<br /> connection failed as expected when using invalid pass";
      }
   }

   public function run() {
      $this->testConnectSuccess();
      // $this->testConnectError();
      $this->testSelect();
   }

   /**
   * Select using prepared statements
   */
   public function testSelect() {

      $query = <<<SQL
SELECT
	cusID, raspsID, cusEmail, crpDescription, raspsDescription, raspsdValue, raspsdDateAdded
FROM
	Customer
	NATURAL JOIN CustomerRasPi
	NATURAL JOIN RasPiSensor
	NATURAL JOIN SensorType
	NATURAL JOIN RasPiSensorData
WHERE
	cusEmail = 'indera@gmail.com'
	AND crpDescription = 'My first RasPi device';
	AND raspsDescription = 'TempSens1'
   AND raspsdDateAdded LIKE ?
SQL;

      echo "\n<!-- <pre> query: $query</pre> -->";
      $this->con->useDB('abovotec_home');
      $ps = $this->con->prepare($query);
      $result = $ps->execute('2014-01-29%');

      if (! $result) {
         echo "<br /> Query failed: $query";
         return;
      }

      echo <<<HTML
<table border="1">
<caption> Sample data retrieved from the database </caption>
<thead>
<tr>
   <th> RasPi </th>
   <th> Sensor </th>
   <th> Data reacorded </th>
</tr>
</thead>
HTML;

      while ($row = $result->fetch()) {
         echo <<<HTML
<tr>
<td> {$row['crpDescription']} 
<td> {$row['raspsDescription']}
<td> {$row['raspsdValue']}
</tr>
HTML;
      }
      echo <<<HTML
</table>
HTML;
   }
}

$test = new UNIT_API_DB();
$test->run();
