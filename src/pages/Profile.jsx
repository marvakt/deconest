// import React from "react";

// const Profile = () => {
//   const user = JSON.parse(localStorage.getItem("loggedInUser"));

//   if (!user) {
//     return <p className="text-center mt-10 text-red-500">Not logged in.</p>;
//   }

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow text-black bg-white">
//       <h2 className="text-2xl font-bold mb-4">👤 Your Profile</h2>
//       <p><strong>Name:</strong> {user.name || "N/A"}</p>
//       <p><strong>Email:</strong> {user.email}</p>
//       <p><strong>Role:</strong> {user.role}</p>

//       <button
//         className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
//         onClick={() => {
//           localStorage.removeItem("loggedInUser");
//           localStorage.removeItem("cart");
//           localStorage.removeItem("wishlist");
//           window.location.href = "/login";
//         }}
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Profile;


import React from "react";
import Navbar from "../components/Navbar"; // Adjust path if needed

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {
    return (
      <>
        <Navbar />
        <p className="text-center mt-10 text-red-500">Not logged in.</p>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow text-black bg-white">
        <h2 className="text-2xl font-bold mb-4">👤 Your Profile</h2>
        <p><strong>Name:</strong> {user.fullName || user.name || "N/A"}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>

        <button
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => {
            localStorage.removeItem("loggedInUser");
            localStorage.removeItem("cart");
            localStorage.removeItem("wishlist");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Profile;
