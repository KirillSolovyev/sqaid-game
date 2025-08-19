# Sqaid Game

An elimination chat where a human player competes against 5 AI opponents. The goal is to outlast AI players through discussion and voting rounds to win the ultimate prize.

## 🎯 About

This project is an experimental exploration of AI-human interaction in competitive scenarios. Players engage in timed discussion rounds where they must convince others not to eliminate them, while simultaneously deciding who to vote out.

**Game Rules:**

- 6 players total: 1 human + 5 AI players
- 3 elimination rounds maximum
- Each round has discussion and voting phases
- Players must survive elimination to win
- AI players have distinct personalities and strategies

## 🛠 Technical Stack

- **Frontend Framework:** React 19 with TypeScript
- **Build Tool:** Vite 7
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS 4
- **AI Integration:** Vercel AI SDK with multiple providers

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- API keys for AI services

### Environment Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd sqaid-game
   ```

2. **Navigate to frontend directory:**

   ```bash
   cd frontend
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up environment variables:**

   Create a `.env` file in the `frontend` directory with the following variables:

   ```env
   VITE_OPEN_AI_API_KEY=your_openai_api_key_here
   VITE_GEMINI_API_KEY=your_google_ai_api_key_here
   VITE_GROK_API_KEY=your_grok_ai_api_key_here
   ```

   **Getting API Keys:**

   - **OpenAI API Key:** Sign up at [OpenAI Platform](https://platform.openai.com/) and generate an API key
   - **Google AI API Key:** Get your key from [Google AI Studio](https://aistudio.google.com/app/apikey)
   - **Grok AI API Key:** Get your key from [Grok AI](https://docs.x.ai/docs/overview)

### Running the Application

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Open your browser:**
   Navigate to `http://localhost:5173`

3. **Start playing:**
   - Type your introduction message to begin the game
   - Engage in discussions with AI players
   - Vote strategically to survive elimination rounds
   - Try to be the last player standing!

### Build for Production

```bash
npm run build
```

The built application will be in the `dist` directory.

### Additional Commands

```bash
# Run linting
npm run lint

# Format code
npm run format

# Check formatting
npm run format:check

# Preview production build
npm run preview
```

## 🏗 Project Structure

```
frontend/
├── src/
│   ├── entities/          # Core game entities (players, chat, game state)
│   ├── features/          # UI features (chat, voting, etc.)
│   ├── providers/         # Global providers (store, game runner)
│   ├── shared/           # Shared utilities and types
│   └── widgets/          # Composite UI components
├── package.json
└── vite.config.ts
```

## 🔧 Configuration

- **Round Duration:** 2 minutes per round (configurable in `src/entities/game-store/config.ts`)
- **Max Rounds:** 3 rounds maximum
- **AI Response Timeout:** Currently set to 2-3 seconds (configurable)
- **Message Length Limit:** AI responses limited to 75 words
