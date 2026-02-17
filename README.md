<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Experience Evaluator

An AI-powered feedback collection and analysis platform built with React, TypeScript, and Google's Gemini AI.

## Features

- 🤖 **AI Form Generation**: Automatically create feedback forms from simple prompts
- 📊 **Analytics Dashboard**: Visualize responses with charts and graphs
- ✨ **AI Summarization**: Get instant AI-powered insights from feedback data
- 💾 **Local Storage**: All data stored locally in the browser
- 🎨 **Modern UI**: Beautiful, responsive interface

## Run Locally

**Prerequisites:** Node.js (v16 or higher)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Priyanshu8008s/feedback_collector.git
   cd feedback_collector
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up your Gemini API key:**
   
   Create a `.env.local` file in the project root:
   ```bash
   touch .env.local
   ```
   
   Add your Gemini API key to the file:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```
   
   **Get your API key:**
   - Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Click "Create API Key"
   - Copy and paste it into your `.env.local` file

4. **Run the app:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000`

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Routing**: React Router
- **Charts**: Recharts
- **AI**: Google Gemini 2.5 Flash
- **Build Tool**: Vite
- **Styling**: CSS

## Usage

1. **Login** with the demo account
2. **Create a form** using the AI generator or manually
3. **Share** the form link to collect responses
4. **Analyze** responses with AI-powered insights

## License

MIT
