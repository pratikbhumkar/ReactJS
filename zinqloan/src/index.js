import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App_Navigation from './Navigate'
// import Connection from './Connection'
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducer from './Reducer/ReducerContent'

var store=createStore(reducer)
console.log("from index",store)

ReactDOM.render(<Provider store={store}><App_Navigation/></Provider>, document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();



