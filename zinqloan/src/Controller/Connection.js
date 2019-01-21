
//Getting necessary  libraries.
const mysql=require('mysql')
const express= require('express')
var app=express()
const body_parser= require('body-parser')
app.use(body_parser.json())
const cors=require('cors')
app.use(cors())

//Creating connection with mysql server with the following properties.
var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'sys'
})

//Using the connection to connect.
mysqlConnection.connect((err)=>{
    if(!err){
        console.log('DB connection done')
    }
    else{
        console.log(err)
    }  
})
/**
 * Adding user to the database. Input needs first,last name, address, email, mobile number and password.
 */
app.get('/user/add',(req,res)=>{
    const {fname,sname,address,email,mob,password}=req.query;
    //Creating the insert query to be run on the mysql server.
    var InsertQuery= "INSERT INTO `user_data`(`User_FirstName`,`User_LastName`,`User_Address`,`User_Email`,`User_MobileNo`,`User_Password`) values('"+fname+"','"+sname+"','"+address+"','"+email+"','"+mob+"','"+password+"')";
    //Getting the results.
    mysqlConnection.query(InsertQuery,(err,results)=>{
        //Checking if there are errors
        if(err){
            console.log("in error")
            console.log(err.sqlMessage)
            return res.send(err)
        }
        //If not send the response to client.
        else{
            console.log(results)
            res.send(JSON.stringify(results));
        }
    })  
})
//Open port 5000 and listen to incoming requests
app.listen(5000,()=> console.log('express server is running at port 5000'));
app.use(cors())

app.get('/user/get',(req,response)=>{
    const {email,password}=req.query;
    //Select query to get user data.
    var SelectQuery= "select User_FirstName,User_LastName from user_data where user_email='"+email+"' and user_password='"+password+"'";
    //Run query.
    mysqlConnection.query(SelectQuery,(err,results)=>{
        //Send appropriate response to client error or result.
        if(err){
            response.send(err.json)
        }
        else{
            return response.json({
                data:results
            })
        }
    })  
})