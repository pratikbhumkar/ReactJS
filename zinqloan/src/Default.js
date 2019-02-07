import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

function DefaultPage(props){
    return  <div>
    <MuiThemeProvider>
      <div className="login" >
       <form style={{textAlign:"center"}}>
       <AppBar title="Zinq"/>
       <h1>Page you trying to access is not available. Please go back home</h1>
       <RaisedButton href="/" id="btnHome" label="Home" primary={true} style={{margin: 15 ,minWidth: 150}} > </RaisedButton>
       </form>
       </div>
    </MuiThemeProvider>
    </div>
 }

 export default DefaultPage