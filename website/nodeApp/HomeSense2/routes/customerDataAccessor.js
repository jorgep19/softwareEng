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

    piDataAccessorInstance.authenticateCustomer = function authenticate(req, res, finishAuth) {

        // connection.connect();

        var queryTemplate = "SELECT * FROM Customer WHERE cusEmail = ? AND cusPassword = ?";
        var inserts = [ req.body.email, req.body.password ];

        connection.query(mysql.format(queryTemplate, inserts), function(err, rows) {
            finishAuth(err, rows);
        });

        // connection.end();
    }

    piDataAccessorInstance.insertUserToDb = function(data, response, sendResponse) {
        // connection.connect();

        var queryTemplate = "INSERT INTO Customer " +
            "(`cusID`, `cusFirst`, `cusLast`, `cusMI`, `cusEmail`, `cusPassword`, `cusRegDate`, `cusModDate`, `cusLastLoginDate`) " +
            "VALUES (?, '', '', '', " +
            "?, ?, '0000-00-00 00:00:00.000000', CURRENT_TIMESTAMP, '0000-00-00 00:00:00.000000');";

        var inserts = [ userIdCounter, data.email, data.password ];

        connection.query(mysql.format(queryTemplate, inserts), function(err, result) {
            sendResponse(err, response, result);
            userIdCounter++;
        });

        // connection.end();
    }


    piDataAccessorInstance.verify = function (data) {
        return { boom: data.code, custID: "foo", deviceID: "bar" };
    };

    return piDataAccessorInstance;
}

module.exports = constructor();