import { HTTPS_METHODS, restClient } from "../utils/restClient"

export class StudentService {
  static async getProfile(){
    return await restClient({
      method: HTTPS_METHODS.GET,
      url: "/api/v1/user/details_std/",
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    }) 
  }
}