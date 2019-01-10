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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '',
                  username_error:'',
                  password: '',
                  password_error:'',
                  products:[],
                  error:[],
                  User_FirstNameNew: '',
                  User_LastNameNew: '',
                  toWelcome: false,
                  allGoodFlag:false
                }
    
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }
   
  
  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }


  handleLogins(event) {
    const errors={}
    var re =  new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    var emailVer=re.test(String(this.state.username).toLowerCase())
    var strongRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
    var PassVer=strongRegex.test(String(this.state.password))
    var flagInvalid=false
    if(this.state.username.length <4){
      errors.username_error="First name must be atleast 3 characters long"
      flagInvalid=true
    }
    if(emailVer === false){
      errors.username_error="Email address is invalid"
      flagInvalid=true
    }
    if(PassVer === false){
      errors.password_error="Password is invalid, Re-enter."
      flagInvalid=true
    }
    this.setState({
      ...this.state,
      ...errors
    })
    if(flagInvalid==false){
        // fetch(`http://localhost:5000/user/get?email=${this.state.username}&password=${this.state.password}`)
        fetch(`http://localhost:5000/user/get?email=prateekbhumkar@gmail.com&password=pratik`)
        .then((response) => { 
          return response.json() 
        }).then((response) => {
          this.setState({
            User_FirstNameNew: response.data[0].User_FirstName,
            User_LastNameNew : response.data[0].User_LastName
          })
          var user={
            FirstName: this.state.User_FirstNameNew,
            LastName: this.state.User_LastNameNew,
            status:'',
            report:''
          }
          
            ReactDOM.render((
              <Router>
                <Welcome UserObj={user}/>
              </Router>
            ), document.getElementById('root'))
        })
        .catch(()=> alert("Login Failed please re-enter!"))
            }
    }
    
  handleRegister(event) {
    ReactDOM.render((
      <Router>
        <Create />
      </Router>
    ), document.getElementById('root'))
  }
  render() {
    return (
<div>
    <MuiThemeProvider>
      <div className="login" >
       <form style={{textAlign:"center"}}>
       <AppBar title="Zinq"/>
            <h1>Login</h1>
              <TextField
              autoFocus
              autoComplete
              hintText="username"
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
        </form> 
      </div>
    </MuiThemeProvider> 
  </div>
      );
  }
}

export default App;
