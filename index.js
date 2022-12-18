var con = require('./db')
var express = require('express')
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", 'ejs');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/main.html')

});

app.post('/', function(req, res) {
    var name = req.body.name;
    var password = req.body.password;
    if (name == 'Abhishek' && password == 123) {
        res.redirect('/Admin');
    } else {
        res.redirect('/user');
    }
});

app.get('/Admin', function(req, res) {

    res.render(__dirname + "/Admin");

});

app.get('/user', function(req, res) {

    res.render(__dirname + "/user");

});
app.get('/insert', function(req, res) {

    res.render(__dirname + "/insert_data");

});
app.post('/insert', function(req, res) {
    var name = req.body.name;
    var source = req.body.source;
    var destination = req.body.destination;
    var dist = 101;
    var fare = 80;
    if (source == 'vidyanagar' && destination == 'Airport') {
        dist = 80;
        fare = 150;

    }

    var sql = "INSERT INTO service(name,source,destination,distance,fare) VALUES('" + name + "','" + source + "','" + destination + "','" + dist + "','" + fare + "')";

    con.query(sql, function(error, result) {
        if (error) throw error;
        res.redirect('/display');


    });
});

//display
app.get('/display', function(req, res) {


    var sql = "select * from service";

    con.query(sql, function(error, result) {
        if (error) throw error;
        res.render(__dirname + "/display", { service: result });


    });
});
app.get('/display2', function(req, res) {


    var sql = "select * from service";

    con.query(sql, function(error, result) {
        if (error) throw error;
        res.render(__dirname + "/display2", { service: result });


    });
});

//delete

app.get('/delete-service', function(req, res) {


    var sql = "delete from service where source=?";
    var source = req.query.source;

    con.query(sql, [source], function(error, result) {
        if (error) throw error;
        res.redirect('/display')


    });
});

app.get('/update-service', function(req, res) {


    var sql = "select * from service where name=?";
    var name = req.query.name;

    con.query(sql, [name], function(error, result) {
        if (error) throw error;
        res.render(__dirname + "/update-service", { service: result })



    });
});

app.post('/update-service', function(req, res) {


    var source = req.body.source;
    var destination = req.body.destination;
    var dist = req.body.dist;
    var fare = req.body.fare;
    var name = req.query.name;


    var sql = "update  service set source=?,destination=?,distance=?,fare=? where name=?";
    var name = req.query.name;

    con.query(sql, [source, destination, dist, fare, name], function(error, result) {
        if (error) throw error;
        res.redirect('/display');




    });

});


app.listen(7000);