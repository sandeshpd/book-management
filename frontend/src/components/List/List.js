import React, { useState, useEffect } from 'react';
import '../../App.js';
import EditDialog from '../Dialog/Dialog.js';
import axios from 'axios';

export default function BookList() {
    const [details, setDetails] = useState([]);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBooks, setFilteredBooks] = useState(details);

    useEffect(() => {
        //Get the books data from the backend
        axios
            .get('/api/books/')
            .then(res => {
                setDetails(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    // Book finder function
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter Books based on user search input
    useEffect(() => {
        const results = details.filter((book) =>
            book.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredBooks(results);

        if (searchQuery.length > 0 && results === 0) {
            console.log('Alert isn\'t triggering!');
            alert('No books found! Check your spelling or make sure it\'s included in the library.');
        }
    }, [searchQuery, details]);

    // Open dialog box for book editing
    const openEditingDialog = (book) => {
        console.log('opening dialog for editing book', book);
        setSelectedBook(book);
        setDialogOpen(true);
    };

    // Close dialog box
    const closeEditingDialog = () => {
        setSelectedBook(null);
        setDialogOpen(false);
    };

    // Update book in backend and update state
    const updateBook = (updatedBook) => {
        axios
            .patch(`/api/books/${updatedBook.id}/`, updatedBook)
            .then((res) => {
                console.log('Book updated: ', res.data);
                const updatedList = details.map((book) =>
                    book.id === updatedBook.id ? res.data : book
                );
                console.log('updated list of books:', updatedList)
                setDetails(updatedList);
                closeEditingDialog();
            })
            .catch((err) => console.log('Error updating book info:', err));
    };

    // Delete book associated with given id from the backend
    const handleDelete = (id) => {
        axios
            .delete(`/api/books/${id}/`)
            .then(() => {
                setDetails(details.filter((book) => book.id !== id));
                alert('Book deleted successfully!');
            })
            .catch((err) => {
                console.error(err);
                alert('Failed to delete book.');
            });
    };

    // FIXME: Complete function to toggle drop down menu right under "Filter" button
    const handleMenu = () => {
        setIsMenuOpen(true);
        console.log('drop down menu worked~');
    };

    // Render the User Interface
    return (
        <div className="main-search-container jumbotron ">
            <div className='searchbox-container'>
                <div className='searchbox'>
                    <md-outlined-text-field
                        label='Search book'
                        className='search-book-input'
                        value={searchQuery}
                        onChange={handleSearch}>
                        <span
                            slot='leading-icon'
                            className='material-symbols-rounded search-icon'>
                            search
                        </span>
                        <span
                            slot='trailing-icon'
                            className='material-symbols-rounded close-text'>
                            close
                        </span>
                    </md-outlined-text-field>
                </div>
                <div className='filter-menu'>
                    <span style={{ position: 'relative' }}>
                        <md-filled-button
                            id="usage-anchor"
                            className='filter-button'
                            onClick={handleMenu}>
                            Filter
                        </md-filled-button>

                        {isMenuOpen && (
                            <md-menu className="usage-menu">
                                <md-menu-item>
                                    <div slot='headline'>Marathi</div>
                                </md-menu-item>
                                <md-menu-item>
                                    <div slot='headline'>English</div>
                                </md-menu-item>
                            </md-menu>
                        )}
                    </span>
                </div>
            </div>
            {/* TODO: Return search results if user enters something in search text field */}
            Count of Books: {details.length}
            <hr
                style={{
                    color: "#000000",
                    backgroundColor: "#000000",
                    height: 1,
                    borderColor: "#000000",
                }} />

            {/*Add mapping of books to be searched */}
            {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                    <div key={book.id}>
                        <div className="main-card shadow-lg">
                            <div className="card-body-section">
                                <div className='bookdata-actions'>
                                    <div className='edit-item'>

                                        <button
                                            className='edit-btn'
                                            type='button'
                                            onClick={() => openEditingDialog(book)}>
                                            <span className='material-symbols-rounded'>
                                                edit
                                            </span>
                                        </button>
                                    </div>
                                    <div className="delete-item">

                                        <button
                                            className='delete-btn'
                                            type='button'
                                            onClick={() => handleDelete(book.id)}>
                                            <span className="material-symbols-rounded">
                                                delete_forever
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <h2 className='Bookdata'>{book.name}</h2>
                                <h4 className='Bookdata'>{book.author}</h4>
                                <h4 className='Bookdata'>{book.language}</h4>
                                <h4 className='Bookdata'>{book.genre}</h4>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                details.map((book) => (
                    <div key={book.id}>
                        <div className="main-card shadow-lg">
                            <div className="card-body-section">
                                <div className='bookdata-actions'>
                                    <div className='edit-item'>

                                        <button
                                            className='edit-btn'
                                            type='button'
                                            onClick={() => openEditingDialog(book)}>
                                            <span className='material-symbols-rounded'>
                                                edit
                                            </span>
                                        </button>
                                    </div>
                                    <div className="delete-item">

                                        <button
                                            className='delete-btn'
                                            type='button'
                                            onClick={() => handleDelete(book.id)}>
                                            <span className="material-symbols-rounded">
                                                delete_forever
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <h2 className='Bookdata'>{book.name}</h2>
                                <h4 className='Bookdata'>{book.author}</h4>
                                <h4 className='Bookdata'>{book.language}</h4>
                                <h4 className='Bookdata'>{book.genre}</h4>
                            </div>
                        </div>
                    </div>
                ))
            )
            }
            {isDialogOpen && selectedBook ? (
                <EditDialog
                    book={selectedBook}
                    onClose={closeEditingDialog}
                    onSave={updateBook}
                />

            ) : (
                <></>
            )}
        </div>
    );
};