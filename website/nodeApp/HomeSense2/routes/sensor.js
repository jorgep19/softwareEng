/**
 * Stores code used to respond to request 
 * directed to the path `api/sensor`
 *
 * @author asura
 */

var sensor = {
   gettypes: function (req, res, next) {
      console.log('post sensor.gettypes')
   }
};

// == Export the visible functions
module.exports = sensor 

