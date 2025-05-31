import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Col, Container, Row, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody, FormGroup, Input, Label} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faAnglesLeft,  faTrashCan, faLongArrowLeft } from "@fortawesome/free-solid-svg-icons";
import BookCard from './BookCard';

import { Component } from 'react';
import { fetchBooks } from '../../helpers/Api';

class FileList extends Component {
    constructor(props){
        super(props);
        this.state = {
            books: [],
            selectedBook: null,
            authorNameFilters: [],
            genreFilters: [],
            categoryFilters: [],
            ratingFilters: [],
            copiesFilters: [],
            readFilters: [],
            selectedFilters: [], // Tracks selected filters
        }
    }
    async componentDidMount(){
        this.setState({books: await fetchBooks()});
    }

    handleCheckboxChange = (filterType, value) => {
        const { selectedFilters } = this.state;
        const filterKey = `${filterType}:${value}`;

        if (selectedFilters.includes(filterKey)) {
            this.setState({
                selectedFilters: selectedFilters.filter((item) => item !== filterKey),
            });
        } else {
            this.setState({
                selectedFilters: [...selectedFilters, filterKey],
            });
        }
    };

    render(){
        const authors = [...new Set(this.state.books.map((book) => book.authorName))];
        const genres = [...new Set(this.state.books.flatMap((book) => book.genreList))];
        const categories = [...new Set(this.state.books.map((book) => book.category))];
        const ratings = [...new Set(this.state.books.map((book) => book.rating))];
        const copies = [...new Set(this.state.books.map((book) => book.copies))];
        const readStatuses = [...new Set(this.state.books.map((book) => (book.read ? "Read" : "Unread")))];
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
                            <Container id="spatial-filter" className="mt-3 rounded border shadow-sm spatial-filter-panel container-max overflow-scroll">
                                <Row>
                                    <Col>
                                        <UncontrolledAccordion defaultOpen={["authors", "genres", "categories", "ratings", "copies", "readStatuses"]}>
                                            {/* Author */}
                                            <AccordionItem>
                                                <AccordionHeader targetId="authors">Author</AccordionHeader>
                                                <AccordionBody accordionId="authors">
                                                    <FormGroup className="filterFormGroup">
                                                        {authors.map((author) => (
                                                            <div key={author} className="mb-2">
                                                                <Input
                                                                    type="checkbox"
                                                                    id={`author-${author}`}
                                                                    onChange={() => this.handleCheckboxChange("authorName", author)}
                                                                />
                                                                <Label for={`author-${author}`}>{author}</Label>
                                                            </div>
                                                        ))}
                                                    </FormGroup>
                                                </AccordionBody>
                                            </AccordionItem>

                                            {/* Genre */}
                                            <AccordionItem>
                                                <AccordionHeader targetId="genres">Genre</AccordionHeader>
                                                <AccordionBody accordionId="genres">
                                                    <FormGroup className="filterFormGroup">
                                                        {genres.map((genre) => (
                                                            <div key={genre} className="mb-2">
                                                                <Input
                                                                    type="checkbox"
                                                                    id={`genre-${genre}`}
                                                                    onChange={() => this.handleCheckboxChange("genre", genre)}
                                                                />
                                                                <Label for={`genre-${genre}`}>{genre}</Label>
                                                            </div>
                                                        ))}
                                                    </FormGroup>
                                                </AccordionBody>
                                            </AccordionItem>

                                            {/* Category */}
                                            <AccordionItem>
                                                <AccordionHeader targetId="categories">Category</AccordionHeader>
                                                <AccordionBody accordionId="categories">
                                                    <FormGroup className="filterFormGroup">
                                                        {categories.map((category) => (
                                                            <div key={category} className="mb-2">
                                                                <Input
                                                                    type="checkbox"
                                                                    id={`category-${category}`}
                                                                    onChange={() => this.handleCheckboxChange("category", category)}
                                                                />
                                                                <Label for={`category-${category}`}>{category}</Label>
                                                            </div>
                                                        ))}
                                                    </FormGroup>
                                                </AccordionBody>
                                            </AccordionItem>

                                            {/* Rating */}
                                            <AccordionItem>
                                                <AccordionHeader targetId="ratings">Rating</AccordionHeader>
                                                <AccordionBody accordionId="ratings">
                                                    <FormGroup className="filterFormGroup">
                                                        {ratings.map((rating) => (
                                                            <div key={rating} className="mb-2">
                                                                <Input
                                                                    type="checkbox"
                                                                    id={`rating-${rating}`}
                                                                    onChange={() => this.handleCheckboxChange("rating", rating)}
                                                                />
                                                                <Label for={`rating-${rating}`}>{rating}</Label>
                                                            </div>
                                                        ))}
                                                    </FormGroup>
                                                </AccordionBody>
                                            </AccordionItem>

                                            {/* Copies */}
                                            <AccordionItem>
                                                <AccordionHeader targetId="copies">Copies</AccordionHeader>
                                                <AccordionBody accordionId="copies">
                                                    <FormGroup className="filterFormGroup">
                                                        {copies.map((copy) => (
                                                            <div key={copy} className="mb-2">
                                                                <Input
                                                                    type="checkbox"
                                                                    id={`copies-${copy}`}
                                                                    onChange={() => this.handleCheckboxChange("copies", copy)}
                                                                />
                                                                <Label for={`copies-${copy}`}>{copy}</Label>
                                                            </div>
                                                        ))}
                                                    </FormGroup>
                                                </AccordionBody>
                                            </AccordionItem>

                                            {/* Read Status */}
                                            <AccordionItem>
                                                <AccordionHeader targetId="readStatuses">Read Status</AccordionHeader>
                                                <AccordionBody accordionId="readStatuses">
                                                    <FormGroup className="filterFormGroup">
                                                        {readStatuses.map((status) => (
                                                            <div key={status} className="mb-2">
                                                                <Input
                                                                    type="checkbox"
                                                                    id={`read-${status}`}
                                                                    onChange={() => this.handleCheckboxChange("read", status)}
                                                                />
                                                                <Label for={`read-${status}`}>{status}</Label>
                                                            </div>
                                                        ))}
                                                    </FormGroup>
                                                </AccordionBody>
                                            </AccordionItem>
                                        </UncontrolledAccordion>
                                    </Col>
                                </Row>
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
                                    <span><FontAwesomeIcon icon={faLongArrowLeft}/> Start searching by selecting a filter</span>
                                </Row>
                                {/* <Row className="filter-pill-row">
                                    <div className="border rounded activeFilter action-button">
                                        <span>
                                            <FontAwesomeIcon alt="Clear All Filters" className="fa-light fa-trash-can" icon={faTrashCan} /> Clear Filters 
                                        </span>
                                    </div>
                                </Row> */}
                            </Col>
                        </Row>
                        <DndProvider backend={HTML5Backend}>
                            <Container id='card-wrapper' className="mt-3 rounded border shadow-sm">
                                {/* This is where you put your cards for the library  */}
                                <BookCard books={this.state.books} setSelectedBook={this.props.setSelectedBook}/>
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