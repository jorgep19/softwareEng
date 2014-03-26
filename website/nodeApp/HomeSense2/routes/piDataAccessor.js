var constructor = function() {

    var mysql      = require('mysql');
    var piDataAccessorInstance = {};

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'dev',
        password : 'homesense',
        database: 'HomeSense2'
    });

    piDataAccessorInstance.dbCheck = function(data, res) {

        var queryTemplate = "SELECT * FROM Customer WHERE cusFirst = ?";
        var inserts = [ data.name ];

        connection.query(mysql.format(queryTemplate, inserts), function(err, rows, fields) {
            if (err) throw err;

            var val = rows[0].cusEmail;

            console.log('The solution is: ', val);
            res.send('The solution is: ' + val);
        });
    }

    piDataAccessorInstance.getSensorTypes = function(manageOutput) {

        connection.query('SELECT * FROM SensorType' , function(err, rows) {
            manageOutput(rows);
        });

    }

    piDataAccessorInstance.getDataSummaryForUser = function(userEmail, manageOutput) {

        var query = "SELECT Device.devDesc, Sensor.sensDesc, SensorData.sdataValue, Sensor.stypeID " +
            "FROM Sensor NATURAL JOIN Device NATURAL JOIN Customer NATURAL JOIN SensorData " +
            "WHERE Customer.cusEmail = ? GROUP BY Device.devDesc, Sensor.sensDesc"
        var inserts = [ userEmail ];

        connection.query(mysql.format(query, inserts), function(err, rows) {
            manageOutput(rows);
        });
    };

    piDataAccessorInstance.recordSensorReadings = function(data, res) {

        for(var i = 0; i < data.sensors; i++)
        {
            var queryTemplate = "INSERT INTO SensorData " +
                "(sdataID, cusID, sensID, sdataValue, sdataRecordedDate) " +
                "VALUES (NULL, ?, ?, ?, CURRENT_TIMESTAMP);";

            var inserts = [ data.cusID, data.sensors[i].sensID, data.sensors[i].sdataValue ];

            connection.query(mysql.format(queryTemplate, inserts), function(err, result) {
                if(err) {

                    res.send("Shyt went wrong!")
                }
            });
        }
    }


    return piDataAccessorInstance;
}

module.exports = constructor();