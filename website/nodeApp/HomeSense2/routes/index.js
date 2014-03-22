app = require('../app');
var piController = require('./piController.js');


app.get('/', function(req, res){
    res.send('Server is running')
});

// PI METHODS
app.post('/api/pi/verify', function(req, res){
    res.send(piController.verify( req.body ) );
});

app.post('/api/pi/update', function(req, res){
    res.send(piController.update( req.body ) );
});

app.post('/api/pi/settings/update', function(req, res){
    res.send(piController.updateSettings( req.body ) );
});

app.post('/api/pi/put/data', function(req, res){
    res.send(piController.recordData( req.body ) );
});

// CLIENT METHODS
