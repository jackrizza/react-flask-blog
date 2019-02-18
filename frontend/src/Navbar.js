import React, {Component} from 'react';
import pushsub from "./pushsub";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import keys from "./lib/key"
import env from './env'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userSignedIn: false

        }
        this.handleChange = this
            .handleChange
            .bind(this);
        this.signOut = this
            .signOut
            .bind(this)
    }
    signOut() {
        localStorage.clear()
        window.location = "/"
    }
    handleChange(event) {
        if (event.target.value.length > 0) {
            let search = document.getElementById("search")
            search.style.background = "white"
            search.style.padding = "10px 20px"
            search.style.borderRadius = "5px"
            search.style.textAlign = "center"
        } else {
            Array
                .from(document.getElementsByClassName("post"))
                .forEach(element => {
                    element.style.display = "block"
                })
            document
                .getElementById("search")
                .style
                .background = "transparent"
        }

        fetch(`${env.getCurrent().api}search/${event.target.value}`, {
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
                    res.forEach(element => {
                        Array
                            .from(document.getElementsByClassName("post"))
                            .forEach(post => {
                                post.style.display = "block"
                                if (post.id !== element.id) {
                                    post.style.display = "none"
                                } else {}
                            })
                    })
                })
        });
    }
    componentDidMount() {
        pushsub.subscribe_to_localstorage("user-signed-in", (stls_return) => {
            let newState = stls_return === "false"
                ? false
                : true
            if (newState !== this.state.userSignedIn) {
                this.setState({userSignedIn: newState})
            }
        })
    }
    render() {
        return (
            <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
                <nav
                    className="uk-navbar-container uk-margin"
                    uk-navbar="mode: click"
                    style={{
                    background: "#1c1c1c"
                }}>
                    <div className="uk-navbar-left">

                        <ul className="uk-navbar-nav">
                            <li
                                className="uk-active uk-text-middle"
                                style={{
                                lineHeight: "150%"
                            }}>
                                <Link
                                    to="/"
                                    style={{
                                    color: "rgba(255,255,255,0.8)"
                                }}>
                                    <span className="uk-margin-small-right" uk-icon="icon: home; ratio: 2"></span>Blog</Link>
                            </li>
                        </ul>

                    </div>

                    {(window.location.href.split('/')[3].length === 0)
                        ? (
                            <div className="uk-navbar-center">
                                <div className="uk-navbar-item ">
                                    <form className="uk-search uk-search-navbar">
                                        <span uk-search-icon="true"></span>
                                        <input
                                            className="uk-search-input"
                                            id="search"
                                            type="search"
                                            autoComplete="off"
                                            placeholder="Search..."
                                            onChange={this
                                            .handleChange
                                            .bind(this)}/>
                                    </form>

                                </div>

                            </div>
                        )
                        : (
                            <div></div>
                        )}

                    <div className="uk-navbar-right">
                        {!this.state.userSignedIn
                            ? (
                                <ul className="uk-navbar-nav">

                                    <li className="uk-active">
                                        <Link
                                            to="/signin"
                                            style={{
                                            color: "rgba(255,255,255,0.8)"
                                        }}>Sign In</Link>
                                    </li>
                                    <li className="uk-button-primary">
                                        <Link
                                            to="/signup"
                                            style={{
                                            color: "rgba(255,255,255,0.8)"
                                        }}>Sign Up</Link>
                                    </li>

                                </ul>
                            )
                            : (
                                <ul className="uk-navbar-nav">
                                    <li className="uk-active">
                                        <a
                                            href="#"
                                            style={{
                                            color: "rgba(255,255,255,0.8)"
                                        }}>
                                            <span
                                                className="uk-margin-small-right uk-margin-small-right"
                                                uk-icon="icon: user"></span>
                                        </a>
                                        <div className="uk-navbar-dropdown">
                                            <ul className="uk-nav uk-navbar-dropdown-nav">
                                                {localStorage.getItem("type") === "author"
                                                    ? (
                                                        <span>
                                                            <li>
                                                                <a href="#">
                                                                    <span className="uk-margin-small-right" uk-icon="icon: file-edit"></span>
                                                                    Create Post</a>
                                                            </li>
                                                            <li>
                                                                <Link to="/dashboard/analytics">
                                                                    <span className="uk-margin-small-right" uk-icon="icon: grid"></span>
                                                                    Dashboard</Link>
                                                            </li>
                                                        </span>
                                                    )
                                                    : (
                                                        <span></span>
                                                    )}
                                                <li>
                                                    <a href="#">
                                                        <span className="uk-margin-small-right" uk-icon="icon: settings"></span>
                                                        Edit Profile</a>
                                                </li>
                                                <li className="uk-nav-divider"></li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        onClick={this.signOut}
                                                        style={{
                                                        color: "#f0506e"
                                                    }}>
                                                        <span className="uk-margin-small-right" uk-icon="icon: sign-out"></span>
                                                        Sign Out</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            )}

                    </div>

                </nav>
            </div>

        );
    }
}

export default Navbar;
