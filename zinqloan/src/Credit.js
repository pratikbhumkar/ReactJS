import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import ReactDOM from 'react-dom';
import Payment from './Payment'
import logo from './stick-single.png'
import couple from './stick-couple.png'
import App from './App';
// import {  StyleSheet, TouchableHighlight} from 'react-native';

class Credit extends Component {
    constructor(props){
        super(props);
        if(typeof this.props.UserObj !== 'undefined'){
          this.state={
            first_name:this.props.UserObj.FirstName,
            last_name:this.props.UserObj.LastName,
            email:'',
            number:'',
          }
        }
        else{
          this.state={
            first_name:'First Name',
            last_name:'Surname',
            email:'Email',
            number:'Number',
          }
        }
       
        this.handleSingleClick = this.handleSingleClick.bind(this);
        this.handleCoupleClick = this.handleCoupleClick.bind(this);
        this.UserObj=this.props.UserObj
    }
      handleSingleClick(event) {
        var UserObj=this.props.UserObj
        UserObj.status='single'
        ReactDOM.render(<Payment user={UserObj}/>, document.getElementById('root'));
      }
      handleCoupleClick(event) {
        var UserObj=this.props.UserObj
        UserObj.status='couple'
        ReactDOM.render(<Payment user={UserObj}/>, document.getElementById('root'));
      }
      HandleLogout(event) {
        ReactDOM.render(<App />, document.getElementById('root'));
      }
    render() {
      
        return (
    <div>
            <MuiThemeProvider>
        <div >
            <form style={{textAlign:"center"}}>
            <AppBar title="Zinq" >
            <RaisedButton label="Log out" primary={true} style={{margin: 15}} onClick={(event) => this.HandleLogout(event)}/> 
             </AppBar>
                <h1> <center>Welcome to credit page, {this.state.first_name} {this.state.last_name}</center></h1>
                
              <RaisedButton style={{height: 30,width: 5,margin: 25 ,backgroundColor: 'rgba(52, 52, 52, 1)'}} onClick={(event) => this.handleSingleClick(event)}>
                <img src={logo} alt="Single"></img> <p>Single</p>
              </RaisedButton>
              <RaisedButton style={{height: 30,width: 10,margin: 25,backgroundColor: 'rgba(52, 52, 52, 1)'}} onClick={(event) => this.handleCoupleClick(event)} >
                <img src={couple} alt="Couple"></img> <p>Couple</p>
              </RaisedButton>
            </form>
         </div>
          </MuiThemeProvider>
    </div>)
      }
    }

export default Credit;