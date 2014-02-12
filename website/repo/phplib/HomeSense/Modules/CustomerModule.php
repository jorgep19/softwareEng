<?php
/**
*  Home Sense CustomerModule class
*
*  Handles requests related to a customer
*  @author Andrei Sura 
*/

// require_once 'HomeSense/HsApp.php';

class CustomerModule {
   private $conn;
   private $action;

   public function __construct($action) {
      echo "\n<br /> call constr CustomerModule";
      $this->conn = HsApp::getInstance()->getConn();
      $this->action = $action;
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

      $data = $this->doRegister();
      
      return $data;
   }

   /**
   *  @return true if the Customer table already has
   *     a row matching the specified email 
   */
   public function isRegisteredCustomer($cusEmail) {
      echo "\n <br /> call isRegisteredCustomer()";
      $query = <<<SQL
SELECT
   TRUE 
FROM
   Customer
WHERE
   cusEmail = ?
SQL;

      $result = $this->conn->prepare($query)->execute($cusEmail);
      if (! $result) {
         return array('errors' => array('db error'));
      }
      
      return $result->rowCount() > 0;
   }


   /**
   *  return the cusID of the newly created customer
   */
   public function doRegister() {
      $data = array();
      $cusEmail = util::request('cusEmail');
      $cusFirst = util::request('cusFirst');
      $cusLast = util::request('cusLast');
      $cusMI = '';

      if ('' == trim($cusEmail)) {
         return array('errors' => array('invalid email'));
      }

      $cusExists = $this->isRegisteredCustomer($cusEmail);
      // echo "\n<br /> cusExists: $$cusEmail";
      
      if ($cusExists) {
         return array('errors' => array("A customer already exists: $cusEmail"));
      }

      $query = <<<SQL
INSERT INTO Customer (ctypeID, cusFirst, cusLast, cusMI, cusEmail, crmID, cusDateRegistered)
SELECT
   ctypeID
   , ?
   , ? 
   , ? 
   , ?
   , crmID, NOW()
FROM
   CustomerType, CustomerRegistrationMode
WHERE
   ctypeType = 'Person'
   AND crmMode = 'Online'
SQL;

      // echo "<pre> query: $query</pre>";
      echo "\n<!-- <pre> query: $query</pre> -->";
      $ps = $this->conn->prepare($query);

      $result = $ps->execute($cusFirst, $cusLast, $cusMI, $cusEmail);
      $data = array('success' => array('cusID' => $this->conn->lastInsertId()));
      return $data;
   }

}


