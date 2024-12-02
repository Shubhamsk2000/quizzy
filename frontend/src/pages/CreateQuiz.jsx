import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    questions: [],
  });
  const [question, setQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
  });

  const handleInputChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (e, index) => {
    const updatedOptions = [...question.options];
    updatedOptions[index] = e.target.value;
    setQuestion({ ...question, options: updatedOptions });
  };

  const handleCorrectAnswerChange = (e) => {
    setQuestion({ ...question, correctAnswer: parseInt(e.target.value) });
  };

  const addQuestion = () => {
    if (question.question.trim() && question.options.every((opt) => opt.trim())) {
      setQuizData({
        ...quizData,
        questions: [...quizData.questions, question],
      });
      setQuestion({ question: "", options: ["", "", "", ""], correctAnswer: 0 });
    } else {
      alert("Please fill out all question fields and options.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const createdBy = localStorage.getItem("userId");
      const finalQuizData = { ...quizData, createdBy };

      await axios.post("https://quizzy-jkv5.vercel.app/api/quiz", finalQuizData, {
        headers: { "x-auth-token": `${token}` },
      });
      alert("Quiz created successfully!");
      navigate('/dashboard');
    } catch (err) {
      console.error("Failed to create quiz:", err.response?.data?.message);
      alert("Failed to create quiz. Check console for more details.");
    }
  };

  return (
    <div className="max-w-4xl p-8 mx-auto mt-16">
      <h1 className="mb-6 text-3xl font-bold text-center text-[#55d87a]">Create Your Quiz</h1>
      <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-white rounded-lg shadow-lg">
        <div>
          <label className="block text-lg font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={quizData.title}
            onChange={handleInputChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#55d87a] transition"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={quizData.description}
            onChange={handleInputChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#55d87a] transition"
          ></textarea>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">Question</label>
          <input
            type="text"
            name="question"
            value={question.question}
            onChange={handleQuestionChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#55d87a] transition"
          />
        </div>

        <div className="mt-4 space-y-4">
          {question.options.map((option, index) => (
            <div key={index}>
              <label className="block text-lg font-medium text-gray-700">{`Option ${index + 1}`}</label>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(e, index)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#55d87a] transition"
              />
            </div>
          ))}
        </div>

        <div className="mt-4">
          <label className="block text-lg font-medium text-gray-700">Correct Answer (Index)</label>
          <input
            type="number"
            name="correctAnswer"
            value={question.correctAnswer}
            onChange={handleCorrectAnswerChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#55d87a] transition"
            min="0"
            max={question.options.length - 1}
          />
        </div>

        <div className="flex items-center justify-between mt-6">
          <button
            type="button"
            onClick={addQuestion}
            className="px-6 py-3 text-white bg-[#55d87a] rounded-md font-medium hover:bg-[#45c76c] transition"
          >
            Add Question
          </button>
          <button
            type="submit"
            className="px-6 py-3 text-white bg-[#55d87a] rounded-md font-medium hover:bg-[#45c76c] transition"
          >
            Submit Quiz
          </button>
        </div>
      </form>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-[#55d87a]">Questions Added:</h2>
        <ul className="pl-6 list-disc">
          {quizData.questions.map((q, index) => (
            <li key={index} className="mb-4">
              <p className="text-lg font-medium">{`Q${index + 1}: ${q.question}`}</p>
              <ul className="pl-6 space-y-2 list-decimal">
                {q.options.map((opt, i) => (
                  <li key={i} className="text-gray-600">{opt}</li>
                ))}
              </ul>
              <p className="text-lg font-medium text-gray-800">
                <strong>Correct Answer: </strong> Option {q.correctAnswer + 1}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateQuiz;
