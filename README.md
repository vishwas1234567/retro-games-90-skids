# Retro Puzzle Game

A 90's-style puzzle game built with vanilla JavaScript and HTML5 Canvas. This is a community-driven open source project - contributions welcome!

## 🎮 Features

- Classic 90's puzzle gameplay mechanics
- Smooth animations and responsive controls
- High score tracking
- Progressive difficulty levels
- Mobile-friendly touch controls
- No external game framework dependencies

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ and npm (for development tools only)
- Modern web browser with HTML5 Canvas support

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/retro-puzzle-game.git
cd retro-puzzle-game
```

2. **Install dependencies** (development only)
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:8000` in your web browser.

### Build for Production

```bash
npm run build
```

Output files will be in the `dist/` directory.

## 📖 How to Play

- **Arrow Keys / WASD**: Move pieces
- **Space**: Rotate piece
- **Mouse**: Click and drag on mobile
- **Touch**: Swipe gestures on mobile devices

Clear rows and columns to score points. The game speeds up as your score increases!

## 🎯 Game Mechanics

### Core Features
- Dynamic piece generation
- Real-time score calculation
- Collision detection
- Line clearing with animations
- Progressive difficulty scaling

### Scoring System
- Single line: 100 points
- Double line: 300 points
- Triple line: 500 points
- Quad line: 1000 points

## 📁 Project Structure

```
retro-puzzle-game/
├── src/
│   ├── index.html          # Main HTML file
│   ├── css/
│   │   └── style.css       # Game styling
│   ├── js/
│   │   ├── main.js         # Game initialization
│   │   ├── game.js         # Game logic
│   │   ├── renderer.js     # Canvas rendering
│   │   ├── input.js        # Input handling
│   │   └── pieces.js       # Game pieces/blocks
│   └── assets/
│       └── sounds/         # Game sound effects (optional)
├── dist/                   # Built files (generated)
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── pull_request_template.md
├── package.json
├── webpack.config.js
├── .gitignore
├── LICENSE
└── CONTRIBUTING.md
```

## 🛠 Development

### Available Scripts

```bash
npm run dev        # Start development server with hot reload
npm run build      # Build for production
npm run serve      # Serve production build locally
npm run lint       # Run code linter
npm run format     # Format code with Prettier
```

### Architecture

The game uses a modular architecture:

- **Game Engine**: Core game loop and state management
- **Renderer**: Canvas drawing and animations
- **Input Handler**: Keyboard, mouse, and touch input processing
- **Pieces Manager**: Game piece generation and manipulation

## 🎨 Customization

### Change Game Colors

Edit `src/css/style.css`:
```css
:root {
  --primary-color: #ff00ff;    /* Neon purple */
  --secondary-color: #00ffff;   /* Cyan */
  --accent-color: #ffff00;      /* Yellow */
  --bg-color: #000000;          /* Black */
}
```

### Adjust Game Speed

Edit `src/js/game.js`:
```javascript
const BASE_SPEED = 800; // milliseconds per piece drop
const SPEED_INCREASE = 50; // decrease per level
```

### Create New Piece Types

Add to `src/js/pieces.js` to design custom shapes and mechanics.

## 📊 Performance

- Optimized canvas rendering
- Efficient collision detection algorithms
- RequestAnimationFrame for smooth 60 FPS gameplay
- Minimal memory footprint

## 🤝 Contributing

We love contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Areas We Need Help With

- 🎮 New game mechanics and features
- 🐛 Bug fixes and improvements
- 🎨 Visual enhancements and themes
- 📱 Mobile optimization
- 🔊 Sound effects and music
- 📚 Documentation
- ♿ Accessibility improvements

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- Inspired by classic 90's puzzle games
- Community contributions and feedback
- Open source game development community

## 📞 Support

Found a bug? Have a feature request? [Open an issue](../../issues/new/choose)

## 🔗 Links

- [Live Demo](https://example.com) (add your demo URL)
- [Discord Community](https://discord.gg/yourinvite) (optional)
- [Twitter](https://twitter.com/yourhandle) (optional)

---

**Made with ❤️ by the community**
