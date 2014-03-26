var constructor = function() {

    var mysql      = require('mysql');
    var customerDataAccessorInstance = {};

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'dev',
        password : 'homesense',
        database: 'HomeSense2'
    });

    customerDataAccessorInstance.authenticateCustomer = function authenticate(req, res, finishAuth) {

        var queryTemplate = "SELECT * FROM Customer WHERE cusEmail = ? AND cusPassword = ?";
        var inserts = [ req.body.email, req.body.password ];

        connection.query(mysql.format(queryTemplate, inserts), function(err, rows) {
            finishAuth(err, rows);
        });
    }

    customerDataAccessorInstance.insertUserToDb = function(data, response, sendResponse) {

        var queryTemplate = "INSERT INTO Customer " +
            "(cusID, cusFirst, cusLast, cusMI, cusEmail, cusPassword, cusRegDate, cusModDate, cusLastLoginDate) " +
            "VALUES (NULL, '', '', '', " +
            "?, ?, '0000-00-00 00:00:00.000000', CURRENT_TIMESTAMP, '0000-00-00 00:00:00.000000');";

        var inserts = [data.email, data.password ];

        connection.query(mysql.format(queryTemplate, inserts), function(err, result) {
            sendResponse(err, response, result);
        });
    }

    customerDataAccessorInstance.verify = function (data) {
        return { boom: data.code, custID: "foo", deviceID: "bar" };
    };

    return customerDataAccessorInstance;
}

module.exports = constructor();