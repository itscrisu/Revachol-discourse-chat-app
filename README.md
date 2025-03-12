# Revachol Discourse: Psychic Communications

A stylized real-time chat application inspired by the world of Disco Elysium, featuring psychological dialogues, detective aesthetics, and mind-to-mind communications.

![Revachol Discourse](frontend/src/assets/disco-chat-icon.svg)

## 🧠 Overview

Revachol Discourse is not just a chat application - it's a journey through the psychological landscape of detectives and thinkers. Inspired by the award-winning game Disco Elysium, this application creates an immersive experience where conversations feel like exchanges between complex minds navigating a world of intrigue and self-discovery.

## 🚀 Tech Stack

### Frontend
- **React** with TypeScript
- **Tailwind CSS** for styling with a custom Disco Elysium aesthetic
- **Socket.io-client** for real-time communication
- **Zustand** for state management

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **Prisma** for database interactions
- **Socket.io** for real-time features
- **JWT** for authentication

## ✨ Features

- 🧠 **Psychological Identity Management**
  - Create and modify your detective's mind
  - Custom avatars generated based on personality
  - Immersive authentication experience
  
- 💬 **Psychic Communications**
  - Real-time messaging with a Disco Elysium aesthetic
  - Online consciousness indicators
  - Mind-to-mind dialogue history

- 🎭 **Character-Driven Experience**
  - Each interaction styled like a dialogue from the game
  - Atmospheric UI with distinctive color schemes and effects
  - Unique profiles reflecting different character archetypes

## 🛠️ Setup and Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/revachol-discourse
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

## 📊 Using Demo Data

The application includes ready-to-use demo data for development and testing purposes. These demo conversations and messages feature characters from the Disco Elysium universe.

### Available Demo Data

1. **DUMMY_CONVERSATIONS**: Sample conversation entries with character names and profile pictures from the Disco Elysium universe.
2. **DUMMY_MESSAGES**: Sample dialogue exchanges styled like in-game conversations.

### Activating Demo Data (Development Mode)

We've provided an easy way to toggle between real API calls and demo data during development:

1. **Using Demo Conversations**:
   
   Open `frontend/src/hooks/useGetConversations.ts` and modify the following section:
   
   ```typescript
   // DEVELOPMENT MODE: Uncomment these lines to use dummy data
   // and comment out the API call below
   
   setConversations(DUMMY_CONVERSATIONS as ConversationType[]);
   setLoading(false);
   return;
   
   // PRODUCTION MODE: Comment out the above and uncomment below
   // ...API call code...
   ```

2. **Using Demo Messages**:
   
   Similarly, in `frontend/src/hooks/useGetMessages.ts`:
   
   ```typescript
   // DEVELOPMENT MODE: Uncomment these lines to use dummy data
   // and comment out the API call below
   
   setMessages(DUMMY_MESSAGES as MessageType[]);
   setLoading(false);
   return;
   
   // PRODUCTION MODE: Comment out the above and uncomment below
   // ...API call code...
   ```

3. **Fallback Mode** (already active):
   
   If you don't modify the code as described above, the application will still automatically use the dummy data if the API calls fail.

### Extending the Demo Data

You can easily extend the demo data by modifying the files in `frontend/src/data/dummy.ts`:

```typescript
// Add more conversations:
export const DUMMY_CONVERSATIONS = [
  // Your existing entries...
  {
    id: 6,
    fullName: "Cuno",
    profilePic: "https://api.dicebear.com/7.x/pixel-art/svg?seed=cuno&backgroundColor=7c3030",
    emoji: "🔪",
  },
  // More entries...
];

// Add more messages:
export const DUMMY_MESSAGES = [
  // Your existing messages...
  {
    id: 11,
    fromMe: false,
    body: "Cuno doesn't care! *spits*",
  },
  // More messages...
];
```

## 📝 API Endpoints

### Consciousness Management
- `POST /api/auth/signup` - Create new detective identity
- `POST /api/auth/login` - Recall existing consciousness
- `POST /api/auth/logout` - Abandon consciousness
- `GET /api/auth/me` - Examine self
- `PUT /api/auth/profile` - Modify identity

### Psychic Messages
- `GET /api/messages/conversations` - Get psychic connections
- `GET /api/messages/:id` - Retrieve mind-to-mind communications
- `POST /api/messages/send/:id` - Transmit thought

## 🎨 Design Philosophy

The application embodies the neo-noir, retrofuturistic aesthetic of Disco Elysium, with:

- Rich amber and red color schemes
- Typography that evokes both bureaucracy and mysticism
- Visual effects that mimic the game's unique art style
- Terminology that blends psychological concepts with detective work

---

*"In this place, there are no stars above, but there is light—pale and pretty, prickling the black. The mirror-light from our consciousness-bubbles, thousands upon thousands, shimmering."* — Revachol Discourse

