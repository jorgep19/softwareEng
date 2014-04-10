var app = require('../app.js'),
    userController = require('./controllers/UserController.js'),
    piController = require('./controllers/PiController.js'),
    sensorController = require('./controllers/SensorController.js');

// 'middleware' for routes that require to be logged in
var checkSessionBeforeExec = function(requestHandler) {

    return function(req, res) {

        if(!req.session.userCode) {
            res.send('You must login first');
        } else {
            requestHandler(req, res);
        }
    };
};

// TEST ROUTES
app.get('/', function(req, res){ res.send('Server is running') });
app.get('/dbtest', sensorController.getSensorTypes );

// PI ROUTES

// This URL creates a user account if possible
// Expects a JSON of this form: { piCode: 19 }
// Returns a JSON of this form: { hasErrors: false, messages: [], data: { piId: 21, userId: 19 } }
// in that JSON hasErrors is a boolean that states if there was an error
// and messages is an array of string that has either error messages
// or a message saying that the operation was successful
app.post('/api/pi/verify', piController.verifyPi);                                      // basic support

// This URL creates a user account if possible
// Expects a JSON of this form: { piCode: 19 }
// Returns a log of the transaction that got executed
//app.post('/api/pi/put/data', sensorControllerInstance.recordData);                      // working on

// TODO implement app.post('/api/pi/update', );
// TODO implement app.post('/api/pi/settings/update', );

// CLIENTS ROUTES

// This URL creates a user account if possible
// Expects a JSON of this form: { email: 'dummie@foo.bar', password: '123' }
// Returns a JSON of this form: { hasErrors: false, messages: [] }
// in that JSON hasErrors is a boolean that states if there was an error
// and messages is an array of string that has either error messages
// or a message saying that the operation was successful
app.post('/api/customer/register', userController.registerUser);                        // basic support

// This URL starts session
// Expects a JSON of this form: { email: 'dummie@foo.bar', password: '123' }
// Returns a JSON of this form: { hasErrors: false, messages: [] }
// in that JSON hasErrors is a boolean that states if there was an error
// and messages is an array of string that has either error messages
// or a message saying that the operation was successful
app.post('/api/login/', userController.login);                                          // basic support

// This URL ends the session of a user
// Expects nothing
// Returns a JSON of this form: { hasErrors: false, messages: [] }
// in that JSON hasErrors is a boolean that states if there was an error
// and messages is an array of string that has either error messages
// or a message saying that the operation was successful
app.post('/api/logout', checkSessionBeforeExec(userController.logout) );                // basic support

// This URL ends the session of a user
// Expects nothing
// Returns a JSON of this form: { piDesc: 'piDescriptionString' }
// in that JSON hasErrors is a boolean that states if there was an error
// and messages is an array of string that has either error messages
// or a message saying that the operation was successful
app.post('/api/customer/genpicode', checkSessionBeforeExec(userController.genPiCode) ); // basic support

// This URL ends the session of a user
// Expects nothing
// Returns a JSON array as the one shown below
//[ {
//    "stypeid": 1,
//    "stypedesc": "Temperature"
//},
//{
//    "stypeid": 2,
//    "stypedesc": "Motion"
//} ]
app.get('/api/sensor/get/types', sensorController.getSensorTypes);

// TODO implement app.get('/api/customer/get/summary/data', );
// TODO implement app.get('/api/get/temperature/data', );
