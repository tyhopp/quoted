import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

// actions
import { editPost } from '../actions'

// icons
import FaQuoteLeft from 'react-icons/lib/fa/quote-left'
import FaClose from 'react-icons/lib/fa/close'

// project styles
import '../styles/All.css'
import '../styles/PostCardEditor.css';

class PostCardEditor extends Component {
	constructor(props) {
		super(props);
		this._handleEditModal = this._handleEditModal.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
	}

	_handleEditModal() {
		this.props.closeEditModal()
	}

	_onSubmit(values) {
		const postId = this.props.post[0].id
		this.props.dispatch(editPost(postId, values)) // edit post
		this.props.closeEditModal() // destroys form
	}

    render() {
    	const { handleSubmit, post } = this.props // handleSubmit provided from reduxForm

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
									Edit Post
								</div>
							</div>
							<button onClick={this._handleEditModal} className="postEditorHeaderItem gold">
								<FaClose />
							</button>
						</div>

						{/* REDUX FORM */}
						<form className="postEditorReplyBlock"
							  onSubmit={handleSubmit(this._onSubmit)}
						>
							{post && post.map((post) => (
							<div key={post} className="postEditorReplyBlockAlign">
								<div className="postEditorRow">
									<div className="postEditorReplyMain">
										<div className="postEditorReplyRow">
											<div className="postEditorReplyName">
												<label className="postEditorReplyNamePrompt">
													Title
												</label>
												<Field name="title" 
													   component="input" 
													   type="text" 
													   defaultValue={post.title}
												/>
											</div>
										</div>
										<div className="postEditorReplyRow">
											<div className="postEditorReplyContent">
												<label className="postEditorReplyContentPrompt">
													Body
												</label>
												<Field name="body" 
														  component="textarea" 
														  type="text"
														  defaultValue={post.body}
												/>
											</div>
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
							))}
						</form>{/* REDUX FORM END */}
					</div>
				</div>
			</div>
		)
	}
}

PostCardEditor = reduxForm({
	form: 'editPost',

})(PostCardEditor)


export default connect()(PostCardEditor)