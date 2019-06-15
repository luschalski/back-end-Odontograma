var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

app.get('/teste', function (req, res) {
    return res.send({ error: true, message: 'teste' })
});

// connection configurations
var dbConn = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'tX22rFEY4v',
    password: 'vno1NZXsQG',
    database: 'tX22rFEY4v'
});

// connect to database
dbConn.connect();

// Retrieve all users
app.get('/odontograma', function (req, res) {
    dbConn.query('SELECT * FROM odontograma', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'odontograma list.' });
    });
});

// Retrieve user with id
app.get('/odontograma/:odontoID', function (req, res) {

    var odontograma_odontoID = req.params.odontoID;

    if (!odontograma_odontoID) {
        return res.status(400).send({ error: true, message: 'Please provide odontograma_odontoID' });
    }

    dbConn.query('SELECT * FROM odontograma where id=?', odontograma_odontoID, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'odontograma list.' });
    });

});

// Add a new user
app.post('/odontograma', function (req, res) {

    var user = req.body.user;

    if (!user) {
        return res.status(400).send({ error:true, message: 'Please provide odontograma' });
    }

    dbConn.query('INSERT INTO odontograma SET ? ', [user], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
    });
});

//  Update user with id
app.put('/odontograma', function (req, res) {

    var odontograma_odontoID = req.body.odontograma_odontoID;
    var odontograma = req.body.odontograma;

    if (!odontograma_odontoID || !odontograma) {
        return res.status(400).send({ error: user, message: 'Please provide user and odontograma_odontoID' });
    }

    dbConn.query("UPDATE odontograma SET odontograma = ? WHERE id = ?", [odontograma, odontograma_odontoID], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
    });
});

//  Delete user
app.delete('/odontograma', function (req, res) {

    var odontograma_odontoID = req.body.odontograma_odontoID;

    if (!odontograma_odontoID) {
        return res.status(400).send({ error: true, message: 'Please provide odontograma_odontoID' });
    }
    dbConn.query('DELETE FROM users WHERE id = ?', [odontograma_odontoID], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'User has been updated successfully.' });
    });
});

// set port
app.listen(8080, function () {
    console.log('Node app is running on port 8080');
});

module.exports = app;