// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { fetchUsers, deleteUser, createUser, updateUser } from '../services/userService';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

Modal.setAppElement('#root');

const Home = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', website: '' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers().then((data) => setUsers(data));
  }, []);

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleCreate = async () => {
    const createdUser = await createUser(newUser);
    setUsers([...users, createdUser]);
    setIsModalOpen(false);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setNewUser(user);
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    const updatedUser = await updateUser(editingUser.id, newUser);
    setUsers(users.map((user) => (user.id === editingUser.id ? updatedUser : user)));
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const openModal = () => {
    setNewUser({ name: '', email: '', phone: '', website: '' });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
          onClick={openModal}
        >
          Create New User
        </button>
      </div>

      <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Phone</th>
            <th className="px-6 py-3 text-left">Website</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'}`}
            >
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.phone}</td>
              <td className="px-6 py-4">{user.website}</td>
              <td className="px-6 py-4">
                <button
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600 transition"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 ml-4 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
                <Link
                  to={`/user/${user.id}`}
                  className="px-4 py-2 ml-4 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Creating and Editing User */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold mb-4">{editingUser ? 'Edit User' : 'Create User'}</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-600">Name</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600">Phone</label>
            <input
              type="text"
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600">Website</label>
            <input
              type="text"
              value={newUser.website}
              onChange={(e) => setNewUser({ ...newUser, website: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={editingUser ? handleUpdate : handleCreate}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editingUser ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Home;
