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
          first_name_error:'',
          last_name:'',
          last_name_error:'',
          address:'',
          address_error:'',
          emailAddress:'',
          emailAddress_error:'',
          number:'',
          number_error:'',
          password:'',
          password_error:'',
          password2:'',
          password2_error:'',
          responseObjCreate:'',
          insertSuccess:false
        }
        
        this.handleCreateClick = this.handleCreateClick.bind(this);
      }

      handleCreateClick(event) {
        event.preventDefault()
        const errors={}
        var re =  new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        var emailVer=re.test(String(this.state.emailAddress).toLowerCase())
        var strongRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
        var PassVer=strongRegex.test(String(this.state.password))
        var mobNoRegex= new RegExp(/(^\+[0-9]*$)/)
        var mobNoVer=mobNoRegex.test(String(this.state.number))
        var flagInvalid=false
        if(this.state.first_name.length === 0 | this.state.last_name.length ===0 | this.state.address.length===0 | this.state.emailAddress.length===0 |this.state.number.length===0 | this.state.password.length===0){
          alert("All fields are required, Please enter.")
          flagInvalid=true
        }
        if(this.state.first_name.length <4){
          errors.first_name_error="First name must be atleast 3 characters long"
          flagInvalid=true
        }
        if(this.state.last_name.length <4){
          errors.last_name_error="Surname must be atleast 3 characters long"
          flagInvalid=true
        }
        if(this.state.address.length <4){
          errors.address_error="Address must be atleast 3 characters long"
          flagInvalid=true
        }
        if(emailVer === false){
          errors.emailAddress_error="Email address is invalid"
          flagInvalid=true
        }
        if(PassVer === false){
          errors.password_error="Password is invalid, Re-enter. Must be 8 characters or longer, must contain uppercase, lowercase, number and a special character"
          flagInvalid=true
        }
        if(mobNoVer === false){
          errors.number_error="Mobile number invalid"
          flagInvalid=true
        }
        if(this.state.password !== this.state.password2){
          errors.password2_error="Password and re-enter password donot match!"
          flagInvalid=true
        }
        this.setState({
          ...this.state,
          ...errors
        })
        if(flagInvalid === false){
          fetch(`http://localhost:5000/user/add?fname=${this.state.first_name}&sname=${this.state.last_name}&address=${this.state.address}&email=${this.state.emailAddress}&mob=${this.state.number}&password=${this.state.password}`)
          .then(response=> response.json)
          .then(() => {
            alert("Account succesfully created! ")
            ReactDOM.render(<App />, document.getElementById('root'));
            })
          .catch(err => alert(err))
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
             errorText={this.state.first_name_error}
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             style={{ alignItems: 'center'}}
             onChange = {(event,newValue) => this.setState({first_name:newValue})}
             />
           <br/>
           <TextField
             id="userSN"
             errorText={this.state.last_name_error}
             hintText="Enter your surname"
             floatingLabelText="Surname"
             style={{ alignItems: 'center'}}
             onChange = {(event,newValue) => this.setState({last_name:newValue})}
             />
             <br/>
             <TextField
             id="userAdd"
             errorText={this.state.address_error}
             hintText="Enter your address"
             floatingLabelText="Address"
             style={{ alignItems: 'center'}}
             onChange = {(event,newValue) => this.setState({address:newValue})}
             />
             <br/>
           <TextField
             id="userEmail"
             errorText={this.state.emailAddress_error}
             hintText="Enter your Email"
             type="email"
             floatingLabelText="Email"
             style={{ alignItems: 'center'}}
             onChange = {(event,newValue) => this.setState({emailAddress:newValue})}
             />
           <br/>
           <TextField
             id="userMob"
             errorText={this.state.number_error}
             type = "Mobilenumber"
             hintText="Enter your Mobile number"
             style ={{ alignItems: 'center'}}
             floatingLabelText="Mobile number"
             onChange = {(event,newValue) => this.setState({number:newValue})}
             />
           <br/>
           <TextField
             id="userPwd"
             errorText={this.state.password_error}
             hintText="Enter password"
             floatingLabelText="Password"
             style={{ alignItems: 'center'}}
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <TextField
             id="userRePwd"
             errorText={this.state.password2_error}
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