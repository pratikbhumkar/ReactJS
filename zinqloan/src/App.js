import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Form, FormGroup,Checkbox,FormControl,ControlLabel, Button } from 'react-bootstrap' // add more if you are using more components from bootstrap

const formInstance=(

  <div className="login" >
  <h1><center>Zinq</center></h1>
        <form style={{textAlign:"center"}}>
          <FormGroup controlId="email" bsSize="large"  >
            <ControlLabel style={{marginRight:45}}>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value="Email Id"
            />
          </FormGroup>
          <br></br>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel style={{marginRight:20}}>Password</ControlLabel>
            <FormControl
              value="Password Here"
              type="password"
            />
          </FormGroup>
          <br></br>
          <br></br>
          <Button
            block
            bsSize="large"
            // disabled={!this.validateForm()}
            type="submit"
            style={{marginRight:70, width: 120}}
          >
            Login
          </Button>
          <Button
            block
            bsSize="large"
            // disabled={!this.validateForm()}
            type="create"
            style={{ width: 120}}
          >
            Create Account
          </Button>
        </form>
      </div>
)

class App extends Component {
  render() {
    return (formInstance);
  }
}

export default App;
