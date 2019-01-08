import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import App from './App';
import ReactDOM from 'react-dom';


class Create extends Component {

    constructor(props){
        super(props);
        this.state={
          first_name:'',
          last_name:'',
          address:'',
          emailAddress:'',
          number:'',
          password:'',
          password2:'',
          responseObjCreate:'',
          insertSuccess:false
        }
        
        this.handleCreateClick = this.handleCreateClick.bind(this);
      }

      handleCreateClick(event) {
        var re =  new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        var emailVer=re.test(String(this.state.emailAddress).toLowerCase())
        var strongRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
        var PassVer=strongRegex.test(String(this.state.password))
        var mobNoRegex= new RegExp(/(^\+[0-9]*$)/)
        var mobNoVer=mobNoRegex.test(String(this.state.number))
        if(this.state.first_name.length === 0 | this.state.last_name.length ===0 | this.state.address.length===0 | this.state.emailAddress.length===0 |this.state.number.length===0 | this.state.password.length===0){
          alert("All fields are required, Please enter.")
        }
        
        else{
          if(emailVer === false){
            alert("E-Mail address is invalid, Re-enter")
          }
          else if(PassVer === false){
            alert("Password is invalid, Re-enter. Must be 8 characters or longer, must contain uppercase, lowercase, number and a special character")
          }
          else if(mobNoVer === false){
            alert("Mobile number is invalid")
          }
          else{
            if(this.state.password === this.state.password2){
              fetch(`http://localhost:5000/user/add?fname=${this.state.first_name}&sname=${this.state.last_name}&address=${this.state.address}&email=${this.state.emailAddress}&mob=${this.state.number}&password=${this.state.password}`)
              .then(response=> response.json)
              .then(() => {
                alert("Account succesfully created! ")
                ReactDOM.render(<App />, document.getElementById('root'));
                })
              .catch(err => alert(err))
            
            }
            else{
              alert("Password and re-enter password donot match!")
            }
          }
        }
      }
    render() {
        return (
            <div>
                  <MuiThemeProvider>
           <div >
            <form style={{textAlign:"center"}}>
            <AppBar title="Create Account"/>
            <TextField
             id="userFN"
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             style={{ alignItems: 'center'}}
             onChange = {(event,newValue) => this.setState({first_name:newValue})}
             />
           <br/>
           
           <TextField
             id="userSN"
             hintText="Enter your surname"
             floatingLabelText="Surname"
             style={{ alignItems: 'center'}}
             onChange = {(event,newValue) => this.setState({last_name:newValue})}
             />
             <br/>
             <TextField
             id="userAdd"
             hintText="Enter your address"
             floatingLabelText="Address"
             style={{ alignItems: 'center'}}
             onChange = {(event,newValue) => this.setState({address:newValue})}
             />
             <br/>
           <TextField
             id="userEmail"
             hintText="Enter your Email"
             type="email"
             floatingLabelText="Email"
             style={{ alignItems: 'center'}}
             onChange = {(event,newValue) => this.setState({emailAddress:newValue})}
             />
           <br/>
           <TextField
             id="userMob"
             type = "Mobilenumber"
             hintText="Enter your Mobile number"
             style ={{ alignItems: 'center'}}
             floatingLabelText="Mobile number"
             onChange = {(event,newValue) => this.setState({number:newValue})}
             />
           <br/>
           <TextField
             id="userPwd"
             hintText="Enter password"
             floatingLabelText="Password"
             style={{ alignItems: 'center'}}
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <TextField
             id="userRePwd"
             hintText="Re-Enter password"
             type="Password"
             floatingLabelText="Password"
             style={{ alignItems: 'center'}}
             onChange = {(event,newValue) => this.setState({password2:newValue})}
             />
           <br/>
           
           <RaisedButton id="BtnUserCreate" label="Create" primary={true} style={{margin: 15}} onClick={(event) => this.handleCreateClick(event)}/>
            </form>
            </div>
          </MuiThemeProvider>
       </div>
        );
  }
}
export default Create;