import keys from './lib/key';
import env from './env'
import React, {Component} from 'react';

import Card from './Card';
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      alert: null
    };
  }

  componentDidMount() {
    fetch(`${env.getCurrent().api}posts`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({"client_api_key": keys.blog_post_api_key})

    }).then(Response => {
      Response
        .json()
        .then(res => {
          this.setState({
            posts: res.sort(function (a, b) {
              // Turn your strings into dates, and then subtract them to get a value that is
              // either negative, positive, or zero.
              return new Date(b.date) - new Date(a.date);
            })

          });
        })
    }).catch((e) => {
      console.log("error")
      this.setState({
        alert: {
          content: e.toString()
        }
      })
    });

  }

  render() {
    if (this.state.posts !== null) {
      return (
        <div id="App" className="App uk-container uk-transition-toggle uk-width-2-3">
          {this
            .state
            .posts
            .map((element, i) => {
              return (<Card key={i} post={element}/>)
            })}
        </div>
      );
    } else if (this.state.alert !== null) {
      return (
        <div className="uk-container">
          <div className="uk-width-4-5">
            <div className="uk-card uk-card uk-margin">
              <h1 className="uk-heading-primary">
                <span>It's kind of a funny story...</span>
              </h1>
              <br />
              <p className="uk-text-emphasis">There was a problem collecting the blog posts.
                Don't worry you didn't do anything,
                <mark>
                  we think it was us.
                </mark>
                We are on it. Just in case your a little nerdy the error was
                <code>{this.state.alert.content}</code>.</p>

              <br/>
              <p className="uk-text-emphasis">Thanks for your understaing.</p>
              <p className="uk-text-primary">
                - The blog Team
              </p>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="App uk-transition-toggle">
          <center>
            <span uk-spinner="ratio: 4.5"></span>
          </center>
        </div>
      )
    }
  }
}

export default Main;