import keys from "./lib/key";
import React, {Component} from 'react';
import DashboardNav from './DashboardNav'

class Visits extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visits: {
                week: 4,
                month: 4,
                year: 4,
                total: 4
            }
        }
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
                            <Visits />
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