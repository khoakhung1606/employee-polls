import {
  SET_LIST_USER,
  SET_IS_LOGOUT,
  SET_USER,
  LOGIN_FAILURE,
} from "./userActions";

const defaultUserState = {
  user: null,
  listUser: null,
  isLogout: false,
};

const userReducer = (state = defaultUserState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    case SET_IS_LOGOUT:
      return { ...state, isLogout: action.isLogout };
    case SET_LIST_USER:
      return { ...state, listUser: action.listUser };
    case LOGIN_FAILURE:
      return { ...state, error: action.error }; // Set error on failure
    default:
      return state;
  }
};

export default userReducer;
