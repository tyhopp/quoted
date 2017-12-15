import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

// actions
import { editComment } from '../actions'

// icons
import FaQuoteLeft from 'react-icons/lib/fa/quote-left'
import FaClose from 'react-icons/lib/fa/close'

// project styles
import '../styles/All.css'
import '../styles/PostCardEditor.css';

class PostCardCommentEditor extends Component {
	constructor(props) {
		super(props);
		this._handleEditCommentModal = this._handleEditCommentModal.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
	}

	_handleEditCommentModal() {
		this.props.closeEditCommentModal()
	}
	_onSubmit(values) {
		const commentId = this.props.comment[0].id
		this.props.dispatch(editComment(commentId, values)) // edit post
		this.props.closeEditCommentModal() // destroys form
	}

    render() {
    	const { handleSubmit, comment } = this.props // handleSubmit provided from reduxForm

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
									Edit Comment
								</div>
							</div>
							<button onClick={this._handleEditCommentModal} className="postEditorHeaderItem gold">
								<FaClose />
							</button>
						</div>

						{/* REDUX FORM */}
						<form className="postEditorReplyBlock"
							  onSubmit={handleSubmit(this._onSubmit)}
						>
							{comment && comment.map((comment) => (
							<div key={comment} className="postEditorReplyBlockAlign">
								<div className="postEditorRow">
									<div className="postEditorReplyMain">
										<div className="postEditorReplyRow">
											<div className="postEditorReplyContent">
												<label className="postEditorReplyContentPrompt">
													Body
												</label>
												<Field name="body" 
														  component="textarea" 
														  type="text"
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

function mapStateToProps(state) {
	if (state.comment.comment) {
		const comment = state.comment.comment[0]

		return {
			initialValues: {
				body: comment.body
			}
		}
	}
}

PostCardCommentEditor = reduxForm({
	form: 'editComment',
})(PostCardCommentEditor)


export default connect(mapStateToProps)(PostCardCommentEditor)