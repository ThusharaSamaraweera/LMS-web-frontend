import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import courseReducer from "./courseReducer";
import lecturerReducer from "./lecturerReducer";

export default combineReducers({
  authReducer: authReducer,
  lecturerReducer: lecturerReducer,
  courseReducer: courseReducer,
});
