import React from "react";
import { useNavigate } from "react-router-dom";

function QuestionCard({ user, listQuestion, isNewQuestion }) {
  const _listQuestion = listQuestion
    ? isNewQuestion
      ? Object.values(listQuestion)
          .filter(
            (question) =>
              !question.optionOne.votes.includes(user.id) &&
              !question.optionTwo.votes.includes(user.id)
          )
          .sort((item1, item2) => item2.timestamp - item1.timestamp)
      : Object.values(listQuestion)
          .filter(
            (question) =>
              question.optionOne.votes.includes(user.id) ||
              question.optionTwo.votes.includes(user.id)
          )
          .sort((item1, item2) => item2.timestamp - item1.timestamp)
    : [];

  const navigate = useNavigate();

  return (
    <div>
      {_listQuestion.length > 0 ? (
        <div className="question-container">
          {_listQuestion.map((question, index) => (
            <div key={index} className="question-card">
              <div>{question.author}</div>
              <div>
                {new Date(question.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                |{" "}
                {new Date(question.timestamp).toLocaleDateString([], {
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <button onClick={() => navigate(`/questions/${question.id}`)}>
                Show
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}
export default QuestionCard;
