import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import ResultsCont from './ResultsCont';

class Landing extends Component {

    render() {
        return (
            <div>
                <ResultsCont />
            </div>
        )
    }
}

export default withRouter(Landing);
