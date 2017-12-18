import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

// project components
import Home from './Home'
import CategoryFilter from './CategoryFilter'

// project styles
import '../styles/All.css'



class Quoted extends Component {

	state = {
		postId: null, 
		people: 'people', // categories
		places: 'places',
		things: 'things'
	}

	render() {
		return (
			<div className="container">
					<Route exact path="/" render={() => ( <Home /> )} />
					<Route exact path="/people" render={() => ( <CategoryFilter category={this.state.people} /> )} />
					<Route exact path="/places" render={() => ( <CategoryFilter category={this.state.places} /> )} />
					<Route exact path="/things" render={() => ( <CategoryFilter category={this.state.things} /> )} />
					<Route exact path="/:category/:post_id" render={() => ( <Home /> )} />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		post: state.post,
		posts: state.posts,
	}
}

export default withRouter(connect(mapStateToProps)(Quoted))
