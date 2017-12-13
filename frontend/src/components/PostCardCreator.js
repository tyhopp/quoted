import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

// actions
import { createPost } from '../actions'

// icons
import FaQuoteLeft from 'react-icons/lib/fa/quote-left'
import FaClose from 'react-icons/lib/fa/close'

// project styles
import '../styles/All.css'
import '../styles/PostCardCreator.css';

class PostCardCreator extends Component {
	constructor(props) {
		super(props);
		// binds 'this' to this PostCardDetails component
		this._handleCreateModal = this._handleCreateModal.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
	}

	state = {
		createModalOpen: this.props.createModalOpen,
	}

	_handleCreateModal() {
		this.props.closeCreateModal()
	}

	_onSubmit(values) {
		this.props.dispatch(createPost(values)) // push form values to store
		this.props.closeCreateModal() // destroys form
	}


    render() {
    	const { handleSubmit } = this.props // provided from reduxForm

	    return (
	    	<div>
				<div className="postEditorContainerTwo">
					<div className="postEditorRowAlign">
						<div className="postEditorRow modalTwoHeaderAlign">
							<div className="postEditorCommentTitleAlign">
								<div className="gold">
									<FaQuoteLeft />
								</div>
								<div className="postEditorCommentTitle">
									Write a post
								</div>
							</div>
							<button onClick={this._handleCreateModal} className="postEditorHeaderItem gold">
								<FaClose />
							</button>
						</div>

						{/* REDUX FORM */}
						<form className="postEditorReplyBlock"
							  onSubmit={handleSubmit(this._onSubmit)}
						>
							<div className="postEditorReplyBlockAlign">
								<div className="postEditorRow">
									<div className="postEditorReplyMain">
										<div className="postEditorReplyRow">
											<div className="postEditorReplyName">
												<label className="postEditorReplyNamePrompt">
													Author
												</label>
												<Field name="author" component="input" type="text"/>
											</div>
										</div>
										<div className="postEditorReplyRow">
											<div className="postEditorReplyName">
												<label className="postEditorReplyNamePrompt">
													Title
												</label>
												<Field name="title" component="input" type="text"/>
											</div>
										</div>
										<div className="postEditorReplyRow">
											<div className="postEditorReplyContent">
												<label className="postEditorReplyContentPrompt">
													Body
												</label>
												<textarea name="body" component="input" type="text"/>
											</div>
										</div>
										<div className="postEditorReplyRow">
											<Field name="category" component="select">
												<option value="people">People</option> 
												<option value="places">Places</option>
												<option value="things">Things</option>
											</Field>
										</div>
										<div className="postEditorRow">
											<button type="submit" 
													className="postEditorReplyToCommentAlign"
											>
												<div className="postEditorReplyToCommentText gold">
													Submit
												</div>
											</button>
										</div>
									</div>
								</div>
							</div>
						</form>{/* REDUX FORM END */}
					</div>
				</div>
			</div>
		)
	}
}

PostCardCreator = reduxForm({
	form: 'post'
})(PostCardCreator)


export default connect()(PostCardCreator)