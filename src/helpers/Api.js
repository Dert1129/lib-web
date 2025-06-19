import axios from 'axios';
import { store } from '../App';
import { sendMessageToBackend } from '../actions/Error/errorActions';

export default class Api {
  static getInstance() {
    return axios.create({
      timeout: 10000,
    });
  }
}

export const fetchBooks = async () => {
    const api_host = process.env.REACT_APP_API_HOST ? process.env.REACT_APP_API_HOST : '';
    const response = await axios.get("http://localhost:3030/api/books");
    if (response && response.data) {
        return response.data;
    } else {
        store.dispatch(sendMessageToBackend("Could not retrieve books: " + response.error));
    }
}

export const addBook = async (book) => {
    console.log("Adding book: ", book);
}