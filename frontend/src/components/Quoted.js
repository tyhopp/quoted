import React, { Component } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// project components
import Home from './Home'
import NotFound from './NotFound'
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
		const deletedPost = this.props.post
		return (
			<div className="container">
				{console.log(this.props)}
					<Route exact path="/" render={() => ( <Home /> )} />
					<Route exact path="/people" render={() => ( <CategoryFilter category={this.state.people} /> )} />
					<Route exact path="/places" render={() => ( <CategoryFilter category={this.state.places} /> )} />
					<Route exact path="/things" render={() => ( <CategoryFilter category={this.state.things} /> )} />
					<Route exact path="/:category/:post_id" render={() => ( <Home /> )} />
					<Route exact path="/404" render={() => ( <NotFound /> )} />
					<Redirect from={`/${deletedPost.category}/${deletedPost.id}`} to="/404" />
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
