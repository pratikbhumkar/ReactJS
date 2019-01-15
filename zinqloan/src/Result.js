import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import App from './App';
import ReactDOM from 'react-dom';
import User from './Models/UserModel'

/**
 * The result component displays whether the user is elible for the loan or not.
 */
class Result extends Component {

    constructor(props){
        super(props);
        //Creating the user object.
        var user=new User()
        //Checking if it is not initialized
        if(typeof this.props.UserObj !== 'undefined'){
          user=this.props.UserObj
        }
        //Setting user properties.
          this.state={
            first_name:user.getUserFirstName(),
            last_name:user.getUserLastName(),
            report:user.getUserReport()
          }
      }
      /**
       * Logs out the user when clicking the Logout button.
       * @param {*} event 
       */
      HandleLogout(event) {
        ReactDOM.render(<App />, document.getElementById('root'));
      }
      /**
       * Rendering the Result page.
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
      <h1> {this.state.first_name} {this.state.last_name}</h1>
      <h1> {this.state.report} </h1>
      </form>
      </div>
          </MuiThemeProvider>
       </div>)
      }
    }
export default Result;