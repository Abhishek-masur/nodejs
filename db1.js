var mysql = require('mysql');

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: ""
});
// to create database 
con.connect(function(err) {
    if (err) throw err;
    console.log("connected");
    con.query("CREATE DATABASE Ola", function(err, result) {
        if (err) throw err;
        console.log("Database Created");
    });
});