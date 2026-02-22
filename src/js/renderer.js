/**
 * Renderer Module
 * Handles all canvas drawing and animations
 */

class GameRenderer {
  constructor(canvasId = 'gameCanvas', nextCanvasId = 'nextCanvas') {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');

    this.nextCanvas = document.getElementById(nextCanvasId);
    this.nextCtx = this.nextCanvas.getContext('2d');

    this.blockSize = PIECE_SIZE;
    this.gridWidth = GRID_WIDTH;
    this.gridHeight = GRID_HEIGHT;

    // Animation properties
    this.animatingLines = new Set();
    this.animationTime = 0;
    this.animationDuration = 300; // milliseconds

    this.setupHighDPI();
  }

  /**
   * Setup high DPI canvas rendering
   */
  setupHighDPI() {
    const dpr = window.devicePixelRatio || 1;

    // Get CSS size
    const csWidth = this.canvas.clientWidth;
    const csHeight = this.canvas.clientHeight;

    // Scale canvas
    this.canvas.width = csWidth * dpr;
    this.canvas.height = csHeight * dpr;
    this.ctx.scale(dpr, dpr);

    // Set CSS size
    this.canvas.style.width = csWidth + 'px';
    this.canvas.style.height = csHeight + 'px';

    // Same for next canvas
    if (this.nextCanvas) {
      const ncsWidth = this.nextCanvas.clientWidth;
      const ncsHeight = this.nextCanvas.clientHeight;
      this.nextCanvas.width = ncsWidth * dpr;
      this.nextCanvas.height = ncsHeight * dpr;
      this.nextCtx.scale(dpr, dpr);
      this.nextCanvas.style.width = ncsWidth + 'px';
      this.nextCanvas.style.height = ncsHeight + 'px';
    }
  }

