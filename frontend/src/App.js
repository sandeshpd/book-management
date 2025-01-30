// import logo from './logo.svg';
import './App.css';
import './components/List/List.css';
import React, { useState } from 'react';
import axios from 'axios';
import BookList from './components/List/List';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

export default function App() {
  // const [setRedirectToList] = useState(false);
  // const [details, setDetails] = useState([]);
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [language, setLanguage] = useState('');
  const [genre, setGenre] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === 'name') setName(value);
    if (name === 'author') setAuthor(value);
    if (name === 'language') setLanguage(value);
    if (name === 'genre') setGenre(value);
  };

  // Post the books data to the backend
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/books/', {
      name,
      author,
      language,
      genre,
    })
      .then((res) => {
        setName('');
        setAuthor('');
        setLanguage('');
        setGenre('');
      })
      .catch((err) => console.log(err));
  };

  const handleRedirect = () => {
    //setRedirectToList(true);
    navigate('/booklist');
  }

  return (
    <div className="container jumbotron ">
      {location.pathname === '/' && (
        <>
          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <md-outlined-text-field type="text"
                className="bookdata-textfield"
                label="Name of the Book"
                aria-describedby="basic-addon1"
                value={name} name="name"
                onChange={handleInput} />
            </div>
            <div className="input-group">
              <md-outlined-text-field type='text'
                className="bookdata-textfield"
                label="Who wrote this?"
                value={author} name="author"
                onChange={handleInput}>
              </md-outlined-text-field>

              <md-outlined-text-field type='text'
                className="bookdata-textfield"
                label="In what language?"
                value={language} name="language"
                onChange={handleInput}>
              </md-outlined-text-field>

              <md-outlined-text-field type='text'
                className="bookdata-textfield"
                label="What's this book about?"
                value={genre} name="genre"
                onChange={handleInput}>
              </md-outlined-text-field>
            </div>

            <md-filled-button type="submit" className="submit-btn">
              Submit
            </md-filled-button>

          </form>

          <div>
            <md-filled-button
              onClick={handleRedirect}
              className='view-collection-btn'>
              View Collection
            </md-filled-button>
          </div>
        </>
      )}

      <Routes>
        <Route path="/booklist" element={<BookList />} />
      </Routes>
    </div>

  );
}
