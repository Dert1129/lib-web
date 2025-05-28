import { Component } from "react";


class BookInfo extends Component {
    render() {
        console.log(this.props)
        const { book } = this.props;

        return (
            <></>
            // <div className="book-info">
            //     <h5 className="card-title mb-2">
            //         <a href="#">{book.title}</a>
            //     </h5>
            //     <div className="card__publication-info">
            //         <span>Publisher: {book.publisher || 'N/A'} {book.startDate ? `| ${book.startDate}` : ''} | English</span>
            //     </div>
            //     <div>
            //         <strong>Author:</strong> {book.authorName}<br />
            //         <strong>ISBN:</strong> {book.isbn}<br />
            //         <strong>Genre:</strong> {book.genreList && book.genreList.join(', ')}<br />
            //     </div>
            // </div>
        );
    }
}

export default BookInfo;