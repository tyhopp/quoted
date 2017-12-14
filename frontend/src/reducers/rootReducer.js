import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { 
	RECEIVE_POSTS,
    RECEIVE_A_POST,
	CREATE_POST,
    VOTE_ON_POST,
    EDIT_POST,
    DELETE_POST,
    RECEIVE_COMMENTS,
    CREATE_COMMENT
} from '../actions'

 
const initialState = {
    posts: []
}

function post (state = [], action) {
    switch(action.type) {
        case RECEIVE_A_POST :
            return {
                ...state,
                post: [action.post]
            }
        case VOTE_ON_POST : 
            return {
                ...state,
                post: [action.post],
            }
        case EDIT_POST :
            return {
                ...state,
                post: [action.post]
            }
        case DELETE_POST :
            return {
                ...state,
            }
        default : 
            return state;
    }
}

function posts (state = initialState, action) {
    switch(action.type) {
        case RECEIVE_POSTS :
            return {
                ...state,
                posts: action.posts
            }
        case CREATE_POST : 
			return {
				...state,
                posts: [...state.posts, action.post] // spread posts to persist original posts array
			}
        case VOTE_ON_POST : 
            return {
                ...state,
            }
        default : 
            return state;
    }
}

function comments (state = [], action) {
    switch(action.type) {
        case RECEIVE_COMMENTS :
            return {
                ...state,
                comments: action.comments
            }
        case CREATE_COMMENT :
            console.log('In comment create reducer', action.comment)
            return {
                ...state,
                comments: [...state.comments, action.comment] // spread posts to persist original comments array
            }
        default : 
            return state;
    }
}


const rootReducer = combineReducers({  // short hand property names
  post,
  posts,
  comments,
  form: formReducer
})

export default rootReducer