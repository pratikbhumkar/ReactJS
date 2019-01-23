import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Create from './Create.js'
import { BrowserRouter as Router } from "react-router-dom";
import Welcome from './welcome';
import User from './Models/UserModel'
import { GoogleLogin } from 'react-google-login';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import FacebookLogin from 'react-facebook-login';
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
                  error:[]
                }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.responseForGoogle = this.responseForGoogle.bind(this);
    this.responseForFacebook = this.responseForFacebook.bind(this);
    
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
    if(flagInvalid==false){
        fetch(`http://localhost:5000/user/get?email=${this.state.username}&password=${this.state.password}`)
        .then((response) => { 
          return response.json() 
        }).then((response) => {
        var user=new User()
        user.setUserFirstName(response.data[0].User_FirstName)
        user.setUserLastName(response.data[0].User_LastName)
          
            ReactDOM.render((
              <Router>
                <Welcome UserObj={user}/>
              </Router>
            ), document.getElementById('root'))
        })
        .catch(()=> alert("Login Failed please re-enter!"))
            }
      else{
        this.setState({
          ...this.state,
          ...errors
        })
      }
    }
    responseForFacebook(facebookUser){
      var name=(facebookUser.name)
      var user=new User()
      var firstname= name.split(' ')[0]
      var lastname= name.split(' ')[1]
      user.setUserFirstName(firstname)
      user.setUserLastName(lastname)
      
      ReactDOM.render((
        <Router>
          <Welcome UserObj={user}/>
        </Router>
      ), document.getElementById('root'))

    }
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
    // const responseFacebook = (responseFromFacebook) => {
    //   alert('called')
    //   console.log(responseFromFacebook.name)
    //   this.responseForFacebook(responseFromFacebook)
    // }
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
            <br/><br/>
            <RaisedButton id="btnLogin" label="Login" primary={true} style={{margin: 15,minWidth: 150}} onClick={(event) => { this.handleLogins() }}/>
            <RaisedButton id="btnCreate" label="Create Account" primary={true} style={{margin: 15 ,minWidth: 150}} onClick={(event) => this.handleRegister()}/>   
            <br/>
            <br/>
            <GoogleLogin
              clientId="228016333193-44664g1hnhq023mo7pv1i4itmeduu1df.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogleFail}
            />
            <br/>
            <br/>
            <br/>
            <br/>
             <FacebookLogin
                appId="2150953554964623"
                autoLoad={true}
                fields="name,email"
                // onClick={componentClicked}
                callback={this.responseForFacebook} />
            
        </form> 
        
      </div>
    </MuiThemeProvider> 
  </div>
 
  
 
    return(content);
  }
}

export default App;
