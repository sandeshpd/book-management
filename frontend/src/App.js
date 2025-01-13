// import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';
import BookList from './components/List';
import { Routes, Route, Navigate } from 'react-router-dom';

class App extends React.Component {
  // constructor to set redirectToList to false initially
  constructor(props) {
    super(props);
    this.state = {
      redirectToList: false,
    };
  }

  state = {
    details: [],
    name: "",
    author: "",
    language: "",
    genre: "",
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // Post the books data to the backend
  handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/books/', {
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

  handleRedirect = () => {
    this.setState({ redirectToList: true });
    //console.log('working fine')
  };


  // Navigate to Book collection page
  // FIXME: Collection must be displayed immediately after going to /booklist page
  render() {
    if (this.state.redirectToList) {
      return <Navigate to="/booklist" />;
    }

    return (
        <div className="container jumbotron ">
          <form onSubmit={this.handleSubmit}>
            <div className="input-group mb-3">
              <md-outlined-text-field type="text"
                className="bookdata-textfield"
                placeholder="Name of the Book"
                aria-describedby="basic-addon1"
                value={this.state.name} name="name"
                onChange={this.handleInput} />
            </div>

            <div className="input-group mb-3">
              <md-outlined-text-field type='text'
                className="bookdata-textfield"
                placeholder="Who wrote this?"
                value={this.state.author} name="author"
                onChange={this.handleInput}>
              </md-outlined-text-field>

              <md-outlined-text-field type='text'
                className="bookdata-textfield"
                placeholder="In what language?"
                value={this.state.language} name="language"
                onChange={this.handleInput}>
              </md-outlined-text-field>

              <md-outlined-text-field type='text'
                className="bookdata-textfield"
                placeholder="What's this book about?"
                value={this.state.language} name="language"
                onChange={this.handleInput}>
              </md-outlined-text-field>
            </div>

            <button type="submit" className="btn btn-primary mb-5">
              Submit
            </button>
          </form>

          <div>
            <button
              onClick={ this.handleRedirect }
              className='btn btn-primary'>
              View Collection
            </button>
          </div>
        <Routes>
          <Route path="/booklist" element={<BookList />} />
        </Routes>
        </div>

    );
  }
}

export default App;