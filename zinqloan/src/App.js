import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Create from './Create.js'
import { BrowserRouter as Router,Redirect , Route, Link } from "react-router-dom";
import Welcome from './welcome';
import User from './Models/UserModel'
import { GoogleLogin } from 'react-google-login';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
// import FacebookLogin from 'react-facebook-login';
import Cookies from 'universal-cookie';
import { Checkbox } from 'material-ui';
import {connect} from 'react-redux'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducer from './Reducer/ReducerContent'

/**
 * This is the login component of the application.
 */
class App extends Component {
  
  constructor(props) {
    
    super(props);
    this.state = {username: '',
                  username_error:'',
                  password: '',
                  password_error:'',
                  rememberMe:false,
                  error:[],
                  redirectFlag:false,
                  firstname:'',
                  lastname:''
                }
                
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.responseForGoogle = this.responseForGoogle.bind(this);
    // this.responseForFacebook = this.responseForFacebook.bind(this);
    
  }
  
  componentDidMount(){
      const cookies = new Cookies();
      var userCookie= cookies.get('ZinqLoan')
      if(typeof userCookie !== 'undefined'){
        var user=new User()
        user.setUserFirstName(userCookie["user_firstname"])
        user.setUserLastName(userCookie["user_lastname"])
        user.setUserLastName(userCookie["user_email"])
        this.state.redirectFlag=true
        var random = require('math-random')
        var cookieKey=random()
        user.setUserCookieKey(cookieKey)
        cookies.set('ZinqLoanSession', {"key":cookieKey }, { path: '/',maxAge:9000 });
        this.props.onUserLogin(userCookie["user_firstname"],userCookie["user_lastname"],userCookie["user_email"],cookieKey)
        fetch(`http://localhost:5000/log/add?user_email=${this.state.username}
        &sessionkey=${user.getUserCookieKey()}&page=${'app'}&entry_type=${'success'}&error=${''}&user_action=${'login-success'}`)
        
      }
      else{
        this.state.redirectFlag=false
      }
     if(this.state.redirectFlag){
      var store=createStore(reducer)
      setTimeout(
        function() {ReactDOM.render((
          <Provider store={store}><Router>
              <Welcome UserObj={user}/>
            </Router></Provider>
          ), document.getElementById('root'))},
          2000
      );
     }
      
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
    //To store the errors
    const errors={}

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
            console.log(response.type,'in error','response')
            // fetch(`http://localhost:5000/log/add?user_email=${this.state.username}
            // &sessionkey=${user.getUserCookieKey()}&page=${'app'}&entry_type=${'error'}&error=${response}&user_action=${''}`)
          }
          else{
            if(this.state.rememberMe){
              cookies.set('ZinqLoan', {"user_firstname":response.data[0].user_firstname,"user_lastname":response.data[0].user_lastname,"user_email":this.state.username},
               { path: '/' });
            }
         
          var random = require('math-random')
          var user=new User()
          var cookieKey=random()
          user.setUserCookieKey(cookieKey)
          cookies.set('ZinqLoanSession', {"key":cookieKey }, { path: '/',maxAge:9000 });
          fetch(`http://localhost:5000/log/add?user_email=${this.state.username}
          &sessionkey=${user.getUserCookieKey()}&page=${'app'}&entry_type=${'success'}&error=${''}&user_action=${'login-success'}`)
          user.setUserFirstName(response.data[0].user_firstname)
          user.setUserLastName(response.data[0].user_lastname)
          user.setUserEmail(response.data[0].user_email)
          this.props.onUserLogin(response.data[0].user_firstname,response.data[0].user_lastname,response.data[0].user_email,cookieKey)
              ReactDOM.render((
                <Router>
                  <Welcome UserObj={user}/>
                </Router>
              ), document.getElementById('root'))
          }
          
        })
        .catch((err)=> console.log(err) )
            }
      else{
        this.setState({
          ...this.state,
          ...errors
        })
      }
    }
    // responseForFacebook(facebookUser){
    //   var name=(facebookUser.name)
    //   var user=new User()
    //   var firstname= name.split(' ')[0]
    //   var lastname= name.split(' ')[1]
    //   user.setUserFirstName(firstname)
    //   user.setUserLastName(lastname)
      
    //   ReactDOM.render((
    //     <Router>
    //       <Welcome UserObj={user}/>
    //     </Router>
    //   ), document.getElementById('root'))

    // }
    responseForGoogle(googleUser){
      
      var user=new User()
      user.setUserFirstName(googleUser.w3.ofa)
      user.setUserLastName(googleUser.w3.wea)
      ReactDOM.render((
        <Router>
          <Welcome UserObj={user}/>
        </Router>
      ), document.getElementById('root'))
    }
/**
 * This method redirects user to the create window, once clicked.
 * @param {*} event 
 */
  handleRegister(event) {
    ReactDOM.render((
      <Router>
        <Create />
      </Router>
    ), document.getElementById('root'))
  }
  /**
   * Rendering the Login page.
   */
  render() {
    const responseGoogleFail = (response) => {
      console.log(response)
    }
    const responseGoogle = (responseFromGoogle) => {
      this.responseForGoogle(responseFromGoogle)
    }
    
    const content=<div>
    <MuiThemeProvider>
      <div className="login" >
       <form style={{textAlign:"center"}}>
       <AppBar title="Zinq"/>
     
            <h1>Login</h1>
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
            <RaisedButton id="btnLogin" label="Login" primary={true} style={{margin: 15,minWidth: 150}} onClick={(event) => { this.handleLogins() }}/>
            <RaisedButton id="btnCreate" label="Create Account" primary={true} style={{margin: 15 ,minWidth: 150}} onClick={(event) => this.handleRegister()}/>   
            <br/>
            <Checkbox style={{width:200, marginLeft:650}} value={this.state.rememberMe} labelPosition="right" 
            label="Remember Me ?"
            onChangeCapture={(event) => { 
               this.state.rememberMe=event.target.checked 
            }}></Checkbox>


            <hr style={{"margin": 50}}/>
            <br/>
            <GoogleLogin
              clientId="228016333193-44664g1hnhq023mo7pv1i4itmeduu1df.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogleFail}
            />
            <br/>
            <br/>
            <br/>
            <br/>
            
             {/* <FacebookLogin
                appId="2150953554964623"
                autoLoad={true}
                fields="name,email"
                // onClick={componentClicked}
                callback={this.responseForFacebook} /> */}
                {/* <Router>
                <button>
                <Redirect to="http://google.com"/>
                {/* <Link to="http://google.com">google</Link> */}
                {/* </button> */}
                {/* </Router> */} 
        </form> 
        
      </div>
    </MuiThemeProvider> 
  </div>
    return(content);
  }
}
const stateToProps=(state)=>{
return{
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
