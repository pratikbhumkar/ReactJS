
//Getting necessary  libraries.
const mysql=require('mysql')
const express= require('express')
const {  Client } = require('pg')
var app=express()
const body_parser= require('body-parser')
app.use(body_parser.json())
const cors=require('cors')


app.listen(5000,()=> console.log('express server is running at port 5000'));
app.use(cors())

//Creating connection with postgres server with the following properties.
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432,
  })
  client.connect()

/**
 * Getting user from the database. checks for matching email and password.
 */
app.get('/user/get', function (req, res, next) {
    //Getting values from the request object for email and password.
    const {email,password}=req.query;
    //Generate select query
    var SelectQuery= "select User_FirstName,User_LastName from user_data where user_email='"+email+"' and user_password='"+password+"'";
    //Running query
    client.query(SelectQuery, (err, results) => {
        //Return response
        return res.json({
            data:results.rows
        })
      })
}); 

/**
 * Adding user to the database. Input needs first,last name, address, email, mobile number and password.
 */
app.get('/user/add', function (req, res, next) {
    //Getting values from the request object for user details.
    const {fname,sname,address,email,mob,password}=req.query;
    //Generate insert query
    var InsertQuery= "INSERT INTO user_data(User_FirstName,User_LastName,User_Address,User_Email,User_MobileNo,User_Password) values('"+fname+"','"+sname+"','"+address+"','"+email+"','"+mob+"','"+password+"')";
    //Running query
    client.query(InsertQuery, (err, results) => {
        //Return response
        //Error case
        if(err){
            console.log(err.detail)
            return res.json({
                data:err
            })
        }
        //Otherwise
        else{
            return res.json({
                data:results
            })
        }
       
      })
}); 

 