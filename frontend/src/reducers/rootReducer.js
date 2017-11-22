import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
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
            console.log('In request reducer', action.posts)
            return {
                ...state,
                posts: action.posts
            }
        case CREATE_POST : 
            console.log('In create reducer', action.post)
			return {
				...state,
                posts: [...state.posts, action.post]
			}
        default : 
            return state;
    }
}



const rootReducer = combineReducers({  // short hand property names
  posts,
  form: formReducer
})

export default rootReducer