# Quizzy - Role-Based Access Control (RBAC) Quiz Application

## Overview

**Quizzy** is a web-based quiz application that allows users to take quizzes, view results, and for administrators to create and manage quizzes. The application implements **Authentication**, **Authorization**, and **Role-Based Access Control (RBAC)** to ensure different levels of access and functionality for users, moderators, and administrators.

- **QuizCreator**: Can create, manage, and delete quizzes.
- **Users**: Can attempt quizzes and view their results.

The app is built using **React** for the frontend and **Node.js** with **Express** for the backend, along with **MongoDB** for data storage.

## Features

- **Authentication**: Users can register, log in, and log out securely.
- **Authorization**: Role-based access to different routes depending on user roles.
- **Quiz Management**: Admins can create, update, and delete quizzes.
- **Quiz Attempt**: Users can attempt quizzes, answer questions, and submit answers.
- **Result Calculation**: Upon quiz submission, users receive their score and correct answers.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Authorization**: Role-Based Access Control (RBAC)

## Installation

###  Clone the repository

```bash
git clone https://github.com/Shubhamsk2000/quizzy
cd quizzy
npm install

```
## Environment Variables .env file
- **Create a .env file** in the root of the backend directory and add the following environment variables:

MONGO_URI=<your-mongodb-uri>

JWT_SECRET=<your-jwt-secret>

# Quizzy API Documentation

## Authentication & Authorization

### 1. **POST /api/auth/register**

- **Description**: Register a new user (User/Admin/Moderator).
- **Request Body**:

    ```json
    {
      "username": "user123",
      "email": "user@example.com",
      "password": "password123",
      "role": "user"  // (user | moderator | admin)
    }
    ```

- **Response**:

    ```json
    {
      "message": "User registered successfully"
    }
    ```

### 2. **POST /api/auth/login**

- **Description**: Log in and receive a JWT token.
- **Request Body**:

    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```

- **Response**:

    ```json
    {
      "token": "jwt_token_here"
    }
    ```

## Quiz Management (Admin & Moderator)

### 1. **GET /api/quiz**

- **Description**: Get all quizzes. Accessible by Admin and Moderator.
- **Response**:

    ```json
    [
      {
        "quizId": "12345",
        "title": "General Knowledge Quiz",
        "description": "A fun quiz to test your general knowledge.",
        "questions": [
          {
            "question": "What is the capital of France?",
            "options": ["Paris", "London", "Berlin"]
          }
        ]
      }
    ]
    ```

### 2. **POST /api/quiz**

- **Description**: Create a new quiz. Accessible by Admin only.
- **Request Body**:

    ```json
    {
      "title": "New Quiz",
      "description": "A new quiz on technology.",
      "questions": [
        {
          "question": "What is React?",
          "options": ["A library", "A framework", "A language"]
        }
      ]
    }
    ```

- **Response**:

    ```json
    {
      "message": "Quiz created successfully",
      "quizId": "123456"
    }
    ```

### 3. **PUT /api/quiz/:id**

- **Description**: Update an existing quiz. Accessible by Admin only.
- **Request Body**:

    ```json
    {
      "title": "Updated Quiz",
      "description": "An updated description for the quiz.",
      "questions": [
        {
          "question": "What is Node.js?",
          "options": ["A runtime", "A library", "A database"]
        }
      ]
    }
    ```

- **Response**:

    ```json
    {
      "message": "Quiz updated successfully"
    }
    ```

### 4. **DELETE /api/quiz/:id**

- **Description**: Delete a quiz. Accessible by Admin only.
- **Response**:

    ```json
    {
      "message": "Quiz deleted successfully"
    }
    ```

## Attempt Quiz (User, Moderator)

### 1. **GET /api/quiz/:id**

- **Description**: Get a specific quiz by ID. Accessible by Admin, Moderator, and User.
- **Response**:

    ```json
    {
      "quizId": "12345",
      "title": "General Knowledge Quiz",
      "description": "A fun quiz to test your general knowledge.",
      "questions": [
        {
          "question": "What is the capital of France?",
          "options": ["Paris", "London", "Berlin"]
        }
      ]
    }
    ```

### 2. **POST /api/result**

- **Description**: Submit quiz answers and calculate results. Accessible by User and Moderator.
- **Request Body**:

    ```json
    {
      "quizId": "12345",
      "answers": [0, 1, 2]  // Array of selected option indices
    }
    ```

- **Response**:

    ```json
    {
      "message": "Result submitted successfully",
      "result": {
        "participant": "user12345",
        "quizId": "12345",
        "score": 50,
        "totalQuestions": 3,
        "correctAnswers": 2
      }
    }
    ```

---

## Example of API Request/Response

### POST /api/result

**Request**:

```json
{
  "quizId": "674e08fb2eb1ba274f365eca",
  "answers": [0, 1]
}
