import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from "../_DATA";
import { setListUser } from "./userActions";

export const SET_LIST_QUESTIONS = "SET_LIST_QUESTIONS";
export const SET_ANSWERED = "SET_ANSWERED";
export const SET_NEW_QUESTIONS = "SET_NEW_QUESTIONS";

export const setListQuestions = (listQuestion) => ({
  type: SET_LIST_QUESTIONS,
  listQuestion,
});

export const setAnswered = (answered) => ({
  type: SET_ANSWERED,
  answered,
});

export const setNewQuestions = (newQuestion) => ({
  type: SET_NEW_QUESTIONS,
  newQuestion,
});

export const getListQuestion = () => (dispatch) => {
  return _getQuestions().then((questions) => {
    dispatch(setListQuestions(questions));
  });
};

export const addQuestion =
  (optionOneText, optionTwoText) => (dispatch, getState) => {
    const { id: author } = getState().userReducer.user;

    return _saveQuestion({ optionOneText, optionTwoText, author }).then(
      (question) => {
        let listUser = getState().userReducer.listUser;
        let listQuestion = getState().questionReducer.listQuestion;
        const updatedListQuestions = {
          ...listQuestion,
          [question.id]: question,
        };
        const updatedListUsers = {
          ...listUser,
          [question.author]: {
            ...listUser[question.author],
            questions: [...listUser[question.author].questions, question.id],
          },
        };

        dispatch(setListQuestions(updatedListQuestions));
        dispatch(setNewQuestions(question));
        dispatch(setListUser(updatedListUsers));
      }
    );
  };

export const saveQuestionAnswer =
  (authedUser, qid, answer) => (dispatch, getState) => {
    return _saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
      let listUser = getState().userReducer.listUser;
      let listQuestion = getState().questionReducer.listQuestion;
      const updatedListUsers = {
        ...listUser,
        [authedUser]: {
          ...listUser[authedUser],
          answers: {
            ...listUser[authedUser].answers,
            [qid]: answer,
          },
        },
      };
      const updatedListQuestions = {
        ...listQuestion,
        [qid]: {
          ...listQuestion[qid],
          [answer]: {
            ...listQuestion[qid][answer],
            votes: [...listQuestion[qid][answer].votes, authedUser],
          },
        },
      };

      dispatch(setListQuestions(updatedListQuestions));
      dispatch(setAnswered({ authedUser, qid, answer }));
      dispatch(setListUser(updatedListUsers));
    });
  };
