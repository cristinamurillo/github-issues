import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import ResultsCont from './ResultsCont';
import axios from 'axios'
import hammer from '../hammer.png'

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
        return (
            <React.Fragment>

                <img id="icon1" src={hammer}/>
            <div>
                <h1 id="header">Find the issues of your fave Github repo!!</h1>
                <form onSubmit={this.submitHandler}>
                    <input type="text" name="owner" value={this.state.owner} placeholder="Repository Owner" onChange={this.changeHandler} required/>
                    <input type="text" name="repo" value={this.state.repo} placeholder="Repository Name" onChange={this.changeHandler} required/>
                    <input type="submit" className="submit" value="Search"/>
                </form>
               {this.state.submitted && <ResultsCont loading ={this.state.loading }results={this.state.response} error={this.state.error}/>}
            </div>
            </React.Fragment>
        )
    }
}

export default withRouter(Landing);
