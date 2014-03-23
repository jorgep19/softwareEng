var constructor = function() {

    var customerDA = require('./customerDataAccessor.js');
    var piControllerInstance = {};

    piControllerInstance.registerUser = function (data, res) {

        if( true === customerDA.insertUserToDb(data)) {
            res.send("Account for " + data.email + "successfully created");
        }
        else {
            res.send("Failed to create account");
        }
    };

    piControllerInstance.update = function(data, res) {
        // TODO implement;
    };

    piControllerInstance.recordData = function(data, res) {
        // TODO implement;
    };

    piControllerInstance.dbcheck = function(data, res) {
        piDA.dbCheck(data, res);
    };

    return piControllerInstance;
};

module.exports = constructor();