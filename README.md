# AI Exam Notes Generator

AI Exam Notes Generator is a full-stack web application that transforms any topic into structured, exam-ready notes using Google's Gemini AI. The platform provides authentication, note history, credit-based generation, PDF export, and an intuitive modern user interface.

---

## Features

* AI-powered topic-to-notes generation using Gemini
* Google Sign-In with Firebase Authentication
* Secure JWT-based authentication
* Credit-based generation system
* Stripe payment integration
* Saved note history for authenticated users
* PDF export functionality
* Responsive React-based UI
* Markdown rendering support
* Mermaid diagram visualization
* Interactive charts using Recharts

---

## Tech Stack

### Frontend

* React 19
* Vite
* Redux Toolkit
* React Router
* Axios
* Firebase Authentication
* Tailwind CSS
* React Markdown
* Mermaid
* Recharts

### Backend

* Node.js
* Express.js 5
* MongoDB
* Mongoose
* JWT Authentication
* Google Gemini API
* Stripe
* PDFKit

---

## Project Structure

```text
AI-Exam-Notes-Generator/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   └── ...
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── index.js
│
└── README.md
```

---

## Client Overview

### Main Directories

| Directory     | Purpose                                                                               |
| ------------- | ------------------------------------------------------------------------------------- |
| `pages/`      | Application screens such as Home, Notes, History, Pricing, Login, Success, and Cancel |
| `components/` | Reusable UI components                                                                |
| `redux/`      | Global state management                                                               |
| `services/`   | API communication layer                                                               |
| `assets/`     | Static resources                                                                      |

---

## Server Overview

### Main Directories

| Directory      | Purpose                                  |
| -------------- | ---------------------------------------- |
| `controllers/` | Business logic                           |
| `routes/`      | API endpoints                            |
| `models/`      | MongoDB schemas                          |
| `services/`    | Gemini integration and external services |
| `utils/`       | Helper functions and prompt builders     |

---

## Prerequisites

Before running the project, ensure you have:

* Node.js installed
* MongoDB database connection
* Firebase project setup
* Gemini API key
* Stripe account (optional, for payments)

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-exam-notes-generator.git

cd ai-exam-notes-generator
```

### 2. Install Dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd server
npm install
```

---

## Environment Variables

### Client (`client/.env`)

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_API_URL=http://localhost:8000
```

### Server (`server/.env`)

```env
PORT=8000
MONGO_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

CLIENT_URL=http://localhost:5173
```

---

## Running the Application

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm run dev
```

The application will be available at:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:8000
```

---

## Available Scripts

### Client

```bash
npm run dev
```

Start Vite development server.

```bash
npm run build
```

Create production build.

```bash
npm run preview
```

Preview production build.

```bash
npm run lint
```

Run ESLint checks.

### Server

```bash
npm run dev
```

Start Express server using Nodemon.

---

## Application Workflow

1. User signs in using Google Authentication.
2. User profile is created or retrieved.
3. User enters a topic for note generation.
4. Backend generates notes using Gemini AI.
5. Generated notes are stored in MongoDB.
6. Notes are rendered with Markdown, Mermaid diagrams, and charts.
7. User can revisit previous notes from history.
8. User can export notes as PDF.

---



## Author

**Jash Bheda**

Built with React, Node.js, MongoDB, and Gemini AI.
