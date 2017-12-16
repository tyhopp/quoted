import React, { Component } from 'react'
import { Route } from 'react-router-dom'

// project components
import Home from './Home'
import CategoryPeople from './CategoryPeople'

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
				<Route exact path="/people" render={() => ( <CategoryPeople /> )} />
				<Route exact path="/places" render={() => ( <Home /> )} />
				<Route exact path="/things" render={() => ( <Home /> )} />
			</div>
		);
	}
}

export default Quoted;
