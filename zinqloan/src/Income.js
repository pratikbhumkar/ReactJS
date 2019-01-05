import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ReactDOM from 'react-dom'; 
import Result from './Result';
import App from './App';

class Income extends Component {
    constructor(props){
        super(props);
        this.state={
          app_inc:0,
          app_exp:0,
          part_inc:0,
          part_ex:0,
          userObj:this.props.user
        }
        this.handleClick = this.handleClick.bind(this);
      }
     

      
      handleClick(event) {
         var x = (this.state.app_exp+this.state.part_ex)/(this.state.app_inc+this.state.part_inc)
         if(x>0.2){
            this.state.userObj.report='Congratulations!'
         }
         else{
            this.state.userObj.report='Please contact us.'
         }
         ReactDOM.render(<Result user={this.state.userObj}/>, document.getElementById('root'));
      }
      HandleLogout(event) {
         ReactDOM.render(<App />, document.getElementById('root'));
       }
    render() {
      if(this.state.userObj.status ==="single"){
         return (
            <div>
                  <MuiThemeProvider>
           <div >
           <form style={{textAlign:"center"}}>
           <AppBar title="Zinq" >
           <RaisedButton label="Log out" primary={true} style={{margin: 15}} onClick={(event) => this.HandleLogout(event)}/> 
            </AppBar>

            <TextField
             hintText="Your Income"
             floatingLabelText="Enter your income"
             style={{ alignItems: 'center'}}
             onChange =  {(event,newValue) => this.setState({app_inc:newValue})}
             />
          <br></br>
          <TextField
             hintText="Your Expenses"
             floatingLabelText="Enter your expenses"
             style={{ alignItems: 'center'}}
             onChange =  {(event,newValue) => this.setState({app_exp:newValue})}
             />
          
          <br></br>
          <RaisedButton label="Submit" primary={true} style={{margin: 15}} onClick={(event) => this.handleClick(event)}/>

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
           <AppBar title="Zinq"/>

            <TextField
             hintText="Your Income"
             floatingLabelText="Enter your income"
             style={{ alignItems: 'center'}}
             onChange =  {(event,newValue) => this.setState({app_inc:newValue})}
             />
          <br></br>
          <TextField
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
          <RaisedButton label="Submit" primary={true} style={{margin: 15}} onClick={(event) => this.handleClick(event)}/>

           </form>
            </div>
          </MuiThemeProvider>
       </div>
        );
      }
    }
}
export default Income;