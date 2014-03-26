/**
 * Stores code used to respond to request 
 * directed to the path `api/pi`
 *
 * @author asura
 */
var util    = require('../common').util
var vali    = require('validator')
// DataAccessObject is used to read the database
var dao = require('./dao')


var pi = {
   verify: function(req, res) {
     console.log('post pi.verify: ' + console.dir(req.body))
      // var devID = util.request(req, 'code')
      var devID = req.body.code
      console.log('\nUsing devID: ' + devID)

      dao.activateDevice(res, devID, function(isUpdated) {
         if (isUpdated) {
            // res.end(util.getSuccess('Activated'))
            dao.getDeviceUser( res, devID, function(user) { 
               res.end( util.getSuccess('user', user))
            })
         }
         else {
            res.end( util.getErr('Unable to verify device code:' + devID))
         }
      })
   },

   getsensorslist: function (req, res, next) {
      console.log('post pi.getsensorslist')
   },

   getsettings: function (req, res, next) {
      console.log('post pi.getsettings')
   },

   /**
   *  == WARNING == not working yet
   *
   *  Expects an array of {sensID, sdataValue, sdataRecordedDate}
   *  TODO: check if is worth to do batch-inserts 
   */
   putdata: function (req, res) {
      // var list = JSON.parse( util.request(req, 'data'))
      var str = 
' ["0" : {"sensID" : 1, "sdataValue": 10, "sdataRecordedDate": "2014-03-01"},' + 
'  "1" : {"sensID" : 1, "sdataValue": 10, "sdataRecordedDate": "2014-03-01"}'

      var list = req.body.data
      console.log('post pi.putdata: ' + list)

      // for (ele in list) {
      for (i = 0; i < list.length; ++i) {
         // var ele = list[i]

         (function (list, i) {
            // ele has: sensID, sdataValue, sdataRecordedDate
            // executes without any order
            var ele = list[i]
            console.log('ele is:' + ele) 
            dao.insertSensorData(res, ele, function(sdataID) {
               res.send( util.getSuccess( 'sdataID', sdataID))
            })
         })
      } // end foreach row
      // res.end('done')
   }
};

module.exports = pi
