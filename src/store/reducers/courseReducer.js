import * as actions from '../actionTypes/courseActionTypes'

const courseInitState = {
  courses: []
}

export default function courseReducer(state = courseInitState, action){
  switch(action.type){
    case actions.GET_ALL_COURSES: 
      return {
        ...state,
        courses: action.payload
      }
    default: 
      return state
  }
}