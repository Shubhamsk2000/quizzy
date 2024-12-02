import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [userRole, setUserRole] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserRole(decodedToken.role);
      fetchQuizzes();
    }
  }, [navigate]);

  const fetchQuizzes = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://quizzy-jkv5.vercel.app/api/quiz/', {
        headers: { "x-auth-token": `${token}` },
      });
      setQuizzes(res.data);
    } catch (err) {
      console.error('Error fetching quizzes', err);
    }
  };

  return (
    <div className="min-h-screen p-8 mt-16 bg-gray-100">
      <div className="max-w-5xl p-6 mx-auto bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">Dashboard</h1>
        {userRole === 'Admin' || userRole === 'QuizCreator' ? (
          <>
            <button
              onClick={() => navigate('/create-quiz')}
              className="px-6 py-3 bg-[#55d87a] rounded-lg hover:bg-[#4bbf6e] transition duration-200 mb-6"
            >
              Create New Quiz
            </button>
            <h2 className="mb-4 text-2xl font-semibold text-gray-700">Manage Quizzes</h2>
            <div className="space-y-4">
              {quizzes.map((quiz) => (
                <div
                  key={quiz._id}
                  className="flex items-center justify-between p-4 transition duration-200 rounded-lg shadow-md bg-gray-50 hover:bg-gray-200"
                >
                  <span className="text-lg font-medium text-gray-800">{quiz.title}</span>
                  <button
                    onClick={() => navigate(`/quiz/${quiz._id}`)}
                    className="px-4 py-2 bg-[#55d87a]  rounded-lg hover:bg-[#4bbf6e] transition duration-200"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="mb-4 text-2xl font-semibold text-gray-700">Available Quizzes</h2>
            <div className="space-y-4">
              {quizzes.map((quiz) => (
                <div
                  key={quiz._id}
                  className="flex items-center justify-between p-4 transition duration-200 rounded-lg shadow-md bg-gray-50 hover:bg-gray-200"
                >
                  <span className="text-lg font-medium text-gray-800">{quiz.title}</span>
                  <button
                    onClick={() => navigate(`/quiz/${quiz._id}`)}
                    className="px-4 py-2 bg-[#55d87a]  rounded-lg hover:bg-[#4bbf6e] transition duration-200"
                  >
                    Attempt Quiz
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
