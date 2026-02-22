# Quick Start Guide

Get Retro Puzzle Game running in 5 minutes!

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/retro-puzzle-game.git
cd retro-puzzle-game
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The game will automatically open in your browser at `http://localhost:8000`

## Play the Game

### Controls

**Keyboard:**
- `↑` or `W` - Rotate piece
- `←` or `A` - Move left
- `→` or `D` - Move right
- `↓` or `S` - Move down
- `SPACE` - Quick drop (instant fall)
- `P` - Pause/Resume

**Mobile:**
- **Swipe Left/Right** - Move piece
- **Swipe Up** - Rotate
- **Swipe Down** - Quick drop
- **Double Tap** - Rotate

## Project Structure

```
retro-puzzle-game/
├── src/
│   ├── index.html          # Main game page
│   ├── css/
│   │   └── style.css       # Game styles
│   └── js/
│       ├── main.js         # Game start
│       ├── game.js         # Game logic
│       ├── renderer.js     # Drawing
│       ├── input.js        # Controls
│       └── pieces.js       # Game pieces
├── dist/                   # Built files (generated)
├── README.md               # Full documentation
├── CONTRIBUTING.md         # How to contribute
└── package.json            # Project config
```

## Available Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Serve production build locally
npm run serve

# Run code linter
npm run lint

# Format code with Prettier
npm run format
```

## Next Steps

### To Contribute
1. Read [CONTRIBUTING.md](CONTRIBUTING.md)
2. Check [ROADMAP.md](ROADMAP.md) for ideas
3. Pick an issue or feature to work on
4. Submit a pull request!

### To Customize
1. Edit colors in `src/css/style.css`
2. Modify game speed in `src/js/game.js`
3. Add new pieces in `src/js/pieces.js`
4. Change controls in `src/js/input.js`

### To Learn More
- [Development Guide](DEVELOPMENT.md) - Architecture and patterns
- [README](README.md) - Full documentation
- [Roadmap](ROADMAP.md) - Future features and ideas

## Troubleshooting

### Port Already in Use
If port 8000 is busy, edit `webpack.config.js`:
```javascript
port: 3000, // Change to another port
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Game Not Loading
1. Check browser console for errors (F12)
2. Ensure Node.js version 14+ (`node --version`)
3. Try clearing browser cache
4. Try a different browser

### Controls Not Working
1. Click on game canvas to give it focus
2. Test keyboard input in console
3. Check `src/js/input.js` for key mappings

## Tips for Development

### Hot Reload
Changes to files automatically reload - no need to refresh!

### Debug Mode
Add to `src/js/main.js`:
```javascript
window.DEBUG = true;
```

Then use in code:
```javascript
if (window.DEBUG) {
  console.log('Debug info:', state);
}
```

### Performance Profiling
1. Open DevTools (F12)
2. Go to Performance tab
3. Click record, play game, click stop
4. Analyze the timeline

## Common Customizations

### Change Colors
Edit `src/css/style.css` `:root` section:
```css
--primary: #ff00ff;    /* Change neon pink */
--secondary: #00ffff;  /* Change cyan */
--accent: #ffff00;     /* Change yellow */
```

### Adjust Game Speed
Edit `src/js/game.js` `calculateDropInterval()`:
```javascript
return Math.max(100, 1000 - this.level * 50);
//                  ^1000 - increase for slower
//                        ^50 - increase for difficulty faster
```

### Add New Control Key
Edit `src/js/input.js` `processInput()`:
```javascript
case key === 'q':
  this.game.togglePause();
  break;
```

## Need Help?

### Getting Stuck?
1. Check [DEVELOPMENT.md](DEVELOPMENT.md)
2. Search existing [Issues](../../issues)
3. Ask in [Discussions](../../discussions)
4. Email maintainers

### Want to Contribute?
1. Read [CONTRIBUTING.md](CONTRIBUTING.md)
2. Fork the repository
3. Create a feature branch
4. Submit a pull request!

### Found a Bug?
1. Try to reproduce it
2. Note browser and device
3. Open an issue with details
4. Include screenshot if possible

## What's Next?

- Play the game! 🎮
- Explore the code
- Try customizing colors/speed
- Join the community
- Contribute improvements

**Have fun and thanks for playing!** 🎮✨
