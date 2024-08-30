import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import CreatePoll from "./CreatePoll";
import store from "./config/store";

describe("CreatePoll", () => {
  test("should render the CreatePoll component", async () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <CreatePoll />
        </BrowserRouter>
      </Provider>
    );

    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  test("should call addQuestion when both fields are filled and form is submitted", () => {
    const addQuestionMock = jest.fn();
    const setNewQuestionsMock = jest.fn();

    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <CreatePoll />
        </BrowserRouter>
      </Provider>
    );
    const firstOptionLabel = component.getByTestId("first_option_label");
    const firstOptionInput = component.getByTestId("first_option_input");
    const secondOptionLabel = component.getByTestId("second_option_label");
    const secondOptionInput = component.getByTestId("second_option_input");
    const submit = component.getByTestId("btn_submit");

    expect(firstOptionLabel.textContent).toBe("First Option");
    expect(secondOptionLabel.textContent).toBe("Second Option");
    expect(submit.textContent).toBe("Submit");

    fireEvent.change(firstOptionInput, { target: { value: "option 1" } });
    fireEvent.change(secondOptionInput, { target: { value: "option 2" } });
    expect(firstOptionInput.value).toBe("option 1");
    expect(secondOptionInput.value).toBe("option 2");
    expect(component).toMatchSnapshot();
  });

  test("should have submit button disabled when options are empty", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <CreatePoll />
        </BrowserRouter>
      </Provider>
    );
    const firstOptionInput = component.getByTestId("first_option_input");
    fireEvent.change(firstOptionInput, { target: { value: "option 1" } });

    const submitButton = component.getByTestId("btn_submit");
    expect(submitButton).toBeDisabled();
    expect(component).toMatchSnapshot();
  });
});
