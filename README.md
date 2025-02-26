# Real-Time Chat Application

A modern real-time chat application built with a powerful tech stack, featuring user authentication, real-time messaging, and profile management.

## 🚀 Tech Stack

### Frontend
- **MERN** stack
- **Socket.io-client** for real-time communication
- **TailwindCSS** for styling
- **DaisyUI** for components
- **Zustand** for state management

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **MongoDB** with Mongoose
- **Socket.io** for real-time features
- **JWT** for authentication
- **Cloudinary** for image uploads

## ✨ Features

- 🔐 **User Authentication**
  - Secure signup and login
  - JWT-based session management
  - Cookie-based token storage
  
- 👤 **Profile Management**
  - Profile picture upload via Cloudinary
  - User information updates
  
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
   PORT=your_port
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
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
- `PUT /api/auth/update-profile` - Update user profile
- `GET /api/auth/check` - Check authentication status
