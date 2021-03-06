var sql = require('mssql');
const Promise = require('bluebird');

var config = {
    server: 'hssmscaster.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database : 'HSSMSCASTER',
    user: 'Smsrn',
    password: 'Persia123',
    // port: 1433,
    options: { encrypt: true }

};

var executeQuery = function (queryStr) {
    return new Promise(function (resolve, reject) {
        sql.connect(config).then(function () {
            new sql.Request().query(queryStr).then(function (response) {
                resolve(response);
            }).catch(function (err) {
                console.log(!!err ? err : "mssql - unknown error");
                reject(err);
            });
        }).catch(function (err) {
            console.log(!!err ? err : "mssql - unknown error");
            reject(err);
        });
    });
};

exports.executeQuery = executeQuery;
//
exports.executeInBulk = function (queries) {
    return new Promise(function (resolve, reject) {
        // queries = []
        // queries = ["insert 1", "insert 2"]
        var qrIndex = 0;
        console.log("executeInBulk == start")
        var executeNext = function (query) {
            console.log(qrIndex + " --- " + query)
            executeQuery(query).then(function () {
                if (qrIndex < queries.length - 1)
                    executeNext(queries[++qrIndex]);
                else {
                    console.log("executeInBulk -- end")
                    //on complete
                    resolve(true);
                }
            }).catch(function (err) {
                console.log(!!err ? err : "mssql - unknown error");

                reject(err);
            });
        };
        executeNext(queries[qrIndex]);
    });
};

exports.executeForSingleRecord = function (queryStr) {
    return new Promise(function (resolve, reject) {
        sql.connect(config).then(function () {
            new sql.Request().query(queryStr).then(function (response) {
                resolve(response[0]);
            }).catch(function (err) {
                console.log(!!err ? err : "mssql - unknown error");
                reject(err);
            });
        }).catch(function (err) {
            console.log(!!err ? err : "mssql - unknown error");

            reject(err);
        });
    });
};

sql.on('error', function (err) {
    console.log(!!err ? err : "mssql - unknown error");
});
