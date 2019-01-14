import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ReactDOM from 'react-dom'; 
import Result from './Result';
import App from './App';
import User from './Models/UserModel'

class Income extends Component {
    constructor(props){
        super(props);
        var user=new User()
        if(typeof this.props.UserObj !== 'undefined'){
         user=this.props.UserObj
       }
        
         this.state={
            app_inc:1,
            app_exp:1,
            part_inc:1,
            part_ex:1,
            first_name:user.getUserFirstName(),
            last_name:user.getUserLastName(),
            status:user.getUserStatus()
          }
        this.handleClick = this.handleClick.bind(this);
      }
     

      
      handleClick(event) {
         var UserObj=new User()
         if(typeof this.props.UserObj !== 'undefined'){
            UserObj=this.props.UserObj
          }
         
         var x = (this.state.app_exp+this.state.part_ex)/(this.state.app_inc+this.state.part_inc)
         if(x>0.2){
            UserObj.setUserReport('Congratulations!')
         }
         else{
            UserObj.setUserReport('Please contact us.')
         }
         ReactDOM.render(<Result UserObj={UserObj}/>, document.getElementById('root'));
      }
      HandleLogout(event) {
         ReactDOM.render(<App />, document.getElementById('root'));
       }
    render() {
      if(this.state.status ==="single"){
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
export default Income;