/**
 * Game Pieces Module
 * Defines all puzzle piece types and their properties
 */

const PIECE_SIZE = 20; // Each block is 20x20 pixels
const GRID_WIDTH = 15;
const GRID_HEIGHT = 20;

// Color palette for pieces
const PIECE_COLORS = {
  I: '#00ffff', // Cyan
  O: '#ffff00', // Yellow
  T: '#ff00ff', // Magenta
  S: '#00ff00', // Green
  Z: '#ff0080', // Pink
  J: '#0080ff', // Blue
  L: '#ff8000', // Orange
  EMPTY: '#000000',
};

// Piece shapes as rotation matrices
const PIECE_SHAPES = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
};

/**
 * GamePiece class
 * Represents a single falling piece in the game
 */
class GamePiece {
  constructor(type = null) {
    // Randomly select a piece type if not specified
    const pieceTypes = Object.keys(PIECE_SHAPES);
    this.type = type || pieceTypes[Math.floor(Math.random() * pieceTypes.length)];
    this.shape = this.getShapeMatrix();
    this.x = Math.floor((GRID_WIDTH - this.shape[0].length) / 2);
    this.y = 0;
    this.color = PIECE_COLORS[this.type];
    this.rotationIndex = 0;
  }

  /**
   * Get the current shape matrix with rotation applied
   */
  getShapeMatrix() {
    const baseShape = PIECE_SHAPES[this.type];
    return this.deepCopy(baseShape);
  }

  /**
   * Rotate the piece 90 degrees clockwise
   */
  rotate() {
    const originalShape = this.shape;
    const n = this.shape.length;
    const m = this.shape[0].length;

    // Create rotated matrix
    const rotated = [];
    for (let i = 0; i < m; i++) {
      rotated[i] = [];
      for (let j = 0; j < n; j++) {
        rotated[i][j] = originalShape[n - 1 - j][i];
      }
    }

    // Check if rotation is valid
    const oldShape = this.shape;
    this.shape = rotated;
    return this;
  }

  /**
   * Undo last rotation
   */
  undoRotate() {
    for (let i = 0; i < 3; i++) {
      this.rotate();
    }
  }

  /**
   * Move piece left
   */
  moveLeft() {
    this.x--;
  }

  /**
   * Move piece right
   */
  moveRight() {
    this.x++;
  }

  /**
   * Move piece down
   */
  moveDown() {
    this.y++;
  }

  /**
   * Get all blocks occupied by this piece
   */
  getBlocks() {
    const blocks = [];
    for (let row = 0; row < this.shape.length; row++) {
      for (let col = 0; col < this.shape[row].length; col++) {
        if (this.shape[row][col] === 1) {
          blocks.push({
            x: this.x + col,
            y: this.y + row,
            type: this.type,
            color: this.color,
          });
        }
      }
    }
    return blocks;
  }

  /**
   * Get the bounding box of the piece
   */
  getBounds() {
    return {
      left: this.x,
      right: this.x + this.shape[0].length,
      top: this.y,
      bottom: this.y + this.shape.length,
    };
  }

  /**
   * Deep copy utility
   */
  deepCopy(matrix) {
    return matrix.map(row => [...row]);
  }
}

/**
 * PiecesManager class
 * Manages piece generation and queue
 */
class PiecesManager {
  constructor() {
    this.currentPiece = new GamePiece();
    this.nextPiece = new GamePiece();
    this.pieceCount = 0;
  }

  /**
   * Get current falling piece
   */
  getCurrent() {
    return this.currentPiece;
  }

  /**
   * Get next piece in queue
   */
  getNext() {
    return this.nextPiece;
  }

  /**
   * Spawn next piece and generate new next piece
   */
  spawnNext() {
    this.currentPiece = this.nextPiece;
    this.nextPiece = new GamePiece();
    this.pieceCount++;
    return this.currentPiece;
  }

  /**
   * Get a random piece (used for initialization)
   */
  static getRandomPiece() {
    return new GamePiece();
  }
}

// Make classes globally available for backwards compatibility
window.GamePiece = GamePiece;
window.PiecesManager = PiecesManager;
window.PIECE_SHAPES = PIECE_SHAPES;
window.PIECE_COLORS = PIECE_COLORS;
window.GRID_WIDTH = GRID_WIDTH;
window.GRID_HEIGHT = GRID_HEIGHT;
window.PIECE_SIZE = PIECE_SIZE;
