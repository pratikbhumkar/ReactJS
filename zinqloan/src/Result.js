import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Cookies from 'universal-cookie';
import User from './Models/UserModel'
import {connect} from 'react-redux'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import { Redirect } from "react-router-dom";
import reducer from './Reducer/ReducerContent'
/**
 * The result component displays whether the user is elible for the loan or not.
 */
class Result extends Component {

    constructor(props){
        super(props);
        this.props.onResult()
        //Creating the user object.
        var user=new User()
        //Checking if it is not initialized
        if(typeof this.props.user!== 'undefined'){
          user=this.props.user
        }
        //Setting user properties.
          this.state={
            first_name:user.getUserFirstName(),
            last_name:user.getUserLastName(),
            report:user.getUserReport(),
            cookieKey:0,
            sessionValid:false ,
            redirectToHome:false ,
            sessionKey:user.getUserCookieKey()
          }
          const cookies = new Cookies();
          var userSessionCookie= cookies.get('ZinqLoanSession')
          if(typeof userSessionCookie !== 'undefined'){
              this.state.cookieKey= userSessionCookie["key"]
          }
          console.log("cookie key",this.state.cookieKey,"sessionkey",this.state.sessionKey)
  
          if(this.state.sessionKey===this.state.cookieKey)
              this.state.sessionValid= true
  
      }
      /**
       * Logs out the user when clicking the Logout button.
       * @param {*} event 
       */
      HandleLogout(event) {
        const cookies = new Cookies();
        cookies.remove('ZinqLoan')
        this.setState({
          redirectToHome:true
        })
      }
      /**
       * Rendering the Result page.
       */
    render() {
      var store=createStore(reducer)
      if(this.state.redirectToHome){
         return(
           <Provider store={store}>
           <Redirect to={{
             pathname: '/'
         }}/>
         </Provider>
 
         )
       }
      var sessionInvalidContent=
      <div>
          <MuiThemeProvider>
            <div >
              <form style={{textAlign:"center"}}>
                <AppBar title="Zinq" />
                <h1>Session expired, Please Login again</h1>
              </form>
            </div>
          </MuiThemeProvider>
      </div>
       if(!this.state.sessionValid)
       return (sessionInvalidContent)
     else
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
        <RaisedButton id="btnLogout" label="Home" primary={true} style={{margin: 15}} onClick={(event) => this.HandleLogout(event)}/> 
        </form>
        </div>
            </MuiThemeProvider>
        </div>)
      }
    }
    const stateToProps=(state)=>{
      return{
        user:state.user
            }
    }
    const mapdispachToProps=(dispach)=>
    {
      return{
        onResult:()=>dispach({type:'User_Report'})
      }
    }
    export default connect(stateToProps,mapdispachToProps)(Result);