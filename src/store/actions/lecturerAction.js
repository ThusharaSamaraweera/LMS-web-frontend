import * as ACTIONS from "../actionTypes/lecturerActionTypes";
import lecturerServices from "../../services/lecturer.service";

export const getAllLecturerCourses = () => async (dispatch) => {
  try {
    const res = await lecturerServices.getAllLecturerCourses();

    dispatch({
      type: ACTIONS.GET_ALL_LECTURER_COURSES,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
