/**
 * Game Engine Module
 * Core game logic and state management
 */

class Game {
  constructor() {
    this.renderer = new GameRenderer();
    this.inputHandler = new InputHandler(this);
    this.piecesManager = new PiecesManager();

    // Game state
    this.board = this.initializeBoard();
    this.currentPiece = this.piecesManager.spawnNext();
    this.nextPiece = this.piecesManager.getNext();
    this.score = 0;
    this.level = 1;
    this.linesCleared = 0;
    this.bestScore = localStorage.getItem('bestScore') || 0;

    // Game control
    this.isGameOver = false;
    this.isPaused = false;
    this.gameStarted = false;

    // Timing
    this.lastDropTime = Date.now();
    this.dropInterval = this.calculateDropInterval();
    this.lastFrameTime = Date.now();

    this.updateUI();
    this.start();
  }

  /**
   * Initialize empty game board
   */
  initializeBoard() {
    const board = [];
    for (let y = 0; y < GRID_HEIGHT; y++) {
      board[y] = [];
      for (let x = 0; x < GRID_WIDTH; x++) {
        board[y][x] = 0;
      }
    }
    return board;
  }

  /**
   * Calculate drop interval based on level
   */
  calculateDropInterval() {
    return Math.max(100, 1000 - this.level * 50);
  }

  /**
   * Main game loop
   */
  start() {
    const gameLoop = () => {
      const now = Date.now();
      const deltaTime = now - this.lastFrameTime;
      this.lastFrameTime = now;

      if (!this.isGameOver) {
        this.update(deltaTime);
        this.render();
      }

      requestAnimationFrame(gameLoop);
    };

    requestAnimationFrame(gameLoop);
  }

  /**
   * Update game state
   */
  update(deltaTime) {
    if (this.isPaused) return;

    // Update input
    this.inputHandler.update();

    // Update renderer animations
    this.renderer.updateLineAnimation(deltaTime);

    // Handle piece drop
    const now = Date.now();
    if (now - this.lastDropTime >= this.dropInterval) {
      this.dropPiece();
      this.lastDropTime = now;
    }
  }

  /**
   * Render game state
   */
  render() {
    const gameState = {
      board: this.board,
      currentPiece: this.currentPiece,
      nextPiece: this.nextPiece,
    };

    this.renderer.draw(gameState);

    if (this.isPaused) {
      this.renderer.drawPause();
    }

    if (this.isGameOver) {
      this.renderer.drawGameOver(this.score);
    }
  }

  /**
   * Drop piece automatically
   */
  dropPiece() {
    this.currentPiece.moveDown();

    // Check collision
    if (this.isColliding(this.currentPiece)) {
      this.currentPiece.moveUp = this.currentPiece.moveUp || (() => this.currentPiece.y--);
      this.currentPiece.moveUp();
      this.placePiece(this.currentPiece);
      this.spawnNewPiece();
    }
  }

  /**
   * Move piece left
   */
  movePieceLeft() {
    this.currentPiece.moveLeft();
    if (this.isColliding(this.currentPiece)) {
      this.currentPiece.moveRight();
    }
  }

  /**
   * Move piece right
   */
  movePieceRight() {
    this.currentPiece.moveRight();
    if (this.isColliding(this.currentPiece)) {
      this.currentPiece.moveLeft();
    }
  }

  /**
   * Move piece down manually
   */
  movePieceDown() {
    this.dropPiece();
  }

  /**
   * Rotate piece
   */
  rotatePiece() {
    const oldShape = this.currentPiece.shape.map(row => [...row]);
    this.currentPiece.rotate();

    if (this.isColliding(this.currentPiece)) {
      // Try wall kick - move left
      this.currentPiece.moveLeft();
      if (this.isColliding(this.currentPiece)) {
        // Try wall kick - move right twice
        this.currentPiece.moveRight();
        this.currentPiece.moveRight();
        if (this.isColliding(this.currentPiece)) {
          // Revert rotation
          this.currentPiece.undoRotate();
        }
      }
    }
  }

  /**
   * Quick drop piece to bottom
   */
  quickDrop() {
    while (!this.isColliding(this.currentPiece)) {
      this.currentPiece.moveDown();
    }
    this.currentPiece.moveUp = this.currentPiece.moveUp || (() => this.currentPiece.y--);
    this.currentPiece.moveUp();
    this.placePiece(this.currentPiece);
    this.spawnNewPiece();
  }

