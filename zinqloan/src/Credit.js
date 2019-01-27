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
import Cookies from 'universal-cookie';

/**
 * Handling the Credit operations.
 */
class Credit extends Component {
    constructor(props){
        super(props);
        //Creating the user object.
        var user=new User()
        //Checking if it is not initialized
        if(typeof this.props.UserObj !== 'undefined'){
          user=this.props.UserObj
        }
        //Setting user properties
        this.state={
          first_name:user.getUserFirstName(),
          last_name:user.getUserLastName()
        }
        this.handleSingleClick = this.handleSingleClick.bind(this);
        this.handleCoupleClick = this.handleCoupleClick.bind(this);
    }
    /**
     * Renders the payment page if the user is single.
     * @param {*} event 
     */
      handleSingleClick(event) {
        //Creating the user object.
        var UserObj=new User()
        UserObj=this.props.UserObj
        //Setting user's status as single.
        UserObj.setUserStatus('single')
        //Redirecting user and passing object.
        ReactDOM.render(<Payment UserObj={UserObj}/>, document.getElementById('root'));
      }
      /**
       * Renders the payment page if the user is couple.
       * @param {*} event 
       */
      handleCoupleClick(event) {
        var UserObj=new User()
        UserObj=this.props.UserObj
        //Setting user's status as single.
        UserObj.setUserStatus('couple')
        //Redirecting user and passing object.
        ReactDOM.render(<Payment UserObj={UserObj}/>, document.getElementById('root'));
      }
      /**
       * Logs out the user when clicking the Logout button.
       * @param {*} event 
       */
      HandleLogout(event) {
        const cookies = new Cookies();
        cookies.remove('ZinqLoan')
        ReactDOM.render(<App />, document.getElementById('root'));
      }
      /**
       * Rendering the Credit page.
       */
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