/**
 * Stores code used to respond to request 
 * directed to the path `api/customer`
 *
 * @author asura
 */

var util    = require('../../../nodejs/api/common').util
var vali    = require('validator')

// DataAccessObject is used to read the database
var dao = require('./dao')

var customer = {

   /**
   * Checks the cusEmail/cusPassword and inserts new row into `Customer` table
   */
   register: function(req, res) {

      var cus = {}
      cus.cusEmail   = util.request(req, 'cusEmail')
      cus.cusPass    = util.request(req, 'cusPass')

      // optional params
      cus.cusFirst   = util.request(req, 'cusFirst')
      cus.cusLast    = util.request(req, 'cusLast')
      cus.cusMI      = util.request(req, 'cusMI')

      if (! vali.isEmail(cus.cusEmail)) {
         res.write( util.getErr('Expected valid email format: ' + cus.cusEmail))
         throw "Invalid data"
      }
      else if(! vali.isLength(cus.cusEmail, 5, 255)) {
         res.write( util.getErr('Expected email length is 5-255: ' + cus.cusEmail))
         throw "Invalid data"
      }
      if (! vali.isLength(cus.cusPass, 6, 50)) {
         res.write(util.getErr('Password length: 6-50'))
         throw "Invalid data"
      }

      dao.cusExists(res, cus, function( res, cusExists, cus) {
         if (! cusExists) {
            dao.insertCustomer(res, cus, function(cusID) {
               res.end( util.getSuccess( 'cusID', cusID))
            })
         }
         else {
            res.end( util.getErr('Customer exists:' + cus.cusEmail) )
         }
      })
   },

   login: function(req, res) { 
      var cus = {}
      cus.cusEmail   = util.request(req, 'cusEmail')
      cus.cusPass    = util.request(req, 'cusPass')

      if (! vali.isEmail(cus.cusEmail)) {
         res.write( util.getErr('Expected valid email format: ' + cus.cusEmail))
         throw "Invalid data"
      }
      else if(! vali.isLength(cus.cusEmail, 5, 255)) {
         res.write( util.getErr('Expected email length is 5-255: ' + cus.cusEmail))
         throw "Invalid data"
      }
      if (! vali.isLength(cus.cusPass, 6, 50)) {
         res.write(util.getErr('Password length: 6-50'))
         throw "Invalid data"
      }

      dao.cusExists(res, cus, function( res, cusExists, cus) {
         if (cusExists) {
            dao.checkPassword(res, cus, function(passMatches) {
               if (passMatches) {
                  res.end( util.getSuccess('pass', 'valid'))
               }
               else {
                  res.end( util.getErr('pass invalid'))
               }
            })
         }
         else {
            res.end( utl.getErr('No such customer'))
         }
      })
   },

   genpicode: function (req, res) {
      var cus = {}
      cus.cusEmail   = util.request(req, 'cusEmail')
      cus.cusPass    = util.request(req, 'cusPass')

      dao.insertDevice(res, cus, function(devID) {
         res.end(util.getSuccess('devID', devID))
      })
   },


   addsensor: function(req, res, next) {
      var sens = {}
      sens.cusEmail  = util.request(req, 'cusEmail')
      sens.devID     = util.request(req, 'devID')
      sens.stypeDesc = util.request(req, 'stypeDesc')
      sens.sensDesc  = util.request(req, 'sensDesc')

      dao.insertSensor(res, sens, function(sensID) {
         res.end( util.getSuccess('sensID', sensID))      
      })
   },

};

module.exports = customer

