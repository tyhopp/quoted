import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// icons
import FaClose from 'react-icons/lib/fa/close'

// project styles
import '../styles/All.css'
import '../styles/PostCardEditor.css';

class NotFound extends Component {

    render() {

	    return (
	    	<div>
				<div className="postEditorContainerThree">
					<div className="postEditorRowAlignTwo">
						<div className="postEditorRow modalTwoHeaderAlign">
							<div />
							<div>
								<div>
									No component found.
								</div>
							</div>
							<Link to="/" className="postEditorHeaderItem gold">
								<FaClose />
							</Link>
						</div>
					</div>
				</div>
			</div>
		)
	}
}




export default connect()(NotFound)