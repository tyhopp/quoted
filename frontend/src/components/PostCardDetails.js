import React, { Component } from 'react';
import { connect } from 'react-redux'

// actions
import { fetchComments } from '../actions'

// utils
import { capitalize, convertTimeStamp } from '../utils/helpers'

// icons
import FaClose from 'react-icons/lib/fa/close'
import FaQuoteLeft from 'react-icons/lib/fa/quote-left'
import MdAccountCircle from 'react-icons/lib/md/account-circle'
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up'
import FaThumbsDown from 'react-icons/lib/fa/thumbs-down'

// project styles
import '../styles/All.css'
import '../styles/PostCardDetails.css';

class PostCardDetails extends Component {
	constructor(props) {
		super(props);
		// binds 'this' to this PostCardDetails component
		this._handleDetailsModal = this._handleDetailsModal.bind(this);
	}

	state = {
		detailsModalOpen: this.props.detailsModalOpen,
	}

	componentDidMount() {
		this.props.dispatch(fetchComments()) // fetch comments
	}

	_handleDetailsModal() {
		this.props.closeDetailsModal()
	}

    render() {
    const { post } = this.props

	    return (
	    	<div>
				<div key={post.id} className="postEditorContainer">
					<div className="postEditorHeader">
						<div className="white">
							<div className="postEditorAuthorAlign">
								<MdAccountCircle />
								<div key={post.author} className="postEditorAuthor">
									{capitalize(post.author)}
								</div>
								<div key={post.timestamp} className="postEditorAuthor">
									/ {convertTimeStamp(post)}
								</div>
							</div>
						</div>
						<button className="gold"
								onClick={this._handleDetailsModal}>
							<FaClose />
						</button>
					</div>
					<div className="postEditorMain">
						<div className="postEditorRow">
							<div key={post.title} className="postEditorTitle">
								{capitalize(post.title)}
							</div>
						</div>
						<div className="postEditorRow">
							<div className="postEditorActionItems">
								<div className="postEditorActionItem">
				        			<div key={post.commentCount} className="actionCommentCount">
				        				{post.commentCount}
				        			</div>
				        			<div className="actionComment">
				        				<FaQuoteLeft />
				        			</div>
				        		</div>
				        		<div className="postEditorActionItem">
									<button className="postEditorThumbsUp">
										<FaThumbsUp />
									</button>
								</div>
								<div className="postEditorActionItem">
									<button className="postEditorThumbsDown">
										<FaThumbsDown />
									</button>
								</div>
								<div className="postEditorActionItem">
									<div className="postEditorVoteScore">
				                        <div key={post.voteScore} className="postEditorVoteScoreCount">
				                            {post.voteScore}
				                        </div>
				                    </div>
				                </div>
				                <div className="postEditorActionItem">
									<div key={post.category} className="postEditorCategory">
										{capitalize(post.category)}
									</div>
								</div>
							</div>
						</div>
						<div className="postEditorRow">
							<div key={post.body} className="postEditorBody">
								{capitalize(post.body)}
							</div>
						</div>
						<div className="postEditorRow">
							<button className="gold">
								Edit
							</button>
						</div>
						<div className="postEditorRow">
							<div className="postEditorLineBreak" />
						</div>
						<div className="postEditorRow">
							<div className="postEditorCommentTitleAlign">
								<div className="gold">
									<FaQuoteLeft />
								</div>
								<div className="postEditorCommentTitle">
									Leave a reply
								</div>
							</div>
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
						</div>{/* REPLY BLOCK END */}
						<div className="postEditorRow">
							<div className="postEditorCommentTitleAlign">
								<div className="gold">
									<FaQuoteLeft />
								</div>
								<div className="postEditorCommentTitle">
									Comments
								</div>
							</div>
						</div>
						<div className="postEditorCommentBlock">
							<div className="postEditorCommentBlockAlign">
								<div className="postEditorRow">
									<div className="postEditorCommentMain">
										<div className="postEditorCommentText">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur commodo, orci a placerat accumsan, erat quam placerat lacus, et fringilla nunc lorem eget lectus. Donec posuere neque nec rhoncus m
										</div>
										<button className="postEditorCommentClose">
											<FaClose />
										</button>
									</div>
									<div className="postEditorRow">
										<div className="postEditorCommentActionItems">
											<div className="postEditorAuthorAlign postEditorActionItem">
												<MdAccountCircle />
												<div className="postEditorAuthor">
													Jane
												</div>
												<div className="postEditorAuthor">
													/ Jan 12 @ 4PM
												</div>
											</div>
					                		<div className="postEditorActionItem">
												<button className="postEditorThumbsUp">
													<FaThumbsUp />
												</button>
											</div>
											<div className="postEditorActionItem">
												<button className="postEditorThumbsDown">
													<FaThumbsDown />
												</button>
											</div>
											<div className="postEditorActionItem">
												<div className="postEditorVoteScore">
						                            <div className="postEditorVoteScoreCount">
						                                +8
						                            </div>
						                        </div>
						                    </div>
										</div>
									</div>
									<div className="postEditorRow">
										<div className="postEditorActionOnComment">
											<button className="postEditorReplyToCommentAlign marg">
												<div className="postEditorReplyToCommentText gold">
													Reply
												</div>
											</button>
											<button className="postEditorReplyToCommentAlign marg">
												<div className="postEditorReplyToCommentText gold">
													Edit
												</div>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>{/* COMMENT BLOCK END */}
					</div>
				</div>
			</div>
		)
	}
} 

function mapStateToProps(state) {
	return {
		comments: state.comments,
	}
}

export default connect(mapStateToProps)(PostCardDetails)