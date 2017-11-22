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
    console.log('Values: ', title, body, author)
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




