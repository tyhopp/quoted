import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import Loading from 'react-loading'
import { withRouter, Link } from 'react-router-dom'

// actions
import { fetchCategoryPosts } from '../actions'

// icons
import MdAddCircle from 'react-icons/lib/md/add-circle'

// project components
import NavBar from './NavBar'
import PostCard from './PostCard'
import PostCardDetails from './PostCardDetails'
import PostCardCreator from './PostCardCreator'

// project styles
import '../styles/Home.css'
import '../styles/All.css'



class CategoryFilter extends Component {
	constructor(props) {
		super(props);
		// binds 'this' to this component
		this.closeDetailsModal = this.closeDetailsModal.bind(this);
		this.closeCreateModal = this.closeCreateModal.bind(this);
	}

	state = {
		loadingCreatePost: false,
		loadingDetailsPost: false,
		createModalOpen: false,
		detailsModalOpen: false,
		displayedPost: undefined
	}

	componentDidMount() {
		this.props.dispatch(fetchCategoryPosts(this.props.category)) // fetch posts by category
	}
	componentWillReceiveProps(nextProps){
		if (this.props.post !== nextProps.post) {
			this.props.dispatch(fetchCategoryPosts(this.props.category)) // re-fetch posts by category
		}
	}
	openDetailsModal = (post) => {
		this.setState({
			...this.state,
			detailsModalOpen: true,
			displayedPostId: post.id
		})
	}
	closeDetailsModal() {
        this.setState({ detailsModalOpen: false })
    }
	openCreateModal = () => this.setState(() => ({ createModalOpen: true }))
	closeCreateModal() {
        this.setState({ createModalOpen: false })
    }

	submit = (values) => {
		// print the form values to the console
		console.log(values)
	}

	render() {
		const { loadingDetailsPost, loadingCreatePost, detailsModalOpen, createModalOpen } = this.state
		const { posts } = this.props.posts

		return (
			<div className="entirePostList">
				<NavBar />
				<div className="postListContainer">
					<div className="postListRow">
						{posts.map((post) => (
							<div key={post.id} className="postContainer">
								{/* map id: {post.id} */}
								<PostCard post={post} />
								<Link to={`/${post.category}/${post.id}`} className="openPostButton" 
										onClick={() => this.openDetailsModal(post)}>
									See more
								</Link>
							</div>
						))}
					</div>
				</div>
				<button className="newPostButton"
						onClick={this.openCreateModal}>
					<MdAddCircle className="newPostButtonImg"/>
				</button>
				
				<Modal // VIEW POST DETAILS MODAL
		          className='modal'
		          overlayClassName='createOverlay'
		          isOpen={detailsModalOpen}
		          onRequestClose={this.closeDetailsModal}
		          contentLabel='Modal'
		        >
					<div>
						{loadingDetailsPost === true
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
									<PostCardDetails postId={this.state.displayedPostId}
													 closeDetailsModal={this.closeDetailsModal}
													 detailsModalOpen={this.state.detailsModalOpen}
									/>
								</div>
						}
					</div>
		        </Modal>

				<Modal // CREATE POST MODAL
		          className='modal'
		          overlayClassName='createOverlay'
		          isOpen={createModalOpen}
		          onRequestClose={this.closeCreateModal}
		          contentLabel='Modal'
		        >
					<div>
						{loadingCreatePost === true
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
									<PostCardCreator closeCreateModal={this.closeCreateModal}
													createModalOpen={this.state.createModalOpen}
									/>
								</div>
						}
					</div>
		        </Modal>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		post: state.post,
		posts: state.posts,
	}
}


export default withRouter(connect(mapStateToProps)(CategoryFilter))