import { Component } from "react";
import { Button, Container, Form, FormGroup, Input, Label, FormFeedback } from "reactstrap";
import { addBook } from "../../helpers/Api";


class UploadForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            author: '',
            isbn: '',
            publisher: '',
            genreString: '',
            genreList: [],
            copies: 0,
            description: '',
            category: '',
            isNumber: true,
            isTitleValid: true,
            isAuthorValid: true,
            isIsbnValid: true,
            isPublisherValid: true,
            isGenreValid: true,
            isCategoryValid: true,
            isCopiesValid: true,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    separateGenres(genreString) {
    this.setState({
        genreString, // Update genreString with the input value
        genreList: genreString.split(',').map((genre) => genre.trim()) // Update genreList
    });
}

    validateForm() {
        const { title, author, isbn, publisher, genreString, category, copies } = this.state;

        // Check if all required fields are filled
    const isTitleValid = title.trim() !== '';
    const isAuthorValid = author.trim() !== '';
    const isIsbnValid = isbn.trim() !== '';
    const isPublisherValid = publisher.trim() !== '';
    const isGenreValid = genreString.trim() !== '';
    const isCategoryValid = category.trim() !== '';
    const isCopiesValid = copies > 0;

    this.setState({
        isTitleValid,
        isAuthorValid,
        isIsbnValid,
        isPublisherValid,
        isGenreValid,
        isCategoryValid,
        isCopiesValid
    });

    return (
        isTitleValid &&
        isAuthorValid &&
        isIsbnValid &&
        isPublisherValid &&
        isGenreValid &&
        isCategoryValid &&
        isCopiesValid
    );
    }

    handleSubmit() {
        if (!this.validateForm()) {
            alert("Please fill in all required fields.");
            return;
        }

        const book = {
            title: this.state.title,
            category: this.state.category,
            isbn: this.state.isbn,
            publisher: this.state.publisher,
            description: this.state.description,
            genre: this.state.genreList,
            authorName: this.state.author,
            copies: this.state.copies
        }

        console.log(book);

        

        addBook(book);
        this.setState({
            title: '',
            author: '',
            isbn: '',
            publisher: '',
            genreString: '',
            genreList: [],
            copies: 0,
            description: '',
            category: ''
        })
        // console.log("Submitting book data:");
        // console.log(this.state);
    }

    render() {
        return ( 
            <Container className='uploadWrapper'>
                <Container className="formWrapper">
                    <Form>
                        <FormGroup >
                            <Input
                              id="title"
                              name="title"
                              placeholder="Title"
                              type="text"
                              value={this.state.title}
                              invalid={!this.state.isTitleValid}
                              onChange={(e) => this.setState({title: e.target.value})}
                            />
                            <Label for="tile" hidden>
                              Title
                            </Label>
                        </FormGroup>

                        <FormGroup >
                            <Input 
                                id="author"
                                name="author"
                                placeholder="Author"
                                type="text"
                                value={this.state.author}
                                invalid={!this.state.isAuthorValid}
                                onChange={(e) => this.setState({author: e.target.value})}
                            />
                            <Label for="author" hidden>
                              Author
                            </Label>
                        </FormGroup>

                        <FormGroup >
                            <Input 
                                id="isbn"
                                name="isbn"
                                placeholder="ISBN"
                                type="text"
                                value={this.state.isbn}
                                invalid={!this.state.isIsbnValid}
                                onChange={(e) => this.setState({isbn: e.target.value})}
                            />
                            <Label for="isbn" hidden>
                              ISBN
                            </Label>
                        </FormGroup>

                        <FormGroup >
                            <Input 
                                id="publisher"
                                name="publisher"
                                placeholder="Publisher"
                                type="text"
                                value={this.state.publisher}
                                invalid={!this.state.isPublisherValid}
                                onChange={(e) => this.setState({publisher: e.target.value})}
                            /> 
                            <Label for="publisher" hidden>
                              Publisher
                            </Label>
                        </FormGroup>
                        <FormGroup >
                            <Input 
                                id="genre"
                                name="genre"
                                placeholder="Genre(s) Ex. Fiction, Mystery, Sci-Fi"
                                type="text"
                                value={this.state.genreString}
                                invalid={!this.state.isGenreValid}
                                onChange={(e) => this.separateGenres(e.target.value)}
                            />
                            <Label for="genre" hidden>
                              Genre(s) 
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Input 
                                id="category"
                                name="category"
                                placeholder="Category Ex. Fiction/Non-Fiction"
                                type="text"
                                value={this.state.category}
                                invalid={!this.state.isCategoryValid}
                                onChange={(e) => this.setState({category: e.target.value})}
                            />
                            <Label for="category" hidden>
                              Category (Ficton/Non-Fiction)
                            </Label>
                        </FormGroup>
                            
                        <FormGroup >
                            <Input 
                                id='copies'
                                name="copies"
                                placeholder="Copies"
                                type="number"
                                value={this.state.copies}
                                invalid={!this.state.isNumber || !this.state.isCopiesValid}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if(!isNaN(value)){
                                        this.setState({copies: parseInt(value), isNumber: true});
                                    }
                                    else {
                                        this.setState({isNumber: false});
                                    }
                                }}
                            />
                            <FormFeedback>
                                {this.state.copies < 0 ? "Copies must be greater than 0" : "Please enter a valid number"}
                            </FormFeedback>
                            <Label for="copies" hidden>
                              Copies
                            </Label>
                        </FormGroup>
                        <FormGroup >
                            <Input 
                                id='description'
                                name="description"
                                placeholder="Description"
                                type="textarea"    
                                className="descriptionInput"
                                value={this.state.description}
                                onChange={(e) => this.setState({description: e.target.value})}
                            />
                            <Label for="description" hidden>
                                Description 
                            </Label>
                        </FormGroup>
                    </Form>
                </Container>
                        <div className='submitWrapper'>
                            
                            <Button onClick= {() => this.handleSubmit()} color="primary" type="submit" className='submitButton'>Submit</Button>

                        </div>
                
            </Container>
        )
    }
}

export default UploadForm;