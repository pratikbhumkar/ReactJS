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
                  password: '',
                  products:[],
                  User_FirstNameNew: 'pratik',
                  User_LastNameNew: 'bhumkar',
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
    fetch(`http://localhost:5000/user/get?email=${this.state.username}&password=${this.state.password}`)
    // fetch(`http://localhost:5000/user/get?email=prateekbhumkar@gmail.com&password=pratik`)
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
              type="email"
              floatingLabelText="Enter username here"
              style={{ alignItems: 'center'}}
              onChange = {this.handleUsernameChange}
              />
            <br/>
            <TextField
              hintText="password"
              floatingLabelText="Enter password here"
              type= "password"
              style={{ alignItems: 'center'}}
              onChange = {this.handlePasswordChange}
              />
            <br/><br/>
            <RaisedButton label="Login" primary={true} style={{margin: 15,minWidth: 150}} onClick={(event) => { this.handleLogins() }}/>
            <RaisedButton label="Create Account" primary={true} style={{margin: 15 ,minWidth: 150}} onClick={(event) => this.handleRegister()}/>
            
        </form> 
      </div>
    </MuiThemeProvider> 
  </div>
      );
  
}
}

export default App;
