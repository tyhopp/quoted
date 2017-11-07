/* API
**************************************************************/

// Defined API functions to be used in frontend

const API = "http://localhost:3001"

let token = localStorage.token
if (!token) {
	token = localStorage.token = Math.random().toString(36).substr(-8)
}

const headers = {
	'Accept': 'application/json',
	'Authorization': token
}

// gets all posts
const getAllPosts = token => (
	fetch(`${API}/posts`, { method: 'GET', headers })
);

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
		return getAllPosts()
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



