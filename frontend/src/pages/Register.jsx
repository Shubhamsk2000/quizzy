import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import registerImg from '../assets/register.svg';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email:'',
    password: '',
    role: 'Participant',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/auth/register', formData);
      alert('Registration successful! You can now log in.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen my-8 bg-gray-100">
      <div className="flex w-full max-w-4xl overflow-hidden transition-all duration-200 bg-white rounded-lg shadow-lg hover:shadow-2xl ">

        <div
          className="hidden w-1/2 bg-center bg-cover md:block"
          style={{
            backgroundImage: `url(${registerImg})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>


        <div className="w-full p-8 md:w-1/2">
          <h1 className="mb-4 text-3xl font-bold text-center text-gray-800">Create an Account</h1>
          <p className="mb-6 text-center text-gray-500">Register to get started</p>
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block font-semibold text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
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

            <div>
              <label className="block font-semibold text-gray-700">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="Participant">Participant</option>
                <option value="QuizCreator">Quiz Creator</option>
              </select>
            </div>


            {error && <p className="text-sm text-red-500">{error}</p>}


            <button
              type="submit"
              className="w-full py-3 font-semibold  transition rounded-md bg-[#55d87a] hover:bg-[#45c76c]"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
