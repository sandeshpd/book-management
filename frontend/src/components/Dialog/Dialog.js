import React, { useState } from "react";
import './Dialog.css';
// import axios from "axios";

const EditDialog = ({ book, onClose, onSave }) => {
  const [editedBook, setEditedBook] = useState(book);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(editedBook);
  };

  return (
    /* Add Material Design 3 Dialog box here */
    <>
      <div className="edit-form-container">
        <md-dialog open>
          <span slot="headline">
            <md-icon-button form='form' value='close' aria-label='Close dialog'>
              <md-icon>close</md-icon>
            </md-icon-button>
            <span className="headline">Edit Book Information</span>
          </span>
          <form
            id="form"
            slot="content"
            method="post"
            className="bookinfo-content">
            <div className="contact-row">
              <md-outlined-text-field
                className='editDialog-textfield'
                autofocus
                label='Name'
                onChange={ handleInputChange }></md-outlined-text-field>
              <md-outlined-text-field
                className='editDialog-textfield'
                autofocus
                label='Author'
                onChange={ handleInputChange }></md-outlined-text-field>
              <md-outlined-text-field
                className='editDialog-textfield'
                autofocus
                label='Language'
                onChange={ handleInputChange }></md-outlined-text-field>
              <md-outlined-text-field
                className='editDialog-textfield'
                autofocus
                label='Genre'
                onChange={ handleInputChange }></md-outlined-text-field>

              {/* Save and Cancel buttons */}
              <md-filled-button
                value="save"
                className='save-edited-info'
                onClick={ handleSave }>
                Save
              </md-filled-button>
              <md-filled-button
                value="close"
                className='cancel-edited-info'
                onClick={ onClose }>
                Cancel
              </md-filled-button>
            </div>
          </form>
        </md-dialog>
      </div>
    </>
  );
};

export default EditDialog;
