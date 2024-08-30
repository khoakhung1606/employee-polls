import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./_DATA";

describe("_getUsers", () => {
  it("should return the correct users object", async () => {
    const users = await _getUsers();
    expect(users).toHaveProperty("sarahedo");
    expect(users).toHaveProperty("tylermcginnis");
    expect(users).toHaveProperty("mtsamis");
  });
});

describe("_getQuestions", () => {
  it("should return the correct questions object", async () => {
    const questions = await _getQuestions();
    expect(questions).toHaveProperty("8xf0y6ziyjabvozdd253nd");
    expect(questions).toHaveProperty("6ni6ok3ym7mf1p33lnez");
  });
});

describe("_saveQuestion", () => {
  it("should save the question and return it with correct format", async () => {
    const question = {
      optionOneText: "Option 1 text",
      optionTwoText: "Option 2 text",
      author: "sarahedo",
    };

    const savedQuestion = await _saveQuestion(question);

    expect(savedQuestion).toHaveProperty("id");
    expect(savedQuestion).toHaveProperty("timestamp");
    expect(savedQuestion).toHaveProperty("author", "sarahedo");
    expect(savedQuestion.optionOne).toHaveProperty("text", "Option 1 text");
    expect(savedQuestion.optionTwo).toHaveProperty("text", "Option 2 text");
  });

  it("should throw an error if required fields are missing", async () => {
    await expect(_saveQuestion({})).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("should save the answer and update the user and question objects", async () => {
    const answer = {
      authedUser: "sarahedo",
      qid: "vthrdm985a262al8qx3do",
      answer: "optionOne",
    };

    const result = await _saveQuestionAnswer(answer);
    expect(result).toBe(true);
  });

  it("should throw an error if required fields are missing", async () => {
    await expect(_saveQuestionAnswer({})).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});
