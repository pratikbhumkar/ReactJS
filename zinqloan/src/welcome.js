import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Credit from './Credit'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import User from './Models/UserModel'

class Welcome extends Component {
    constructor(props){
        super(props);
        //Creating the user object.
        var user=new User()
        //Checking if it is not initialized
        if(typeof this.props.UserObj !== 'undefined'){
          user=this.props.UserObj
        }
          this.state={
            first_name:user.getUserFirstName(),
            last_name:user.getUserLastName()
          }
      }
      /**
       * This method redirects user to credit page passing the user object along with it.
       */
      handlePageChange() {

        var user=this.props.UserObj
        //Redirecting with an delay of 3 seconds.
        setTimeout(
          function() {
            ReactDOM.render((
              <Router>
                <Credit UserObj={user}/>
              </Router>), document.getElementById('root'))},
          3000
      );
    }
    /**
     * Rendering Welcome page contents.
     */
    render() {
      this.handlePageChange()
        return (
            <div>
                  <MuiThemeProvider>
           <div >
           <form style={{textAlign:"center"}}>
           <AppBar title="Zinq"/>
           <h1>Welcome, {this.state.first_name} {this.state.last_name}</h1>
          <br/>
          <h4> You will be redirected to credit page shortly </h4>
           </form>
           </div>
          </MuiThemeProvider>
          
        </div>
        );
  }
}
export default Welcome;