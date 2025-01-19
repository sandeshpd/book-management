import React, { useState, useEffect } from 'react';
import '../../App.js';
import EditDialog from '../Dialog/Dialog.js';
import axios from 'axios';

function BookList() {
    const [details, setDetails] = useState([]);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    /*const state = {
        details: [],
        isEdited: false,
        currentBook: { id: '', name: '', author: '', language: '', genre: '' },
    };*/

    useEffect(() => {
        //Get the books data from the backend
        axios
            .get('/api/books/')
            .then(res => {
                setDetails(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    // Open dialog box
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

    return (
        <div className="main-search-container jumbotron ">
            <div className='searchbox-container'>
                <div className='searchbox'>
                    <md-outlined-text-field
                        label='Search book'
                        className='search-book-input'>
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
                <div className='sort-menu'>
                    TEST
                </div>
            </div>
            Count of Books: {details.length}
            <hr
                style={{
                    color: "#000000",
                    backgroundColor: "#000000",
                    height: 1,
                    borderColor: "#000000",
                }}
            />

            {details.map((book) => (
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
            ))}
            {isDialogOpen && selectedBook ? (
                <div className='dialog-main-container'>
                    <EditDialog
                        book={selectedBook}
                        onClose={closeEditingDialog}
                        onSave={updateBook}
                    />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default BookList;