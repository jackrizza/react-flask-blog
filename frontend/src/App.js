import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from './Navbar';
import Main from './Main';
import Post from './Post';
import Signup from './Signup';
import './assets/css/uikit.css';

localStorage.setItem("user-signed-in", false);

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
