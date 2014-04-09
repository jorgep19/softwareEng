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

    return sensorDataAccessorInstance;
}

module.exports = constructor();