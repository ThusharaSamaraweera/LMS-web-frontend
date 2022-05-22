import * as actions from "../actionTypes/courseActionTypes";
import CourseService from "../../services/course.service";

export const getAllCourse = () => async (dispatch) => {
  try {
    const res = await CourseService.getAllCourse();
    dispatch({
      type: actions.GET_ALL_COURSES,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllDepartment = () => async (dispatch) => {
  try {
    const res = await CourseService.getAllDepartment();

    dispatch({
      type: actions.GET_ALL_DEPARTMENT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
