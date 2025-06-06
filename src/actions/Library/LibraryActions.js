import actionNames from '../actionNames'
import { fetchBooks } from '../../helpers/Api'

export const setSelectedBook = (book) => {
    return {
        type: actionNames.SET_SELECTED_BOOK,
        payload: book
    }
}

export const setBooks = (books) => {
    return {
        type: actionNames.SET_BOOKS,
        payload: books
    }
}

export const fetchAndSetBooks = () => {
    return async (dispatch) => {
        let books = await fetchBooks();
        dispatch(setBooks(books));
    }
}
