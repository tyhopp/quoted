import * as API from '../utils/api.js'
import { uuid } from '../utils/helpers.js'



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
function receivePosts (posts) {
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
		return API.getAllPosts()
			   .then(
			   		res => res.json(),
			   		error => console.log('An error occured.', error)
			   	)
			   .then(posts => {
			   		dispatch(receivePosts(posts))
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
		return API.createAPost()
			   .then(
			   		res => res.json(),
			   		error => console.log('An error occured.', error)
			   	)
			   .then(post => {
			   		dispatch(createPostSuccess(post))
			   	})
    }
}




