import * as actions from "../actionTypes/courseActionTypes";

const courseInitState = {
  courses: [],
  department: [],
  faculties: []
};

export default function courseReducer(state = courseInitState, action) {
  switch (action.type) {
    case actions.GET_ALL_COURSES:
      return {
        ...state,
        courses: action.payload,
      };
    case actions.GET_ALL_DEPARTMENT:
      const faculties = Array.from(new Set(action.payload.map(({ faculty }) => faculty)));
      return {
        ...state,
        department: action.payload,
        faculties: faculties
      };
    default:
      return state;
  }
}
