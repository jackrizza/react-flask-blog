import React, {Component} from 'react';
import SHA256 from 'crypto-js/sha256'
import CryptoJS from 'crypto-js'
import keys from "./lib/key"


class Signup extends Component {

    constructor(props) {
        super(props)
        this.handleSignUp = this
            .handleSignUp
            .bind(this)
        this.formPreventDefault = this
            .formPreventDefault
            .bind(this)
        this.handleEmailCheck = this
            .handleEmailCheck
            .bind(this)
        this.handlePasswordCheck = this
            .handlePasswordCheck
            .bind(this)
        this.handleUsernameCheck = this
            .handleUsernameCheck
            .bind(this)
    }

    formPreventDefault(event) {
        event.preventDefault();
    }
    handleUsernameCheck() {
        let usernameInput = document.getElementById("username"),
        signUpButton = document.getElementById("signUp")
        if(usernameInput.value.length > 0) {
        fetch(`http://localhost:5000/checkusername/${usernameInput.value}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({"client_api_key": keys.blog_post_api_key})
        }).then( response => {
            response.json().then(res => {
                res = JSON.parse(res)
                if (res.type === "error") {
                    usernameInput.classList = "uk-input uk-form-width-large uk-form-danger"
                    signUpButton.setAttribute("disabled", "true")
                    usernameInput.setAttribute("uk-tooltip", `title: ${res.response}; pos: right`)
                } else {
                    signUpButton.removeAttribute("disabled")
                    usernameInput.removeAttribute("uk-tooltip")
                    usernameInput.classList = "uk-input uk-form-width-large uk-form-primary"
                }
            })
        })
        } else {

        }
        
        }

    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    handleEmailCheck() {
        let emailInput = document.getElementById("email"),
            signUpButton = document.getElementById("signUp"),
            email = emailInput.value
        if (this.validateEmail(email)) {
            // check if used
            fetch(`http://localhost:5000/checkemail/${email}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({"client_api_key": keys.blog_post_api_key})
            }).then( response => {
                    response.json().then(res => {
                        res = JSON.parse(res)
                        if (res.type === "error") {
                            emailInput.classList = "uk-input uk-form-width-large uk-form-danger"
                            emailInput.setAttribute("uk-tooltip", `title: ${res.response}; pos: right`)
                        } else {
                            signUpButton.removeAttribute("disabled")
                            emailInput.removeAttribute("uk-tooltip")
                            emailInput.classList = "uk-input uk-form-width-large uk-form-primary"
                        }
                    })
                })
        } else {
            signUpButton.setAttribute("disabled", "true")
            emailInput.removeAttribute("uk-tooltip")
            emailInput.classList = "uk-input uk-form-width-large uk-form-danger"
        }
    }
    encryptPassword(password) {
        var current_date = (new Date()).valueOf().toString();
        var random = Math.random().toString();
        let hash = SHA256(current_date + random);
        return { 
            "token" : hash.toString(CryptoJS.enc.Base64),
            "password" : SHA256(hash + password).toString(CryptoJS.enc.Base64)
            };
    }

    isLUN(lun) {
        var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        return re.test(lun)
    }
    isSpecial(special) {
        var re = /\W|_/g
        return re.test(special)
    }

    handlePasswordCheck() {
        let password = document.getElementById("password"),
        length = document.getElementById("length"),
        lun = document.getElementById("lun"),
        tod = [false, false, false],
        signUpButton = document.getElementById("signUp"),
        special = document.getElementById("special");

        if(password.value.length > 8) {
            tod[0] = true
            length.setAttribute("uk-icon", "icon : check")
        } else {
            tod[0] = false
            length.setAttribute("uk-icon", "icon : chevron-right")
        }

        if(this.isLUN(password.value)){
            tod[1] = true
            lun.setAttribute("uk-icon", "icon : check")
        } else {
            tod[1] = false
            lun.setAttribute("uk-icon", "icon : chevron-right")
        }

        if(this.isSpecial(password.value)){
            tod[2] = true
            special.setAttribute("uk-icon", "icon : check")
        } else {
            tod[2] = false
            special.setAttribute("uk-icon", "icon : chevron-right")
        }
        if ( tod.every( e => { return e === true}) ) {
            signUpButton.removeAttribute("disabled")
        } else {
            signUpButton.setAttribute("disabled", "true")
        }
    }
    handleSignUp() {
        console.log("handling sign up")
        let username = document
                .getElementById("username")
                .value,
            email = document
                .getElementById("email")
                .value,
            password = document
                .getElementById("password")
                .value;
            password = this.encryptPassword(password)

        fetch(`http://localhost:5000/signup`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({"client_api_key": keys.blog_post_api_key, "new_user" : {
                "username" : username,
                "email" : email,
                "password" : password.password,
                "hash" : password.hash
            }})
        }).then(response => {
            response.json().then(res => {
                if (res.type === "sucsess") {
                    window.location.href = "/"
                }
            })
        })

    }

    render() {

        return (
            <div className="uk-container">
                <div className="uk-card uk-card-default uk-card-body">
                    <h1>Sign Up</h1>
                    <form onSubmit={this.formPreventDefault}>
                        <div className="uk-margin">
                            <div className="uk-inline">
                                <span className="uk-form-icon" uk-icon="icon: user"></span>
                                <input
                                    className="uk-input uk-form-width-large"
                                    id="username"
                                    type="text"
                                    onChange={this.handleUsernameCheck}
                                    placeholder="username"/>
                            </div>
                        </div>
                        <div className="uk-margin">
                            <div className="uk-inline">
                                <span className="uk-form-icon" uk-icon="icon: user"></span>
                                <input
                                    className="uk-input uk-form-width-large"
                                    type="text"
                                    id="email"
                                    onChange={this.handleEmailCheck}
                                    placeholder="email"/>
                            </div>
                        </div>
                        <div className="uk-margin">
                            <div className="uk-inline">
                                <span className="uk-form-icon uk-form-icon" uk-icon="icon: lock"></span>
                                <input
                                    className="uk-input uk-form-width-large"
                                    type="password"
                                    id="password"
                                    onChange={this.handlePasswordCheck}
                                    placeholder="password"/>
                            </div>
                        </div>
                        <div classNmae="uk-margin">
                            <div className="uk-inline">
                            <ul class="uk-list uk-link-text">
                                <li><span id="length" uk-icon="chevron-right"></span> password should be atleast 8 characters long</li>
                                <li><span id="lun" uk-icon="chevron-right"></span> password should have a lowercase, uppercase, number </li>
                                <li><span id="special" uk-icon="chevron-right"></span> password should have a special character (!@#$%&....)</li>
                            </ul>
                            </div>
                        </div>
                        <div className="uk-margin">
                            <div className="uk-inline">
                                <button
                                    id="signUp"
                                    className="uk-button uk-button-primary uk-form-width-large"
                                    onClick={this.handleSignUp}>Sign Up</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
};

export default Signup;
