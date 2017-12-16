import React, { Component } from 'react';
import { connect } from 'react-redux'

// actions
import { voteOnPost } from '../actions'

// utils
import { capitalize, convertTimeStamp } from '../utils/helpers'

// icons
import FaQuoteLeft from 'react-icons/lib/fa/quote-left'
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up'
import FaThumbsDown from 'react-icons/lib/fa/thumbs-down'
import MdAccountCircle from 'react-icons/lib/md/account-circle'

// project styles
import '../styles/All.css'
import '../styles/PostCard.css';

class PostCard extends Component {

    _handleUpVote(post) {
        const postId = this.props.post.id
        const vote = 'upVote'
        this.props.dispatch(voteOnPost(postId, vote))

    }
    _handleDownVote(post) {
        const postId = this.props.post.id
        const vote = 'downVote'
        this.props.dispatch(voteOnPost(postId, vote))
    }
    _toggleCategoryColor(post) {
        const red = { backgroundColor: '#DA4747' }
        const green = { backgroundColor: '#1CA189' }
        const purple = { backgroundColor: '#7236D7' }
        if (post.category === 'people') {
            return (
                <div key={post.category} style={red} className="postEditorCategory">
                    {capitalize(post.category)}
                </div>
            )
        } 
        if (post.category === 'places') {
             return (
                <div key={post.category} style={green} className="postEditorCategory">
                    {capitalize(post.category)}
                </div>
            )
        }
        if (post.category === 'things') {
             return (
                <div key={post.category} style={purple} className="postEditorCategory">
                    {capitalize(post.category)}
                </div>
            )
        }
    }

    render() {
    const { post } = this.props

    return (
        <div key={post.id}>
            <div>
                <div>
                	<div className="postRow">
                		<div key={post.title} className="postTitle">
                			{capitalize(post.title)}
                		</div>
                	</div>
                	<div className="postRow">
                		<div className="postAuthorIcon">
                			<MdAccountCircle />
                		</div>
                		<div key={post.author} className="postAuthorName">
                			{capitalize(post.author)}&nbsp;
                            <span key={post.timestamp} className="postTimeStamp">
                                / { convertTimeStamp(post) }
                            </span>
                		</div>
                	</div>
                	<div className="postRow">
                		<div className="actionList">
                			<div className="actionItem">
                    			<div key={post.commentCount} className="actionCommentCount">
                    				{post.commentCount}
                    			</div>
                    			<div className="actionComment">
                    				<FaQuoteLeft />
                    			</div>
                    		</div>
                    		<div className="actionItem">
                    			<button className="actionThumbsUp"
                                        onClick={() => this._handleUpVote(post)}
                                >
                    				<FaThumbsUp />
                    			</button>
                    		</div>
                    		<div className="actionItem">
                    			<button className="actionThumbsDown"
                                        onClick={() => this._handleDownVote(post)}
                                >
                    				<FaThumbsDown />
                    			</button>
                    		</div>
                            <div className="voteScore">
                                <div key={post.voteScore} className="voteScoreCount">
                                    {post.voteScore}
                                </div>
                            </div>
                		</div>
                		{this._toggleCategoryColor(post)}
                	</div>
                </div>
            </div>
        </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts
    }
}


export default connect(mapStateToProps)(PostCard)