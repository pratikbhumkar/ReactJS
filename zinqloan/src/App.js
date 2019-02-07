import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { Redirect, Link } from "react-router-dom";

import User from './Models/UserModel'
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import Cookies from 'universal-cookie';
import { Checkbox } from 'material-ui';
import {connect} from 'react-redux'

/**
 * This is the login component of the application.
 */
class App extends Component {
  
  constructor(props) {
    
    super(props);
    this.state = {
                  redirectToWelcome:false,
                  username: '',
                  username_error:'',
                  password: '',
                  password_error:'',
                  rememberMe:false,
                  error:[],
                  redirectFlag:false,
                  firstname:'',
                  lastname:'',
                  user:new User()
                }
                
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.responseForGoogle = this.responseForGoogle.bind(this);
    
    this.responseForFacebook = this.responseForFacebook.bind(this);
    
  }
  
  componentDidMount(){
      console.log(this.props.user)
      const cookies = new Cookies();
      var userCookie= cookies.get('ZinqLoan')
      if(typeof userCookie !== 'undefined'){
        this.state.user=new User()
        this.state.user.setUserFirstName(userCookie["user_firstname"])
        this.state.user.setUserLastName(userCookie["user_lastname"])
        this.state.user.setUserLastName(userCookie["user_email"])
        this.state.redirectFlag=true
        var random = require('math-random')
        var cookieKey=random()
        this.state.user.setUserCookieKey(cookieKey)
        cookies.set('ZinqLoanSession', {"key":cookieKey }, { path: '/',maxAge:9000 });
        this.props.onUserLogin(userCookie["user_firstname"],userCookie["user_lastname"],userCookie["user_email"],cookieKey)
        fetch(`http://localhost:5000/log/add?user_email=${this.state.username}
        &sessionkey=${this.state.user.getUserCookieKey()}&page=${'app'}&entry_type=${'success'}&error=${''}&user_action=${'login-success'}`)
        this.setState({
          redirectToWelcome:true
        })
      }
      else{
        this.state.redirectFlag=false
      }
     
      
  }
  responseForFacebook = (response) => {
    this.state.user.setUserFirstName(response.name.split()[0])
    this.state.user.setUserLastName(response.name.split()[1])
    this.state.user.setUserEmail(response.email)
    const cookies = new Cookies();
    fetch(`http://localhost:5000/log/add?user_email=${this.state.username}
    &sessionkey=${this.state.user.getUserCookieKey()}&page=${'app'}&entry_type=${'error'}&error=${""}&user_action=${''}`)
    var random = require('math-random')
    var cookieKey=random()
    this.state.user.setUserCookieKey(cookieKey)
    cookies.set('ZinqLoanSession', {"key":cookieKey }, { path: '/',maxAge:9000 });
    fetch(`http://localhost:5000/log/add?user_email=${this.state.username}
    &sessionkey=${this.state.user.getUserCookieKey()}&page=${'app'}&entry_type=${'success'}&error=${''}&user_action=${'login-success'}`)
    
    this.props.onUserLogin(response.name.split()[0],response.name.split()[1],response.email,cookieKey)
    this.setState({
      redirectToWelcome:true
    })
  console.log(response.name);
  console.log(response.email)
}
/**
 * This method handles changes in the username 
 * @param {*} event 
 */
  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }
/**
 * This method handles changes in the password 
 * @param {*} event 
 */
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

/**
 * This method does the verification based on the username and password inputs. It verifies and redirects user to the welcome page. If input is wrong then shows error message.
 * @param {*} event 
 */
  handleLogins(event) {
    event.preventDefault()
    }
    
    responseForGoogle(googleUser){
      this.state.user=new User()
      this.state.user.setUserFirstName(googleUser.w3.ofa)
      this.state.user.setUserLastName(googleUser.w3.wea)
      this.state.user.setUserEmail(googleUser.w3.ig)
      const cookies = new Cookies();
      fetch(`http://localhost:5000/log/add?user_email=${this.state.username}
      &sessionkey=${this.state.user.getUserCookieKey()}&page=${'app'}&entry_type=${'error'}&error=${""}&user_action=${''}`)
      var random = require('math-random')
      var cookieKey=random()
      this.state.user.setUserCookieKey(cookieKey)
      cookies.set('ZinqLoanSession', {"key":cookieKey }, { path: '/',maxAge:9000 });
      fetch(`http://localhost:5000/log/add?user_email=${this.state.username}
      &sessionkey=${this.state.user.getUserCookieKey()}&page=${'app'}&entry_type=${'success'}&error=${''}&user_action=${'login-success'}`)
      
      this.props.onUserLogin(googleUser.w3.ofa,googleUser.w3.wea,googleUser.w3.ig,cookieKey)
      this.setState({
        redirectToWelcome:true
      })
    }
