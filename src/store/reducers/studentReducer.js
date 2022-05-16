import * as actions from "../actionTypes/studentActionTypes";

const studentInitState = {
  enrollCourseIds: [],
  enrollcourses: []
};

export default function studentReducer(state = studentInitState, action) {
  switch (action.type) {
    case actions.GET_STUDENT_ENROLL_COURSE_IDS:
      return {
        ...state,
        enrollCourseIds: action.payload,
      };
    default:
      return state;
  }
}
