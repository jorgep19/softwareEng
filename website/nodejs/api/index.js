/**
 * Stores code used to route the requests
 * directed to the path `api/`
 *
 * @author asura
 */

// include the modules and configs
var com = require('./common') 
var url    = require('url')
var qry = require("querystring")
var express = require('express')
var app = express()
module.exports = app
// module.exports = com 

app.use(express.json())
app.use(express.urlencoded())
app.use(express.logger())


var customer = require('./modules/customer')
var sensor   = require('./modules/sensor')
var pi       = require('./modules/pi')
var dao      = require('./modules/dao')

// Define paths from where we serve the static request
app.use('/img',   express.static( __dirname + '/public/images'));
app.use('/js',    express.static( __dirname + '/public/javascripts'));
app.use('/css',   express.static( __dirname + '/public/stylesheets'));


app.get('/api', function(req, res) {
   res.sendfile(__dirname + '/views/index.html')
});

// == Customer requests
app.post('/api/customer/register'   , customer.register)
app.post('/api/customer/login'      , customer.login)
app.post('/api/customer/genpicode'  , customer.genpicode)
app.post('/api/customer/addsensor'  , customer.addsensor)


// == Sensor requests
app.post('/api/sensor/gettypes', sensor.gettypes)
app.get('/api/sensor/gettypes', sensor.gettypes)


// == PI device requests
app.post('/api/pi/verify'           , pi.verify)
app.post('/api/pi/getsensorslist'   , pi.getsensorslist)
app.post('/api/pi/getsettings'      , pi.getsettings)
app.post('/api/pi/putdata'          , pi.putdata)

app.get('/api/pi/verify'           , pi.verify)
app.get('/api/pi/getsensorslist'   , pi.getsensorslist)
app.get('/api/pi/getsettings'      , pi.getsettings)
app.get('/api/pi/putdata'          , pi.putdata)


// == Start zee app
var server = app.listen(com.props.port, function() {
   // console.log('Express server started on port %s', server.address().port);
   console.log('Express server started on port %s', com.props.port);
});



