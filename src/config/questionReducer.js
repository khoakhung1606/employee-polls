import {
  SET_LIST_QUESTIONS,
  SET_ANSWERED,
  SET_NEW_QUESTIONS,
} from "./dataActions";

import { LOGOUT_QUESTION } from "./userActions";

const defaultQuestionState = {
  listQuestion: null,
  answered: null,
  newQuestion: null,
};

const questionReducer = (state = defaultQuestionState, action) => {
  switch (action.type) {
    case SET_LIST_QUESTIONS:
      return { ...state, listQuestion: action.listQuestion };
    case SET_ANSWERED:
      return { ...state, answered: action.answered };
    case SET_NEW_QUESTIONS:
      return { ...state, newQuestion: action.newQuestion };
    case LOGOUT_QUESTION:
      return defaultQuestionState;
    default:
      return state;
  }
};

export default questionReducer;
