var constructor = function() {

    var mysql      = require('mysql');
    var piDataAccessorInstance = {};
    // TODO remove once the customer.cusID is set to autoIncrement on the database
    var userIdCounter = 0;

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'dev',
        password : 'homesense',
        database: 'HomeSense2'
    });

    piDataAccessorInstance.insertUserToDb = function(data) {
        connection.connect();

        var queryTemplate = "INSERT INTO Customer " +
            "(`cusID`, `cusFirst`, `cusLast`, `cusMI`, `cusEmail`, `cusPassword`, `cusRegDate`, `cusModDate`, `cusLastLoginDate`) " +
            "VALUES (?, '', '', '', " +
            "?, ?, '0000-00-00 00:00:00.000000', CURRENT_TIMESTAMP, '0000-00-00 00:00:00.000000');";

        var inserts = [ userIdCounter, data.email, data.password ];

        connection.query(mysql.format(queryTemplate, inserts), function(err, result) {
            if (err) throw err;

            // TODO remove once the customer.cusID is set to autoIncrement on the database
            userIdCounter++;

            console.log(result.insertId);
        });

        connection.end();

        return true;
    }

    piDataAccessorInstance.verify = function (data) {
        return { boom: data.code, custID: "foo", deviceID: "bar" };
    };

    return piDataAccessorInstance;
}

module.exports = constructor();