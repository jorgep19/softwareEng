<?php
/**
*  Implements the declared function in API_DB_Statement.php
*
*  @author Andrei Sura
*/
public class API_DB_Statement_Maria implements API_DB_Statement {
   private $pdo;
   private $ps;
  
   public function __construct(PDO $pdo, PDOStatement $ps) {
      $this->pdo = $pdo;
      $this->ps = $ps;
   }


   public function execute($params = NULL) {
      try {
         if (is_null($params)) {
            $this->ps->execute();
         }
         else if (is_array($params)) {
            $this->ps->execute($params);
         }
         else {
            throw new API_DB_Exception('Invalid params for excute()');      
         }
      }
      catch(Exception $pdoe) {
         API_DB_Exception::handle($pdoe);
      }      
   }
/*
   public function executeWithParams($params) {
      return $this->execute($params);
   }
*/
   public function __sleep() {
      return array();
   }
}
