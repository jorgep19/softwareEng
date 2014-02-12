<?php

class util {

  static function clean($input) {
      return is_array($input) ? self::clean_deep($input) : trim(stripslashes(($input)));
   }

   static function clean_deep($input) {
      foreach ($input as &$_) {
         $_ = self::clean($_);
      }
      return $input;
   }


   static function request($key, $default = null) {
      return isset($_REQUEST[$key]) ? self::clean($_REQUEST[$key]) : $default;
   }

   /**
    * same as #request, but for POST only
    */
   static function post($key, $default = null) {
      return isset($_POST[$key]) ? self::clean($_POST[$key]) : $default;
   }

   static function formatMoney($money) {
      return '$' . number_format($money, 2);
   }

   static function ifsetor(&$x, $default = null) {
       return isset($x) ? $x : $default;
   }


}
