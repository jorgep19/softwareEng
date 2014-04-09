/**
 * Stores utility functions
 *
 * @author asura
 */

var vali = require('validator')

var util = {

   /**
   *  Use this function to read a request param.
   *  Set it to empty string if no defaultVal is provided.
   */
   request: function(req, paramName, defaultVal) {
      var paramVal = req.param(paramName)
      if (typeof paramVal === 'undefined') {
         if (typeof defaultVal !== 'undefined') {
            paramVal = defaultVal
         }
         else {
            paramVal = ''
         }
      }
      return vali.escape(paramVal)
   },

   getSuccess: function (field, val) {
      obj = {status: 'success'}
      obj[field] = val
      return JSON.stringify(obj)
   },

   getErr: function (err) {
      obj = {status: 'error'}
      obj.message = err
      return JSON.stringify(obj)
   },

   // prints extra debug info
   printErr: function() {
      process.on('uncaughtException', function (err) {
         console.log(err)
      })
   },
}

module.exports = util
