import axios from "axios";
import { BASE_URL } from "../utils/restClient";

export default class authService {
  static async login({ username, password }) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ username, password });

    try {
      const res = await axios.post(`http://localhost:8080/api/v1/auth/login`, body, config);
      return res.data;
    } catch (error) {
      throw new Error('Login failed')
    }
  }
}
