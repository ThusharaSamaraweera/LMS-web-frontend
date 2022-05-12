import * as actions from "../actionTypes/courseActionTypes"
import CourseService from "../../servers/course.service"

export const getAllCourse = () => async (dispatch) => {
  try {
    const res = await CourseService.getAllCourse()
    dispatch({
      type: actions.GET_ALL_COURSES,
      payload: res.data
    })
  } catch (error) {
    console.log(error)
  }
}