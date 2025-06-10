import {connect} from "react-redux";
import { withRouter } from 'react-router';
import BookInfo from "./BookInfo";

const mapStateToProps = (state, props) =>
    ({
        selectedBook: state.selectedBook
    });


export default withRouter(connect(mapStateToProps)(BookInfo))