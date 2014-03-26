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

    piControllerInstance.recordSensorReadings = function(data, res) {
        piDA.recordSensorReadings(data, res, piDA.insertDataRow);
    };

    piControllerInstance.getSensorTypes = function (res) {
        piDA.getSensorTypes(function(rows){
            res.send(rows);
        });
    }

    piControllerInstance.dbcheck = function(data, res) {
        piDA.dbCheck(data, res);
    };

    var insertPiInCollection = function(collection, value) {

        for(var i = 0 ; i < collection.length; i++) {
            if( collection[i].desc === value.devDesc) {
                collection[i].sensors.push( { desc: value.sensDesc, type: value.stypeID, data: value.sdataValue });
                return false;
            }
        }

        return true;
    };

    piControllerInstance.getDataSummaryForUser = function (userEmail, res) {
        piDA.getDataSummaryForUser(userEmail, function(rows){

            var userData = { pis: [] };

            // TODO refactor to something not as hacky
            for(var i = 0 ; i < rows.length; i++) {

                if( insertPiInCollection(userData.pis, rows[i]) ) {

                  userData.pis.push( { desc: rows[i].devDesc, sensors: [ { desc: rows[i].sensDesc, type: rows[i].stypeID, data: rows[i].sdataValue } ] } )
                }
            }

            res.send(userData);
        });
    };

    return piControllerInstance;
};

module.exports = constructor();