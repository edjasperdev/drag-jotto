import { combineReducers } from "redux";
import success from "./successReducer";
import guessedWords from "./guessedWordsReducer";

export default combineReducers({
  guessedWords,
  success
});
