import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import {Provider} from 'react-redux'

import User from './Models/UserModel'
import Cookies from 'universal-cookie';
import {connect} from 'react-redux'
import {createStore} from 'redux'
import reducer from './Reducer/ReducerContent'
import { Redirect } from "react-router-dom";


class Payment extends Component {
  constructor(props) {
    
    super(props)
    var user=new User()
    //Checking if it is not initialized
    if(typeof this.props.user !== 'undefined'){
      user=this.props.user
    }
    this.state = {cookieKey:0,
                  sessionValid:false ,
                  user:props.user,
                  sessionKey:user.getUserCookieKey(),
                  redirectToIncome:false
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
       * Redirects user to Income page.
       */
      handleClick() {
        this.props.onUserbuttonclick()
        //Creating the user object.
        var user=new User()
        
        //Checking if it is not initialized
        if(typeof this.props.user!== 'undefined'){
          user=this.props.user
        }
        
        //Redirecting user and passing the user object.
        this.setState({
          redirectToIncome:true
        })
      }
      /**
       * Logs out the user when clicking the Logout button.
       * @param {*} event 
       */
      HandleLogout(event) {
        const cookies = new Cookies();
        // var store=createStore(reducer)
        cookies.remove('ZinqLoan')
        //Redirecting user to  login page.
        this.setState({
          redirectToHome:true
        })
      }

      /**
       * Rendering the Payment page.
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
      if(this.state.redirectToIncome){
        return(
          <Provider store={store}>
          <Redirect to={{
            pathname: '/Income'
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
      <div>
        <form style={{textAlign:"center"}}>
          <AppBar title="Zinq"> 
          <RaisedButton id="btnLogout" label="Log out" primary={true} style={{margin: 15}} onClick={(event) => this.HandleLogout(event)}/> 
          </AppBar>
            <h1>Property Type </h1>
            <RaisedButton id="btnOwnOcc" label="Owner occupier" primary={true} style={{margin: 15 ,minWidth: 200}} 
            onClick={(event) => this.handleClick(event)}/>
            <br/>
            <RaisedButton id="btnInvest" label="Investment" primary={true} style={{margin: 15 ,minWidth: 200}} 
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
    const stateToProps=(state)=>{
      return{
        user:state.user
           }
    }
      const mapdispachToProps=(dispach)=>
      {
        return{
          onUserbuttonclick:()=>dispach({type:'User_Selection'})
        }
      }
      // export default App;
      export default connect(stateToProps,mapdispachToProps)(Payment);
