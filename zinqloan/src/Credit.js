import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import logo from './stick-single.png'
import couple from './stick-couple.png'
import User from './Models/UserModel'
import Cookies from 'universal-cookie';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducer from './Reducer/ReducerContent'
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";

/**
 * Handling the Credit operations.
 */
class Credit extends Component {
  
    constructor(props){
        super(props);
        //Creating the user object.
        var user=new User()
        //Checking if it is not initialized
        if(typeof this.props.user !== 'undefined'){
          user=this.props.user
        }
        //Setting user properties
        this.state={
          sessionKey:user.getUserCookieKey(),
          first_name:user.getUserFirstName(),
          last_name:user.getUserLastName(),
          cookieKey:0,
          sessionValid:false,
          user:props.user,
          redirectToPayment:false
        }
        
        const cookies = new Cookies();
        var userSessionCookie= cookies.get('ZinqLoanSession')
        if(typeof userSessionCookie !== 'undefined'){
          
            this.state.cookieKey= userSessionCookie["key"]
            console.log("in if",userSessionCookie["key"],this.state.sessionKey)
        }
        console.log("cookie key",this.state.cookieKey,"sessionkey",this.state.sessionKey)

        if(this.state.sessionKey===this.state.cookieKey){
          this.state.sessionValid= true
          console.log("true",this.state.sessionKey,this.state.user.getUserCookieKey())
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
        var UserObj=this.state.user
        //Setting user's status as single.
        UserObj.setUserStatus('single')
        this.props.onUserStatusSelection('single')
        //Redirecting user and passing object.
        console.log('hande sing cl')
        this.setState({
          redirectToPayment:true
        })
      }
      /**
       * Renders the payment page if the user is couple.
       * @param {*} event 
       */
      handleCoupleClick(event) {
        var UserObj=new User()
        UserObj=this.state.user
        //Setting user's status as single.
        UserObj.setUserStatus('couple')
        this.props.onUserStatusSelection('couple')
        //Redirecting user and passing object.
        this.setState({
          redirectToPayment:true
        })
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
       * Rendering the Credit page.
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
      if(this.state.redirectToPayment){
        return(
          <Provider store={store}>
          <Redirect to={{
            pathname: '/Payment'
        }}/>
        </Provider>

        )
      }
      store=createStore(reducer)
      var sessionValidContent=
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
</div>
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
    return(sessionValidContent)
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
    onUserStatusSelection:(status)=>dispach({type:'User_Status',status:status})
  }
}
// export default App;
export default connect(stateToProps,mapdispachToProps)(Credit);
