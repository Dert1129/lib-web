import { combineReducers } from 'redux';
import { books, selectedBook } from "./components/Repository/fileListReducer";


const appReducer = combineReducers({
  books,
  selectedBook
});

export default appReducer;
