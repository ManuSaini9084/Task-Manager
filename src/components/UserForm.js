// src/components/UserForm.js
import React, { useState, useEffect } from 'react';

const UserForm = ({ selectedUser, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    address: {
      street: '',
      city: ''
    },
    company: {
      name: ''
    },
    website: ''
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData(selectedUser);
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        username: '',
        address: {
          street: '',
          city: ''
        },
        company: {
          name: ''
        },
        website: ''
      });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address.')) {
      setFormData({
        ...formData,
        address: { ...formData.address, [name.split('.')[1]]: value }
      });
    } else if (name.includes('company.')) {
      setFormData({
        ...formData,
        company: { ...formData.company, [name.split('.')[1]]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label className="text-lg">Name</label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="text-lg">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="text-lg">Phone</label>
        <input
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="text-lg">Street</label>
        <input
          name="address.street"
          type="text"
          value={formData.address.street}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="text-lg">City</label>
        <input
          name="address.city"
          type="text"
          value={formData.address.city}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>
      <div className="flex justify-end space-x-4">
        <button type="button" onClick={onCancel} className="text-gray-500 hover:text-gray-700">
          Cancel
        </button>
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
          Save
        </button>
      </div>
    </form>
  );
};

export default UserForm;
