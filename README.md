# Real-Time Chat Application

A modern real-time chat application built with a powerful tech stack, featuring user authentication, real-time messaging, and profile management.

## 🚀 Tech Stack

### Frontend
- **PERN** stack
- **Prisma** for database (with Neon)
- **Socket.io-client** for real-time communication
- **TailwindCSS** for styling
- **Shadcn/UI** for components
- **Zustand** for state management

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **MongoDB** with Mongoose
- **Socket.io** for real-time features
- **JWT** for authentication

## ✨ Features

- 🔐 **User Authentication**
  - Secure signup and login
  - JWT-based session management
  - Cookie-based token storage
  
- 💬 **Real-time Chat**
  - Instant messaging
  - Online status indicators
  - Message history

## 🛠️ Setup and Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/itscrisu/chat-app-fullstack
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file with:
   ```
   DATABASE_URL="your_database_url"
   JWT_SECRET=your_secret
   NODE_ENV=development
   DATABASE_URL_UNPOOLED="your_database_url"

   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

4. **Run the Application**
   
   Backend:
   ```bash
   npm run dev
   ```
   
   Frontend:
   ```bash
   npm run dev
   ```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Check for authenticated user

### Messages
- `GET /api/messages/conversations` - Get conversations for sidebar
- `GET /api/messages/:id` - Get messages for a conversation
- `POST /api/messages/send/:id` - Send a message

