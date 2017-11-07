import { combineReducers } from 'redux'
import { RECEIVE_POSTS } from '../actions'


const initialState = {
    posts: []
}

function posts (state = initialState, action) {
    switch(action.type) {
        case RECEIVE_POSTS :
            return Object.assign({}, state, {posts: action.posts})
        default : 
            return state;
    }
}

const rootReducer = combineReducers({  // short hand property names
  posts
})

export default rootReducer