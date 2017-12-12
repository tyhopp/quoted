import React, { Component } from 'react';

// project styles
import '../styles/All.css'
import '../styles/Category.css';

class Category extends Component {
  render() {
    return (
      <div>
        <ul className="categoryList">
          <button>
          	<li className="categoryItem red">
          		People
          	</li>
          </button>
          <button>
            <li className="categoryItem green">
              Places
            </li>
          </button>
          <button>
            <li className="categoryItem purple">
              Things
            </li>
          </button>
        </ul>
      </div>
    );
  }
}

export default Category;