  /**
   * Check if piece collides with board or boundaries
   */
  isColliding(piece) {
    const blocks = piece.getBlocks();
    for (const block of blocks) {
      if (block.x < 0 || block.x >= GRID_WIDTH || block.y >= GRID_HEIGHT) {
        return true;
      }
      if (block.y >= 0 && this.board[block.y]?.[block.x]) {
        return true;
      }
    }
    return false;
  }

  /**
   * Place piece on board
   */
  placePiece(piece) {
    const blocks = piece.getBlocks();
    for (const block of blocks) {
      if (block.y >= 0 && block.y < GRID_HEIGHT && block.x >= 0 && block.x < GRID_WIDTH) {
        this.board[block.y][block.x] = block.color;
      }
    }

    // Check for complete lines
    this.clearLines();
  }

  /**
   * Clear complete lines
   */
  clearLines() {
    const linesToClear = [];

    for (let y = 0; y < GRID_HEIGHT; y++) {
      let isComplete = true;
      for (let x = 0; x < GRID_WIDTH; x++) {
        if (!this.board[y][x]) {
          isComplete = false;
          break;
        }
      }
      if (isComplete) {
        linesToClear.push(y);
      }
    }

    if (linesToClear.length > 0) {
      // Mark lines for animation
      this.renderer.markLinesForAnimation(linesToClear);

      // Remove lines after animation
      setTimeout(() => {
        linesToClear.sort((a, b) => b - a);
        linesToClear.forEach(lineIndex => {
          this.board.splice(lineIndex, 1);
          this.board.unshift(Array(GRID_WIDTH).fill(0));
        });

        // Update score
        const lineCount = linesToClear.length;
        const linePoints = [0, 100, 300, 500, 1000];
        this.score += linePoints[lineCount] || linePoints[4];
        this.linesCleared += lineCount;

        // Increase level
        const newLevel = Math.floor(this.linesCleared / 10) + 1;
        if (newLevel > this.level) {
          this.level = newLevel;
          this.dropInterval = this.calculateDropInterval();
        }

        this.updateUI();
      }, this.renderer.animationDuration);
    }
  }

  /**
   * Spawn new piece
   */
  spawnNewPiece() {
    this.currentPiece = this.piecesManager.spawnNext();
    this.nextPiece = this.piecesManager.getNext();

    // Check for game over
    if (this.isColliding(this.currentPiece)) {
      this.endGame();
    }

    this.updateUI();
  }

  /**
   * Toggle pause state
   */
  togglePause() {
    this.isPaused = !this.isPaused;
    const pauseBtn = document.getElementById('pauseBtn');
    if (pauseBtn) {
      pauseBtn.textContent = this.isPaused ? 'RESUME' : 'PAUSE';
    }
  }

  /**
   * End game
   */
  endGame() {
    this.isGameOver = true;
    if (this.score > this.bestScore) {
      this.bestScore = this.score;
      localStorage.setItem('bestScore', this.bestScore);
    }
    this.updateUI();
  }

  /**
   * Reset game
   */
  reset() {
    this.board = this.initializeBoard();
    this.score = 0;
    this.level = 1;
    this.linesCleared = 0;
    this.isGameOver = false;
    this.isPaused = false;
    this.dropInterval = this.calculateDropInterval();
    this.lastDropTime = Date.now();
    this.piecesManager = new PiecesManager();
    this.currentPiece = this.piecesManager.spawnNext();
    this.nextPiece = this.piecesManager.getNext();
    this.updateUI();
  }

  /**
   * Update UI elements
   */
  updateUI() {
    const scoreEl = document.getElementById('score');
    const levelEl = document.getElementById('level');
    const linesClearedEl = document.getElementById('linesCleared');
    const bestScoreEl = document.getElementById('bestScore');

    if (scoreEl) scoreEl.textContent = this.score;
    if (levelEl) levelEl.textContent = this.level;
    if (linesClearedEl) linesClearedEl.textContent = this.linesCleared;
    if (bestScoreEl) bestScoreEl.textContent = this.bestScore;
  }
}

// Make class globally available for backwards compatibility
window.Game = Game;
