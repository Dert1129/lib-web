import { Component } from "react";
import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faEllipsis } from "@fortawesome/free-solid-svg-icons";

class BookCard extends Component {
    determineImageLink(imageLink) {
        if (imageLink) {
            return imageLink;
        } else {
            return "src/assets/img/book-not-found.png";
        }
    }

    render() {
        return (
            <Row>
                {this.props.books.map(book => (
                    <Col key={book.id} md={12} className="mb-4">
                        <div className="card py-4 px-4 shadow" id="book-card">
                            <Row id="book-card-content" className="no-gutters card-main-content">
                                {/* Checkbox */}
                                <Col className="d-flex align-items-start pr-3" xs="auto">
                                    <input type="checkbox" className="form-check-input mt-2" />
                                </Col>
                                {/* Cover Image */}
                                <Col className="cover-wrapper pr-3" xs="auto">
                                    <img
                                        src={this.determineImageLink(book.imageLink)}
                                        alt={book.title}
                                        className="cover-image"
                                        style={{ width: 80, height: 120, objectFit: 'cover', borderRadius: 4 }}
                                    />
                                </Col>
                                {/* Book Info */}
                                <Col className="content-wrapper">
                                    <Row className="section">
                                        <Col className="data-container">
                                            <h5 className="card-title mb-2">
                                                <a href="#" className="text-decoration-none">{book.title}</a>
                                            </h5>
                                            <Col className="card__publication-info">
                                                <span>Publisher: {book.publisher || 'N/A'} {book.startDate ? `| ${book.startDate}` : ''} | English</span>
                                            </Col>
                                            <Col>
                                                <strong>Author:</strong> {book.authorName}<br />
                                                <strong>ISBN:</strong> {book.isbn}<br />
                                                <strong>Genre:</strong> {book.genreList && book.genreList.join(', ')}<br />
                                                {/* <strong>Category:</strong> {book.category}<br />
                                                <strong>Copies:</strong> {book.copies}<br />
                                                <strong>Read:</strong> {book.read ? 'Yes' : 'No'}<br />
                                                <strong>Description:</strong> {book.description}<br />
                                                <strong>Review:</strong> {book.review || 'N/A'}<br />
                                                <strong>Rating:</strong> {book.rating || 'N/A'} */}
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
                                    {/* Edition/location/copy info */}
                                    {/* <Row className="mt-3">
                                        <Col>
                                            <span className="font-weight-bold">{book.copies}&nbsp;</span>
                                            <span>copy</span>
                                        </Col>
                                    </Row> */}
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