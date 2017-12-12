import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// project components
import Category from '../components/Category'
import PostCardEditor from './PostCardEditor'

// project styles
import '../styles/All.css'
import '../styles/NavBar.css';

class NavBar extends Component {

	openIt() {
		return (
			<PostCardEditor />
		)
	}

  render() {
    return (
      <div>
        <div className="navContainer type">
        	<div className="navAlign">
		    	{/* map over category later */}
		    	<Link to="/">
			    	<button className="navLogo" onClick={() => this.openIt()}>
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
		        	<div className="sortByOptions">
		        		<div className="sortByOptionA">
				        	<button className="sortByOptionAText">
				        		Vote Score
				        	</button>
				        </div>
				        <div className="sortByOptionB">
				        	<button className="sortByOptionBText">
				        		Time Posted
				        	</button>
				        </div>
			        </div>
		        </div>
		    </div>
        </div>
      </div>
    );
  }
}

export default NavBar;