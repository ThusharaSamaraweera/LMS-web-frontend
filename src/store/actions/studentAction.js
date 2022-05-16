import * as actions from "../actionTypes/studentActionTypes";
import StudentService from "../../services/student.service";

export const getStudentEnrollCourseIds = () => async (dispatch) => {
  try {
    const res = await StudentService.getEnrollCourses();
    dispatch({
      type: actions.GET_STUDENT_ENROLL_COURSE_IDS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};