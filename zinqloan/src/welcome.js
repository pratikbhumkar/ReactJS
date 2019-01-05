import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Credit from './Credit'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";

class Welcome extends Component {
    constructor(props){
        super(props);
        this.state={
          first_name:this.props.UserObj.FirstName,
          last_name:this.props.UserObj.LastName
        }
      }
      handlePageChange() {
        
        var user=this.props.UserObj
        setTimeout(
          function() {
            ReactDOM.render((
              <Router>
                <Credit UserObj={user}/>
              </Router>
            ), document.getElementById('root'))},
          3000
      );
      }

    render() {
      
      this.handlePageChange()
        return (
            <div>
                  <MuiThemeProvider>
           <div >
           <AppBar title="Zinq"/>
           </div>
          </MuiThemeProvider>
          <h1> <center>Welcome, {this.state.first_name} {this.state.last_name}</center></h1>
          <br/>
          <h4> <center>You will be redirected to credit page shortly </center></h4>
        </div>
        );
        
}
}
export default Welcome;