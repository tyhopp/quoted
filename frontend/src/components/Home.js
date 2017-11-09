import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import Loading from 'react-loading'

// actions
import { fetchPosts } from '../actions'

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
		this.closeCreateModal = this.closeCreateModal.bind(this);
	}

	state = {
		loadingCreatePost: false,
		loadingDetailsPost: false,
		createModalOpen: false,
		detailsModalOpen: false,
		displayedPost: undefined
	}

	componentWillMount() {
		this.props.dispatch(fetchPosts()) // fetch posts on first app load
	}

	openDetailsModal = (post) => {
		this.setState({
			...this.state,
			detailsModalOpen: true,
			displayedPost: post
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
		console.log('Home props: ', this.props)
		console.log('Home props in posts: ', posts)

		return (
			<div className="entirePostList">
				<NavBar />
				<div className="postListContainer">
					<div className="postListRow">
						{posts.map((post) => (
							<div key={post.id} onClick={() => this.openDetailsModal(post)}>
								{/* map id: {post.id} */}
								<PostCard post={post} />
							</div>
						))}
					</div>
				</div>
				<button className="newPostButton"
						onClick={this.openCreateModal}>
					<MdAddCircle />
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
									<PostCardDetails post={this.state.displayedPost}
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
									<PostCardEditor closeCreateModal={this.closeCreateModal}
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
		posts: state.posts
	}
}


export default connect(mapStateToProps)(Home)