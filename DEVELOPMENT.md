# Development Guide

## Project Architecture

This project uses vanilla JavaScript with HTML5 Canvas for a lightweight, dependency-free game.

### File Structure

```
src/
├── index.html          # Main HTML entry point
├── css/
│   └── style.css       # Game styles with CSS variables
└── js/
    ├── main.js         # Game initialization
    ├── game.js         # Core game engine & state
    ├── renderer.js     # Canvas rendering
    ├── input.js        # Input handling (keyboard/touch)
    └── pieces.js       # Game pieces & shapes
```

## Module System

Each JavaScript file is modular and can be understood independently:

### `pieces.js` - Game Pieces
Defines tetromino-like pieces and their properties:
- `GamePiece` class: Single falling piece with rotation/movement
- `PiecesManager` class: Manages current and next pieces
- `PIECE_SHAPES`: Rotation matrices for each piece type
- `PIECE_COLORS`: Color palette for visual distinction

### `input.js` - Input Handler
Manages all user input:
- Keyboard input with repeat prevention
- Touch gestures (swipe for movement, double-tap for rotation)
- Mouse/button clicks
- Call game methods based on input

### `renderer.js` - Game Renderer
Handles all canvas drawing:
- `clearCanvas()`: Clear canvas with black background
- `drawGrid()`: Draw faint grid for reference
- `drawBlock()`: Draw individual blocks with borders
- `drawBoard()`: Render all placed blocks
- `drawPiece()`: Render current falling piece
- `drawShadow()`: Show where piece will land
- `drawNextPiece()`: Draw preview of next piece
- `drawGameOver()` / `drawPause()`: UI overlays

### `game.js` - Game Engine
Core game logic:
- `update()`: Called every frame, updates game state
- `render()`: Calls renderer to draw current state
- `dropPiece()`: Auto-drop piece, detect collision
- `placePiece()`: Add piece to board
- `clearLines()`: Check for complete rows
- `spawnNewPiece()`: Create new falling piece
- `isColliding()`: Collision detection with board & boundaries
- `togglePause()` / `reset()`: Game state control

### `main.js` - Entry Point
Simple initialization:
- Creates game instance on DOM load
- Handles visibility changes (pause on tab switch)
- Handles window resize events

## Development Workflow

### Adding a New Game Mechanic

1. **Identify which module** handles the mechanic
   - Physics/collision → `game.js`
   - Visual feedback → `renderer.js`
   - User control → `input.js`
   - Piece behavior → `pieces.js`

2. **Example: Add gravity acceleration**
   ```javascript
   // In game.js
   calculateDropInterval() {
     const baseInterval = 1000 - this.level * 50;
     const gravityBoost = this.isPaused ? 0 : 50; // Increase fall speed
     return Math.max(100, baseInterval - gravityBoost);
   }
   ```

3. **Test the feature**
   - Run `npm run dev`
   - Test with different browsers
   - Test on mobile/touch devices

### Adding Visual Effects

1. **Create animation state** in `game.js`
   ```javascript
   this.explosionParticles = [];
   ```

2. **Update animation** in `game.js` update method
   ```javascript
   this.explosionParticles = this.explosionParticles.filter(p => {
     p.life -= deltaTime;
     return p.life > 0;
   });
   ```

3. **Render animation** in `renderer.js`
   ```javascript
   drawExplosion(particle) {
     // Draw particle effect
   }
   ```

### Adding New Input

Add to `input.js` `processInput()` method:
```javascript
case key === 'n':
  this.game.newGame();
  break;
```

## Performance Tips

1. **Canvas Rendering**
   - Minimize clearRect calls
   - Batch draw calls together
   - Use appropriate canvas size (avoid too large)

2. **Game Logic**
   - Cache collision checks
   - Limit particle count
   - Use efficient algorithms for line clearing

3. **Memory**
   - Clean up event listeners
   - Avoid creating new objects in loops
   - Reuse arrays when possible

## Debugging

### Console Logging
```javascript
console.log("[v0] Game state:", {
  score: this.score,
  level: this.level,
  pieceType: this.currentPiece.type
});
```

### Canvas Debugging
Add visual overlays to debug:
```javascript
// In renderer.js
if (DEBUG) {
  this.ctx.strokeStyle = 'red';
  this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
}
```

### Browser DevTools
- **Performance tab**: Check frame rate and bottlenecks
- **Console**: Monitor errors and logs
- **Elements**: Inspect canvas and DOM
- **Network**: Check asset loading

## Common Issues

### Low Frame Rate
1. Check collision detection efficiency
2. Reduce particle count
3. Simplify animations
4. Profile with Performance tab

### Touch Not Responding
1. Check touch event listeners in `input.js`
2. Verify canvas has touch-action CSS
3. Test with multiple browsers
4. Check event.preventDefault() calls

### Pieces Moving Too Fast/Slow
Adjust `dropInterval` calculation:
```javascript
// Slower: increase multiplier
Math.max(100, 1500 - this.level * 75);

// Faster: decrease multiplier
Math.max(100, 800 - this.level * 40);
```

## Testing Checklist

Before submitting PR:
- [ ] Runs without console errors
- [ ] Works on Chrome, Firefox, Safari
- [ ] Works on mobile (iOS/Android)
- [ ] Keyboard controls responsive
- [ ] Touch controls work (swipe, double-tap)
- [ ] Frame rate stable (60 FPS)
- [ ] No memory leaks (DevTools Memory)
- [ ] Pause/resume works
- [ ] High score persists
- [ ] Game over detection works

## Browser Compatibility

Target browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari 14+
- Chrome Mobile

## Resources

- [MDN Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
- [Touch Events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)
- [Keyboard Events](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)

## Need Help?

- Check existing issues on GitHub
- Review similar game implementations
- Ask in discussions section
- Open an issue with details and screenshots
