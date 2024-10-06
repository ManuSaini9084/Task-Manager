// src/components/UserTable.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserTable = ({ users, handleEdit, handleDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Phone</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
            >
              <td className="py-3 px-6" onClick={() => navigate(`/user/${user.id}`)}>{user.id}</td>
              <td className="py-3 px-6" onClick={() => navigate(`/user/${user.id}`)}>{user.name}</td>
              <td className="py-3 px-6">{user.email}</td>
              <td className="py-3 px-6">{user.phone}</td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-3 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
