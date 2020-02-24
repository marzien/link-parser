import React, { Component } from 'react';
import './Result.css'

class Result extends Component {
    constructor() {
        super();
        this.state = {
            results: {}
        }
    }

    componentDidMount() {
        fetch('/api/parser')
            .then(res => res.json())
            .then(results => this.setState({results}, 
                () => console.log('Starter data..')
            ));
    }

    // updating state from server
    componentWillMount() {
        fetch('/api/parser')
            .then(res => res.json())
            .then(results => this.setState({results}, 
                () => console.log('After sending URL..')
            ))
            .catch((error) => {
                console.error(error);
            });
    }

    render() { 
        return ( 
            <div>
                <h2>Results</h2>
                <ul>
                    <li key={'version'}>{this.state.results.version}</li>
                    <li key={'title'}>{this.state.results.title}</li>
                    <li key={'heading number'}>{this.state.results.headingNumber}</li>
                    <li key={'headingLevel'}>{this.state.results.headingLevel}</li>
                    <li key={'picture number'}>{this.state.results.pictureNumber}</li>
                    <li key={'largest picture'}>{this.state.results.largestPicture}</li>
                    <li key={'internal links'}>{this.state.results.linksIntCount}</li>
                    <li key={'external links'}>{this.state.results.linksExtCount}</li>
                    <li key={'inaccesible link'}>{this.state.results.inaccesibleLink}</li>
                    <li key={'loading time'}>{this.state.results.loadingTime}</li>
                    <li key={'http status'}>{this.state.results.httpStatus}</li>
                </ul>
            </div>
        );
    }
}
 
export default Result;