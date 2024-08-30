import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { logout, setIsLogout } from "./config/userActions";
import "./Header.css";
import { connect } from "react-redux";

const Header = (props) => {
  const { isLogout, logout, user, setIsLogout } = props;

  const navigate = useNavigate();

  useEffect(() => {
    if (isLogout) {
      setIsLogout(false);
    }
  }, [isLogout, navigate, setIsLogout]);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/add">New</Link>
          </li>
        </ul>
      </nav>
      <div className="user-section">
        <img
          src={user && user.avatarURL ? user.avatarURL : "/login.png"}
          width="35"
          height="35"
          alt="avatar"
          className="img-user"
        />
        <p className="username">{user.name}</p>
        <span className="logout" onClick={() => handleLogout()}>
          Logout
        </span>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    isLogout: state.userReducer.isLogout,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
    setIsLogout: (isLogout) => {
      dispatch(setIsLogout(isLogout));
    },
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Header);
