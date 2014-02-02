<?php
/**
*  Implementation of API_DB for Maria.
*
*  From: http://www.php.net/manual/en/intro.pdo.php
*     "The PHP Data Objects (PDO) extension defines a lightweight,
*      consistent interface for accessing databases in PHP."
*
*  @author Andrei Sura  
*/

// class API_DB_Maria extends API_DB {
class API_DB_Maria implements API_DB {
   // instance of a PDO object
   private $pdo;

   public static function connect($host, $user, $pass) {
      $url = API_DB::createDbUrl($host, $user, $pass);
      return API_DB::connect($url);
   }

   /**
   *  Called from API_DB.php#connect()
   */
   public function __construct($urlString) {

      $url = API_DB::createDbUrl($urlString);

      try {
         $this->pdo = new PDO("maria:".$url->getParams(), $url->getUser(), $url->getPass());
         $this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
         $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      }
      catch (PDOException $pdoe) {
         API_DB_Exception::handle($pdoe);
      }
   }

   public function useDB($dbName) {
      try {
         $this->prepare('USE ?')->execute($dbName);
      }
      catch (Exception $pdoe) {
         API_DB_Exception::handle($pdoe);
      }
   }

   /**
   *  Wrap the PDO prepared statement into a API_DB_Statement_Maria
   *  @see PDO::prepare()
   */
   public function prepare($queryString) {
      try {
         $ps = $this->pdo->prepare($queryString);
         return new API_DB_Statement_Maria($this->pdo, $ps);
      }
      catch (Exception $pdoe) {
         API_DB_Exception::handle($pdoe);
      }
   } 

   /**
   *  Wrap the PDO result into a API_DB_Result_Maria
   *  @see PDO::query()
   */
   public function query(API_DB_Statement $ps) {
      try {
         // Note: $rs is an instance of PDOStatement 
         $rs = $this->pdo->query($ps);
         return new API_DB_Result_Maria($rs);
      }
      catch (Exception $pdoe) {
         API_DB_Exception::handle($pdoe);
      }
   }

   public function lastInsertId() {
      try {
         return $this->pdo->lastInsertId();
      }
      catch (Exception $pdoe) {
         API_DB_Exception::handle($pdoe);
      }
   }

   public function quoteString($str) {
      try {
         return $this->pdo->quote($str);
      }
      catch (Exception $pdoe) {
         API_DB_Exception::handle($pdoe);
      }
   }

   // @TODO: implement
   public function beginTransaction() {
      
   }

   // @TODO: implement
   public function commit() {

   }

   // @TODO: implement
   public function rollBack() {

   }

   public function close() {
      $this->pdo = NULL;
   }

   public function __sleep() {
      return array();
   }
}
