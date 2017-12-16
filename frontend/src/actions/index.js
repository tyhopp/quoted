import axios from 'axios'
import { uuid } from '../utils/helpers.js'
 

/* AXIOS DEFAULTS
**************************************************************/

const API = "http://localhost:3001"

let token = localStorage.token
if (!token) {
	token = localStorage.token = Math.random().toString(36).substr(-8)
}

const headers = {
	'Accept': 'application/json',
	'Authorization': token
}

axios.defaults.headers.common['Authorization'] = headers; // from api.js


/* RECEIVE ALL POSTS
**************************************************************/

export const REQUEST_POSTS = 'REQUEST_POSTS';
function requestPosts (posts) {
	return {
		type: REQUEST_POSTS,
		posts
	}
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
function receivePosts (posts) { // receives an array of posts 
	return {
		type: RECEIVE_POSTS,
		posts,
		receivedAt: Date.now()
	}
}


// thunk middleware action creator, intervenes in the above function
export function fetchPosts (posts) {
	return function (dispatch) {
		dispatch(requestPosts(posts))
			axios.get(`${API}/posts`)
			   .then(posts => {
			   		dispatch(receivePosts(posts.data)) // remember to append .data when using axios
			   	})
	}
}

/* RECEIVE A POST
**************************************************************/

export const RECEIVE_A_POST = 'RECEIVE_A_POST';
function receiveOnePost(post) {
    return {
        type: RECEIVE_A_POST,
        post
    }
}
export function fetchOnePost(postId) {
    return dispatch => {
		axios.get(`${API}/posts/${postId}`)
				.then(res => {
					dispatch(receiveOnePost(res.data))
				})
    }
}

/* CREATE POST
**************************************************************/

export const CREATE_POST = 'CREATE_POST';
function createPostSuccess(post) {
    return {
        type: CREATE_POST,
        post
    }
}

export function createPost(values) { // values from redux-form
    
    const { title, body, author, category } = values

    const post = {
        id: uuid(),
        timestamp: Date.now(),
        title,
        body,
        author,
        category
    } 

    return dispatch => {
		axios.post(`${API}/posts`, post)
				.then(res => {
					dispatch(createPostSuccess(res.data))
				})
    }
}

/* VOTE ON POST
**************************************************************/

export const VOTE_ON_POST = 'VOTE_ON_POST';
function voteOnPostSuccess(post) {
    return {
        type: VOTE_ON_POST,
        post,
    }
}

export function voteOnPost(postId, vote) {

    return dispatch => {
		axios.post(`${API}/posts/${postId}`, { option: vote })
				.then(res => {
					dispatch(voteOnPostSuccess(res.data))
				})
    }
}

/* EDIT A POST
**************************************************************/

export const EDIT_POST = 'EDIT_POST';
function editPostSuccess(post) {
    return {
        type: EDIT_POST,
        post
    }
}

export function editPost(postId, values) {

	const { title, body } = values

    const post = {
    	title,
    	body
    } 

    return dispatch => {
		axios.put(`${API}/posts/${postId}`, post)
				.then(res => {
					dispatch(editPostSuccess(res.data))
				})
    }
}

/* DELETE POST
**************************************************************/

export const DELETE_POST = 'DELETE_POST';
function deletePostSuccess(post) {
    return {
        type: DELETE_POST,
        post
    }
}
export function deletePost(postId) {
    return dispatch => {
		axios.delete(`${API}/posts/${postId}`)
				.then(res => {
					dispatch(deletePostSuccess(res.data))
				})
    }
}

/* RECEIVE ALL COMMENTS
**************************************************************/

export const REQUEST_COMMENTS = 'REQUEST_COMMENTS';
function requestComments (comments) {
	return {
		type: REQUEST_COMMENTS,
		comments
	}
}

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
function receiveComments (comments) { // receives an array of comments
	return {
		type: RECEIVE_COMMENTS,
		comments,
		receivedAt: Date.now()
	}
}


// thunk middleware action creator, intervenes in the above function
export function fetchComments (postId, comments) {
	return function (dispatch) {
		dispatch(requestComments(comments))
			axios.get(`${API}/posts/${postId}/comments`) // postId passed in from PostCardDetails
			   .then(comments => {
			   		dispatch(receiveComments(comments.data)) // remember to append .data when using axios
			   	})
	}
}

/* RECEIVE A COMMENT
**************************************************************/

export const RECEIVE_A_COMMENT = 'RECEIVE_A_COMMENT';
function receiveOneComment(comment) {
    return {
        type: RECEIVE_A_COMMENT,
        comment
    }
}
export function fetchOneComment(commentId) {
    return dispatch => {
		axios.get(`${API}/comments/${commentId}`)
				.then(res => {
					dispatch(receiveOneComment(res.data))
				})
    }
}

/* CREATE COMMENT
**************************************************************/

export const CREATE_COMMENT = 'CREATE_COMMENT';
function createCommentSuccess(comment) {
    return {
        type: CREATE_COMMENT,
        comment
    }
}

export function createComment(values, postId) { // values from redux-form
    
    const { body, author } = values

    const post = {
        id: uuid(),
        timestamp: Date.now(),
        body,
        author,
        parentId: postId
    } 

    return dispatch => {
		axios.post(`${API}/comments`, post)
				.then(res => {
					dispatch(createCommentSuccess(res.data))
				})
    }
}

/* VOTE ON COMMENT
**************************************************************/

export const VOTE_ON_COMMENT = 'VOTE_ON_COMMENT';
function voteOnCommentSuccess(comment) {
    return {
        type: VOTE_ON_COMMENT,
        comment,
    }
}

export function voteOnComment(commentId, vote) {

    return dispatch => {
		axios.post(`${API}/comments/${commentId}`, { option: vote })
				.then(res => {
					dispatch(voteOnCommentSuccess(res.data))
				})
    }
}

/* EDIT A COMMENT
**************************************************************/

export const EDIT_COMMENT = 'EDIT_COMMENT';
function editCommentSuccess(comment) {
    return {
        type: EDIT_COMMENT,
        comment
    }
}

export function editComment(commentId, values) {

	const { body } = values

    const comment = {
    	body
    } 

    return dispatch => {
		axios.put(`${API}/comments/${commentId}`, comment)
				.then(res => {
					dispatch(editCommentSuccess(res.data))
				})
    }
}

/* DELETE COMMENT
**************************************************************/

export const DELETE_COMMENT = 'DELETE_COMMENT';
function deleteCommentSuccess(comment) {
    return {
        type: DELETE_COMMENT,
        comment
    }
}
export function deleteComment(commentId) {
    return dispatch => {
		axios.delete(`${API}/comments/${commentId}`)
				.then(res => {
					dispatch(deleteCommentSuccess(res.data))
				})
    }
}
