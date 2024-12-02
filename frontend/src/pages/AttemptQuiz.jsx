import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AttemptQuiz = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`https://quizzy-jkv5.vercel.app/api/quiz/${quizId}`, {
          headers: { "x-auth-token": `${token}` },
        });
        setQuiz(res.data);
        setAnswers(new Array(res.data.questions.length).fill(null));
      } catch (err) {
        console.error("Error fetching quiz:", err);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleAnswerChange = (questionIndex, optionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = optionIndex;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://quizzy-jkv5.vercel.app/api/result`,
        { quizId, answers },
        {
          headers: { "x-auth-token": `${token}` },
        }
      );
      setResultData(response.data);
      setShowResult(true);
    } catch (err) {
      console.error("Error submitting quiz:", err);
      alert("Failed to submit quiz. Please try again.");
    }
  };

  const closeResultModal = () => {
    setShowResult(false);
    navigate("/dashboard");
  };

  if (!quiz) return <div className="p-6">Loading quiz...</div>;

  return (
    <div className="p-6 mt-16">
      <h1 className="mb-4 text-2xl font-bold">{quiz.title}</h1>
      <p className="mb-6">{quiz.description}</p>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        {quiz.questions.map((question, questionIndex) => (
          <div key={questionIndex} className="mb-4">
            <h3 className="font-semibold">{`Q${questionIndex + 1}: ${question.question}`}</h3>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center mt-2">
                <input
                  type="radio"
                  name={`question${questionIndex}`}
                  value={optionIndex}
                  checked={answers[questionIndex] === optionIndex}
                  onChange={() => handleAnswerChange(questionIndex, optionIndex)}
                  className="mr-2"
                />
                <label>{option}</label>
              </div>
            ))}
          </div>
        ))}
        <button
          type="button"
          onClick={handleSubmit}
          className="px-6 py-2 bg-[#55d87a] text-white rounded hover:bg-green-600 transition duration-300"
        >
          Submit Quiz
        </button>
      </form>

      {showResult && resultData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded shadow-lg w-96">
            <h2 className="mb-4 text-xl font-semibold">Quiz Result</h2>
            <p className="mb-2">Message: {resultData.message}</p>
            <p className="mb-2">Participant ID: {resultData.result.participant}</p>
            <p className="mb-2">Quiz ID: {resultData.result.quizId}</p>
            <p className="mb-2">
              Score: {resultData.result.score}/{resultData.result.totalQuestions}
            </p>
            <p className="mb-2">
              Correct Answers: {resultData.result.correctAnswers}
            </p>
            <button
              onClick={closeResultModal}
              className="px-6 py-2 mt-4 bg-[#55d87a] text-white rounded hover:bg-green-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttemptQuiz;
