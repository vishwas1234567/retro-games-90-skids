/**
 * Main Entry Point
 * Initializes the game when DOM is ready
 */

// Import all game modules
import './pieces.js';
import './input.js';
import './renderer.js';
import './game.js';
import '../css/style.css';

let game;

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  game = new Game();
  console.log('🎮 Retro Puzzle Game Started!');
});

// Handle visibility change to pause game
document.addEventListener('visibilitychange', () => {
  if (document.hidden && game && !game.isGameOver) {
    if (!game.isPaused) {
      game.togglePause();
    }
  }
});

// Handle window resize
window.addEventListener('resize', () => {
  if (game && game.renderer) {
    game.renderer.setupHighDPI();
  }
});
