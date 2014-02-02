<?php
/**
*  Main include file used to start a session.
*
*  @author Andrei Sura 
*/

$new = get_include_path().':./phplib/';
set_include_path($new);

require_once 'phplib/HomeSense/setup_session.php';
require_once 'phplib/HomeSense/DbDao.php';

