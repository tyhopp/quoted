import React, { Component } from 'react'
import { Route } from 'react-router-dom'

// project components
import Home from './Home'

// project styles
import '../styles/All.css'



class Quoted extends Component {

	state = {
		postId: null, 
	}

	render() {
		return (
			<div className="container">
				<Route exact path="/" render={() => ( <Home /> )} />
			</div>
		);
	}
}

export default Quoted;
