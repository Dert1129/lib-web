import {connect} from "react-redux";
import { withRouter } from 'react-router';
import FileList from "./FileList";
import { setSelectedBook } from "../../actions/Library/LibraryActions";
import { fetchAndSetBooks } from "../../actions/Library/LibraryActions";

const mapStateToProps = (state, props) =>
    ({
        books: state.books
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        async setBooks() {
            await dispatch(fetchAndSetBooks());
        },
        setSelectedBook(selectedBook) {
            dispatch(setSelectedBook(selectedBook));
            dispatch((dispatch) => props.history.push("/library"));
        }
    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FileList))