import keys from "./lib/key";
import React, {Component} from 'react';
import moment from 'moment'
import DashboardNav from './DashboardNav'
import env from './env'
import auth from "./auth"

class Visits extends Component {
    constructor(props) {
        super(props)
        this.state = {
            analytics: [],
            visits: {
                week: 0,
                month: 0,
                year: 0,
                total: 0
            }
        }
    }

    componentWillMount() {
        this.get_analytics()
    }
    get_analytics() {
        fetch(`${env.getCurrent().api}get_analytics`, {
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
                        this.setState({
                            analytics: [
                                ...this.state.analytics,
                                element
                            ]
                        })
                    })
                })

        }).then(_ => {
            this.setAnalytics()
        });
    }

    setAnalytics() {
        function week(state) {
            var now = moment();
            let this_week_length = 0;
            state
                .analytics
                .forEach(element => {
                    if (moment(element.datetime).isSame(new Date(), 'week')) {
                        this_week_length++
                    }
                })

            return this_week_length
        }
        function month(state) {
            var now = moment();
            let this_month_length = 0;
            state
                .analytics
                .forEach(element => {
                    if (moment(element.datetime).isSame(new Date(), 'month')) {
                        this_month_length++
                    }
                })

            return this_month_length

        }
        function year(state) {
            var now = moment();
            let this_year_length = 0;
            state
                .analytics
                .forEach(element => {
                    if (moment(element.datetime).isSame(new Date(), 'year')) {
                        this_year_length++
                    }
                })

            return this_year_length

        }
        function total(state) {
            return state.analytics.length
        }
        this.setState({
            visits: {
                week: week(this.state),
                month: month(this.state),
                year: year(this.state),
                total: total(this.state)
            }
        })
        console.log(this.state)
    }

    render() {
        return (
            <div
                className="uk-child-width-1-2@s uk-grid-collapse uk-text-center"
                uk-grid="true">
                <div>
                    <div className="uk-tile uk-tile-default">
                        <p className="uk-h4">{this.state.visits.week}</p>
                        <p>This Week</p>
                    </div>
                </div>
                <div>
                    <div className="uk-tile uk-tile-muted">
                        <p className="uk-h4">{this.state.visits.month}</p>
                        <p>This Month</p>
                    </div>
                </div>
                <div>
                    <div className="uk-tile uk-tile-primary">
                        <p className="uk-h4">{this.state.visits.year}</p>
                        <p>This Year</p>
                    </div>
                </div>
                <div>
                    <div className="uk-tile uk-tile-secondary">
                        <p className="uk-h4">{this.state.visits.total}</p>
                        <p>Total</p>
                    </div>
                </div>
            </div>
        )
    }

}

class Analytics extends Component {
    componentWillMount() {
        auth
            .isSignedIn()
            .then(user => {
                if (!user.isSignedIn) {
                    window.location = "/"
                }
            })
    }
    render() {
        return (
            <div className="uk-grid-divider" uk-grid="true">
                <div className="uk-width-1-5">
                    <DashboardNav/>
                </div>
                <div
                    className="uk-width-4-5 uk-child-width-1-2 uk-text-center uk-padding uk-panel"
                    uk-grid="true">
                    <div>
                        <div className="uk-card uk-card-default uk-card-body">
                            <h2>Visits</h2>
                            <Visits/>
                        </div>
                    </div>
                    <div>
                        <div className="uk-card uk-card-default uk-card-body">
                            <h2>Popular Posts</h2>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Analytics;