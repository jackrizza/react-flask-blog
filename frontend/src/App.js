import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from './Navbar';
import Main from './Main';
import Post from './Post';
import Signup from './Signup';
import Signin from './Signin';
import Analytics from './Analytics';
import './assets/css/uikit.css';

if(localStorage.getItem("user-signed-in") === null) {
  localStorage.setItem("user-signed-in", false);
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      DOMloaded: false
    }
  }
  componentDidMount() {
    this.setState({DOMloaded : true})
  }
  render() {
    if (this.state.DOMloaded) {
      return (
        <Router>
          <div>
            <Navbar/>
            <Route path="/" exact component={Main}/>
            <Route path="/signup" exact component={Signup}/>
            <Route path="/signin" exact component={Signin}/>
            <Route path="/dashboard/analytics" exact component={Analytics}/>
            <Route path="/post/:id" component={Post}/>
          </div>
        </Router>
      )
    } else {
      return (
        <div className="App uk-transition-toggle">
          <center>
            <span uk-spinner="ratio: 6"></span>
          </center>
        </div>
      )
    }
  }
}

export default App;
