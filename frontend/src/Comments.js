import keys from "./lib/key";
import React, {Component} from 'react';
import dateFormat from 'dateformat';

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
    render() {
        return (
            <div>
                Add a comment
            </div>
        )
    }
}

class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: null
        }
    }

    componentDidMount() {
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
                        this.setState({comments: res})
                    } else {
                        this.setState({comments: "No Comments Yet"})
                    }
                });
        });
    }

    render() {
        if (this.state.comments !== null) {
            switch (typeof(this.state.comments)) {
                case "object":
                    return (
                        <div className="uk-container uk-margin-large uk-width-1-2">
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
                            <AddComment/>
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