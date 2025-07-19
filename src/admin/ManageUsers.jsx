



// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = () => {
//     axios.get('http://localhost:3000/users')
//       .then((res) => setUsers(res.data))
//       .catch((err) => console.error('Error fetching users:', err));
//   };

//   const toggleBlock = (id, currentStatus) => {
//     axios.patch(`http://localhost:3000/users/${id}`, { isBlocked: !currentStatus })
//       .then(() => fetchUsers())
//       .catch((err) => console.error('Error updating user status:', err));
//   };

//   const deleteUser = (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this user?");
//     if (confirmDelete) {
//       axios.delete(`http://localhost:3000/users/${id}`)
//         .then(() => fetchUsers())
//         .catch((err) => console.error('Error deleting user:', err));
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
//       <div className="overflow-x-auto">
//         <table className="w-full table-auto border border-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2 border">ID</th>
//               <th className="px-4 py-2 border">Name</th>
//               <th className="px-4 py-2 border">Email</th>
//               <th className="px-4 py-2 border">Role</th>
//               <th className="px-4 py-2 border">Status</th>
//               <th className="px-4 py-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.id} className="text-center">
//                 <td className="px-4 py-2 border">{user.id}</td>
//                 <td className="px-4 py-2 border">{user.name}</td>
//                 <td className="px-4 py-2 border">{user.email}</td>
//                 <td className="px-4 py-2 border">{user.role}</td>
//                 <td className="px-4 py-2 border">
//                   {user.isBlocked ? 'Blocked' : 'Active'}
//                 </td>
//                 <td className="px-4 py-2 border space-x-2">
//                   {/* ✅ View button */}
//                   <Link to={`/admin/view-user/${user.id}`}>
//                     <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
//                       View
//                     </button>
//                   </Link>

//                   {/* ✅ Block/Unblock button */}
//                   <button
//                     onClick={() => toggleBlock(user.id, user.isBlocked)}
//                     className={`px-3 py-1 rounded ${
//                       user.isBlocked
//                         ? 'bg-green-500 hover:bg-green-600'
//                         : 'bg-red-500 hover:bg-red-600'
//                     } text-white`}
//                   >
//                     {user.isBlocked ? 'Unblock' : 'Block'}
//                   </button>

//                   {/* ✅ Delete button */}
//                   <button
//                     onClick={() => deleteUser(user.id)}
//                     className="bg-gray-600 hover:bg-gray-800 text-white px-3 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {users.length === 0 && (
//               <tr>
//                 <td colSpan="6" className="py-4 text-gray-500 text-center">
//                   No users found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageUsers;



import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:3000/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Error fetching users:', err));
  };

  const toggleBlock = (id, currentStatus) => {
    axios.patch(`http://localhost:3000/users/${id}`, { isBlocked: !currentStatus })
      .then(() => fetchUsers())
      .catch((err) => console.error('Error updating user status:', err));
  };

  const deleteUser = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      axios.delete(`http://localhost:3000/users/${id}`)
        .then(() => fetchUsers())
        .catch((err) => console.error('Error deleting user:', err));
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">👥 Manage Users</h2>

      <div className="overflow-x-auto shadow-lg rounded-2xl border border-gray-200 bg-white">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-pink-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-pink-50 transition">
                <td className="px-4 py-3">{user.id}</td>
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3 capitalize">{user.role}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    user.isBlocked ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {user.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </td>
                <td className="px-4 py-3 text-center space-x-2">
                  {/* View Button */}
                  <Link to={`/admin/view-user/${user.id}`}>
                    <button className="bg-blue-200 hover:bg-blue-300 text-blue-800 text-xs font-medium px-3 py-1 rounded-xl transition">
                      View
                    </button>
                  </Link>

                  {/* Block/Unblock Button */}
                  <button
                    onClick={() => toggleBlock(user.id, user.isBlocked)}
                    className={`text-xs font-medium px-3 py-1 rounded-xl transition ${
                      user.isBlocked
                        ? 'bg-green-200 hover:bg-green-300 text-green-800'
                        : 'bg-red-200 hover:bg-red-300 text-red-800'
                    }`}
                  >
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-medium px-3 py-1 rounded-xl transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;






