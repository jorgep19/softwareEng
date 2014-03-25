var constructor = function() {

    var piDA = require('./piDataAccessor.js');
    var piControllerInstance = {};

    piControllerInstance.verify = function (data, res) {
        piDA.verify(data, res);
        // TODO implement;
    };

    piControllerInstance.update = function(data, res) {
        // TODO implement;
    };

    piControllerInstance.recordData = function(data, res) {
        // TODO implement;
    };

    piControllerInstance.getSensorTypes = function (res) {
        piDA.getSensorTypes(function(rows){
            res.send(rows);
        });
    }

    piControllerInstance.dbcheck = function(data, res) {
        piDA.dbCheck(data, res);
    };

    return piControllerInstance;
};

module.exports = constructor();