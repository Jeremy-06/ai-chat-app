# 🤖 Simple AI Chat Bot

An experimental chatbot application built with Node.js and Express, using Google's Gemini AI model. This is a learning project to explore AI integration and basic web development.

## ✨ Features

- 💬 **Basic Chat Interface**: Simple web-based chat with an AI bot
- 🤖 **AI Integration**: Uses Google Gemini AI for responses  
- 📱 **Responsive Design**: Works on desktop and mobile
- 🔧 **Learning Project**: Great for understanding API integration
- 🔒 **Environment Variables**: Keeps API keys secure

## 🚀 Quick Start

### Prerequisites

You'll need:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A Google AI Studio API key (free to get)

### 1. Clone the Repository

```bash
git clone https://github.com/Jeremy-06/ai-chat-app.git
cd ai-chat-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Get Your Google AI API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the generated API key

### 4. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
# Create .env file
touch .env
```

Add your API key to the `.env` file:

```env
GOOGLE_API_KEY=your_google_ai_api_key_here
PORT=3000
```

> ⚠️ **Important**: Never commit your `.env` file to version control. It's already included in `.gitignore`.

### 5. Run the Application

Make sure your project has these files:
- `server.js` (main server file)
- `public/index.html` (chat interface)
- `package.json` (dependencies)

Then start the server:

```bash
npm start
```

The chatbot will be available at: **http://localhost:3000**

## 🛠️ How It Works

This is a simple experiment that:
1. Takes user messages from a web form
2. Sends them to Google's Gemini AI
3. Displays the AI's response back to the user

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_API_KEY` | Your Google AI Studio API key | Yes |
| `PORT` | Port number for the server | No (defaults to 3000) |

## 📁 Project Structure

```
ai-chat-app/
├── server.js             # Main server file
├── package.json          # Project dependencies
├── .env                  # Environment variables (not in git)
├── .gitignore            # Git ignore rules
├── README.md             # This file
└── public/
    └── index.html        # Frontend UI
```

## 🎨 What You Can Learn

This project demonstrates:
- How to integrate with AI APIs
- Basic Express.js server setup
- Frontend-backend communication
- Environment variable usage
- Simple web interface design

## 🐛 Common Issues

**"Google API key missing"**
- Make sure your `.env` file exists
- Check that `GOOGLE_API_KEY` is spelled correctly
- Restart the server after adding the key

**"Cannot GET /"**
- Make sure `index.html` is in the `public/` folder

**Port already in use**
- Change the PORT in your `.env` file to something else like 3001

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

This is an experimental project, but feel free to:
1. Fork it and try your own modifications
2. Submit issues if you find bugs
3. Share improvements via pull requests

---

⭐ **A simple chatbot experiment by [Jeremy-06](https://github.com/Jeremy-06)**
