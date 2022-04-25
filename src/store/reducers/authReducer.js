import * as ACTIONS from '../actionTypes/authActionTypes'

const authInitState = {
  authUser: null
}

export function authReducer(state = authInitState, action ) {
  switch(action.type){
    case ACTIONS.LOGIN:

      return {
        ...state,
        authUser: action.payload
      }
    
    default:
      return state
  }
}