  /**
   * Clear the main game canvas
   */
  clearCanvas() {
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draw the game grid
   */
  drawGrid() {
    this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
    this.ctx.lineWidth = 0.5;

    // Vertical lines
    for (let x = 0; x <= this.gridWidth; x++) {
      const pixelX = x * this.blockSize;
      this.ctx.beginPath();
      this.ctx.moveTo(pixelX, 0);
      this.ctx.lineTo(pixelX, this.gridHeight * this.blockSize);
      this.ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y <= this.gridHeight; y++) {
      const pixelY = y * this.blockSize;
      this.ctx.beginPath();
      this.ctx.moveTo(0, pixelY);
      this.ctx.lineTo(this.gridWidth * this.blockSize, pixelY);
      this.ctx.stroke();
    }
  }

  /**
   * Draw a single block
   */
  drawBlock(x, y, color, opacity = 1) {
    const pixelX = x * this.blockSize;
    const pixelY = y * this.blockSize;
    const blockSize = this.blockSize - 1;

    // Draw filled block
    this.ctx.fillStyle = color;
    this.ctx.globalAlpha = opacity;
    this.ctx.fillRect(pixelX, pixelY, blockSize, blockSize);
    this.ctx.globalAlpha = 1;

    // Draw border
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(pixelX, pixelY, blockSize, blockSize);
  }

  /**
   * Draw the placed blocks (game board)
   */
  drawBoard(board) {
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        const block = board[y][x];
        if (block && block !== 0) {
          const color = typeof block === 'string' ? block : PIECE_COLORS[block] || '#ffffff';
          const opacity = this.animatingLines.has(y) ? 0.5 : 1;
          this.drawBlock(x, y, color, opacity);
        }
      }
    }
  }

  /**
   * Draw the falling piece
   */
  drawPiece(piece) {
    if (!piece) return;

    const blocks = piece.getBlocks();
    blocks.forEach(block => {
      if (block.y >= 0) { // Only draw if visible
        this.drawBlock(block.x, block.y, block.color);
      }
    });
  }

  /**
   * Draw shadow/ghost piece
   */
  drawShadow(piece, board) {
    if (!piece) return;

    let shadowY = piece.y;

    // Find where piece would land
    while (true) {
      piece.moveDown();
      if (this.isColliding(piece, board)) {
        piece.moveUp = piece.moveUp || (() => piece.y--);
        piece.moveUp();
        break;
      }
    }

    // Draw ghost piece with low opacity
    const blocks = piece.getBlocks();
    blocks.forEach(block => {
      if (block.y >= 0) {
        this.ctx.globalAlpha = 0.3;
        this.drawBlock(block.x, block.y, block.color);
        this.ctx.globalAlpha = 1;
      }
    });

    // Reset piece position
    piece.y = shadowY;
  }

  /**
   * Check if piece would collide with board
   */
  isColliding(piece, board) {
    const blocks = piece.getBlocks();
    for (const block of blocks) {
      if (block.x < 0 || block.x >= GRID_WIDTH || block.y >= GRID_HEIGHT) {
        return true;
      }
      if (block.y >= 0 && board[block.y]?.[block.x]) {
        return true;
      }
    }
    return false;
  }

  /**
   * Draw animation for clearing lines
   */
  updateLineAnimation(deltaTime) {
    this.animationTime += deltaTime;
    if (this.animationTime >= this.animationDuration) {
      this.animatingLines.clear();
      this.animationTime = 0;
    }
  }

  /**
   * Mark lines for clearing animation
   */
  markLinesForAnimation(lines) {
    lines.forEach(line => this.animatingLines.add(line));
    this.animationTime = 0;
  }

  /**
   * Draw next piece preview
   */
  drawNextPiece(piece) {
    // Clear canvas
    this.nextCtx.fillStyle = '#000000';
    this.nextCtx.fillRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);

    if (!piece) return;

    // Get piece shape
    const shape = piece.shape;
    const blockSize = 20;
    const startX = 10;
    const startY = 10;

    // Draw blocks
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col] === 1) {
          const x = startX + col * blockSize;
          const y = startY + row * blockSize;

          // Draw filled block
          this.nextCtx.fillStyle = piece.color;
          this.nextCtx.fillRect(x, y, blockSize - 1, blockSize - 1);

          // Draw border
          this.nextCtx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
          this.nextCtx.lineWidth = 1;
          this.nextCtx.strokeRect(x, y, blockSize - 1, blockSize - 1);
        }
      }
    }
  }

  /**
   * Draw the complete game state
   */
  draw(gameState) {
    this.clearCanvas();
    this.drawGrid();
    this.drawBoard(gameState.board);

    if (gameState.currentPiece) {
      // Draw shadow first (behind)
      this.drawShadow(gameState.currentPiece, gameState.board);
      // Draw actual piece on top
      this.drawPiece(gameState.currentPiece);
    }

    this.drawNextPiece(gameState.nextPiece);
  }

  /**
   * Draw game over screen
   */
  drawGameOver(score) {
    // Semi-transparent overlay
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Game Over text
    this.ctx.fillStyle = '#ff00ff';
    this.ctx.font = 'bold 48px "Courier New"';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    const centerX = (this.gridWidth * this.blockSize) / 2;
    const centerY = (this.gridHeight * this.blockSize) / 2;

    // Shadow effect
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    this.ctx.fillText('GAME OVER', centerX + 2, centerY - 20 + 2);

    // Main text
    this.ctx.fillStyle = '#00ffff';
    this.ctx.shadowColor = '#ff00ff';
    this.ctx.shadowBlur = 10;
    this.ctx.fillText('GAME OVER', centerX, centerY - 20);

    // Score
    this.ctx.font = 'bold 24px "Courier New"';
    this.ctx.fillStyle = '#ffff00';
    this.ctx.fillText(`Score: ${score}`, centerX, centerY + 30);
  }

  /**
   * Draw pause screen
   */
  drawPause() {
    // Semi-transparent overlay
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Pause text
    this.ctx.fillStyle = '#ffff00';
    this.ctx.font = 'bold 32px "Courier New"';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    const centerX = (this.gridWidth * this.blockSize) / 2;
    const centerY = (this.gridHeight * this.blockSize) / 2;

    this.ctx.fillText('PAUSED', centerX, centerY);
    this.ctx.font = '16px "Courier New"';
    this.ctx.fillStyle = '#00ffff';
    this.ctx.fillText('Press P to Resume', centerX, centerY + 40);
  }
}

// Make class globally available for backwards compatibility
window.GameRenderer = GameRenderer;
