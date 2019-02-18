import React, {Component} from 'react';
import encrypt from './encrypt';
import keys from "./lib/key";
import env from "./env";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.formPreventDefault = this
            .formPreventDefault
            .bind(this);
        this.formChange = this
            .formChange
            .bind(this)
        this.state = {
            alerts: null
        }
    }

    formPreventDefault(event) {
        event.preventDefault();
        this.handleSignIn();
    }
    formChange() {
        let username = document
                .getElementById("username")
                .value
                .length,
            password = document
                .getElementById("password")
                .value
                .length;
        if (username > 0 && password > 0) {
            document
                .getElementById("signIn")
                .removeAttribute("disabled")
        } else {
            document
                .getElementById("signIn")
                .setAttribute("disabled", "true")
        }
    }

    handleSignIn() {
        let username = document
                .getElementById("username")
                .value,
            password = document
                .getElementById("password")
                .value;
        // fetch salt for password
        fetch(`${env.getCurrent().api}salt`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({"client_api_key": keys.blog_post_api_key, "username": username})
        }).then(response => {
            response
                .json()
                .then(res => {
                    console.log(res)
                    res = JSON.parse(res)
                    // create salted password
                    let saltedPassword = encrypt.reproduce_set(password, res.salt)
                    fetch(`${env.getCurrent().api}signin`, {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: "POST",
                        body: JSON.stringify({
                            "client_api_key": keys.blog_post_api_key,
                            user: {
                                "username_or_email": username,
                                "password": saltedPassword.password
                            }
                        })
                    }).then(response => {
                        response
                            .json()
                            .then(res => {
                                console.log(res)
                                res = JSON.parse(res)
                                console.log(res)
                                if (res.type === "error") {
                                    this.setState({
                                        "alerts": {
                                            "response": res.response
                                        }
                                    })
                                } else if (res.type === "sucsess") {
                                    localStorage.setItem("token", res.response.token)
                                    localStorage.setItem("email", res.response.email)
                                    localStorage.setItem("username", res.response.username)
                                    localStorage.setItem("type", res.response.type)
                                    localStorage.setItem("user-signed-in", "true")
                                    window.location = "/"
                                }
                            })
                    })
                })
        })

    }
    render() {

        return (
            <div className="uk-container">
                <div className="uk-card uk-card-default uk-card-body">
                    <h1>Sign In</h1>
                    {(this.state.alerts !== null)
                        ? (
                            <div className="uk-alert-danger" uk-alert="true">
                                <a className="uk-alert-close" uk-close="true"></a>
                                <p>{this.state.alerts.response}</p>
                            </div>
                        )
                        : (
                            <div></div>
                        )}
                    <form onSubmit={this.formPreventDefault} onChange={this.formChange}>
                        <div className="uk-margin">
                            <div className="uk-inline">
                                <span className="uk-form-icon" uk-icon="icon: user"></span>
                                <input
                                    className="uk-input uk-form-width-large"
                                    id="username"
                                    type="text"
                                    placeholder="username"/>
                            </div>
                        </div>
                        <div className="uk-margin">
                            <div className="uk-inline">
                                <span className="uk-form-icon uk-form-icon" uk-icon="icon: lock"></span>
                                <input
                                    className="uk-input uk-form-width-large"
                                    type="password"
                                    id="password"
                                    placeholder="password"/>
                            </div>
                        </div>
                        <div className="uk-margin">
                            <div className="uk-inline">
                                <input
                                    id="signIn"
                                    type="submit"
                                    className="uk-input uk-button uk-button-primary uk-form-width-large"
                                    disabled="true"
                                    value="Sign In"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
};

export default Signup;
