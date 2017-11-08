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
export const getAllPosts = token => (
	fetch(`${API}/posts`, { method: 'GET', headers })
);

// create a post
export const createAPost = (token, post) => (
	console.log('Inside the API: ', post),
	fetch(`${API}/posts`, {method: 'POST', body: JSON.stringify({ post }), headers })
);