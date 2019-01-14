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

    
    if(emailVer === false){
      errors.username_error="Email address is invalid, Re-enter."
      flagInvalid=true
    }
    if(PassVer === false){
      errors.password_error="Password is invalid, Re-enter."
      flagInvalid=true
    }

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

  handleRegister(event) {
    ReactDOM.render((
      <Router>
        <Create />
      </Router>
    ), document.getElementById('root'))
  }
  render() {
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
    return(content);
  }
}

export default App;
