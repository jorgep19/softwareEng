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
        var queryTemplate = "INSERT INTO sensor_data (cusID, sensID, sdataValue) VALUES (" +
            "$1," +
            "$2," +
            "$3)";
        var inserts = [ cusId, sensorData.sensID, sensorData.sdataValue ];

        pg.connect( process.env.DATABASE_URL, function(err, client, done) {
            client.query(queryTemplate, inserts, function(err, result) {
                done();

                if(err) {
                    res.send("Shyt went wrong!")
                }
                res.write("inserted data for sensor ID" + sensorData.sensID);
            });
        });
    };

    sensorDataAccessorInstance.recordSensorReadings = function(data, res, insertRow) {

        for(var i = 0; i < data.sensors.length; i++)
        {
            insertRow(data.cusID, data.sensors[i], res);
        }
    };

    return sensorDataAccessorInstance;
}

module.exports = constructor();