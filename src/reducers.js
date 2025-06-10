import { combineReducers } from 'redux';
import { books, selectedBook } from "./components/Library/bookListReducer";


const appReducer = combineReducers({
  books,
  selectedBook
});

export default appReducer;
