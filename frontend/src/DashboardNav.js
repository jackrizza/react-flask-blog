import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import React, {Component} from 'react';

class DashboardNav extends Component {
    render() {
        return (
            <div className=" uk-padding uk-panel" uk-height-viewport="min-height: 100">
                <ul className="uk-nav-default uk-nav-parent-icon" uk-nav="multiple: true">
                    <li className="uk-active">
                        <Link to="/dashboard/analytics">Analytics</Link>
                    </li>
                    <li className="uk-parent">
                        <a href="#">User Interaction</a>
                        <ul className="uk-nav-sub">
                            <li>
                                <a href="#">Mailing Campaign</a>
                            </li>
                            <li>
                                <a href="#">Suspend User</a>
                            </li>
                            
                        </ul>
                    </li>
                    <li className="uk-parent">
                        <a href="#">Posts</a>
                        <ul className="uk-nav-sub">
                            <li>
                                <Link to="/createpost">Create Post</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

export default DashboardNav;