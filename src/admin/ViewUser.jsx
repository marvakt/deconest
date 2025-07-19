import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewUser = () => {
  const { id } = useParams(); // gets user ID from URL
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data by ID from JSON server
    axios.get(`http://localhost:3000/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error('Error fetching user:', err));
  }, [id]);

  if (!user) return <div className="p-4 text-gray-600">Loading user details...</div>;

  return (
    <div className="p-6 bg-white shadow-md rounded-xl max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">User Details</h2>
      <p className="mb-2"><strong>Name:</strong> {user.name}</p>
      <p className="mb-2"><strong>Email:</strong> {user.email}</p>
      <p className="mb-2"><strong>Role:</strong> {user.role}</p>
      <p className="mb-2"><strong>Status:</strong> {user.isBlocked ? "Blocked" : "Active"}</p>
    </div>
  );
};

export default ViewUser;

