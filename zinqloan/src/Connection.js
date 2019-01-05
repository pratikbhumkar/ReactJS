

const mysql=require('mysql')
const express= require('express')
var app=express()
const body_parser= require('body-parser')
app.use(body_parser.json())
const cors=require('cors')
app.use(cors())

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'sys'
})

mysqlConnection.connect((err)=>{
    if(!err){
        console.log('DB connection done')
    }
    else{
        console.log(err)
    }  
})

// app.listen(5000,()=> console.log('express server is running at port 5000'));
app.get('/user/add',(req,res)=>{
    const {fname,sname,address,email,mob,password}=req.query;
    var InsertQuery= "INSERT INTO `user_data`(`User_FirstName`,`User_LastName`,`User_Address`,`User_Email`,`User_MobileNo`,`User_Password`) values('"+fname+"','"+sname+"','"+address+"','"+email+"','"+mob+"','"+password+"')";
    mysqlConnection.query(InsertQuery,(err,results)=>{
        if(err){
            return res.send(err)
        }
        else{
            console.log(results)
            res.send(JSON.stringify(results));
        }
    })  
})
app.listen(5000,()=> console.log('express server is running at port 5000'));
app.use(cors())

var status
app.get('/user/get',(req,response)=>{
    const {email,password}=req.query;
    var SelectQuery= "select User_FirstName,User_LastName from user_data where user_email='"+email+"' and user_password='"+password+"'";
    mysqlConnection.query(SelectQuery,(err,results)=>{
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