import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import ResultsCont from './ResultsCont';
import axios from 'axios'

class Landing extends Component {

    state = {
        owner: "",
        repo: "", 
        page: 1,
        response: null,
        error: false, 
        loading: false,
        submitted: false
    }

    changeHandler = (e) => {
        this.setState({
           [e.target.name]: e.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.setState({
            loading: true,
            submitted: true
        })
        let {owner, repo} = this.state
        let config = {'Authorization': process.env.REACT_APP_GITHUB_SECRET}
        axios.get(`https://api.github.com/repos/${owner}/${repo}/issues?page=${this.state.page}`, config)
            .then(res => {
                this.setState({
                    response: res,
                    error: false,
                    loading: false
                })
            })
            .catch(error =>{
                this.setState({
                    error: `Error: ${error.response.data.message}`,
                    loading: false
                })
            })
    }

    render() {
        console.log(this.state.response)
        return (
            <div>
                <h1>Find the issues of your fave Github repo!!</h1>
                <form onSubmit={this.submitHandler}>
                    <input type="text" name="owner" value={this.state.owner} onChange={this.changeHandler}/>
                    <input type="text" name="repo" value={this.state.repo} onChange={this.changeHandler}/>
                    <input type="submit" value="Submit"/>
                </form>
               {this.state.submitted && <ResultsCont results={this.state.response} error={this.state.error}/>}
            </div>
        )
    }
}

export default withRouter(Landing);
