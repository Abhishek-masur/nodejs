var mysql = require('mysql');

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "ola"
});
// for creating table in database1
con.connect(function(err) {
    if (err) throw err;
    console.log("connected");
    var sql = "CREATE TABLE Service (name varchar(30),source varchar(30),destination varchar(30),distance int(5),fare int(5)) ";
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Table Created");
    });
});