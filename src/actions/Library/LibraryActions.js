import actionNames from '../actionNames'

export const setSelectedBook = (book) => {
    return {
        type: actionNames.SET_SELECTED_BOOK,
        payload: book
    }
}
