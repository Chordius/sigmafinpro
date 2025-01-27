import React, { useState } from 'react';
import axios from 'axios';

var error = error

export default function LoginForm({ onClose }) {
  const [loginError, setLoginError] = useState(null);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the browser's default behavior

    try {
      console.log('Submitted data:', formData); // Log form data
      
      // Make the POST request
      const response = await axios.post("http://localhost:3000/account/login", formData);
      
      if (response && response.data) {
        // Login successful, handle success case
        const accountData = response.data;
        localStorage.setItem('user', JSON.stringify(accountData));
        console.log("Login successful:", accountData);
  
        // Reset form and close modal
        setFormData({
          username: '',
          password: '',
        });
        onClose(); // Close the login modal
      } else {
        // Login failed, handle failure case
        console.log("Login failed, no data received");
        setLoginError("Login failed. Please check your credentials.");
        error = true;
      }
    } catch (err) {
      console.error("Error during login:", err);
      setLoginError("An error occurred during login. Please try again.");
      error = true; // Set error flag
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-black">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      { loginError &&
        <div className='bg-red-200 w-96 h-auto py-4 text-center -z-10 -translate-y-3 justify-center rounded-md border-0'>
          <p className="text-red-500 text-sm mt-2">{loginError}</p>
        </div>
      }
    </div>
  );
}