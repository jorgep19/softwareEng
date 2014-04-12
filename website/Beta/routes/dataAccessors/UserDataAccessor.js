var constructor = function() {

    var pg = require('pg');
    var customerDataAccessorInstance = {};

    // validates the credential of a user based on the database
    customerDataAccessorInstance.authenticateUser = function(data, finishAuth) {

        var queryTemplate = "SELECT * FROM customer WHERE cusEmail = $1 AND cusPassword = $2";
        var inserts = [ data.email, data.password ];

        pg.connect(process.env.DATABASE_URL, function(err, client, done) {
            client.query(queryTemplate, inserts, function(err, result) {
                done();

                finishAuth(err, result.rows);
            });
        });
    };

    // insert a user row without user data
    customerDataAccessorInstance.registerUser = function(data, sendResponse) {

        var queryTemplate = "INSERT INTO customer " +
            "(cusFirst, cusLast, cusEmail, cusPassword) " +
            "VALUES " +
            "('', '', $1, $2)" +
            "RETURNING cusid";

        var inserts = [data.email, data.password ];

        pg.connect(process.env.DATABASE_URL, function(err, client, done) {
            client.query(queryTemplate, inserts, function(err, result) {
                done();

                if(err) {
                    sendResponse(err);
                } else {
                    sendResponse(err,result.rows[0].cusid);
                }
           });
        });
    };

    // Inserst a Pi for a user account
    customerDataAccessorInstance.registerPi = function(data, userCode, sendResponse){
        var queryTemplate = 'INSERT INTO device (cusId, devDesc) ' +
            'VALUES' +
            '($1, $2)';
        var inserts = [userCode, data.piDesc ];


        pg.connect(process.env.DATABASE_URL, function(err, client, done) {
            client.query(queryTemplate, inserts, function(err, result) {
                done();

                if(err) {
                    sendResponse(err, result.devDesc);
                } else {
                    // TODO try to retrieve data from the result of the query
                    sendResponse(undefined, data.piDesc);
                }
            });
        });
    };

    return customerDataAccessorInstance;
}

module.exports = constructor();