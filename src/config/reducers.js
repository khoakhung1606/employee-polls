import { combineReducers } from "redux";
import userReducer from "./userReducer";
import questionReducer from "./questionReducer";

export default combineReducers({
  userReducer,
  questionReducer,
});
