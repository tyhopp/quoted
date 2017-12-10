import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { 
	RECEIVE_POSTS,
	CREATE_POST,
    VOTE_ON_POST,
    RECEIVE_COMMENTS,
    CREATE_COMMENT
} from '../actions'

 
const initialState = {
    posts: []
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
                posts: [...state.posts, action.post]
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
  posts,
  comments,
  form: formReducer
})

export default rootReducer