var constructor = function() {

    var webRequestControllerInstance = {};
    var userController = require('./UserController.js');
    var piController = require('./PiController.js');
    var sensorController = require('./SensorController.js');

    webRequestControllerInstance.loadHomePage = function(req, res){
        res.render('index');
    };

    webRequestControllerInstance.loadSignup = function(req, res){
        res.render('signup');
    };

    webRequestControllerInstance.loadDashboard = function(req, res){
        console.log('about to load the dashboard for:' + req.session);
        res.render('dashboard');
    };

    return webRequestControllerInstance;
};

module.exports = constructor();