import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import QuestionCard from "./QuestionCard";
import "./QuestionCard.css";
import { getListQuestion } from "./config/dataActions";

function Home(props) {
  const { getListQuestion, listQuestion, listUser, user } = props;
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "new"
  );

  useEffect(() => {
    getListQuestion();
  }, [getListQuestion]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  return (
    <div className="App">
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "new" ? "active" : ""}`}
          onClick={() => handleTabClick("new")}
        >
          New Questions
        </button>
        <button
          className={`tab-button ${activeTab === "done" ? "active" : ""}`}
          onClick={() => handleTabClick("done")}
        >
          Done
        </button>
      </div>

      <div className="section-container">
        {activeTab === "new" && (
          <QuestionCard
            user={user}
            listQuestion={listQuestion}
            isNewQuestion={true}
            listUser={listUser}
          />
        )}
        {activeTab === "done" && (
          <QuestionCard
            user={user}
            listQuestion={listQuestion}
            isNewQuestion={false}
            listUser={listUser}
          />
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    listUser: state.userReducer.listUser,
    listQuestion: state.questionReducer.listQuestion,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListQuestion: () => {
      dispatch(getListQuestion());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);