import * as ACTIONS from '../actionTypes/authActionTypes'

const authInitState = {
  user: null
}

export function authReducer(state = authInitState, action ) {
  switch(action.type){
    case ACTIONS.LOGIN:
      return {
        ...state,
        user: action.payload
      }
    
    default:
      return state
  }
}