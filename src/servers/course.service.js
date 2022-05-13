import { HTTPS_METHODS, restClient } from "../utils/restClient";

export default class CourseService {
  static async getAllCourse(){
    return await restClient({
      method: HTTPS_METHODS.GET,
      url: "/api/v1/Courses/all"
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }
}