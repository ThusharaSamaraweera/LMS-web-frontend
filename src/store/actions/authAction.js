import * as ACTIONS from "../actionTypes/authActionTypes";
import authService from "../../services/auth.service";

export const login =
  ({ username, password }) =>
  async (dispatch) => {
    try {
      const res = await authService.login({ username, password });
      const { responseUser, jwtToken, message } = res;
      sessionStorage.setItem("token", jwtToken);
      sessionStorage.setItem("responseUser", JSON.stringify(responseUser));
      dispatch({
        type: ACTIONS.LOGIN,
        payload: responseUser,
      });

      return message;
    } catch (error) {
      return error;
    }
  };

export const setAuthUser = (user) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_AUTHUSER,
    payload: user,
  });
};

export const logout = () => (dispatch) => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("responseUser");
  dispatch({
    type: ACTIONS.LOGOUT,
  });
};
