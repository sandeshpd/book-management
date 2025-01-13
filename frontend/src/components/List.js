import React, { Component } from 'react';
import '../App.js';
import axios from 'axios';

class BookList extends Component {
    state = {
        details: [],
        name: "",
        author: "",
        language: "",
        genre: "",
    };

    componentDidMount() {
        let data;

        //Get the books data from the backend
        axios
            .get('/api/books/', {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM2NTc5NjMzLCJpYXQiOjE3MzY1NzkzMzMsImp0aSI6ImIyMzAyMjQzMmU1MDQzMjJiYWYxZDFkMGE4N2E2Mjc2IiwidXNlcl9pZCI6MX0.DfatMUf7qBnnDGhp0_3AUWGII0c9pTrReMLJ_suY3Tw`,
                },
            })
            .then(res => {
                data = res.data;
                this.setState({
                    details: data
                });
            })
            .catch(err => console.log(err));
    }

    refreshList() {
        axios
            .get('/api/books/', {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM2NTc5NjMzLCJpYXQiOjE3MzY1NzkzMzMsImp0aSI6ImIyMzAyMjQzMmU1MDQzMjJiYWYxZDFkMGE4N2E2Mjc2IiwidXNlcl9pZCI6MX0.DfatMUf7qBnnDGhp0_3AUWGII0c9pTrReMLJ_suY3Tw`,
                },
            })
            .then((res) => {
                console.log(res.data)
                this.setState({ details: res.data })
            })
            .catch((err) => console.log(err));
    };

    handleInput = (e) => {
        e.preventDefault();

        axios
            .post('/api/books/', {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM2NTc5NjMzLCJpYXQiOjE3MzY1NzkzMzMsImp0aSI6ImIyMzAyMjQzMmU1MDQzMjJiYWYxZDFkMGE4N2E2Mjc2IiwidXNlcl9pZCI6MX0.DfatMUf7qBnnDGhp0_3AUWGII0c9pTrReMLJ_suY3Tw`,
                },
                name: this.state.name,
                author: this.state.author,
                language: this.state.language,
                genre: this.state.genre,
            })
            .then((res) => {
                this.setState({
                    name: '',
                    author: '',
                    language: '',
                    genre: '',
                });
            })
            .catch((err) => console.log(err));
    }

    // Delete particular books from the backend
    handleDelete = (id) => {
        axios
            .delete(`/api/books/${id}/`, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM2NTc5NjMzLCJpYXQiOjE3MzY1NzkzMzMsImp0aSI6ImIyMzAyMjQzMmU1MDQzMjJiYWYxZDFkMGE4N2E2Mjc2IiwidXNlcl9pZCI6MX0.DfatMUf7qBnnDGhp0_3AUWGII0c9pTrReMLJ_suY3Tw`,
                },
            })
            .then(() => {
                this.setState({
                    details: this.state.details.filter((book) => book.id !== id),
                });
                alert('Book deleted successfully!');
            })
            .catch((err) => {
                console.error(err);
                alert('Failed to delete book.');
            });
    };

    render() {
        return (
            <div className="container jumbotron ">

                Count of Books: {this.state.details.length}
                <hr
                    style={{
                        color: "#000000",
                        backgroundColor: "#000000",
                        height: 0.5,
                        borderColor: "#000000",
                    }}
                />

                {this.state.details.map((detail, id) => (
                    <div key={id}>
                        <div className="card shadow-lg">
                            <div className="card-body">
                                <div className="deleteItem">
                                    <button
                                        className='deleteBtn'
                                        type='button'
                                        onClick={() => this.handleDelete(detail.id)}>
                                        <span className="material-symbols-rounded">
                                            delete_forever
                                        </span>
                                    </button>
                                </div>
                                <h1> {detail.detail} </h1>
                                <h4 className='Bookdata'>{detail.name}</h4>
                                <h4 className='Bookdata'>{detail.author}</h4>
                                <h4 className='Bookdata'>{detail.language}</h4>
                            </div>
                        </div>
                        <span className="border border-primary"></span>
                    </div>
                ))}
            </div>
        );
    }
}

export default BookList;