/**
 * This method redirects user to the create window, once clicked.
 * @param {*} event 
 */
  handleRegister(event) {
    event.stopPropagation()
    //To store the errors
    const errors={}
    var userObject= new User()
    //Regex to check email is valid
    var re =  new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    var emailVer=re.test(String(this.state.username).toLowerCase())
    //Regex to store check password is valid
    var strongRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
    var PassVer=strongRegex.test(String(this.state.password))
    //Flag to determine that the contents are valid.
    var flagInvalid=false

    //Setting the error message if email id is invalid.
    if(emailVer === false){
      errors.username_error="Email address is invalid, Re-enter."
      flagInvalid=true
    }
    //Setting the error message if password is invalid.
    if(PassVer === false){
      errors.password_error="Password is invalid, Re-enter."
      flagInvalid=true
    }
    // If everything is valid, connect to database and check for correctness.
    if(flagInvalid===false){
        fetch(`http://localhost:5000/user/get?email=${this.state.username}&password=${this.state.password}`)
        .then((response) => { 
          return response.json() 
        }).then((response) => {
          const cookies = new Cookies();
          if(response.type=="error"){
            fetch(`http://localhost:5000/log/add?user_email=${this.state.username}
            &sessionkey=${userObject.getUserCookieKey()}&page=${'app'}&entry_type=${'error'}&error=${response}&user_action=${''}`)
          }
          else{
            if(this.state.rememberMe){
              cookies.set('ZinqLoan', {"user_firstname":response.data[0].user_firstname,"user_lastname":response.data[0].user_lastname,"user_email":this.state.username},
               { path: '/' });
            }
         
          var random = require('math-random')
          var cookieKey=random()
          userObject.setUserCookieKey(cookieKey)
          cookies.set('ZinqLoanSession', {"key":cookieKey }, { path: '/',maxAge:9000 });
          fetch(`http://localhost:5000/log/add?user_email=${this.state.username}
          &sessionkey=${userObject.getUserCookieKey()}&page=${'app'}&entry_type=${'success'}&error=${''}&user_action=${'login-success'}`)
          
          userObject.setUserFirstName(response.data[0].user_firstname)
          userObject.setUserLastName(response.data[0].user_lastname)
          userObject.setUserEmail(response.data[0].user_email)
          
          this.props.onUserLogin(response.data[0].user_firstname,response.data[0].user_lastname,response.data[0].user_email,cookieKey)
          
        }
        this.setState({
          user:userObject,
          redirectToWelcome:true
        })
        })
        .catch((err)=>{
        event.preventDefault();
        console.log(err)
         } )

            }
      else{
        event.preventDefault();
        this.setState({
          ...this.state,
          ...errors
        })
      }
  }
  /**
   * Rendering the Login page.
   */
  render() {
    
    const responseGoogleFail = (response) => {
      
    }
    const responseGoogle = (responseFromGoogle) => {
      this.responseForGoogle(responseFromGoogle)
    }
    
    if(this.state.redirectToWelcome){
      return(
        <Redirect to={{
          pathname: '/Welcome'
      }}/>
      )
    }
    else
    return(
    <div>
      <MuiThemeProvider>
        <div className="login" >
         <form style={{textAlign:"center"}}>
         <AppBar title="Zinq"/>
       <div id="hey"></div>
              <h1 style={{"color": "#565454"}}>Login</h1>
                <TextField
                autoFocus
                autoComplete
                hintText="username"
                value={this.state.username}
                errorText={this.state.username_error}
                id="useremail"
                error={this.state.error.usn}
                type="email"
                floatingLabelText="Enter username here"
                style={{ alignItems: 'center'}}
                onChange = {this.handleUsernameChange}
                />
              <br/>
              <TextField
                id="userpwd"
                value={this.state.password}
                hintText="password"
                floatingLabelText="Enter password here"
                errorText={this.state.password_error}
                type= "password"
                error={this.state.error.pwd}
                style={{ alignItems: 'center'}}
                onChange = {this.handlePasswordChange}
                />
              <br/>
              <br/>
              <RaisedButton  id="btnLogin" label="Login" primary={true} style={{margin: 15,minWidth: 150}}
               onClick={(event) => { this.handleRegister(event) }}
               >
              </RaisedButton>
           
              <Link to={{ pathname: "/Create" }}>
              <RaisedButton  id="btnCreate" label="Create Account new" primary={true} style={{margin: 15 ,minWidth: 150}} > 
               </RaisedButton>
               </Link>
              <br/>
              <Checkbox style={{width:200, marginLeft:650}} value={this.state.rememberMe} labelPosition="right" 
              label="Remember Me ?"
              onChangeCapture={(event) => { 
                 this.state.rememberMe=event.target.checked 
              }}></Checkbox>
  
  
              <hr style={{"margin": 10}}/>
              <h4 style={{"color": "#878181"}}>use social login?</h4>
              
              <GoogleLogin
                clientId="228016333193-44664g1hnhq023mo7pv1i4itmeduu1df.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogleFail}
              />
              <br/><br/>
              <FacebookLogin
                appId="2150953554964623"
                autoLoad={false}
                fields="name,email"
                callback={this.responseForFacebook} /> 
              
              
          </form> 
          
        </div>
      </MuiThemeProvider> 
    </div>
    );
  }
}
const stateToProps=(state)=>{
return{
      user:state.user
    }
}
const mapdispachToProps=(dispach)=>
{
  return{
    onUserLogin:(firstname,lastname,email,sessionKey)=>dispach({type:'User_Login',FirstName:firstname,LastName:lastname,Email:email,SessionKey:sessionKey})
  }
}
// export default App; 
export default connect(stateToProps,mapdispachToProps)(App);
