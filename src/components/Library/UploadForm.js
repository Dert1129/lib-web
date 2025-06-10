import { Component } from "react";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";


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
            category: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    separateGenres(genreString) {
        if (genreString) {
            this.setState({ genreList: genreString.split(',').map(genre => genre.trim())});
        }
    }

    handleSubmit() {
        console.log("Submitting book data:");
        console.log(this.state);
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
                                onChange={(e) => this.setState({copies: e.target.value})}
                            />
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