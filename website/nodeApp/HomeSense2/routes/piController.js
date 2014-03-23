var constructor = function() {

    var piDA = require('./piDataAccessor.js');
    var piControllerInstance = {};

    piControllerInstance.verify = function (data, res) {
        return piDA.verify(data, res);
        // TODO implement;
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