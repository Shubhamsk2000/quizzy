import React from "react";

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-r from-[#66b266] to-[#4caf50] min-h-screen text-white">
      <section className="flex items-center justify-center h-screen text-center bg-center bg-cover">
        <div className="px-8 py-12 bg-black rounded-lg bg-opacity-60">
          <h1 className="mb-4 text-5xl font-bold">Welcome to Quizzy</h1>
          <p className="mb-6 text-xl">Your one-stop platform for creating and taking engaging quizzes</p>
        
        </div>
      </section>

      <section className="py-20 text-center bg-white">
        <h2 className="mb-10 text-3xl font-bold">Features</h2>
        <div className="grid grid-cols-1 gap-12 px-6 md:grid-cols-3">
          <div className="bg-[#4caf50] text-black p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300">
            <h3 className="mb-4 text-2xl font-semibold">Create Quizzes</h3>
            <p>Create customized quizzes for your users with multiple question types and easy-to-use interfaces.</p>
          </div>
          <div className="bg-[#388e3c] text-black p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300">
            <h3 className="mb-4 text-2xl font-semibold">Interactive Experience</h3>
            <p>Engage users with real-time results and interactive question styles for better learning.</p>
          </div>
          <div className="bg-[#66bb6a] text-black p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300">
            <h3 className="mb-4 text-2xl font-semibold">Track Progress</h3>
            <p>Keep track of quiz scores and progress through detailed reports and analytics.</p>
          </div>
        </div>
      </section>

     

    

      <footer className="bg-[#388e3c] py-6 text-center text-white">
        <p className="mb-2">© 2024 Quizzy Platform. All rights reserved.</p>
       
      </footer>
    </div>
  );
};

export default LandingPage;
