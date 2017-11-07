import React, { Component } from 'react';
import { connect } from 'react-redux'

// icons
import FaQuoteLeft from 'react-icons/lib/fa/quote-left'
import FaClose from 'react-icons/lib/fa/close'

// project styles
import '../styles/All.css'
import '../styles/PostCardEditor.css';

class PostCardEditor extends Component {

    render() {
    const { posts } = this.props.posts

	    return (
	    	<div>
	    		{posts.map((post) => (
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
									onClick={this.closeCreatePostModal}>
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
				))}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		posts: state.posts
	}
}


export default connect(mapStateToProps)(PostCardEditor)