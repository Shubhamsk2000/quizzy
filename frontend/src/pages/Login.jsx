import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loginImg from '../assets/login.svg'; // Import your image correctly

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://quizzy-jkv5.vercel.app/api/auth/login', {
        email: formData.username,
        password: formData.password,
      });
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to log in.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl overflow-hidden transition-all duration-200 bg-white rounded-lg shadow-lg hover:shadow-2xl">
        <div
          className="hidden w-1/2 bg-center bg-cover md:block"
          style={{ backgroundImage: `url(${loginImg})` }} 
        ></div>

        <div className="w-full p-8 md:w-1/2">
          <h1 className="mb-4 text-3xl font-bold text-center text-gray-800">Welcome Back!</h1>
          <p className="mb-6 text-center text-gray-500">Login to your account</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold text-gray-700">Email</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 font-semibold text-black transition rounded-md bg-[#55d87a] hover:bg-[#45c76c]"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-500 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
