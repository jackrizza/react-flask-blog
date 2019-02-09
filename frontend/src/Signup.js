import React, {Component} from 'react';

class Signup extends Component {

    render() {
        return (
            <div className="uk-container">
                <form className="uk-grid-large" uk-grid>
                    <div class="uk-margin">
                        <div class="uk-inline">
                            <span class="uk-form-icon" uk-icon="icon: user"></span>
                            <input class="uk-input" type="text" placeholder="username"/>
                        </div>
                    </div>
                    <div class="uk-margin">
                        <div class="uk-inline">
                            <span class="uk-form-icon" uk-icon="icon: user"></span>
                            <input class="uk-input" type="text" placeholder="email"/>
                        </div>
                    </div>
                    <div class="uk-margin">
                        <div class="uk-inline">
                            <span class="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock"></span>
                            <input class="uk-input" type="password" placeholder="password"/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
};

export default Signup;
