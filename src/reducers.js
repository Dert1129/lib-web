import { combineReducers } from 'redux';
import { books, selectedBook } from "./components/Repository/bookListReducer";


const appReducer = combineReducers({
  books,
  selectedBook
});

export default appReducer;
