import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./config/store";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import { loginFailure, setUser, setListUser } from "./config/userActions";

describe("Login Component", () => {
  store.dispatch(
    setListUser({
      sarahedo: {
        id: "sarahedo",
        password: "password123",
        name: "Sarah Edo",
        avatarURL: null,
        answers: {
          "8xf0y6ziyjabvozdd253nd": "optionOne",
          "6ni6ok3ym7mf1p33lnez": "optionOne",
          am8ehyc8byjqgar0jgpub9: "optionTwo",
          loxhs1bqm25b708cmbf3g: "optionTwo",
        },
        questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
      },
      tylermcginnis: {
        id: "tylermcginnis",
        password: "abc321",
        name: "Tyler McGinnis",
        avatarURL: null,
        answers: {
          vthrdm985a262al8qx3do: "optionOne",
          xj352vofupe1dqz9emx13r: "optionTwo",
        },
        questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"],
      },
      mtsamis: {
        id: "mtsamis",
        password: "xyz123",
        name: "Mike Tsamis",
        avatarURL: null,
        answers: {
          xj352vofupe1dqz9emx13r: "optionOne",
          vthrdm985a262al8qx3do: "optionTwo",
          "6ni6ok3ym7mf1p33lnez": "optionOne",
        },
        questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"],
      },
    })
  );

  test("renders login form", () => {
    const component = render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
    const userLabel = component.getByTestId("user_label");
    const passwordLabel = component.getByTestId("password_label");
    const btnSubmit = component.getByTestId("btn_submit");
    const errMsg = component.getByTestId("err_msg");

    expect(userLabel.textContent).toBe("User");
    expect(passwordLabel.textContent).toBe("Password");
    expect(btnSubmit.textContent).toBe("Submit");
    expect(errMsg.textContent).toBe("");
    expect(component).toMatchSnapshot();
  });

  test("displays error message when login fails", async () => {
    const component = render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const btnSubmit = component.getByTestId("btn_submit");
    fireEvent.submit(btnSubmit);

    await waitFor(() => {
      const errMsg = component.getByTestId("err_msg");
      expect(errMsg.textContent).toBe("Invalid username or password");
    });
    expect(component).toMatchSnapshot();
  });

  test("calls login on form submit and login success", async () => {
    const component = render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const userInput = component.getByTestId("user_input");
    const passwordInput = component.getByTestId("password_input");
    const btnSubmit = component.getByTestId("btn_submit");

    fireEvent.change(userInput, { target: { value: "mtsamis" } });
    fireEvent.change(passwordInput, { target: { value: "xyz123" } });
    expect(userInput.value).toBe("mtsamis");
    expect(passwordInput.value).toBe("xyz123");

    fireEvent.submit(btnSubmit);

    await waitFor(() => {
      expect(store.getState().userReducer.user).toEqual(
        setUser({
          id: "mtsamis",
          password: "xyz123",
          name: "Mike Tsamis",
          avatarURL: null,
          answers: {
            xj352vofupe1dqz9emx13r: "optionOne",
            vthrdm985a262al8qx3do: "optionTwo",
            "6ni6ok3ym7mf1p33lnez": "optionOne",
          },
          questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"],
        }).user
      );
    });
    expect(userInput).not.toBeInTheDocument();
    expect(passwordInput).not.toBeInTheDocument();
    expect(btnSubmit).not.toBeInTheDocument();
    expect(component).toMatchSnapshot();
  });
});
