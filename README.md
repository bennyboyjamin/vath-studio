# Vath Studio

**Vath Studio** - An AI music generator web application with full Lao language support.

## 🎵 Features

- ✨ **AI Music Generation**: Create full songs from text prompts
- 🌐 **Multilingual Support**: Full support for Lao and English
- 🎤 **Voice Cloning**: Generate music with your own voice
- 📥 **Download & Share**: Export songs in high quality
- 🎛️ **Song Editing**: Web-based DAW for remixing
- 💾 **User Dashboard**: Manage your generated songs

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/bennyboyjamin/vath-studio.git
cd vath-studio

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📁 Project Structure

```
vath-studio/
├── src/
│   ├── components/       # React components
│   ├── pages/           # Page components
│   ├── i18n/            # Internationalization
│   │   └── locales/     # Translation files (lo.json, en.json)
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS config
├── postcss.config.js    # PostCSS config
├── package.json
└── README.md
```

## 🎨 Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **i18next & react-i18next** - Internationalization
- **Tone.js** - Web Audio API
- **React Icons** - Icon library

### Styling
- Dark theme by default
- Gradient UI elements
- Glass-morphism effects
- Responsive design

## 🌍 Internationalization

Currently supported languages:
- 🇱🇦 Lao (ພາສາລາວ)
- 🇬🇧 English

### Adding a New Language

1. Create a new file in `src/i18n/locales/` (e.g., `th.json` for Thai)
2. Add translations following the same structure as `lo.json`
3. Update `src/i18n/config.js` to include the new language

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
```

## 🔗 API Integration

The app is configured to proxy API calls to `http://localhost:5000`

Update `vite.config.js` to point to your backend:

```js
proxy: {
  '/api': {
    target: 'YOUR_API_URL',
    changeOrigin: true
  }
}
```

## 📦 Build for Production

```bash
# Build the app
npm run build

# Preview the build
npm run preview
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for commercial purposes.

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ for Lao music creators**
