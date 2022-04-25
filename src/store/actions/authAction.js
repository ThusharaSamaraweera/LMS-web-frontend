import * as ACTIONS from "../actionTypes/authActionTypes";
import authService from "../../servers/auth.service";

export const login =
  ({ username, password }) =>
  async dispatch => {
    try {
      const res = await authService.login({ username, password });
      const { responseUser, jwtToken, message } = res;
      localStorage.setItem("token", jwtToken);
      localStorage.setItem("responseUser", responseUser)
      dispatch({
        type: ACTIONS.LOGIN,
        payload: responseUser,
      });
      
      return message;
    } catch (error) {
      return error;
    }
  };
