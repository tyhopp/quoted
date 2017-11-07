import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import Loading from 'react-loading'

// icons
import MdAddCircle from 'react-icons/lib/md/add-circle'

// project components
import NavBar from './NavBar'
import PostCard from './PostCard'
import PostCardDetails from './PostCardDetails'
import PostCardEditor from './PostCardEditor'

// project styles
import '../styles/Home.css'
import '../styles/All.css'



class Home extends Component {
	constructor(props) {
		super(props);
		// binds 'this' to this component
		this.closeDetailsModal = this.closeDetailsModal.bind(this);
	}

	state = {
		loadingCreatePost: false,
		loadingDetailsPost: false,
		createPostModalOpen: false,
		detailsPostModalOpen: false,
		displayedPost: undefined
	}

	openDetailsPostModal = (post) => {
		this.setState({
			...this.state,
			detailsPostModalOpen: true,
			displayedPost: post
		})
	}
	closeDetailsModal() {
        this.setState({ detailsPostModalOpen: false })
    }
	openCreatePostModal = () => this.setState(() => ({ createPostModalOpen: true }))
	closeCreatePostModal = () => this.setState(() => ({ createPostModalOpen: false }))

	render() {
		const { loadingDetailsPost, loadingCreatePost, detailsPostModalOpen, createPostModalOpen } = this.state
		const { posts } = this.props.posts

		return (
			<div className="entirePostList">
				<NavBar />
				<div className="postListContainer">
					<div className="postListRow">
						{posts.map((post) => (
							<div key={post.id} onClick={() => this.openDetailsPostModal(post)}>
								{/* map id: {post.id} */}
								<PostCard post={post} />
							</div>
						))}
					</div>
				</div>
				<button className="newPostButton"
						onClick={this.openCreatePostModal}>
					<MdAddCircle />
				</button>
				
				<Modal // VIEW POST DETAILS MODAL
		          className='modal'
		          overlayClassName='createOverlay'
		          isOpen={detailsPostModalOpen}
		          onRequestClose={this.closeDetailsPostModal}
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
									<PostCardDetails post={this.state.displayedPost}
													 closeDetailsModal={this.closeDetailsModal}
													 detailsPostModalOpen={this.state.detailsPostModalOpen}
									/>
								</div>
						}
					</div>
		        </Modal>

				<Modal // CREATE POST MODAL
		          className='modal'
		          overlayClassName='createOverlay'
		          isOpen={createPostModalOpen}
		          onRequestClose={this.closeCreatePostModal}
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
									<PostCardEditor />
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
		posts: state.posts
	}
}


export default connect(mapStateToProps)(Home)