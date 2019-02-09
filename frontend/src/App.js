import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from './Navbar';
import Main from './Main';
import Post from './Post';
import Signup from './Signup';
import './assets/css/uikit.css';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Navbar/>
          <Route path="/" exact component={Main}/>
          <Route path="/signup" exact component={Signup}/>
          <Route path="/post/:id" component={Post}/>
        </div>
      </Router>
    )
  }
}

export default App;
