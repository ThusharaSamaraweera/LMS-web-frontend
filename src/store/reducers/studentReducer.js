import * as actions from "../actionTypes/studentActionTypes";

const studentInitState = {
  enrollCourseIds: [],
  enrollcourses: [],
};

export default function studentReducer(state = studentInitState, action) {
  switch (action.type) {
    case actions.GET_STUDENT_ENROLL_COURSE_IDS:
      return {
        ...state,
        enrollCourseIds: action.payload,
      };
    case actions.SET_STUDENT_ENROLL_COURSE:
      return {
        ...state,
        enrollcourses: action.payload,
      };
    default:
      return state;
  }
}
