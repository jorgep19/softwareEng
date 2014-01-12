<?php


/**
*  The Data Access Object.
*
*  The goal of this class is to store the common functions used
*  to retrive/store data from the database.
*
*  @TODO: should we have separate Daos?
*
*
*  @package HomeSense
*  
*  @author Andrei Sura
*/

class DbDao {


   /**
   *  @return the version number of the database
   *     stored in the `Version` table
   */   
   public static final function getDbVersion() {
      $version = 1;

      // @TODO: query the db
 
      return $version;
   }

}
