/**
 * Input Handler Module
 * Manages keyboard, mouse, and touch input
 */

class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = {};
    this.isPressed = {};

    this.setupKeyboardListeners();
    this.setupTouchListeners();
    this.setupMouseListeners();
  }

  /**
   * Setup keyboard event listeners
   */
  setupKeyboardListeners() {
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    document.addEventListener('keyup', (e) => this.handleKeyUp(e));
  }

  /**
   * Handle keyboard down event
   */
  handleKeyDown(event) {
    const key = event.key.toLowerCase();
    const code = event.code;

    // Prevent default browser behavior for game keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(event.code)) {
      event.preventDefault();
    }

    this.keys[key] = true;
    this.keys[code] = true;

    // Prevent key repeat for certain actions
    if (!this.isPressed[key]) {
      this.isPressed[key] = true;
      this.processInput(key, code);
    }
  }

  /**
   * Handle keyboard up event
   */
  handleKeyUp(event) {
    const key = event.key.toLowerCase();
    const code = event.code;

    this.keys[key] = false;
    this.keys[code] = false;
    this.isPressed[key] = false;
  }

  /**
   * Process single key press
   */
  processInput(key, code) {
    if (!this.game || this.game.isPaused) return;

    switch (true) {
      // Rotation
      case key === 'arrowup' || code === 'ArrowUp' || key === 'w':
        this.game.rotatePiece();
        break;

      // Pause
      case key === 'p':
        this.game.togglePause();
        break;

      // Quick drop
      case key === ' ':
        this.game.quickDrop();
        break;

      // Custom actions can be added here
      default:
        break;
    }
  }

  /**
   * Check if key is currently held
   */
  isKeyPressed(key) {
    return this.keys[key] || this.keys[key.toUpperCase()];
  }

  /**
   * Process continuous input (called every frame)
   */
  update() {
    if (!this.game || this.game.isPaused) return;

    // Movement with repeat
    if (this.isKeyPressed('ArrowLeft') || this.isKeyPressed('a')) {
      this.game.movePieceLeft();
    }
    if (this.isKeyPressed('ArrowRight') || this.isKeyPressed('d')) {
      this.game.movePieceRight();
    }
    if (this.isKeyPressed('ArrowDown') || this.isKeyPressed('s')) {
      this.game.movePieceDown();
    }
  }

  /**
   * Setup touch input listeners
   */
  setupTouchListeners() {
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    canvas.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    });

    canvas.addEventListener('touchend', (e) => {
      if (e.touches.length === 0) {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndTime = Date.now();

        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        const timeDiff = touchEndTime - touchStartTime;

        const minSwipeDistance = 30;
        const maxSwipeTime = 500;

        // Only process swipe if it was quick enough
        if (timeDiff < maxSwipeTime && Math.abs(diffX) > minSwipeDistance) {
          if (diffX < 0) {
            this.game.movePieceLeft();
          } else {
            this.game.movePieceRight();
          }
        } else if (timeDiff < maxSwipeTime && diffY > minSwipeDistance) {
          this.game.quickDrop();
        } else if (timeDiff < maxSwipeTime && diffY < -minSwipeDistance) {
          this.game.rotatePiece();
        }
      }
    });

    // Double tap to rotate
    let lastTap = 0;
    canvas.addEventListener('touchend', (e) => {
      const now = Date.now();
      const timeSinceLastTap = now - lastTap;

      if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
        this.game.rotatePiece();
      }
      lastTap = now;
    });
  }

  /**
   * Setup mouse/pointer input listeners
   */
  setupMouseListeners() {
    const gameHeader = document.querySelector('.game-header');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');

    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => this.game.togglePause());
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.game.reset());
    }
  }

  /**
   * Cleanup input listeners
   */
  destroy() {
    document.removeEventListener('keydown', (e) => this.handleKeyDown(e));
    document.removeEventListener('keyup', (e) => this.handleKeyUp(e));
  }
}

// Make class globally available for backwards compatibility
window.InputHandler = InputHandler;
