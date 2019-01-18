import React, { Component } from 'react';
import Markdown from 'react-markdown'

class IssueView extends Component {
    state = {
        showBody: false
    }

    parseDetails = () => {
        let index = this.props.issue.body.indexOf('Report')
        return this.props.issue.body.substring(index-2)
    }

    detailToggle = () => {
        this.setState({
            showBody: !this.state.showBody
        })
    }

    render() {
        const {issue} = this.props
        return (
            <div className="issue-cont">
                <div className="flex">
                    <div className="col1">
                        <h4 className="issue-title">{issue.title}</h4>
                        <p>Status: {issue.state}</p>
                        <p>Created: {issue.created_at.slice(0,10)}</p>
                        <a href={issue.html_url} target='_blank' rel="noopener noreferrer">View on Github</a>
                    </div>
                    <div>
                        <button className="med-button" onClick={this.detailToggle}>{this.state.showBody ? 'Hide Details': 'Show Details'}</button>
                    </div>
                </div>
                {this.state.showBody && <div className="details"><Markdown escapeHtml={true} source={this.parseDetails()}/></div>}
            </div>
        );
    }
}

export default IssueView;
