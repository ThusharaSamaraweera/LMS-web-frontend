import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import courseReducer from "./courseReducer";
import lecturerReducer from "./lecturerReducer";
import studentReducer from "./studentReducer";

export default combineReducers({
  authReducer: authReducer,
  lecturerReducer: lecturerReducer,
  courseReducer: courseReducer,
  studentReducer: studentReducer,
});
