import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import ResultsCont from './ResultsCont';
import axios from 'axios'
import hammer from '../hammer.png'
import roller from '../roller.png'

class Landing extends Component {

    state = {
        owner: "",
        repo: "", 
        mostRecent: true,
        page: 1,
        response: null,
        error: false, 
        loading: false,
        submitted: false
    }

    changeHandler = (e) => {
        if(e.target.name === "mostRecent"){
            this.setState({mostRecent: !this.state.mostRecent})
        } else {
            this.setState({[e.target.name]: e.target.value})
        }
    }

    pageHandler = (e) => {
        if(e.target.name === "previous"){
            this.setState({page: this.state.page-1}, ()=>this.submitHandler())
        } else {
            this.setState({page: this.state.page+1}, ()=> this.submitHandler())
        }
    }

    submitHandler = (e=null) => {
        e && e.preventDefault()
        this.setState({
            loading: true,
            submitted: true
        })
        let {owner, repo} = this.state
        let direction=""
        this.state.mostRecent ? direction="desc":direction="asc"
        let config = {'Authorization': process.env.REACT_APP_GITHUB_SECRET}
        axios.get(`https://api.github.com/repos/${owner}/${repo}/issues?page=${this.state.page}&direction=${direction}`, config)
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
                <img id="icon1" src={hammer} alt="hammer"/>
                <img id="icon2" src={roller} alt="roller"/>
            <div>
                <h1 id="header">Explore Github Issues!</h1>
                <form onSubmit={this.submitHandler}>
                    <input type="text" name="owner" value={this.state.owner} placeholder="Repository Owner" onChange={this.changeHandler} required/>
                    <input type="text" name="repo" value={this.state.repo} placeholder="Repository Name" onChange={this.changeHandler} required/>
                    <br/>
                    <label for="mostRecent">Most recent issues first:</label>
                    <input type="checkbox" id="mostRecent" name="mostRecent" checked={this.state.mostRecent} onChange={this.changeHandler}/>
                    <input type="submit" className="submit" value="Search"/>
                </form>
               {this.state.submitted && <ResultsCont loading ={this.state.loading }results={this.state.response} error={this.state.error} pageHandler={this.pageHandler}/>}
            </div>
            </React.Fragment>
        )
    }
}

export default withRouter(Landing);
