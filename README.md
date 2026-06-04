# AI Exam Notes Generator

An AI-powered web application that generates structured exam notes from user-provided topics using Google's Gemini AI.

## Features

* AI-generated exam notes
* Google Authentication
* User history tracking
* Responsive UI
* MongoDB database integration
* JWT Authentication

## Tech Stack

### Frontend

* React.js
* Vite
* Redux Toolkit
* Firebase Authentication

### Backend

* Node.js
* Express.js
* MongoDB
* Gemini API

## Installation

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm start
```

## Environment Variables

Create `.env` files for both client and server.

### Client

```env
VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
```

### Server

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

## Author

Jash Bheda
