import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import IssueView from './IssueView';

class ResultsCont extends Component {

    render() {
        let {loading, results, error} = this.props
        if(loading){
            return <p>Loading</p>
        } else if(error){
            return(
                <p>{error}</p>
            )
        } else {
            console.log(results)
            return (
                <div>
                    <h2>Project Issues:</h2>
                    <IssueView issue={results.data[0]}/>
                </div>
            );
    }}
}

export default withRouter(ResultsCont);
