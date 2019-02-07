import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Provider} from 'react-redux'
import User from './Models/UserModel'
import Cookies from 'universal-cookie';
import {connect} from 'react-redux'
import {createStore} from 'redux'
import reducer from './Reducer/ReducerContent'
import { Redirect } from "react-router-dom";
/**
 * Income component captures the user income and checks the user's eligibility, sets the message accordingly.
 */
class Income extends Component {
    constructor(props){
        super(props);
        //Creating the user object.
        var user=new User()
        //Checking if it is not initialized
        if(typeof this.props.user!== 'undefined'){
         user=this.props.user
       }
         this.state={
            app_inc:0,
            app_exp:0,
            part_inc:0,
            part_ex:0,
            cookieKey:0,
            sessionKey:user.getUserCookieKey(),
            sessionValid:false ,
            first_name:user.getUserFirstName(),
            last_name:user.getUserLastName(),
            status:user.getUserStatus(),
            user:props.user,
            redirectToResult:false
          }
          const cookies = new Cookies();
          var userSessionCookie= cookies.get('ZinqLoanSession')
          if(typeof userSessionCookie !== 'undefined'){
              this.state.cookieKey= userSessionCookie["key"]
          }
          if(this.state.sessionKey===this.state.cookieKey)
              this.state.sessionValid= true
        
        this.handleClick = this.handleClick.bind(this);
      }
     

      /**
       * This method calculates the user's eligibility based income and expenses.
       * It uses the formula (total expenses)/ (total income) and if the result is more than 0.2 then the users request is approved.
       * else the user is asked to contact zinq.
       * @param {*} event 
       */
      handleClick(event) {
         
         //Creating the user object.
         var UserObj=new User()
         //Checking if it is not initialized
         if(typeof this.props.user !== 'undefined'){
            UserObj=this.props.user
          }
         // Calculating whether the user is eligible.
         var x = (this.state.app_exp+this.state.part_ex)/(this.state.app_inc+this.state.part_inc)
        
         //setting user report
         if(x>0.2){
            var report='Congratulations!'
            UserObj.setUserReport(report)
         }
         else{
            report='Please contact us.'
            UserObj.setUserReport(report)
         }
         this.props.onIncomeExpenseSelection((Number(this.state.app_inc)+Number(this.state.part_inc)),
         Number(this.state.app_exp)+Number(this.state.part_ex),report)
         //Redirecting user and passing the user object.
         this.setState({
            redirectToResult:true
          })
      }
      /**
       * Logs out the user when clicking the Logout button.
       * @param {*} event 
       */
      HandleLogout(event) {
         const cookies = new Cookies();
         cookies.remove('ZinqLoan')
         //Redirecting user to  login page.
         this.setState({
            redirectToHome:true
          })
       }
   
   /**
       * Rendering the Income page.
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
      if(this.state.redirectToResult){
         return(
           <Provider store={store}>
           <Redirect to={{
             pathname: '/Result'
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
     
       // Rendering contents if the user is single.
      if(this.state.status ==="single" && !this.props.sessionFlag){
         return (
           <div>
                  <MuiThemeProvider>
           <div >
           <form style={{textAlign:"center"}}>
           <AppBar title="Zinq" >
           <RaisedButton id="btnLogout" label="Log out" primary={true} style={{margin: 15}} onClick={(event) => this.HandleLogout(event)}/> 
            </AppBar>
            <TextField
             id="userInc"
             hintText="Your Income"
             floatingLabelText="Enter your income"
             style={{ alignItems: 'center'}}
             onChange =  {(event,newValue) => this.setState({app_inc:newValue})}
             />
          <br></br>
          <TextField
             id="userExp"
             hintText="Your Expenses"
             floatingLabelText="Enter your expenses"
             style={{ alignItems: 'center'}}
             onChange =  {(event,newValue) => this.setState({app_exp:newValue})}
             />
          <br></br>
          <RaisedButton id="btnSubmit" label="Submit" primary={true} style={{margin: 15}} onClick={(event) => this.handleClick(event)}/>
           </form>
            </div>
          </MuiThemeProvider>
       </div>
        );
      }
      // Rendering contents if the user is couple.
      else{
         return (
      <div>
         <MuiThemeProvider>
           <div >
           <form style={{textAlign:"center"}}>
           <AppBar title="Zinq" >
           <RaisedButton id="btnLogout" label="Log out" primary={true} style={{margin: 15}} onClick={(event) => this.HandleLogout(event)}/> 
            </AppBar>
            <TextField
             hintText="Your Income"
             id="userInc"
             floatingLabelText="Enter your income"
             style={{ alignItems: 'center'}}
             onChange =  {(event,newValue) => this.setState({app_inc:newValue})}
             />
          <br></br>
          <TextField
             id="userExp"
             hintText="Your Expenses"
             floatingLabelText="Enter your expenses"
             style={{ alignItems: 'center'}}
             onChange =  {(event,newValue) => this.setState({app_exp:newValue})}
             />
          <br></br>
          <TextField
             hintText="Your partner's Income"
             isHidden="true"
             id="partin"
             floatingLabelText="Enter your partner's income"
             style={{ alignItems: 'center'}}
             onChange =  {(event,newValue) => this.setState({part_inc:newValue})}
             />
          <br></br>
          <TextField
             hintText="Your partner's Expenses"
             id="partex"
             floatingLabelText="Enter your partner's expenses"
             style={{ alignItems: 'center'}}
             onChange =  {(event,newValue) => this.setState({part_ex:newValue})}
             />
          <br></br>
          <RaisedButton id="btnSubmit" label="Submit" primary={true} style={{margin: 15}} onClick={(event) => this.handleClick(event)}/>

           </form>
            </div>
          </MuiThemeProvider>
       </div>
        );
      }
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
       onIncomeExpenseSelection:(income,expense,report)=>dispach({type:'User_Income_Expenses',income:income,expense:expense,report:report})
     }
   }
 

   export default connect(stateToProps,mapdispachToProps)(Income);
