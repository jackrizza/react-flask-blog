import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from './Navbar';
import Main from './Main';
import Post from './Post';
import Signup from './Signup';
import Signin from './Signin';
import Analytics from './Analytics';
import getUserIP from "./analytics_fn";
import CreatePost from "./CreatePost";
import keys from "./lib/key";
import env from "./env";
import auth from "./env";
import './assets/css/uikit.css';

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

if (localStorage.getItem("user-signed-in") === null) {
  localStorage.setItem("user-signed-in", false);
}

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
}

if (localStorage.getItem("uuid-analytics") === null) {
  localStorage.setItem("uuid-analytics", uuidv4());
}

function analytics() {
  let doccookies = document
    .cookie
    .split("=");
  let doneAnalytics = doccookies[doccookies.indexOf("uuid-analytics") + 1]
  if (!doneAnalytics) {
    getUserIP(function (ip) {
      let a = {
        "uuid": localStorage.getItem("uuid-analytics"),
        "datetime": new Date(),
        "username": localStorage.getItem("username"),
        "location": ip
      }
      fetch(`${env.getCurrent().api}insert_analytics`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({"client_api_key": keys.blog_post_api_key, "a": a})

      }).then(Response => {
        Response
          .json()
          .then(res => {
            res = JSON.parse(res)
            if (res.type === "sucsess") {
              document.cookie = "sent_analytics=true; expires=" + new Date().addDays(1);
            }
          })
      });
    });
  }

}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      DOMloaded: false
    }
  }
  componentDidMount() {
    this.setState({DOMloaded: true})
    analytics();
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
            <Route path="/createpost" exact component={CreatePost}/>
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
