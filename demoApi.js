// Importing the packages required for the project.  
  
const mysql = require('mysql');  
const express = require('express');  
var app = express();  
const bodyparser = require('body-parser');  
const port = process.env.port |3000;
// Used for sending the Json Data to Node API  
app.use(bodyparser.json());  
  

var mysqlConnection = mysql.createConnection({  
    host: 'localhost',  
    user : 'root',  
    password : 'root',   
    database : 'DemoApi',  
    multipleStatements : true  
});  
 
// To check whether the connection is succeed for Failed while running the project in console.  
mysqlConnection.connect((err) => {  
    if(!err) {  
        console.log("Db Connection Succeed");  
    }  
    else{  
        console.log("Db connect Failed \n Error :" + JSON.stringify(err,undefined,2));  
    }  
});  
  
// To Run the server with Port Number  
app.listen(port,()=> console.log(`Server is running at  http://localhost:${port}/`));
  
// Insert an Employee through the Stored Procedure

app.post('/InsertEmployees', (req, res) => {
    let emp = req.body;
    var sql = "CALL InsertEmployees(?, ?, ?, ?)";
    mysqlConnection.query(sql, [emp.Name, emp.Designation, emp.City, emp.ContactNo], (err, rows, fields) => {
        if (!err)
            res.send("Insert successfully Done");
        else
            console.log(err);
    });
});


// Show all Employee through the Stored Procedure
app.get('/ShowEmployees', (req, res) => {
    let emp = req.body;
    var sql = "CALL ShowEmployees()";
    mysqlConnection.query(sql, (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});


// Update an Employee through the Stored Procedure
app.post('/UpdateEmployees', (req, res) => {
    let emp = req.body;
    var sql = "CALL UpdateEmployees(?, ?, ?, ?,?)";
    mysqlConnection.query(sql, [emp.EmpID ,emp.Name, emp.Designation, emp.City, emp.ContactNo], (err, rows, fields) => {
        if (!err)
            res.send("Update successfully Done");
        else
            console.log(err);
    });
});


// Delete an Employee through the Stored Procedure
app.post('/DeleteEmployees', (req, res) => {
    let emp = req.body;
    var sql = "CALL DeleteEmployees(?)";
    mysqlConnection.query(sql,[emp.EmpID], (err, rows, fields) => {
        if (!err)
            res.send("Delete successfully Done");
        else
            console.log(err);
    });
});