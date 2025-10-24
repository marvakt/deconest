// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const ViewUser = () => {
//   const { id } = useParams(); 
//   const [user, setUser] = useState(null);

//   useEffect(() => {

//     axios.get(`http://localhost:3000/users/${id}`)
//       .then((res) => setUser(res.data))
//       .catch((err) => console.error('Error fetching user:', err));
//   }, [id]);

//   if (!user) return <div className="p-4 text-gray-600">Loading user details...</div>;

//   return (
//     <div className="p-6 bg-white shadow-md rounded-xl max-w-xl mx-auto mt-8">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">User Details</h2>
//       <p className="mb-2"><strong>Name:</strong> {user.name}</p>
//       <p className="mb-2"><strong>Email:</strong> {user.email}</p>
//       <p className="mb-2"><strong>Role:</strong> {user.role}</p>
//       <p className="mb-2"><strong>Status:</strong> {user.isBlocked ? "Blocked" : "Active"}</p>
//     </div>
//   );
// };

// export default ViewUser;



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";


const ViewUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access"); // Admin JWT token
    axiosInstance
      .get(`adminpanel/users/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error fetching user:", err));
  }, [id]);

  if (!user)
    return <div className="p-4 text-gray-600">Loading user details...</div>;

  return (
    <div className="p-6 bg-white shadow-md rounded-xl max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">User Details</h2>
      <p className="mb-2"><strong>Username:</strong> {user.username}</p>
      <p className="mb-2"><strong>Email:</strong> {user.email}</p>
      <p className="mb-2"><strong>Role:</strong> {user.role}</p>
      <p className="mb-2"><strong>Status:</strong> {user.is_blocked ? "Blocked" : "Active"}</p>
      <p className="mb-2"><strong>Joined On:</strong> {new Date(user.date_joined).toLocaleDateString()}</p>
    </div>
  );
};

export default ViewUser;

