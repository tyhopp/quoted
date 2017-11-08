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
import '../styles/PostCardEditor.css';

class PostCardEditor extends Component {
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
		console.log(values)
		this.props.pushPostToStore(values) // push form values to store
		this.props.closeCreateModal() // destroys form
	}


    render() {
    	const { handleSubmit } = this.props

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
							<button className="postEditorHeaderItem gold">
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
													Content
												</label>
												<textarea className="postEditorReplyInput" type="text" />
											</div>
										</div>
										<div className="postEditorReplyRow">
											<select name="Category">
												<option value="value1">People</option> 
												<option value="value2">Places</option>
												<option value="value3">Things</option>
											</select>
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

PostCardEditor = reduxForm({
	form: 'createPostForm'
})(PostCardEditor)

const mapDispatchToProps = dispatch => ({
  pushPostToStore: (values) => dispatch(createPost(values))
});

export default connect(null, mapDispatchToProps)(PostCardEditor)