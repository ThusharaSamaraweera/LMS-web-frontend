import * as actions from "../actionTypes/studentActionTypes";
import StudentService from "../../servers/student.service";

export const getStudentEnrollCourses = () => async (dispatch) => {
  try {
    const res = await StudentService.getEnrollCourses();
    console.log(res);

    dispatch({
      type: actions.GET_STUDENT_ENROLL_COURSES,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
