import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import lecturerReducer from "./lecturerReducer";

export default combineReducers({
  authReducer: authReducer,
  lecturerReducer: lecturerReducer
})