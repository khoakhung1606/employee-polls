import { _getUsers } from "../_DATA";

export const SET_USER = "SET_USER";
export const SET_IS_LOGOUT = "SET_IS_LOGOUT";
export const SET_LIST_USER = "SET_LIST_USER";
export const LOGOUT_QUESTION = "LOGOUT_QUESTION";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const setUser = (user) => ({
  type: SET_USER,
  user,
});

export const setIsLogout = (isLogout) => ({
  type: SET_IS_LOGOUT,
  isLogout,
});
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error,
});

export const setListUser = (listUser) => ({
  type: SET_LIST_USER,
  listUser,
});

export const logoutQuestion = () => ({
  type: LOGOUT_QUESTION,
});

export const login = (id, password) => (dispatch, getState) => {
  const listUser = getState().userReducer.listUser;
  const user = Object.values(listUser).find((user) => user.id === id);

  setTimeout(() => {
    if (user && user.password === password) {
      dispatch(setUser(user));
    } else {
      dispatch(loginFailure("Invalid username or password"));
    }
  }, 300);
};

export const logout = () => (dispatch) => {
  setTimeout(() => {
    dispatch(setIsLogout(true));
    dispatch(logoutQuestion());
    dispatch(setListUser(null));
    dispatch(setUser(null));
  }, 300);
  return true;
};

export const getListUser = () => async (dispatch) => {
  const users = await _getUsers();
  console.log(users);
  dispatch(setListUser(users));
};
