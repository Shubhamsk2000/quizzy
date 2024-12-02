import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateQuiz from './pages/CreateQuiz';
import AttemptQuiz from './pages/AttemptQuiz';
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={< LandingPage/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/quiz/:quizId" element={<AttemptQuiz />} />
      </Routes>
    </Router>
  );
};

export default App;
