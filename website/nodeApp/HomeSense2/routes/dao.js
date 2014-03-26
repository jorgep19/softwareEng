
// include common modules
var com     = require('../../../nodejs/api/common')
var util    = require('../../../nodejs/api/common').util
var mysql   = require('mysql')
 
var dao = {


   /**
   * @return a database connection
   */
   getConn: function() {

      var db = mysql.createConnection({
         host:       'localhost',
         port: 3306,
         user:       com.props.dev.db_user,
         password:   com.props.dev.db_pass,
         database:   com.props.dev.db_name,
         // setting socketPath is necessary if mysql is configured
         // to not listen on any port - /etc/mysql/my.cnf ==> skip-networking
         socketPath: '/run/mysqld/mysqld.sock',
      })


      console.log(' create conn for user: ' + com.props.dev.db_user) 

      db.connect(function(err) {
         if (err) {
            console.log(err)
         }
         else {
            console.log('connection success...')
         }
      })

      return db
   },


   /**
   *  Checks if a row exists in the db for the specified customer
   */
   cusExists: function(res, cus, cbFunction) {
      var db = this.getConn()
      var isFound = false;

      db.query('SELECT cusID FROM Customer WHERE cusEmail = ?', cus.cusEmail, function (err, result) {
         if (err) { throw err }
         if (result.length > 0) {
            isFound = true
         }
         cbFunction(res, isFound, cus)
      })
   },

   /**
   *  Inserts a new row into `Customer` table
   *  Note: password is stored as a hash of an aes encrypted string
   */
   insertCustomer: function (res, cus, cbFunction) {
      console.log('insertCustomer')
      var db = this.getConn()
      var query = 'INSERT INTO Customer (cusFirst, cusLast, cusMI, cusEmail, cusPassword, cusRegDate) ' +
         ' VALUES (?, ?, ?, ?, sha1(aes_encrypt(?, ?)), NOW() )'
      var data = [cus.cusFirst, cus.cusLast, cus.cusMI, cus.cusEmail, cus.cusPass, com.props.dev.crypto]

      db.query(query, data, function (err, result) {
         if (err) { throw err }
         cbFunction(result.insertId)
      })
   },

   /**
   *  Check if password matches for a cusEmail
   *  @return boolean
   */
   checkPassword: function (res, cus, cbFunction) {
      console.log('checkPassword')
      var db = this.getConn()
      var query = 'SELECT sha1(aes_encrypt(?, ?)) = cusPassword AS passMatches FROM Customer WHERE cusEmail = ? ' 
      console.log('query: ' + query + ' pass, crypto, email: ' + cus.cusEmail)
      var data = [cus.cusPass, com.props.dev.crypto, cus.cusEmail]
      db.query(query, data, function (err, result) {
         if (err) { throw err }
         cbFunction(result[0].passMatches)
      })
   },

   /**
   *  Inserts a row to the `Device` table with devActivated = 0
   */
   insertDevice: function (res, cus, cbFunction) {
      console.log('dao::insertDevice')
      var db = this.getConn()
      var today = new Date();

      var query = 'INSERT INTO Device (cusID, devActivated, devDesc, devAddedDate) ' +
         ' SELECT cusID, 0, UPPER( left(md5(?), 6)), NOW() FROM Customer WHERE cusEmail = ?' 
      console.log('query: ' + query + ' email: ' + cus.cusEmail)
      var data = [today, cus.cusEmail]
      db.query(query, data, function (err, result) {
         if (err) { throw err }
         console.log('inserted devID: ' + result.insertId)
         cbFunction(result.insertId)
      })
   },

   /**
   * Verifies a device id and sets `Device.devActivated` to true 
   */
   activateDevice: function (res, devID, cbFunction) {
      console.log('dao::acivateDevice')
      var db = this.getConn()
      var today = new Date();

      var query = 'UPDATE Device SET devActivated = 1 WHERE devID = ? '
      console.log('query: ' + query + ' devID ' + devID)
      var data = [devID]
      db.query(query, data, function (err, result) {
         if (err) { throw err }
         console.log('updated rows: ' + result.affectedRows)
         cbFunction(result.affectedRows)
      })
   },

   /**
   *  Maps a sensor to a specific PI device
   *  by inserting a row into `Sensor` table
   */
   insertSensor: function (res, sens, cbFunction) {
      console.log('dao::insertSensor')
      var db = this.getConn()

      var query =
'INSERT INTO ' +
'  Sensor (cusID, devID, stypeID, sensDesc) ' +
'SELECT ' + 
'  cusID, ?, stypeID, ? ' + 
'FROM ' + 
'  Customer, SensorType ' +
'WHERE ' + 
'  cusEmail = ? AND stypeDesc = ?'
      var data = [sens.devID, sens.sensDesc, sens.cusEmail, sens.stypeDesc]
      db.query(query, data, function( err, result) {
         if (err) { throw err }
         console.log('inserted sensor: ' + result.insertId)
         cbFunction(result.insertId)
      })
   },


   /**
   *  Inserts a row to `SensorData` table
   */
   insertSensorData: function( res, ele, cbFunction) {
      console.log('dao::insertSensorData')
      var db = this.getConn()
      var query = 
'INSERT INTO ' +
'  SensorData (cusID, sensID, sdataValue, sdataRecordedDate) ' +
'SELECT ' +
'  cusID, ?, ?, ? ' +
' FROM ' +
'  Sensor ' +
'  NATURAL JOIN Device ' +
'WHERE ' +
'   sensID = ?'
     var data = [ele.sensID, ele.sdataValue, ele.sdataRecordedDate, ele.sensID]
      db.query(query, data, function( err, result) {
         if (err) { throw err }
         console.log('inserted sensor data: ' + result.insertId)
         cbFunction(result.insertId)
      })
   },

   /**
   *  When we verify a device by providing a `code` (devID)
   *  we return back user information.
   *
   *  @see modules/pi#verify()
   */
   getDeviceUser: function(res, devID, cbFunction) {
      console.log('dao::getDeviceUser')
      var db = this.getConn()
      var query = 
'SELECT ' +
'  cusID, cusEmail ' + 
'FROM ' + 
'  Customer ' + 
'  NATURAL JOIN Device ' + 
'WHERE ' +
'  devID = ?'
      var data = [devID]
      db.query(query, data, function( err, result) {
         if (err) { throw err }
         console.log('selected cusdata during verify: ' + result[0].cusEmail)
         cbFunction(result)
      })
   }


}

module.exports = dao
