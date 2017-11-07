import React, { Component } from 'react';

// project styles
import '../styles/All.css'
import '../styles/Category.css';

class Category extends Component {
  render() {
    return (
      <div>
        <ul className="categoryList">
        	<li className="categoryItem red">
        		People
        	</li>
          <li className="categoryItem green">
            Places
          </li>
          <li className="categoryItem purple">
            Things
          </li>
        </ul>
      </div>
    );
  }
}

export default Category;