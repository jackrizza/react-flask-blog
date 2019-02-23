import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {Markdown} from 'react-showdown';
import dateFormat from 'dateformat';

class Card extends Component {
    render() {
        return (
            <div>
                <div className="post uk-card uk-card-hover uk-margin" id={this.props.post.id}>
                    <div className="uk-card-header">
                        <div className="uk-grid-small uk-flex-middle" uk-grid="true">
                            <div className="uk-width-expand">
                                <h3 className="uk-card-title uk-margin-remove-bottom">{this.props.post.title}</h3>
                                <br/>
                                <ul className="uk-list uk-list-divider">
                                    <li>
                                        <b>
                                            <span uk-icon="user"></span>
                                            {this.props.post.author}</b>
                                    </li>
                                    <li>
                                        <span uk-icon="clock"></span>
                                        {dateFormat(this.props.post.date, "dddd, mmmm dS, yyyy")}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="uk-card-body">
                        <Markdown
                            markup={this
                            .props
                            .post
                            .content
                            .substring(0, 256)
                            .replace(/<\/?[^>]+(>|$)/g, "") + "..."}/>
                    </div>
                    <div className="uk-card-footer">
                        <Link to={'/post/' + this.props.post.id} className="uk-button uk-button-text">Read more</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;