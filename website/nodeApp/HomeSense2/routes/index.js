app = require('../app');
var piController = require('./piController.js');
var customerController = require('./customerController.js');

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
    piController.verify( req.body, res )
});

app.post('/api/pi/update', function(req, res){
    piController.update( req.body, res );
});

app.post('/api/pi/settings/update', function(req, res){
    piController.updateSettings( req.body, res );
});

app.post('/api/pi/put/data', function(req, res){
    piController.recordSensorReadings( req.body, res );
});

app.get('/api/dbcheck', function(req, res){
    piController.dbcheck( { name: 'Chris' }, res );
});

// CLIENT METHODS
app.get('/api/customer/register', function(req, res){
   customerController.registerUser( { email: 'dummie@foo.bar', password: '123' }, res ); // req.body, res);
});

app.get('/api/customer/login', function(req, res){
    req.body = { email: 'chrisCo@aol.com', password: 'superSecret' };

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