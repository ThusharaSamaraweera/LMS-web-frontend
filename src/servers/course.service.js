import { HTTPS_METHODS, restClient } from "../utils/restClient"

export const addNewCourse = async (newCourse) => {
  return await restClient({
    method: HTTPS_METHODS.POST,
    url: "/lectures/new_course/",
    body: newCourse
  }).then((res) => {
    console.log(res)
    return res;
  }).catch((err) => {
    throw new Error("New course creation failed")
  })
}