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
                    <div className="card py-4 px-4">
                        <div className="row no-gutters card-main-content align-items-center">
                        {/* Checkbox */}
                        <div className="col-auto d-flex align-items-start pr-3">
                            <input type="checkbox" className="form-check-input mt-2" />
                        </div>
                        {/* Cover Image */}
                        <div className="col-auto cover-wrapper pr-3">
                            <img
                                src={this.determineImageLink(book.imageLink)}
                                alt={book.title}
                                className="cover-image"
                                style={{ width: 80, height: 120, objectFit: 'cover', borderRadius: 4 }}
                            />
                        </div>
                        {/* Book Info */}
                        <div className="col content-wrapper">
                            <div className="row section">
                            <div className="col data-container">
                                <h5 className="card-title mb-2">
                                <a href="#" className="text-decoration-none">{book.title}</a>
                                </h5>
                                <div className="card__publication-info mb-2">
                                <span>Publisher: {book.publisher || 'N/A'} {book.startDate ? `| ${book.startDate}` : ''} | English</span>
                                </div>
                                <div>
                                <strong>Author:</strong> {book.authorName}<br />
                                <strong>ISBN:</strong> {book.isbn}<br />
                                <strong>Genre:</strong> {book.genreList && book.genreList.join(', ')}<br />
                                <strong>Category:</strong> {book.category}<br />
                                <strong>Copies:</strong> {book.copies}<br />
                                <strong>Read:</strong> {book.read ? 'Yes' : 'No'}<br />
                                <strong>Description:</strong> {book.description}<br />
                                <strong>Review:</strong> {book.review || 'N/A'}<br />
                                <strong>Rating:</strong> {book.rating || 'N/A'}
                                </div>
                            </div>
                            {/* Action Buttons */}
                            <div className="col-auto d-flex flex-column align-items-center">
                                <button className="btn btn-outline-secondary mb-2" aria-label="For Later">
                                <FontAwesomeIcon icon={faBookmark} />
                                </button>
                                <button className="btn btn-outline-secondary" aria-label="Options">
                                <FontAwesomeIcon icon={faEllipsis} />
                                </button>
                            </div>
                            </div>
                            {/* Edition/location/copy info */}
                            <div className="row mt-3">
                            <div className="col">
                                <span className="font-weight-bold">{book.copies}&nbsp;</span>
                                <span>copy</span>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </Col>
                ))}
            </Row>
        );
    }       
}

export default BookCard;