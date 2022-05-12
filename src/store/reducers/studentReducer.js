import * as actions from "../actionTypes/studentActionTypes";

const studentInitState = {
  enrollCourses: [],
};

export default function studentReducer(state = studentInitState, action) {
  switch (action.type) {
    case actions.GET_STUDENT_ENROLL_COURSES:
      console.log(action)
      return {
        ...state,
        enrollCourses: action.payload,
      };
    default:
      return state;
  }
}
