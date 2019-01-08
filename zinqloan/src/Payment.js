import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import ReactDOM from 'react-dom';
import Income from './Income'
import App from './App';

class Payment extends Component {
      handleClick() {
        alert('typeof check')
        alert(typeof this.props.user)
        if(typeof this.props.user !== 'undefined'){
        alert('in if ')
        var userObj= this.props.user
        }
        else{
          alert('in else')
          var userObj={
            FirstName: 'First Name',
            LastName: 'Surname',
            status:'Couple',
            report:''
          }
        }
        ReactDOM.render(<Income user={userObj}/>, document.getElementById('root'));
      }
      handlePartExpenseChange(event) {
        ReactDOM.render(<App />, document.getElementById('root'));
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
          <RaisedButton label="Log out" primary={true} style={{margin: 15}} onClick={(event) => this.HandleLogout(event)}/> 
          </AppBar>
            <h1>Property Type </h1>
            <RaisedButton label="Owner occupier" primary={true} style={{margin: 15 ,minWidth: 200}} 
            onClick={(event) => this.handleClick(event)}/>
            <br/>
            <RaisedButton label="Investment" primary={true} style={{margin: 15 ,minWidth: 200}} 
            onClick={(event) => this.handleClick(event)}/>
            <h1>Payment Type </h1>
            <RaisedButton label="Principle + Interest" primary={true} style={{margin: 15 ,minWidth: 200}} 
            onClick={(event) => this.handleClick(event)}/>
            <br/>
            <RaisedButton label="Interest Only" primary={true} style={{margin: 15,minWidth: 200}}
             onClick={(event) => this.handleClick(event)}/>
        </form>
      </div>
    </MuiThemeProvider>
  </div>)
      }
    }
export default Payment;