import React from "react";
import { shallow } from "enzyme";

import App, { UnconnectedApp } from "./App";
import { storeFactory } from "../tests/testUtils";

/**
 * Factory function to create a ShallowWrapper for component
 * @function setup
 * @param {object} state - Initial state for setup
 * @returns {ShallowWrapper}
 */

const setup = (state = {}) => {
  const store = storeFactory(state);
  const wrapper = shallow(<App store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("redux properties", () => {
  test("has access to `success` state", () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });

  test("has access to `secretWord` state", () => {
    const secretWord = "party";
    const wrapper = setup({ secretWord });
    const secretWordProp = wrapper.instance().props.secretWordProp;
    expect(secretWordProp).toBe(secretWordProp);
  });
  test("has access to `guessedWords` state", () => {
    const guessedWords = [{ guessedWord: "train", letterMatchCount: 3 }];
    const wrapper = setup({ guessedWords });
    const guessedWordsProp = wrapper.instance().props.guessedWords;
    expect(guessedWordsProp).toBe(guessedWords);
  });
  test("`getSecretWord` action creator is a function on the props", () => {
    const wrapper = setup();
    const getSecretWordProp = wrapper.instance().props.getSecretWord;
    expect(getSecretWordProp).toBeInstanceOf(Function);
  });
});

test("`getSecretWord` runs on App mount", () => {
  const getSecretWordMock = jest.fn();

  // set up app component with getSecretWordMock as the getSecetWord prop
  const wrapper = shallow(<UnconnectedApp getSecretWord={getSecretWordMock} />);

  // run lifecycle method
  wrapper.instance().componentDidMount();

  const getSecretWordCallCount = getSecretWordMock.mock.calls.length;
  expect(getSecretWordCallCount).toBe(1);
});
