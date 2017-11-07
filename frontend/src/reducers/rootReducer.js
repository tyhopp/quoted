import { combineReducers } from 'redux'
import { 
	RECEIVE_POSTS,
	CREATE_POST
} from '../actions'


const initialState = {
    posts: []
}

function posts (state = initialState, action) {
    switch(action.type) {
        case RECEIVE_POSTS :
            return Object.assign({}, state, {posts: action.posts})
        case CREATE_POST : 
        	return Object.assign({}, state, {
        		posts: action.posts
        	})
        default : 
            return state;
    }
}



const rootReducer = combineReducers({  // short hand property names
  posts
})

export default rootReducer