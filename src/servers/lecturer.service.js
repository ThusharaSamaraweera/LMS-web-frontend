import { HTTPS_METHODS, restClient } from "../utils/restClient";

export default class lecturerServices {
  static async addNewCourse(newCourse) {
    return await restClient({
      method: HTTPS_METHODS.POST,
      url: "/lectures/new_course/",
      body: newCourse,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error("New course creation failed");
      });
  }

  static async getAllLecturerCourses() {
    return await restClient({
      method: HTTPS_METHODS.GET,
      url: "/lecturer/courses",
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        throw new Error("Fetching lecturer course failed");
      });
  }
}
