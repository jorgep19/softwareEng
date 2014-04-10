var constructor = function() {

    var pg = require('pg');
    var sensorDataAccessorInstance = {};

    // gets all the supported sensor types from the database
    sensorDataAccessorInstance.getSensorTypes = function(sendResponse){

        pg.connect( process.env.DATABASE_URL, function(err, client, done) {
            client.query('SELECT * FROM sensor_type;', function(err, result) {
                done();

                sendResponse(err,result.rows);
            });
        });
    };

    sensorDataAccessorInstance.insertDataRow = function(cusId, sensorData, res){
        var queryTemplate = "INSERT INTO sensor_data (cusID, sensID, sdataValue, sdatarecordeddate) VALUES (" +
            "$1," +
            "$2," +
            "$3," +
            "$4)";
        var inserts = [ cusId, sensorData.sensorId, sensorData.value, sensorData.date ];

        console.log(inserts);

        pg.connect( process.env.DATABASE_URL, function(err, client, done) {
            client.query(queryTemplate, inserts, function(err, result) {
                done();

                console.log('saving:' + result);

                if(err) {
                    res.send("Something went wrong")
                }
                res.write("inserted data for sensor ID" + sensorData.sensID);
            });
        });
    };

    sensorDataAccessorInstance.recordSensorReadings = function(data, res, insertRow) {

        for(var i = 0; i < data.sensors.length; i++) {
            insertRow(data.userId, data.sensors[i], res);
        }
    };

    return sensorDataAccessorInstance;
}

module.exports = constructor();