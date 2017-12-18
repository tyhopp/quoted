import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

// project styles
import '../styles/All.css'
import '../styles/Category.css';

class Category extends Component {
  render() {
    return (
      <div>
        <ul className="categoryList">
          <Link to="/people">
          	<li className="categoryItem red">
          		People
          	</li>
          </Link>
          <Link to="/places">
            <li className="categoryItem green">
              Places
            </li>
          </Link>
          <Link to="/things">
            <li className="categoryItem purple">
              Things
            </li>
          </Link>
        </ul>
      </div>
    );
  }
}

export default withRouter(connect()(Category))