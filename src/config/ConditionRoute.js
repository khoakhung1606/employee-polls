import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const ConditionRoute = ({ children, isLogin }) => {
  const url = window.location.href.toString().split(window.location.host)[1];

  return isLogin ? (
    children
  ) : (
    <Navigate to={url === "/" ? "/login" : `/login?redirect=${url}`} />
  );
};

const mapStateToProps = (state) => ({
  isLogin: !!state.userReducer.user,
});

export default connect(mapStateToProps)(ConditionRoute);
