// src/pages/UserDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserById } from '../services/userService';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserById(id)
      .then((data) => setUser(data))
      .catch((error) => console.error('Error fetching user details:', error));
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <button onClick={() => navigate(-1)} className="text-blue-500 hover:underline mb-4">Back</button>
      <h2 className="text-3xl font-bold mb-6">User Details</h2>
      <div className="space-y-4">
        <p><span className="font-semibold">Name:</span> {user.name}</p>
        <p><span className="font-semibold">Email:</span> {user.email}</p>
        <p><span className="font-semibold">Phone:</span> {user.phone}</p>
        <p><span className="font-semibold">Username:</span> {user.username}</p>
        <p><span className="font-semibold">Street:</span> {user.address.street}</p>
        <p><span className="font-semibold">City:</span> {user.address.city}</p>
        <p><span className="font-semibold">Company:</span> {user.company.name}</p>
        <p><span className="font-semibold">Website:</span> {user.website}</p>
      </div>
    </div>
  );
};

export default UserDetail;
