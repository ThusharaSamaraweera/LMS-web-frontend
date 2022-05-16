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

  static async addGradeForStudent(newGrade){
    return await restClient({
      method: HTTPS_METHODS.POST,
      url: "/add/marks_and_grades/",
      body: newGrade
    }).then((res) => {
      return res
    }).catch((err) => {
      throw new Error("Editing grades failed")
    })
  }

  static async getProfile() {
    return await restClient({
      method: HTTPS_METHODS.GET,
      url: "/api/v1/lecturer/profile",
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw new Error("Failed to get lecturer profile")
      });
  }

  static async updateLecturer(profile){
    return await restClient({
      method: HTTPS_METHODS.POST,
      url: "/api/v1/lecturer/update-profile",
      body: profile
    }).then((res) => {
      
    }).catch((err) => {
      throw new Error("Profile updating failed")
    })
  }

}
