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
                    <div>
                        <h4>{issue.title}</h4>
                        <p>Status: {issue.state}</p>
                        <a href={issue.html_url} target='_blank'>View on Github</a>
                    </div>
                    <div>
                        <button onClick={this.detailToggle}>{this.state.showBody ? 'Hide Details': 'Show Details'}</button>
                    </div>
                </div>
                {this.state.showBody && <div className="details"><Markdown escapeHtml={true} source={this.parseDetails()}/></div>}
            </div>
        );
    }
}

export default IssueView;
