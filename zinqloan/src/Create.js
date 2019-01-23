import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import App from './App';
import ReactDOM from 'react-dom';
/**
 * This component handles creating user tasks.
 */
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
      /**
       * This method creates the user account when clicked create button. It verifies the information filled in the form fields.
       * @param {*} event 
       */
      handleCreateClick(event) {
        event.preventDefault()
        //To store errors.
        const errors={}
        //Regex to check email is valid
        var re =  new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        var emailVer=re.test(String(this.state.emailAddress).toLowerCase())
        //Regex to check password is valid
        var strongRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
        var PassVer=strongRegex.test(String(this.state.password))
        //Regex to  check mobile number is valid
        var mobNoRegex= new RegExp(/(^\+[0-9]*$)/)
        var mobNoVer=mobNoRegex.test(String(this.state.number))
        //Flag to determine that the contents are valid.
        var flagInvalid=false
        //Checking if all the values are entered.
        if(this.state.first_name.length === 0 | this.state.last_name.length ===0 | this.state.address.length===0 | this.state.emailAddress.length===0 |this.state.number.length===0 | this.state.password.length===0){
          alert("All fields are required, Please enter.")
          flagInvalid=true
        }
        //Checking if the first name is entered and valid.
        if(this.state.first_name.length <1){
          errors.first_name_error="Please enter First Name."
          flagInvalid=true
        }
        //Checking if the surname or last name is entered and valid.
        if(this.state.last_name.length <1){
          errors.last_name_error="Please enter surname!"
          flagInvalid=true
        }
        //Checking if the address is entered and valid.
        if(this.state.address.length <4){
          errors.address_error="Address must be atleast 4 characters long"
          flagInvalid=true
        }
        //If email is invalid set error message and set flag to true
        if(emailVer === false){
          errors.emailAddress_error="Email address is invalid"
          flagInvalid=true
        }
        //If password is invalid set error message and set flag to true
        if(PassVer === false){
          errors.password_error="Password is invalid, Re-enter. Must be 8 characters or longer, must contain uppercase, lowercase, number and a special character"
          flagInvalid=true
        }
        //If mobile number is invalid set error message and set flag to true
        if(mobNoVer === false){
          errors.number_error="Mobile number invalid"
          flagInvalid=true
        }
        //If password is invalid set error message and set flag to true
        if(this.state.password !== this.state.password2){
          errors.password2_error="Password and re-enter password donot match!"
          flagInvalid=true
        }
        //Adding errors to state.
        this.setState({
          ...this.state,
          ...errors
        })
        //If everything is valid store to database.
        if(flagInvalid === false){
          fetch(`http://localhost:5000/user/add?fname=${this.state.first_name}&sname=${this.state.last_name}&address=${this.state.address}&email=${this.state.emailAddress}&mob=${this.state.number}&password=${this.state.password}`)
          .then((response) => { 
            return response.json() 
          }).then((response) => {
            var response=response
            var flag=false
            if(typeof response.data.name !== 'undefined'){
              console.log(response.data)
            if(response.data.detail.includes("already exists")){
              alert("Email already exists, Please contact Zinq if you forgot the password.")
              flag=true
            }
          }
            if(flag==false){
              alert("Account succesfully created! ")
            //Redirect to login page.
            ReactDOM.render(<App />, document.getElementById('root'));
            }
            })
          .catch(err => alert(err))
        }
      }
      /**
       * Rendering the Create User account page.
       */
    render() {
        return (
            <div>
                  <MuiThemeProvider>
           <div >
            <form style={{textAlign:"center"}}>
            <AppBar title="Create Account"/>
            <TextField
             id="userFN"
             autoComplete='off'
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
             autoComplete='off'
             style={{ alignItems: 'center'}}
             onChange = {(event,newValue) => this.setState({last_name:newValue})}
             />
             <br/>
             <TextField
             id="userAdd"
             errorText={this.state.address_error}
             autoComplete='off'
             hintText="Enter your address"
             floatingLabelText="Address"
             style={{ alignItems: 'center'}}
             onChange = {(event,newValue) => this.setState({address:newValue})}
             />
             <br/>
           <TextField
             id="userEmailAddress"
             errorText={this.state.emailAddress_error}
             autoComplete='off'
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
             autoComplete='off'
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
             autoComplete='off'
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
             autoComplete='off'
             style={{ alignItems: 'center'}}
             onChange = {(event,newValue) => this.setState({password2:newValue})}
             />
           <br/>
           
           <RaisedButton id="BtnUserCreate" label="Create" primary={true} style={{margin: 15}} onClick={(event) => this.handleCreateClick(event)}/>
           <RaisedButton id="BtnCancel" label="Cancel" primary={true} style={{margin: 15}} onClick={(event) =>  ReactDOM.render(<App />, document.getElementById('root'))}/>
           
            </form>
            </div>
          </MuiThemeProvider>
       </div>
        );
  }
}
export default Create;