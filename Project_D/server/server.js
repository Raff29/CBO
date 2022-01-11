'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const PORT = 8000;
const HOST = "0.0.0.0";
const path = require('path'); 
var cors = require('cors');

app.use(cors())

 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json());


// Connecting to Sql
var connection = mysql.createConnection({
  host: "mysql",
  port: "3306",
  user: "root",
  password: "admin",
});

// Helper
const panic = (err) => console.error(err);

// Global Variables to avoid too many database calls

// Connect to databases and create CBO if it doesn't exist it alreadfy
connection.connect((err) => {
  if (err) {
    panic(err);
  }
  console.log("Connected!");
  connection.query("CREATE DATABASE IF NOT EXISTS CBO", (err, result) => {
    if (err) {
      panic(err);
    } else {
      console.log("Database created!");
    }
  });
});

//select database
connection.query("use CBO", (err, result) => {
  if (err) {
    panic(err);
  } else {
    console.log("using database: CBO")
  }
});

let customerdb =
  "CREATE TABLE IF NOT EXISTS customerdb (ID int NOT NULL AUTO_INCREMENT, First_Name varchar(255), Last_Name varchar(255), Email varchar(255), Phone varchar(50),Birthday varchar(50), Address varchar(255), SIN varchar(50), Gender varchar(255), Address_2 varchar(255), City varchar(255), Province varchar(100), Postal_Code varchar(50), Notes text(5000), PRIMARY KEY(ID));";

  let staffdb =
  "CREATE TABLE IF NOT EXISTS staffdb (ID int NOT NULL AUTO_INCREMENT, First_Name varchar(255), Last_Name varchar(255), Position varchar(255), Department varchar(255), Email varchar(255), Phone varchar(50),Birthday varchar(50), Address varchar(255), SIN varchar(50), Gender varchar(255), Address_2 varchar(255), City varchar(255), Province varchar(100), Postal_Code varchar(50), PRIMARY KEY(ID));";

  connection.query(customerdb, (err) => {
    if (err) {
      panic(err);
    } else {
      console.log("Table created!");
    }
  });

  connection.query(staffdb, (err) => {
    if (err) {
      panic(err);
    } else {
      console.log("Table created!");
    } 
  }); 
 

// function to Add customer to the Database
app.post('/customer/create', (req, res, next) => {
    const userDetails = req.body;

    var sql = 'INSERT INTO customerdb SET ?';
    connection.query(sql, userDetails,function (err, data) { 
      if (err) throw err;
         console.log("User dat is inserted successfully "); 
  });
  res.send("Customer added!")

});

app.post('/addStaff', (req, res) => {
  var firstName = req.body.inputName;
  var lastName = req.body.inputLastName;
  var position = req.body.inputPosition;
  var department = req.body.inputDepartment;
  var email = req.body.inputEmail4;
  var phone = req.body.inputPhone;
  var birth = req.body.inputDOB;
  var address = req.body.inputAddress;
  var sin = req.body.inputSIN;
  var gender = req.body.inputGender;
  var address2 = req.body.inputAddress2;
  var city = req.body.inputCity;
  var province = req.body.inputProvince;
  var postal_code = req.body.inputPostal;

  staff_insertion(firstName, lastName,position, department, email, phone, birth, address, sin, gender, address2, city, province, postal_code,);

  res.send("Staff added!")
});
  

 





// Functions
function custome_insertion(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11, param12, param13) {

  let mysql = `INSERT INTO customerdb (First_Name, Last_Name, Email,Phone, Birthday, Address, SIN, Gender, Address_2, City, Province, Postal_Code, Notes) VALUES ('${param1}', '${param2}', '${param3}', '${param4}', '${param5}', '${param6}', '${param7}', '${param8}', '${param9}', '${param10}', '${param11}', '${param12}', '${param13}')`;
  connection.query(mysql, (err, result) => {
    if (err) {
      panic(err);
    } else {
      console.log("Insertion successful");
    }
  });
}

function staff_insertion(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11, param12, param13, param14) {

  let mysql = `INSERT INTO customerdb (First_Name, Last_Name, Position, Department,  Email,Phone, Birthday, Address, SIN, Gender, Address_2, City, Province, Postal_Code) VALUES ('${param1}', '${param2}', '${param3}', '${param4}', '${param5}', '${param6}', '${param7}', '${param8}', '${param9}', '${param10}', '${param11}', '${param12}', ${param13}', ${param14}')`;
  connection.query(mysql, (err, result) => {
    if (err) {
      panic(err);
    } else {
      console.log("Insertion successful");
    }
  });
}




// Root Router
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, "pages/login.html"));
});

// Index router 
app.get('/index.html', (req,res) => {
  res.sendFile(path.join(__dirname, "pages/index.html"));
});

// Staff router
app.get("/staff.html", (req, res) => {
  console.log("staff.html")
  res.sendFile(path.join(__dirname, "pages/staff.html"));
})

// customer router
app.get("/customer.html", (req, res) => {
  console.log("customer.html")
  res.sendFile(path.join(__dirname, "pages/customer.html"));
})
 
// customer router
app.get("/customerSearch.html", (req, res) => {
  console.log("customerSearch.html")
  res.sendFile(path.join(__dirname, "pages/customerSearch.html"));
})

// staff router
app.get("/staffSearch.html", (req, res) => {
  console.log("staffSearch.html")
  res.sendFile(path.join(__dirname, "pages/staffSearch.html"));
})
 





app.use("/img", express.static(path.join(__dirname, "img")))    
app.use("/css", express.static(path.join(__dirname, "css")))  
app.use("/html", express.static(path.join(__dirname, "pages")))
app.use("/js", express.static(path.join(__dirname, "js")))
app.listen(PORT,HOST); 
console.log("up and running");
