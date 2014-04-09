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
            "VALUES (2045, '', '', '', " +
            "?, ?, '0000-00-00 00:00:00.000000', CURRENT_TIMESTAMP, '0000-00-00 00:00:00.000000');";

        var inserts = [data.email, data.password ];

        connection.query(mysql.format(queryTemplate, inserts), function(err, result) {
            sendResponse(err, response, result);
        });
    }

    customerDataAccessorInstance.verify = function (data) {
        return { boom: data.code, custID: "foo", deviceID: "bar" };
    };

    customerDataAccessorInstance.insertDevice = function (userEmail, manageOutput) {
       var today = new Date();

        var query = 'INSERT INTO Device (cusID, devActivated, devDesc, devAddedDate) ' +
            ' SELECT cusID, 0, UPPER( left(md5(?), 6)), NOW() FROM Customer WHERE cusEmail = ?';
        var data = [today, userEmail];

        db.query(query, data, function (err, result) {
            if(err)
            {
                manageOutput(undefined);
            }
            else
            {
                console.log('inserted devID: ' + result.insertId)
                manageOutput(result.insertId)
            }
        })
    };

    return customerDataAccessorInstance;
}

module.exports = constructor();