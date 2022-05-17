import axios from "axios";
import { useInRouterContext } from "react-router-dom";
import { BASE_URL, HTTPS_METHODS, restClient } from "../utils/restClient";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export default class authService {
  static async login({ username, password }) {
    const body = JSON.stringify({ username, password });
    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/auth/login`,
        body,
        config
      );
      return res.data;
    } catch (error) {
      throw new Error("Login failed");
    }
  }

  static async getOtp(email) {
    const body = JSON.stringify({ email });

    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/user/get-otp`,
        body,
        config
      );

      return res.data;
    } catch (error) {
      throw new Error("Getting OTP failed");
    }
  }

  static async signup(body) {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/auth/signup`,
        body,
        config
      );
      console.log(res)
      return res.data;
    } catch (error) {
      throw new Error("Signup failed");
    }
  }
}
