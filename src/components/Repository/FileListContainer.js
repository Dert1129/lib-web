import {connect} from "react-redux";
import { withRouter } from 'react-router';
import {setSelectedImageDataset, setTableSettings} from "../../actions/Images/imageDatasetActions";
import { fetchAndSetClinicalDatasets, fetchAndSetDataTypeFileCounts, fetchAndSetSummaryDatasets, fetchAndSetTotalFileCount } from '../../actions/Clinical/clinicalDatasetAction';
import FileList from "./FileList";
import {
    fetchAndSetExperimentalDataCounts, setSelectedParticipant
} from "../../actions/Experimental/experimentalDatasetAction";
import { setSelectedBook } from "../../actions/Library/LibraryActions";

const mapStateToProps = (state, props) =>
    ({
        books: state.books
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setSelectedBook(selectedBook) {
            dispatch(setSelectedBook(selectedBook));
            dispatch((dispatch) => props.history.push("/library"));
        }
    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FileList))