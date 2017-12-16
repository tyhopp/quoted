import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash';

// project components
import Category from '../components/Category'

// project styles
import '../styles/All.css'
import '../styles/NavBar.css';

class NavBar extends Component {

	sortByVoteScore() {
		const { posts } = this.props.posts
		const orderedPosts = _.sortBy(posts, ['voteScore']).reverse() // sort by voteScore
		console.log(orderedPosts)
	}
	sortByTimeStamp() {
		const { posts } = this.props.posts
		const orderedPosts = _.sortBy(posts, ['timestamp']) // sort by timestamp
		console.log(orderedPosts)
	}

	render() {

		const { posts } = this.props.posts

		return (
			<div>
				<div className="navContainer type">
					<div className="navAlign">
				    	{/* map over category later */}
				    	<Link to="/">
					    	<button className="navLogo">
					    		Quoted
					    	</button>
				    	</Link>
				    	<div className="navCategories">
				        	<Category />
				        </div>
				        <div className="sortByContainer">
				        	<div className="sortByAlign">
					        	<div className="sortBy">
					        		Sort by: 
					        	</div>
					        </div>
					        <div>
					        	<div className="sortByOptions">
					        		<div className="sortByOptionA">
							        	<button onClick={() => this.sortByVoteScore(posts)} 
							        			className="sortByOptionAText">
							        		Vote Score
							        	</button>
							        </div>
							        <div className="sortByOptionB">
							        	<button onClick={() => this.sortByTimeStamp(posts)} 
							        			className="sortByOptionBText">
							        		Time Posted
							        	</button>
							        </div>
						        </div>
						    </div>
				        </div>
				    </div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		posts: state.posts,
	}
}

export default connect(mapStateToProps)(NavBar)