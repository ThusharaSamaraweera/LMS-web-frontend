import { HTTPS_METHODS, restClient } from "../utils/restClient";

export default class CourseService {
  static async getAllCourse() {
    return await restClient({
      method: HTTPS_METHODS.GET,
      url: "/api/v1/Courses/all",
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error("Fetch all course failed");
      });
  }

  static async getAllDepartment() {
    return await restClient({
      method: HTTPS_METHODS.GET,
      url: "/api/v1/public/faculty",
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error("fetch all department failed");
      });
  }

  static async getCoursesInDepartment(department){
    return await restClient({
      method: HTTPS_METHODS.GET,
      url: `/api/v1/Courses/department_courses/${department}`
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      throw new Error("Fetch course in department failed")
    })
  }
}
