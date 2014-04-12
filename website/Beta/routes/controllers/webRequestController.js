var constructor = function() {

    var webRequestControllerInstance = {};
    var userController = require('./UserController.js');
    var piController = require('./PiController.js');
    var sensorController = require('./SensorController.js');

    webRequestControllerInstance.loadHomePage = function(req, res){
        res.render('index', { messages: req.flash('info') });
    };

    webRequestControllerInstance.loadSignup = function(req, res){
        res.render('signup');
    };
    webRequestControllerInstance.signupUser = function(req, res){
        var result = { hasErrors: false, messages: [] };

        userController.signupUser(req.body, result, function(responseResult){

            if(responseResult.hasErrors) {
                req.flash('info', responseResult);
                webRequestControllerInstance.loadSignup(req, res);
            } else {
                res.redirect('/dashboard');
            }
        });
    };

    webRequestControllerInstance.loadDashboard = function(req, res){
        console.log('about to load the dashboard for:' + req.session);
        res.render('dashboard');
    };

    return webRequestControllerInstance;
};

module.exports = constructor();