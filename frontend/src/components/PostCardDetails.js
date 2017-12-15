import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reset, reduxForm } from 'redux-form'
import Modal from 'react-modal'
import Loading from 'react-loading'

// actions
import { fetchOnePost, voteOnPost, deletePost, fetchComments, fetchOneComment, createComment, voteOnComment, deleteComment } from '../actions'

// utils
import { capitalize, convertTimeStamp } from '../utils/helpers'

// icons
import FaClose from 'react-icons/lib/fa/close'
import FaQuoteLeft from 'react-icons/lib/fa/quote-left'
import MdAccountCircle from 'react-icons/lib/md/account-circle'
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up'
import FaThumbsDown from 'react-icons/lib/fa/thumbs-down'

// project components
import PostCardPostEditor from './PostCardPostEditor'

// project styles
import '../styles/All.css'
import '../styles/PostCardDetails.css';

class PostCardDetails extends Component {
	constructor(props) {
		super(props);
		// binds 'this' to this PostCardDetails component
		this._handleDetailsModal = this._handleDetailsModal.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
	}

	state = {
		detailsModalOpen: this.props.detailsModalOpen,
		loadingEditModal: false,
		editModalOpen: false,
	}

	componentDidMount() {
		const postId = this.props.postId // from Home component
		this.props.dispatch(fetchOnePost(postId)) // fetch post details
		this.props.dispatch(fetchComments(postId)) // fetch comments, passing post id
	}
	componentWillReceiveProps(nextProps){
		const postId = this.props.postId // from Home component
		if (this.props.comment !== nextProps.comment) {
			this.props.dispatch(fetchComments(postId)) // re-fetch comments 
		}
		if (this.props.post !== nextProps.post) {
			this.props.dispatch(fetchOnePost(postId)) // fetch post details
		}
	}
	_handleDetailsModal() {
		this.props.closeDetailsModal()
	}
	_handleUpVotePost() {
		const postId = this.props.postId
		const vote = 'upVote'
		this.props.dispatch(voteOnPost(postId, vote))
	}
    _handleDownVotePost() {
        const postId = this.props.postId
        const vote = 'downVote'
        this.props.dispatch(voteOnPost(postId, vote))
    }
    _handleDeletePost() {
    	const postId = this.props.postId
    	this.props.dispatch(deletePost(postId))
    	this.props.closeDetailsModal()
    }
    _handleUpVoteComment(comment) {
		const commentId = comment.id
		const vote = 'upVote'
		this.props.dispatch(voteOnComment(commentId, vote))
	}
    _handleDownVoteComment(comment) {
        const commentId = comment.id
        const vote = 'downVote'
        this.props.dispatch(voteOnComment(commentId, vote))
    }
    _handleDeleteComment(comment) {
    	const commentId = comment.id
    	this.props.dispatch(deleteComment(commentId))
    }
	_onSubmit(values) {
		const postId = this.props.postId
		this.props.dispatch(createComment(values, postId)) // push form values to store
		this.props.dispatch(reset('comment')); // from reduxForm, resets values
	}
	openEditModal = () => this.setState(() => ({ editModalOpen: true }))
	closeEditModal = () => this.setState(() => ({ editModalOpen: false }))

    render() {
    const { post } = this.props.post
    const { comments } = this.props.comments
    const { handleSubmit } = this.props // provided from reduxForm

	    return (

	    	<div>
	    		{console.log(this.props)}
	    		{post && post.map((post) => (
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
									<button className="postEditorThumbsUp"
											onClick={() => this._handleUpVotePost()}
									>
										<FaThumbsUp />
									</button>
								</div>
								<div className="postEditorActionItem">
									<button className="postEditorThumbsDown"
											onClick={() => this._handleDownVotePost()}
									>
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
							<button className="gold marg"
									onClick={() => this.openEditModal()}
							>
								Edit
							</button>
							<button className="gold marg"
									onClick={() => this._handleDeletePost()}
							>
								Delete
							</button>
						</div>
						<div className="postEditorRow">
							<div className="postEditorLineBreak" />
						</div>
						{/* REDUX FORM */}
						<form onSubmit={handleSubmit(this._onSubmit)}>
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
													<label className="postEditorReplyNamePrompt">
														Name 
													</label>
													<Field name="author" component="input" type="text"/>
												</div>
											</div>
											<div className="postEditorReplyRow">
												<div className="postEditorReplyContent">
													<label className="postEditorReplyContentPrompt">
														Reply
													</label>
													<Field name="body" component="textarea" type="text"/>
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
						</form>
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
								{comments && comments.map((comment) => (
									<div className="commentEditorRow" key={comment.id}>
										<div className="commentEditorSubRow">
											<div className="postEditorCommentMain">
												<div key={comment.body} className="postEditorCommentText">
													{comment.body}
												</div>
											</div>
										</div>
										<div className="commentEditorSubRow">
											<div className="postEditorCommentActionItems">
												<div className="postEditorAuthorAlign postEditorActionItem">
													<MdAccountCircle />
													<div key={comment.author} className="postEditorAuthor">
														{capitalize(comment.author)}
													</div>
													<div key={comment.timestamp} className="postEditorAuthor">
														{convertTimeStamp(comment)}
													</div>
												</div>
						                		<div className="postEditorActionItem">
													<button className="postEditorThumbsUp">
														<FaThumbsUp onClick={() => this._handleUpVoteComment(comment)}/>
													</button>
												</div>
												<div className="postEditorActionItem">
													<button className="postEditorThumbsDown">
														<FaThumbsDown onClick={() => this._handleDownVoteComment(comment)}/>
													</button>
												</div>
												<div className="postEditorActionItem">
													<div className="postEditorVoteScore">
							                            <div key={comment.voteScore} className="postEditorVoteScoreCount">
							                                {comment.voteScore}
							                            </div>
							                        </div>
							                    </div>
											</div>
										</div>
										<div className="commentEditorSubRow">
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
												<button className="postEditorReplyToCommentAlign marg">
													<div className="postEditorReplyToCommentText gold"
														 onClick={() => this._handleDeleteComment(comment)}
													>
														Delete
													</div>
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>{/* COMMENT BLOCK END */}
					</div>
				</div>
				))}

				<Modal // EDIT POST MODAL
		          className='modal'
		          overlayClassName='createOverlay'
		          isOpen={this.state.editModalOpen}
		          onRequestClose={this.closeEditModal}
		          contentLabel='Modal'
		        >
					<div>
						{this.state.loadingEditPost === true
							?   <div>
									<div className="postEditorBg" />
									<Loading type='bubbles' 
											 delay={200} 
											 color='#fed80a' 
											 className="loading"
											 width={120} />
								</div>
							:   <div>
							    	<div className="postEditorBg" /> 
									<PostCardPostEditor closeEditModal={this.closeEditModal} 
													post={post}
									/>
								</div>
						}
					</div>
		        </Modal>

			</div>
		)
	}
} 

function mapStateToProps(state) {
	return {
		comments: state.comments,
		comment: state.comment,
		post: state.post
	}
}

PostCardDetails = reduxForm({
	form: 'comment',
})(PostCardDetails)

export default connect(mapStateToProps)(PostCardDetails)