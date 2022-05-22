import axios from "axios";
import { BASE_URL, HTTPS_METHODS, restClient } from "../utils/restClient";

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
        return res;
      })
      .catch((err) => {
        throw new Error("Fetching lecturer course failed");
      });
  }

  static async addGradeForStudent(newGrade) {
    return await restClient({
      method: HTTPS_METHODS.POST,
      url: "/add/marks_and_grades/",
      body: newGrade,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error("Editing grades failed");
      });
  }

  static async addNewAnnouncement(newAnnouncement) {
    return await restClient({
      method: HTTPS_METHODS.POST,
      url: "/lec/create_announcement/",
      body: newAnnouncement,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error("Adding new announcement failed");
      });
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
        throw new Error("Failed to get lecturer profile");
      });
  }

  static async updateLecturer(profile) {
    return await restClient({
      method: HTTPS_METHODS.POST,
      url: "/api/v1/lecturer/update-profile",
      body: profile,
    })
      .then((res) => {})
      .catch((err) => {
        throw new Error("Profile updating failed");
      });
  }

  static async uploadFile(formData) {
    const token = sessionStorage.getItem("token");
    const config = {
      headers: {
        "auth-token": `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      }
    }

    return await axios
      .post(`${BASE_URL}/lec_notes/uploadFile`, formData, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static async getLecturerProfileByEmail(email){
    return await restClient({
      method: HTTPS_METHODS.GET,
      url: `api/v1/lecturer/profile-by-email/${email}`
    })
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        return err
      })
  }
}
