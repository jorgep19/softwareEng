var constructor = function() {

    var sensorControllerInstance = {};
    var sensorDA = require('../dataAccessors/SensorDataAccessor.js');

    // gets all the supported sensor types
    sensorControllerInstance.getSensorTypes = function(req, res) {

        sensorDA.getSensorTypes(function(err, rows) {
            if(err) {
                // TODO check for any other errors
                res.send('Something went wrong');
            } else {
                res.json(rows);
            }
        });
    };

    sensorControllerInstance.recordSensorReadings = function(req, res) {
        var data = { userId: 2, sensors : [ { sensorId: 1, value: 12, date: '2014-04-07 17:50:52.9741'}, { sensorId: 1, value: 21, date: '2014-04-07 17:50:52.9741'} ] };
        sensorDA.recordSensorReadings(data, res, sensorDA.insertDataRow);
    };

    return sensorControllerInstance;
};

module.exports = constructor();