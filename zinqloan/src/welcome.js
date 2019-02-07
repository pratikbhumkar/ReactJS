import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {connect} from 'react-redux'

import { Redirect} from "react-router-dom";
import User from './Models/UserModel'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducer from './Reducer/ReducerContent'

class Welcome extends Component {
    constructor(props){
        super(props);
        
        //Creating the user object.
        this.state={
            user:new User(),
            redirectToCredit:false
        }
        console.log(this.props.user)
        //Checking if it is not initialized
        if(typeof this.props.user !== 'undefined'){
          this.state.user=this.props.user
        }
          this.state={
            first_name:this.state.user.getUserFirstName(),
            last_name:this.state.user.getUserLastName()
          }
          
      }
    // componentDidMount(){
    //   setTimeout(function(){ 
    //     redirectInitiate();
    //    }, 3000); 
    // }
      redirectInitiate(params) {
        setTimeout(
          function() {
              this.setState({redirectToCredit:true});
          }
          .bind(this),
          2000
      );
    }
    /**
     * Rendering Welcome page contents.
     */
    render() {
      var store=createStore(reducer)
      this.redirectInitiate()
      if(this.state.redirectToCredit){
        return(
          <Provider store={store}>
          <Redirect to={{
            pathname: '/Credit'
        }}/>
        </Provider>

        )
      }
        return (
            <div>
                  <MuiThemeProvider>
           <div >
           <form style={{textAlign:"center"}}>
           <AppBar title="Zinq"/>
           <h1>Welcome, {this.state.first_name} {this.state.last_name}</h1>
          <br/>
          <h4> You will be redirected to credit page shortly </h4>
           </form>
           </div>
          </MuiThemeProvider>
          
        </div>
        );
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
      onUserLogin:(firstname,lastname,email,sessionKey)=>dispach({type:'User_Welcome',FirstName:firstname,LastName:lastname,Email:email,SessionKey:sessionKey})
    }
  }
  // export default App; 
  export default connect(stateToProps,mapdispachToProps)(Welcome);