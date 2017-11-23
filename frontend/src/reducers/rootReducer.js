import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { 
	RECEIVE_POSTS,
	CREATE_POST,
    RECEIVE_COMMENTS
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
        default : 
            return state;
    }
}

function comments (state = [], action) {
    switch(action.type) {
        case RECEIVE_COMMENTS :
            console.log('In comment request reducer', action.comments)
            return {
                ...state,
                comments: action.comments
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