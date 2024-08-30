import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoginScreen from "./Login";
import HomeScreen from "./Home";
import Header from "./Header";
import LeaderBoardScreen from "./LeaderBoard";
import CreatePollScreen from "./CreatePoll";
import PollScreen from "./PollQuestion";
import { connect } from "react-redux";
import { getListUser } from "./config/userActions";
import { getListQuestion } from "./config/dataActions";
import Error404Screen from "./404";
import ConditionRoute from "./config/ConditionRoute";

function App(props) {
  const { getListUser, isLogin, listUser, listQuestion, getListQuestion } =
    props;

  const navigate = useNavigate();

  useEffect(() => {
    if (listQuestion) return;
    getListQuestion();
  }, [listQuestion, getListQuestion]);

  useEffect(() => {
    if (listUser) return;
    getListUser();
  }, [listUser, isLogin, getListUser, navigate]);

  const url = window.location.href.toString().split(window.location.host)[1];

  return (
    <div className="app-container full-height">
      {isLogin && url !== "/404" && <Header />}
      <Routes>
        <Route path="/login" exact element={<LoginScreen />} />
        <Route
          path="/"
          element={
            <ConditionRoute>
              <HomeScreen />
            </ConditionRoute>
          }
        />
        <Route
          path="/questions/:question_id"
          element={
            <ConditionRoute>
              <PollScreen />
            </ConditionRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ConditionRoute>
              <CreatePollScreen />
            </ConditionRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ConditionRoute>
              <LeaderBoardScreen />
            </ConditionRoute>
          }
        />
        <Route path="*" element={<Error404Screen />} />
      </Routes>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLogin: !!state.userReducer.user,
    listUser: state.userReducer.listUser,
    listQuestion: state.questionReducer.listQuestion,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    getListUser: () => {
      dispatch(getListUser());
    },
    getListQuestion: () => {
      dispatch(getListQuestion());
    },
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(App);