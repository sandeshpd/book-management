// import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {
    details: [],
    name: "",
    author: "",
    language: "",
  };

  componentDidMount() {
    let data;

    // Get the books data from the backend
    axios
    .get('/api/books/', {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM2NTc5NjMzLCJpYXQiOjE3MzY1NzkzMzMsImp0aSI6ImIyMzAyMjQzMmU1MDQzMjJiYWYxZDFkMGE4N2E2Mjc2IiwidXNlcl9pZCI6MX0.DfatMUf7qBnnDGhp0_3AUWGII0c9pTrReMLJ_suY3Tw`,
      },
    })
    .then(res => {
      data = res.data;
      this.setState({
        details : data
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
      }
    )
    .then((res) => {
      console.log(res.data)
      this.setState({ details:res.data })
    })
    .catch((err) => console.log(err));
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
    })
    .then((res) => {
      this.setState({
        name: '',
        author: '',
        language: '',
      });
    })
    .catch((err) => console.log(err));
  }

  // Delete particular book from the backend
  handleDelete = (book) => {
    axios
    .delete(`/api/books/${book.id}/`)
    .then((res) => this.refreshList());
  };

  render() {
    return (
      <div className="container jumbotron ">
          <form onSubmit={this.handleSubmit}>
              <div className="input-group mb-3">
                  <div className="input-group-prepend">
                      <span className="input-group-text"
                            id="basic-addon1">
                              Name
                      </span>
                  </div>
                  <input type="text" className="form-control" 
                         placeholder="Name of the Book"
                         aria-label="Book name"
                         aria-describedby="basic-addon1"
                         value={this.state.name} name="name"
                         onChange={this.handleInput} />
              </div>
    
              <div className="input-group mb-3">
                  <div className="input-group-prepend">
                      <span className="input-group-text">
                         Book data 
                      </span>
                  </div>
                  <input type='text' className="form-control" 
                            aria-label="Author name"
                            placeholder="Who wrote this?" 
                            value={this.state.author} name="author" 
                            onChange={this.handleInput}>
                  </input>

                  <input type='text' className="form-control" 
                            aria-label="Language"
                            placeholder="In what language?" 
                            value={this.state.language} name="language" 
                            onChange={this.handleInput}>
                  </input>
              </div>
    
              <button type="submit" className="btn btn-primary mb-5">
                  Submit
              </button>
          </form>

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
                          {/* FIXME: Pass id/reference of the object (in this context, book)
                           to be deleted in handleDelete() function */}
                          <button 
                            className='deleteBtn'
                            type='button' 
                            onClick={ () => this.handleDelete() }>
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

export default App;