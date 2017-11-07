import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// project components
import Category from '../components/Category'

// project styles
import '../styles/All.css'
import '../styles/NavBar.css';

class NavBar extends Component {
  render() {
    return (
      <div>
        <div className="navContainer type">
        	<div className="navAlign">
		    	{/* map over category later */}
		    	<Link to="/">
			    	<div className="navLogo">
			    		Quoted
			    	</div>
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