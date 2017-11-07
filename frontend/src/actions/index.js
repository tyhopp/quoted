import * as API from '../utils/api.js'



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
function createPost (posts, post) {
	return {
		type: CREATE_POST,
		posts,
		post
	}
}



