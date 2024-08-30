import React, { useEffect, useState } from "react";
import { addQuestion, setNewQuestions } from "./config/dataActions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreatePoll(props) {
  const { newQuestion, setNewQuestions, addQuestion } = props;
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (newQuestion) {
      setNewQuestions(null);
      navigate("/");
    }
  }, [newQuestion, setNewQuestions, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!optionOne || !optionTwo) {
      setError("Both fields are required!");
    } else {
      setError("");
      addQuestion(optionOne, optionTwo);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Would You Rather</h1>
      <h2>Create Your Own Poll</h2>
      <form onSubmit={handleSubmit}>
        <label data-testid="first_option_label">
          <h4>First Option</h4>
        </label>
        <div>
          <input
            data-testid="first_option_input"
            type="text"
            placeholder="Option One"
            value={optionOne}
            onChange={(e) => setOptionOne(e.target.value)}
            style={{ width: "800px", marginBottom: "10px" }}
          />
        </div>
        <label data-testid="second_option_label">
          <h4>Second Option</h4>
        </label>
        <div>
          <input
            data-testid="second_option_input"
            type="text"
            placeholder="Option Two"
            value={optionTwo}
            onChange={(e) => setOptionTwo(e.target.value)}
            style={{ width: "800px", marginBottom: "20px" }}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          data-testid="btn_submit"
          type="submit"
          disabled={!optionOne || !optionTwo}
          style={{
            backgroundColor: !optionOne || !optionTwo ? "#ccc" : "#007bff",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            width: "100px",
            marginBottom: "20px",
            cursor: !optionOne || !optionTwo ? "not-allowed" : "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    newQuestion: state.questionReducer.newQuestion,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNewQuestions: (question) => {
      dispatch(setNewQuestions(question));
    },
    addQuestion: (optionOneText, optionTwoText) => {
      dispatch(addQuestion(optionOneText, optionTwoText));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePoll);
