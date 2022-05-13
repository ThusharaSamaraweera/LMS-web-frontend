import { HTTPS_METHODS, restClient } from "../utils/restClient";

export default class StudentService {
  static async getProfile() {
    return await restClient({
      method: HTTPS_METHODS.GET,
      url: "/api/v1/user/details_std/",
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw new Error("Failed to get student profile");
      });
  }

  static async updateStudent(profile) {
    return await restClient({
      method: HTTPS_METHODS.POST,
      url: "/api/v1/student/update-details",
      body: profile,
    })
      .then((res) => {})
      .catch((err) => {
        throw new Error("Profile updating failed");
      });
  }

  static async getEnrollCourses() {
    return await restClient({
      method: HTTPS_METHODS.GET,
      url: "/api/v1/Courses/enrolledCourses",
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
