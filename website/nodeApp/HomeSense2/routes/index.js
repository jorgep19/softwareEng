app = require('../app');
var piController = require('./piController.js');
var customerController = require('./customerController.js');

/**
*  Pass this function as parameter to
*  routes which needs to check the presence of a valid session. 
*/
function restrict(req, res, next) {

    if (req.session.user) {
        next();
    } else {
        //req.session.error = 'Access denied!';
        res.send({ hasErrors: true, messages: ['Must Login first.']});
    }
}

// ACTUAL ROUTES
app.get('/', function(req, res){
    res.send('Server is running')
});

// PI METHODS
app.post('/api/pi/verify', function(req, res){
    res.send({ again: "Let's pretend it works" });
    // piController.verify( req.body, res )
});

app.post('/api/pi/update', function(req, res){
    piController.update( req.body, res );
});

app.post('/api/pi/settings/update', function(req, res){
    piController.updateSettings( req.body, res );
});

app.post('/api/pi/put/data', function(req, res){
    // TEST DATA: { cusID: 2019, sensors: [ { sensID: 13, sdataValue: 29 }, { sensID: 23, sdataValue: 45} ]}
    piController.recordSensorReadings(req.body, res );
});

app.get('/api/dbcheck', function(req, res){
    piController.dbcheck( { name: 'Chris' }, res );
});

// CLIENT METHODS
app.post('/api/customer/register', function(req, res){
    // TEST DATA: { email: 'dummie@foo.bar', password: '123' }
    console.log("registering" + req.body);
   customerController.registerUser( req.body, res);
});

app.post('/api/customer/login', function(req, res){
    // TEST DATA req.body = { email: 'chrisCo@aol.com', password: 'superSecret' };
    console.log("login as" + req.body);
    customerController.authenticate( req, res);
});

app.get('/api/customer/logout', function(req, res) {
    delete req.session.user;
    res.send("logged out");
})

app.get('/api/customer/get/summary/data', restrict, function(req, res){
    piController.getDataSummaryForUser(req.session.user, res);
});

app.get('/api/sensor/get/types', restrict, function(req, res){
    piController.getSensorTypes( res );
});

app.get('/api/get/temperature/data', function(req, res){
    piController.getTemperatureData( 13, res );
})
