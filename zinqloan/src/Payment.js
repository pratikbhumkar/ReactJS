import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import ReactDOM from 'react-dom';
import Income from './Income'
import App from './App';
import User from './Models/UserModel'

class Payment extends Component {
      handleClick() {
        var user=new User()
        if(typeof this.props.UserObj !== 'undefined'){
          user=this.props.UserObj
        }
        
        ReactDOM.render(<Income UserObj={user}/>, document.getElementById('root'));
      }
      HandleLogout(event) {
        ReactDOM.render(<App />, document.getElementById('root'));
      }
      render() {
        return (
  <div>
    <MuiThemeProvider>
      <div>
        <form style={{textAlign:"center"}}>
          <AppBar title="Zinq"> 
          <RaisedButton id="btnLogout" label="Log out" primary={true} style={{margin: 15}} onClick={(event) => this.HandleLogout(event)}/> 
          </AppBar>
            <h1>Property Type </h1>
            <RaisedButton id="btnOwnOcc" label="Owner occupier" primary={true} style={{margin: 15 ,minWidth: 200}} 
            onClick={(event) => this.handleClick(event)}/>
            <br/>
            <RaisedButton id="btnInvesy" label="Investment" primary={true} style={{margin: 15 ,minWidth: 200}} 
            onClick={(event) => this.handleClick(event)}/>
            <h1>Payment Type </h1>
            <RaisedButton id="btnPrinInt" label="Principle + Interest" primary={true} style={{margin: 15 ,minWidth: 200}} 
            onClick={(event) => this.handleClick(event)}/>
            <br/>
            <RaisedButton id="btnInt" label="Interest Only" primary={true} style={{margin: 15,minWidth: 200}}
             onClick={(event) => this.handleClick(event)}/>
        </form>
      </div>
    </MuiThemeProvider>
  </div>)
      }
    }
export default Payment;