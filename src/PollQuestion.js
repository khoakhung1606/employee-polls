import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { saveQuestionAnswer, setAnswered } from "./config/dataActions";

import "./Poll.css";

const PollQuestion = (props) => {
  const {
    user,
    listQuestion,
    setAnswered,
    answered,
    saveQuestionAnswer,
    listUser,
  } = props;
  const navigate = useNavigate();
  const { question_id } = useParams();
  const [question, setQuestion] = useState({});

  const isVotedOptionOne =
    user && question.optionOne && question.optionOne.votes.includes(user.id);
  const isVotedOptionTwo =
    user && question.optionTwo && question.optionTwo.votes.includes(user.id);
  const isVoted = isVotedOptionOne || isVotedOptionTwo;

  useEffect(() => {
    if (listQuestion && listQuestion[question_id]) {
      setQuestion(listQuestion[question_id]);
      return;
    }
    navigate("/404");
  }, [listQuestion, question_id, navigate]);

  useEffect(() => {
    if (answered) {
      const timer = setTimeout(() => {
        navigate(isVoted ? `/questions/${answered.qid}` : "/");
        setAnswered(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [answered, navigate, setAnswered, isVoted]);

  const voteRate = (option, question) => {
    const total =
      question.optionOne.votes.length + question.optionTwo.votes.length;
    return option === "optionOne"
      ? Number((question.optionOne.votes.length / total) * 100).toFixed(2) +
          "%)"
      : Number((question.optionTwo.votes.length / total) * 100).toFixed(2) +
          "%)";
  };
  const handleOptionClick = (option) => {
    saveQuestionAnswer(user.id, question.id, option);
  };
  return (
    <div className="poll-container">
      <h1>Poll by {question.author}</h1>
      <div className="avatar">
        <img
          src={
            listUser[question.author] && listUser[question.author].avatarURL
              ? listUser[question.author].avatarURL
              : "/login.png"
          }
          alt="Avatar"
          className="avatar-img"
        />
      </div>
      <h2>Would You Rather</h2>
      {Object.keys(question).length > 0 && user ? (
        isVoted ? (
          <div className="options">
            <div className="option">
              <p>{question.optionOne.text}</p>
              <button>
                Vote: {question.optionOne.votes.length} (
                {voteRate("optionOne", question)}
              </button>
            </div>
            <div className="option">
              <p>{question.optionTwo.text}</p>
              <button>
                Vote: {question.optionTwo.votes.length} (
                {voteRate("optionTwo", question)}
              </button>
            </div>
          </div>
        ) : (
          <div className="options">
            <div className="option">
              <p>{question.optionOne.text}</p>
              <button onClick={() => handleOptionClick("optionOne")}>
                Click
              </button>
            </div>
            <div className="option">
              <p>{question.optionTwo.text}</p>
              <button onClick={() => handleOptionClick("optionTwo")}>
                Click
              </button>
            </div>
          </div>
        )
      ) : (
        ""
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    listQuestion: state.questionReducer.listQuestion,
    listUser: state.userReducer.listUser,
    answered: state.questionReducer.answered,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    saveQuestionAnswer: (userId, questionId, answer) => {
      dispatch(saveQuestionAnswer(userId, questionId, answer));
    },
    setAnswered: (answered) => {
      dispatch(setAnswered(answered));
    },
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(PollQuestion);
