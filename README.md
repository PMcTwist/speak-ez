# Speak-EZ

A full-stack real-time chat application built with **React**, **Node.js**, and **Socket.IO**.

Speak-EZ began as a learning project inspired by a FreeCodeCamp tutorial and has since served as a platform for exploring modern web development concepts, real-time communication, and client/server architecture.

---

# Overview

Real-time communication applications introduce many of the core concepts used in modern web development, including client/server communication, state management, authentication, and event-driven programming.

Speak-EZ was developed as a hands-on project to better understand these concepts while gaining practical experience with React and Node.js.

The project demonstrates the foundations of a real-time messaging platform while providing a solid base for future enhancements.

---

# Features

- Real-time messaging using Socket.IO
- Multiple chat rooms
- User join/leave notifications
- React front-end
- Node.js backend
- Event-driven communication
- Responsive web interface

---

# Technologies

## Frontend

- React
- JavaScript (ES6)
- HTML5
- CSS3

## Backend

- Node.js
- Express
- Socket.IO

---

# Architecture

```
        Browser
           │
           ▼
     React Frontend
           │
    Socket.IO Client
           │
──────── WebSocket ────────
           │
    Socket.IO Server
           │
        Node.js
```

---

# Repository Structure

```
Speak-EZ/

client/
    React application

server/
    Express & Socket.IO server

services/
    Client services

utils/
    Shared helper functions

README.md
```

---

# Installation

## Requirements

- Node.js 18+
- npm

Clone the repository

```bash
git clone https://github.com/PMcTwist/Speak-EZ.git
```

Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

---

# Running

Start the backend

```bash
cd server
npm start
```

Start the frontend

```bash
cd client
npm start
```

Open your browser and connect to the local development server.

---

# What I Learned

This project provided practical experience with:

- React component architecture
- State management
- Client/server communication
- Socket.IO
- Event-driven programming
- REST concepts
- Frontend development
- Backend development
- Debugging asynchronous applications

---

# Future Improvements

Potential enhancements include:

- User authentication
- Persistent chat history
- Database integration
- Private messaging
- Image and file sharing
- User profiles
- Online status indicators
- Message reactions
- Typing indicators
- Docker deployment
- End-to-end encryption
- AI-assisted chat moderation
- AI-powered conversation summaries

---

# Acknowledgements

This project was originally inspired by and built while following the excellent tutorial created by **FreeCodeCamp**.

The tutorial provided the foundation for understanding React, Socket.IO, and real-time application development. This repository has been retained as part of my software engineering portfolio because it represents an important step in learning full-stack web development.

<p>https://www.freecodecamp.org/news/build-a-realtime-chat-app-with-react-express-socketio-and-harperdb/#how-to-get-messages-from-harperdb</p>

---

# Why This Repository Exists

Every engineer has projects that represent milestones in their learning journey.

Speak-EZ demonstrates my progression into full-stack development and real-time web applications while providing a foundation for future experimentation and continued learning.

---

# Author

## Patrick Maynard

Software & Automation Engineer


LinkedIn: https://www.linkedin.com/in/pat-maynard-b97a05b5/
Email: patmaynard452@gmail.com

---

# License

GPL-3.0 License
