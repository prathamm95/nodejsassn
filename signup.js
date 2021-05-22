const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/assets",express.static("assets"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "nodejs"
});


// connect to the database
connection.connect(function(error){
    if (error) throw error
    else console.log("connected to the database successfully!")
});

app.get("/",function(req,res){

    const resultVal= connection.query("select * from signupuser",function(error,result){
        if(error){throw error;}
        console.log(result);
        return  res.status(200).send(result);

    })
})

app.post("/",encoder, function(req,res){
    var username = req.body.username;
    var userpass = req.body.userpass;

    console.log(req.body);
    
    connection.query("insert into signupuser(user_name,user_pass) values(?,?)",[username,userpass],function(error,results){
        if(error){throw error;}
        console.log(results);
        return  res.status(200).send(results);
    })
})

// when login is success
app.get("/welcome",function(req,res){
    res.sendFile(__dirname + "/welcome.html")
})


// set app port 
app.listen(4000);
