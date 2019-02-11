import React, {Component} from 'react';

class Signup extends Component {

    render() {
        return (
            <div className="uk-container">
                <div className="uk-card uk-card-default uk-card-body">
                <h1>Sign Up</h1>
                    <form>
                        <div className="uk-margin">
                            <div className="uk-inline">
                                <span className="uk-form-icon" uk-icon="icon: user"></span>
                                <input className="uk-input uk-form-width-large" type="text" placeholder="username"/>
                            </div>
                        </div>
                        <div className="uk-margin">
                            <div className="uk-inline">
                                <span className="uk-form-icon" uk-icon="icon: user"></span>
                                <input className="uk-input uk-form-width-large" type="text" placeholder="email"/>
                            </div>
                        </div>
                        <div className="uk-margin">
                            <div className="uk-inline">
                                <span className="uk-form-icon uk-form-icon" uk-icon="icon: lock"></span>
                                <input className="uk-input uk-form-width-large" type="password" placeholder="password"/>
                            </div>
                        </div>
                        <div className="uk-margin">
                            <div className="uk-inline">
                                <input className="uk-button uk-button-primary uk-form-width-large" type="submit" value="sign up"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
};

export default Signup;
