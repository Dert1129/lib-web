import actionNames from "../../actions/actionNames";

export const books = ( state = {}, action ) => {
    switch(action.type) {
        case actionNames.SET_BOOKS:
            let newState = {...state, ...action.payload};
            return newState
        default:
            return state;
    }
}

export const selectedBook = ( state = "", action) => {
    switch(action.type) {
        case actionNames.SET_SELECTED_BOOK:
            return action.payload;
        default:
            return state;
    }
}