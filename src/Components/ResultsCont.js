import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import axios from 'axios'

class ResultsCont extends Component {

    componentDidMount(){
        let config = {'Authorization': process.env.REACT_APP_GITHUB_SECRET}
        axios.get('https://api.github.com/repos/CocoaPods/CocoaPods/issues', config)
            .then(response => {
                console.log(response)
            })
    }
    render() {
        return (
            <div>
                <p>some results</p>
            </div>
        );
    }
}

export default withRouter(ResultsCont);
