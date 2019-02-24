import keys from "./lib/key";
import React, {Component} from 'react';
import dateFormat from 'dateformat';
import auth from "./auth";
import env from "./env"
import { callbackify } from "util";

class Com extends Component {
    render() {
        return (
            <li>
                <article className="uk-comment uk-comment-primary">
                    <header
                        className="uk-comment-header uk-grid-medium uk-flex-middle"
                        uk-grid="true">
                        <div className="uk-width-auto">
                            <span uk-icon="icon: user; ratio: 2"></span>
                        </div>
                        <div className="uk-width-expand">
                            <h4 className="uk-comment-title uk-margin-remove">
                                {this.props.comment.user}
                                <ul
                                    className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                                    <li>
                                        {dateFormat(this.props.comment.date, "dddd, mmmm dS, yyyy")}
                                    </li>
                                </ul>
                            </h4>
                        </div>
                    </header>
                    <div className="uk-comment-body">
                        <p>{this.props.comment.comment}</p>
                    </div>
                </article>
            </li>

        );
    }
}

class AddComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUser: false,
            newComment: ""
        }
        this._handleCommentChange = this
            ._handleCommentChange
            .bind(this);
        this._submitForm = this
            ._submitForm
            .bind(this);
    }
    componentWillMount() {
        auth.isSignedIn( data => {
            this.setState({isUser : data})
        });
    }
    _submitForm(e) {
        e.preventDefault();
        let comment = {
            "comment": this.state.newComment,
            "date": new Date(),
            "post_id": window
                .location
                .href
                .split("/")[4],
            "user": localStorage.getItem("username")
        }
        fetch(`${env.getCurrent().api}new_comment`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({"client_api_key": keys.blog_post_api_key, comment: comment})

        }).then(Response => {
            Response
                .json()
                .then(res => {
                    res = JSON.parse(res)
                    console.log(res)
                })
        });
    }
    _handleCommentChange(e) {
        this.setState({newComment: e.target.value})
    }
    render() {
        if (this.state.isUser) {
            return (
                <div>
                    <form onSubmit={this._submitForm}>
                        <fieldset className="uk-fieldset">
                            <textarea
                                className="uk-textarea"
                                rows="5"
                                placeholder="add a comment"
                                onChange={this._handleCommentChange}></textarea>
                            <input
                                className="uk-button-primary uk-button-large"
                                type="submit"
                                value="add comment"/>
                        </fieldset>
                    </form>
                </div>
            )
        } else {
            return <div>You must <a href="/signin">sign in</a> to add a comment</div>
        }
    }
}

class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: null
        }
    }

    getComments() {
        function custom_sort(a, b) {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        console.log("getting comments")
        fetch(`http://localhost:5000/comments/${this.props.post}`, {
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
                    if (res.length > 0) {
                        this.setState({comments: res.sort(custom_sort)})
                    } else {
                        this.setState({comments: "No Comments Yet"})
                    }
                });
        });
    }

    componentDidMount() {
        let intervalId = setInterval(this.getComments.bind(this), 3000)
        this.setState({intervalId: intervalId});
    }
    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
    }

    render() {
        if (this.state.comments !== null) {
            switch (typeof(this.state.comments)) {
                case "object":
                    return (
                        <div className="uk-container uk-margin-large uk-width-1-2">
                            <AddComment/>
                            <ul
                                className="uk-comment-list"
                                style={{
                                marginTop: "30px !important"
                            }}>
                                {this
                                    .state
                                    .comments
                                    .map((element, i) => {
                                        return (<Com key={i} comment={element}/>)
                                    })}
                            </ul>
                        </div>
                    )
                default:
                    return (
                        <div className="uk-container uk-margin-large uk-width-1-2">
                            <h4>{this.state.comments}</h4>
                            <AddComment/>
                        </div>
                    )
            }
        } else {
            return (
                <div className="uk-transition-toggle">
                    <center>
                        <span uk-spinner="ratio: 4.5"></span>
                    </center>
                </div>
            )
        }
    }
}

export default Comments;