import { Component } from "react";
import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import BookNotFound from "../../assets/img/book-not-found.png"

class BookCard extends Component {
    determineCoverImage(imageLink) {
        if (imageLink.length >0) {
            return imageLink;
        } else{
            return BookNotFound;
        }
    }

    handleTitleClick(book) {
        this.props.setSelectedBook(book);
    }

    render() {
        const { books, filters } = this.props;
        console.log(filters)

        const filteredBooks = books.filter((book) => {
            return filters.every((filter) => {
                const filterType = Object.keys(filter)[0];
                let filterValues = filter[filterType].map((value) => value.toString().toLowerCase());
                const bookValue = filterType === "genre" ? book.genreList : book[filterType];

                if (filterType === "rating") {
                    // Handle rating as a float
                    filterValues = filterValues.map((value) => parseFloat(value)); // Convert filter values to floats
                    return filterValues.includes(parseFloat(bookValue)); // Compare as floats
                }
            
                if (filterType === "read") {
                    filterValues = filterValues.map((value) => (value === "unread" ? "0" : value === "read" ? "1" : value));
                    return filterValues.includes(String(bookValue));
                }
                if (Array.isArray(bookValue)) {
                    return bookValue.some((value) => filterValues.includes(value.toLowerCase()));
                } else {
                    return filterValues.includes(bookValue?.toLowerCase());
                }

                
            });
        });

        return (
            <Row id="cards">
                {filteredBooks.map((book) => (
                    <Col key={book.id} md={12} className="mb-4">
                        <div className="card py-4 px-4 shadow" id="book-card">
                            <Row id="book-card-content" className="no-gutters card-main-content">
                                <Col className="cover-wrapper pr-3" xs="auto">
                                    <img
                                        src={this.determineCoverImage(book.imageLink)}
                                        alt={book.title}
                                        className="cover-image"
                                        style={{ width: 80, height: 120, objectFit: 'cover', borderRadius: 4 }}
                                    />
                                </Col>
                                {/* Book summary */}
                                <Col className="content-wrapper">
                                    <Row className="section">
                                        <Col className="data-container">
                                            <h5 className="card-title mb-2">
                                                <div onClick={() => this.handleTitleClick(book)}>{book.title}</div>
                                            </h5>
                                            <Col className="card__publication-info">
                                                <span>
                                                    Publisher: {book.publisher || 'N/A'}{' '}
                                                    {book.startDate ? `| ${book.startDate}` : ''} | English
                                                </span>
                                            </Col>
                                            <Col>
                                                <strong>Author:</strong> {book.authorName}
                                                <br />
                                                <strong>ISBN:</strong> {book.isbn}
                                                <br />
                                                <strong>Genre:</strong> {book.genreList && book.genreList.join(', ')}
                                                <br />
                                            </Col>
                                        </Col>
                                        {/* Action Buttons */}
                                        <Col className="d-flex flex-column align-items-center" xs="auto">
                                            <button className="btn btn-outline-secondary mb-2" aria-label="For Later">
                                                <FontAwesomeIcon icon={faBookmark} />
                                            </button>
                                            <button className="btn btn-outline-secondary" aria-label="Options">
                                                <FontAwesomeIcon icon={faEllipsis} />
                                            </button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                ))}
            </Row>
        );
    }
}

export default BookCard;