import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Col, Container, Row, } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faAnglesLeft,  faTrashCan, faLongArrowLeft, faBookmark, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import BookCard from './BookCard';

import { Component } from 'react';
import { fetchBooks } from '../../helpers/Api';

class FileList extends Component {
    constructor(props){
        super(props);
        this.state = {
            books: [],
            selectedBook: null,
        }
    }
    async componentDidMount(){

        this.setState({books: await fetchBooks()});

        console.log(this.state.books);
    }

    render(){
        return (
        <div className='height-wrapper'>
            <Container id='outer-wrapper' className="multi-container-container container-xxl mh-100">
                <Row>
                    <Col xl={3} className="filter-panel-wrapper">
                        <div className="filter-panel-wrapper">
                            {/* This is where you put the filter checkboxes */}
                            <div className="filter-panel-tab-wrapper">
                                <div className="filter-tab filter-tab-control-icon clickable"
                                    alt="Close Filter Tab"
                                    style={{cursor: 'pointer'}}>
                                    <FontAwesomeIcon className="fas fa-angles-left " icon={faAnglesLeft} />

                                </div>
                            </div>
                            <Container id="spatial-filter" className="mt-3 rounded border shadow-sm spatial-filter-panel container-max">
                            </Container>
                        </div>
    
                    </Col>
                    <Col xl={9}>
                        <Row>
                            <Col className="filter-collapse clickable" xl={1} alt="Open Filter Tab" style={{cursor: 'pointer'}}>
                                <FontAwesomeIcon className="fas fa-angles-right" icon={faAnglesRight} />
                            </Col>
                            <Col xl={12} className="my-0 activeFilter-column">
                                <Row className="filter-pill-row inactive-filters">
                                    <span><FontAwesomeIcon icon={faLongArrowLeft}/> Start searching by selecting a facet</span>
                                </Row>
                                <Row className="filter-pill-row">
                                    <div className="border rounded activeFilter action-button">
                                        <span>
                                            <FontAwesomeIcon alt="Clear All Filters" className="fa-light fa-trash-can" icon={faTrashCan} /> Clear Filters 
                                        </span>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                        <DndProvider backend={HTML5Backend}>
                            <Container id='spatial-filter' className="mt-3 rounded border shadow-sm">
                                {/* This is where you put your cards for the library  */}
                                <BookCard books={this.state.books} />
                            </Container>
                        </DndProvider>
                    </Col>
                </Row>
            </Container>
        </div>
    );
    }
}

export default FileList;