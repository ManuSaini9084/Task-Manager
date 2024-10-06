import React from 'react';

const DeleteModal = ({ onDelete, onCancel }) => (
  <div className="modal">
    <p>Are you sure you want to delete this user?</p>
    <button onClick={onDelete}>Delete</button>
    <button onClick={onCancel}>Cancel</button>
  </div>
);

export default DeleteModal;
