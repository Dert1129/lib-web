import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Col, Container, Row, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody, FormGroup, Input, Label,UncontrolledTooltip} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faAnglesLeft,  faTrashCan, faLongArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
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
            selectedFilters: [],
            filterTabActive: true
        }
    }
    async componentDidMount(){
        this.setState({books: await fetchBooks()});
    }

    clearFilters = () => {
        this.setState({selectedFilters: []}, () => {
            console.log("Filters cleared:", this.state.selectedFilters);
        })
    }

        toggleFilterTab = () => {
            this.setState({filterTabActive: !this.state.filterTabActive})
    };

    handleCheckboxChange = (filterType, value) => {
        const { selectedFilters } = this.state;
        const existingFilter = selectedFilters.find((filter) => filter[filterType]);

        if (existingFilter) {
            const updatedFilters = selectedFilters.map((filter) => {
                if (filter[filterType]) {
                    const values = filter[filterType];
                    if (values.includes(value)) {
                        return { [filterType]: values.filter((item) => item !== value) };
                    } else {
                        return { [filterType]: [...values, value] };
                    }
                }
                return filter;
            });
            const cleanedFilters = updatedFilters.filter((filter) => {
                const key = Object.keys(filter)[0];
                return filter[key]?.length > 0;
            });

            this.setState({
                selectedFilters: cleanedFilters
            });
        } else {
            this.setState({
                selectedFilters: [...selectedFilters, { [filterType]: [value] }],
            });
        }
    };

    getFilterPills = (filters) => {
        const filterDisplayNames = {
            authorName: "Author",
            genre: "Genre",
            category: "Category",
            rating: "Rating",
            readStatuses: "Read Status",
        };

        return filters.map((filter) => {
            const filterType = Object.keys(filter)[0];
            const filterValues = filter[filterType];
        
            return filterValues.map((value) => {
                const sanitizedId = `${filterType}-${value}`.replace(/[^a-zA-Z0-9-_]/g, '_');
                return (
                    <div
                        key={sanitizedId}
                        className="border rounded activeFilter"
                        id={sanitizedId}
                    >
                        <span>{value}
                            <UncontrolledTooltip placement="bottom" target={sanitizedId}>
                                {`${filterDisplayNames[filterType] || filterType}: ${value}`}
                            </UncontrolledTooltip>
                            <FontAwesomeIcon
                                alt="Close Filter"
                                onClick={() => {
                                    this.props.removeFilter(filterType, value);
                                }}
                                className="close-button fas fa-xmark ms-2"
                                icon={faXmark}
                            />
                        </span>
                    </div>
                );
            });
        });
    };

    render(){
        const authors = [...new Set(this.state.books.map((book) => book.authorName))];
        const genres = [...new Set(this.state.books.flatMap((book) => book.genreList))];
        const categories = [...new Set(this.state.books.map((book) => book.category))];
        const ratings = [...new Set(this.state.books.map((book) => book.rating))];
        const readStatuses = [...new Set(this.state.books.map((book) => (book.read ? "Read" : "Unread")))];
        return (
        <div className='height-wrapper'>
            <Container id='outer-wrapper' className="multi-container-container container-xxl mh-100">
                <Row>
                   <Col xl={3} className={`filter-panel-wrapper ${this.state.filterTabActive ? '': 'hidden'}`}>
                            <div className={`filter-panel-wrapper ${this.state.filterTabActive ? '': 'hidden'}`}>
                                <div className="filter-panel-tab-wrapper">
                                    <div className="filter-tab filter-tab-control-icon clickable"
                                        alt="Close Filter Tab"
                                        onClick={() => {this.toggleFilterTab()}}>                                
                                        <FontAwesomeIcon
                                            className="fas fa-angles-left " icon={faAnglesLeft} />
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
                                                        {authors.map((author) => {
                                                            const isChecked = this.state.selectedFilters.some(
                                                                (filter) => filter.authorName && filter.authorName.includes(author)
                                                            );

                                                            return (
                                                                <div key={author} className="mb-2">
                                                                    <Input
                                                                        type="checkbox"
                                                                        id={`author-${author}`}
                                                                        checked={isChecked} // Controlled by selectedFilters
                                                                        onChange={() => this.handleCheckboxChange("authorName", author)}
                                                                    />
                                                                    <Label for={`author-${author}`}>{author}</Label>
                                                                </div>
                                                            );
                                                        })}
                                                    </FormGroup>
                                                </AccordionBody>
                                            </AccordionItem>

                                            {/* Genre */}
                                            <AccordionItem>
                                                <AccordionHeader targetId="genres">Genre</AccordionHeader>
                                                <AccordionBody accordionId="genres">
                                                    <FormGroup className="filterFormGroup">
                                                        {genres.map((genre) => {
                                                            const isChecked = this.state.selectedFilters.some(
                                                                (filter) => filter.genre && filter.genre.includes(genre)
                                                            );

                                                            return (
                                                                <div key={genre} className="mb-2">
                                                                    <Input
                                                                        type="checkbox"
                                                                        id={`genre-${genre}`}
                                                                        checked={isChecked} // Controlled by selectedFilters
                                                                        onChange={() => this.handleCheckboxChange("genre", genre)}
                                                                    />
                                                                    <Label for={`genre-${genre}`}>{genre}</Label>
                                                                </div>
                                                            );
                                                        })}
                                                    </FormGroup>
                                                </AccordionBody>
                                            </AccordionItem>

                                            {/* Category */}
                                            <AccordionItem>
                                                <AccordionHeader targetId="categories">Category</AccordionHeader>
                                                <AccordionBody accordionId="categories">
                                                    <FormGroup className="filterFormGroup">
                                                        {categories.map((category) => {
                                                            const isChecked = this.state.selectedFilters.some(
                                                                (filter) => filter.category && filter.category.includes(category)
                                                            );

                                                            return (
                                                                <div key={category} className="mb-2">
                                                                    <Input
                                                                        type="checkbox"
                                                                        id={`category-${category}`}
                                                                        checked={isChecked} // Controlled by selectedFilters
                                                                        onChange={() => this.handleCheckboxChange("category", category)}
                                                                    />
                                                                    <Label for={`category-${category}`}>{category}</Label>
                                                                </div>
                                                            );
                                                        })}
                                                    </FormGroup>
                                                </AccordionBody>
                                            </AccordionItem>

                                            {/* Rating */}
                                            <AccordionItem>
                                                <AccordionHeader targetId="ratings">Rating</AccordionHeader>
                                                <AccordionBody accordionId="ratings">
                                                    <FormGroup className="filterFormGroup">
                                                        {ratings.map((rating) => {
                                                            const isChecked = this.state.selectedFilters.some(
                                                                (filter) => filter.rating && filter.rating.includes(rating)
                                                            );

                                                            return (
                                                                <div key={rating} className="mb-2">
                                                                    <Input
                                                                        type="checkbox"
                                                                        id={`rating-${rating}`}
                                                                        checked={isChecked} // Controlled by selectedFilters
                                                                        onChange={() => this.handleCheckboxChange("rating", rating)}
                                                                    />
                                                                    <Label for={`rating-${rating}`}>{rating}</Label>
                                                                </div>
                                                            );
                                                        })}
                                                    </FormGroup>
                                                </AccordionBody>
                                            </AccordionItem>
                                            {/* Read Status */}
                                            <AccordionItem>
                                                <AccordionHeader targetId="readStatuses">Read Status</AccordionHeader>
                                                <AccordionBody accordionId="readStatuses">
                                                    <FormGroup className="filterFormGroup">
                                                        {readStatuses.map((status) => {
                                                            const isChecked = this.state.selectedFilters.some(
                                                                (filter) => filter.read && filter.read.includes(status)
                                                            );

                                                            return (
                                                                <div key={status} className="mb-2">
                                                                    <Input
                                                                        type="checkbox"
                                                                        id={`read-${status}`}
                                                                        checked={isChecked} // Controlled by selectedFilters
                                                                        onChange={() => this.handleCheckboxChange("read", status)}
                                                                    />
                                                                    <Label for={`read-${status}`}>{status}</Label>
                                                                </div>
                                                            );
                                                        })}
                                                    </FormGroup>
                                                </AccordionBody>
                                            </AccordionItem>
                                        </UncontrolledAccordion>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
    
                    </Col>
                    <Col xl={`${this.state.filterTabActive ? 9 : 12 }`}>
                        <Row>
                            <Col 
                                    className={`filter-collapse clickable ${this.state.filterTabActive ? 'hidden': ''}`}
                                    xl={1}
                                    alt="Open Filter Tab"
                                    onClick={() => {this.toggleFilterTab()}}>
                                <FontAwesomeIcon
                                        className="fas fa-angles-right" icon={faAnglesRight} />
                                </Col>
                            <Col xl={12} className="my-0 activeFilter-column">
                                <Row className="filter-pill-row inactive-filters">
                                    <span><FontAwesomeIcon icon={faLongArrowLeft}/> Start searching by selecting a filter</span>
                                </Row>
                                {this.state.selectedFilters.length > 0 && (
                                        <Row className="filter-pill-row">
                                            <div className="border rounded activeFilter action-button" onClick={this.clearFilters} style={{ cursor: 'pointer' }}>
                                                <span>
                                                    <FontAwesomeIcon alt="Clear All Filters" className="fa-light fa-trash-can" icon={faTrashCan} /> Clear Filters
                                                </span>
                                            </div>

                                            {this.getFilterPills(this.state.selectedFilters)}
                                        </Row>
                                    )}
                            </Col>
                        </Row>
                        <DndProvider backend={HTML5Backend}>
                            <Container id='card-wrapper' className="mt-3 rounded border shadow-sm">
                                {/* This is where you put your cards for the library  */}
                                <BookCard 
                                    books={this.state.books} 
                                    setSelectedBook={this.props.setSelectedBook} 
                                    filters={this.state.selectedFilters}
                                />
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