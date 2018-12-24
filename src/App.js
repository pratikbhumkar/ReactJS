import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var variab=" From a variable!!"

class App extends Component {
  render() {
    return (
      <div className="App">
      
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React by Pratik Bhumkar "Hello world"
          </a>
        </header> */}
        Hey there by Pratik Bhumkar {variab}
        <p><Welcome text='whoas'></Welcome></p>
        
      </div>
    );
  }
}

class Welcome extends Component{
   
  render(){
    
    return(
      <div>
      <p>{this.props.text}</p>
      <p> welcome to pratik's React Component </p>
      </div>);
  };
}
export default App;
