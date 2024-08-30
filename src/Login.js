import React, { useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import "./Login.css";
import { login } from "./config/userActions";

function Login(props) {
  const { isLogin, login, error } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    login(username, password);
  };

  if (isLogin) {
    const params = new URLSearchParams(window.location.search);
    const url = params.get("redirect");
    return <Navigate to={url ? url : "/"} />;
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Employee Polls</h2>
        <img src="login.PNG" alt="Employee Polls" className="login-image" />
        <form onSubmit={handleLogin}>
          <div data-testid="err_msg">
            {error && <p className="error-message">{error}</p>}
          </div>
          <div className="input-group">
            <label data-testid="user_label" htmlFor="username">
              User
            </label>
            <input
              data-testid="user_input"
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="User"
            />
          </div>
          <div className="input-group">
            <label data-testid="password_label" htmlFor="password">
              Password
            </label>
            <input
              data-testid="password_input"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button data-testid="btn_submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    isLogin: !!state.userReducer.user,
    listUser: state.userReducer.listUser,
    error: state.userReducer.error,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    login: (name, password) => {
      dispatch(login(name, password));
    },
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Login);
