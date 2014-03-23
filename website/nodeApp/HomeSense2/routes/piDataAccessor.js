var constructor = function() {

    var mysql      = require('mysql');
    var piDataAccessorInstance = {};

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'Ateamo!'
    });

    piDataAccessorInstance.dbCheck = function(data, res) {
        connection.connect();

        connection.query('SELECT * FROM HomeSense2.Customer WHERE cusFirst LIKE \'' + data.name + '\'', function(err, rows, fields) {
            if (err) throw err;

            var val = rows[0].cusEmail;

            console.log('The solution is: ', val);
            res.send('The solution is: ' + val);
        });

        connection.end();
    }

    piDataAccessorInstance.verify = function (data) {
        return { boom: data.code, custID: "foo", deviceID: "bar" };
    };

    return piDataAccessorInstance;
}

module.exports = constructor();