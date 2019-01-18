import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import IssueView from './IssueView';
import ring from '../ring.png'

class ResultsCont extends Component {


    render() {
        let {loading, results, error, pageHandler, page} = this.props
        if(loading){
            return (
                <React.Fragment>
                    <h2 id="issues-header">Project Issues:</h2>
                    <img src={ring} alt="loader" className="loader"/>
                    <p className="medium">Loading</p>
                </React.Fragment>
            )
        } else if(error){
            return(
                <React.Fragment>
                    <h2 id="issues-header">Project Issues:</h2>
                    <p className="medium">{error}</p>
                </React.Fragment>
            )
        } else {
            console.log(results.data)
            return (
                <div className="section">
                    <h2 id="issues-header">Project Issues:</h2>
                    <div className="issues-list fade-in">
                    {results.data.map(issue => {
                        return <IssueView issue={issue}/>
                    })}
                    {results.data.length === 0 && <p className="medium">There are no issues for this repository :0</p>}
                    </div>
                    <button disabled={page===1?true:false} className="page-link"href="" name="previous" onClick={pageHandler}>Prev. Page</button> 
                    <button disabled={results.data.length === 0 ? true:false} className="page-link"href="" name="next" onClick={pageHandler}>Next Page</button>
                </div>
            );
    }}
}

export default withRouter(ResultsCont);
