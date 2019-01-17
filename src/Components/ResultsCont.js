import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'

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
            return (
                <div>
                    <p>we got results</p>
                </div>
            );
    }}
}

export default withRouter(ResultsCont);
