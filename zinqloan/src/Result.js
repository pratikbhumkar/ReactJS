import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import App from './App';
import ReactDOM from 'react-dom';

class Result extends Component {

    constructor(props){
        super(props);
        if(typeof this.props.user !== 'undefined'){
          this.state={
            userObj:this.props.user,
          FirstName:this.props.user.FirstName,
          LastName:this.props.user.LastName
          }
        }
        else{
          var user={
            FirstName: 'First Name',
            LastName: 'Surname',
            status:'Couple',
            report:''
          }
          this.state={
          userObj:user,
          FirstName:'First Name',
          LastName:'Surname'
          }
        }
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
      <h1> {this.state.FirstName} {this.state.LastName}</h1>
      <h1> {this.state.userObj.report} </h1>
      </form>
      </div>
          </MuiThemeProvider>
       </div>)
      }
    }
export default Result;