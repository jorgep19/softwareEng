app = require('../app');
var piController = require('./piController.js');
var customerController = require('./customerController.js');

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
    piController.recordData( req.body, res );
});

app.get('/api/dbcheck', function(req, res){
    piController.dbcheck( { name: 'Chris' }, res );
});

// CLIENT METHODS
app.get('/api/customer/register', function(req, res){
   customerController.registerUser( { email: 'dummie@foo.bar', password: '123' }, res );//req.body, res);
});

app.get('/api/customer/login', function(req, res){
    customerController.login(req.body, res);
});