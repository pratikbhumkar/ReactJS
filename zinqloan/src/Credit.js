import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import ReactDOM from 'react-dom';
import Payment from './Payment'
import logo from './stick-single.png'
import couple from './stick-couple.png'
import App from './App';
import User from './Models/UserModel'

class Credit extends Component {
    constructor(props){
        super(props);
        var user=new User()
        if(typeof this.props.UserObj !== 'undefined'){
          user=this.props.UserObj
        }
        this.state={
          first_name:user.getUserFirstName(),
          last_name:user.getUserLastName()
        }
        this.handleSingleClick = this.handleSingleClick.bind(this);
        this.handleCoupleClick = this.handleCoupleClick.bind(this);
    }
      handleSingleClick(event) {
        var UserObj=new User()
        var UserObj=this.props.UserObj
        UserObj.setUserStatus('single')
        ReactDOM.render(<Payment UserObj={UserObj}/>, document.getElementById('root'));
      }
      handleCoupleClick(event) {
        var UserObj=new User()
        var UserObj=this.props.UserObj
        UserObj.setUserStatus('couple')
        ReactDOM.render(<Payment UserObj={UserObj}/>, document.getElementById('root'));
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
            <RaisedButton id="btnLogout" label="Log out" primary={true} style={{margin: 15}} onClick={(event) => this.HandleLogout(event)}/> 
             </AppBar>
                <h1> <center>Welcome to credit page, {this.state.first_name} {this.state.last_name}</center></h1>
                
              <RaisedButton id="btnSingle" style={{height: 30,width: 5,margin: 25 ,backgroundColor: 'rgba(52, 52, 52, 1)'}} onClick={(event) => this.handleSingleClick(event)}>
                <img src={logo} alt="Single"></img> <p>Single</p>
              </RaisedButton>
              <RaisedButton id="btnCoup" style={{height: 30,width: 10,margin: 25,backgroundColor: 'rgba(52, 52, 52, 1)'}} onClick={(event) => this.handleCoupleClick(event)} >
                <img src={couple} alt="Couple"></img> <p>Couple</p>
              </RaisedButton>
            </form>
         </div>
          </MuiThemeProvider>
    </div>)
      }
    }

export default Credit;