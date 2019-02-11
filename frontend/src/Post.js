import keys from './lib/key';
import React, {Component} from 'react';
import {Markdown} from 'react-showdown';
import dateFormat from 'dateformat';
import Comments from "./Comments";
import "./App.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      id: ""
    };
  }
  componentDidMount() {
    let id = this
      .props
      .match
      .url
      .replace("/post/", "")
    this.setState({id: id})

    fetch(`http://localhost:5000/post/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      cache: "force-cache",
      method: "POST",
      body: JSON.stringify({"client_api_key": keys.blog_post_api_key})

    }).then(Response => {
      Response
        .json()
        .then(res => {
          this.setState({posts: res});
        })
    });
  }
  componentDidUpdate() {}

  render() {
    if (this.state.posts !== null) {
      if (!this.state.posts.background) {
        return (
          <div>
            <article className="uk-article uk-container">
              <div>
                <h1 className="uk-article-title">{this.state.posts.title}</h1>

                <p className="uk-article-meta">
                  <u>Written by {this.state.posts.author}
                    on {dateFormat(this.state.posts.date, "dddd, mmmm dS, yyyy")}</u>
                </p>
                <br/>
                <Markdown markup={this.state.posts.content}/>
              </div>

              <hr className="uk-divider-icon"/>
            </article>
            <Comments post={this.state.id}/>
          </div>
        );
      } else {
        return (
          <div>
            <article className="uk-article uk-container">
              <div
                className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light"
                data-src={this.state.posts.background}
                uk-img="true">
                <h1 className="uk-article-title">{this.state.posts.title}</h1>
              </div>
              <br/>
              <p className="uk-article-meta">
                <u>Written by {this.state.posts.author}
                  on {dateFormat(this.state.posts.date, "dddd, mmmm dS, yyyy")}</u>
              </p>
              <Markdown markup={this.state.posts.content}/>

              <hr className="uk-divider-icon"/>
            </article>
            <Comments post={this.state.id}/>
          </div>
        );
      }
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

export default Post;
