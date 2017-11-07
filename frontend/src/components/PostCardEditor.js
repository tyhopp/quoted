import React, { Component } from 'react';

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
	}

	state = {
		createModalOpen: this.props.createModalOpen,
	}

	_handleCreateModal() {
		this.props.closeCreateModal()
	}


    render() {

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
							<button className="postEditorHeaderItem gold"
								onClick={this._handleCreateModal}>
								<FaClose />
							</button>
						</div>
						<div className="postEditorReplyBlock">
							<div className="postEditorReplyBlockAlign">
								<div className="postEditorRow">
									<div className="postEditorReplyMain">
										<div className="postEditorReplyRow">
											<div className="postEditorReplyName">
												<div className="postEditorReplyNamePrompt">
													Name 
												</div>
												<input type="text" />
											</div>
										</div>
										<div className="postEditorReplyRow">
											<div className="postEditorReplyContent">
												<div className="postEditorReplyContentPrompt">
													Reply
												</div>
												<textarea className="postEditorReplyInput" type="text" />
											</div>
										</div>
										<div className="postEditorRow">
											<button className="postEditorReplyToCommentAlign">
												<div className="postEditorReplyToCommentText gold">
													Submit
												</div>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>{/* REPLY BLOCK END */}
				</div>
			</div>
		)
	}
}




export default PostCardEditor