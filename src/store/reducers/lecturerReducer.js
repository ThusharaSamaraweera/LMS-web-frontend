import * as ACTIONS from "../actionTypes/lecturerActionTypes"

const lecturerInitState = {
  courses: null
}

export default function lecturerReducer(state = lecturerInitState, action){
  switch(action.type){
    case ACTIONS.GET_ALL_LECTURER_COURSES:
      return {
        ...state,
        courses: action.payload
      }
    
    default: 
      return state
  }
}