import React, { Component } from 'react';
import './index.css';
import App from './App';
import DefaultPage from './Default'
import Create from './Create.js'
import Welcome from './welcome';
import { BrowserRouter ,Switch , Route } from "react-router-dom";
import Credit from './Credit';
import Payment from './Payment';
import Income from './Income';
import Result from './Result';


class App_Navigation extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
        <div>
            <BrowserRouter>
            <Switch>
            <Route path="/" render={(props) => <App {...props} isAuthed={true} />} exact/>
            <Route path="/Create" component={Create} exact/>
            <Route path="/Welcome" component={Welcome} exact/>
            <Route path="/Payment" component={Payment} exact/>
            <Route path="/Credit" component={Credit} exact/>
            <Route path="/Income" component={Income} exact/>
            <Route path="/Result" component={Result} exact/>
            <Route render={() => DefaultPage()}/>
            </Switch>
            </BrowserRouter>
      </div>
        )
    }
}


export default (App_Navigation);
