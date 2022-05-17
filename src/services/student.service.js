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

  static async getCourseDetails(courseId) {
    return await restClient({
      method: HTTPS_METHODS.GET,
      url: `/api/v1/Courses/${courseId}`,
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw new Error(`Fetching ${courseId} couse details failed`);
      });
  }

  static async unenrollFromCourse(course) {
    return await restClient({
      method: HTTPS_METHODS.DELETE,
      url: "api/v1/student/unroll-from-subjects/",
      body: course,
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw new Error(
          `${course.enrolled_course_id} course enrollment failed`
        );
      });
  }

  static async enrollToCourse(course) {
    return await restClient({
      method: HTTPS_METHODS.POST,
      url: "api/v1/student/enroll-subjects",
      body: course,
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw new Error(
          `${course.enrolled_course_id} course enrollment failed`
        );
      });
  }

  static async getNotfications(course) {
    return await restClient({
      method: HTTPS_METHODS.POST,
      url: "/api/v1/course/announcement",
      body: course,
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw new Error(
          "error",
          console.log("error-get-notifications")
        );
      });
  }
}
