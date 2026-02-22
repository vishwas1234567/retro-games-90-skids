# Contributing to Retro Puzzle Game

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inspiring community for all. Please be respectful, inclusive, and constructive in all interactions.

### Expected Behavior
- Use welcoming and inclusive language
- Be respectful of differing opinions
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites
- Node.js 14 or higher
- npm or yarn
- Git
- A modern web browser

### Setting Up Your Development Environment

1. **Fork the repository**
   ```bash
   # Click "Fork" on the GitHub repository
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/retro-puzzle-game.git
   cd retro-puzzle-game
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/retro-puzzle-game.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## Making Changes

### Branch Naming Convention
Create descriptive branch names:
```
feature/add-sound-effects
fix/high-score-bug
docs/update-readme
refactor/game-engine
```

### Commit Messages
Write clear, descriptive commit messages:
```
✨ Add rotation animation
🐛 Fix piece collision detection
📚 Update installation instructions
♻️ Refactor input handler for better readability
```

**Commit Types:**
- `✨` Feature: A new feature
- `🐛` Fix: A bug fix
- `📚` Docs: Documentation changes
- `♻️` Refactor: Code refactoring without feature changes
- `⚡` Perf: Performance improvements
- `🎨` Style: Code style changes
- `✅` Test: Adding or updating tests
- `🔧` Chore: Build configuration, dependencies

### Code Style Guidelines

#### JavaScript/Canvas
- Use consistent indentation (2 spaces)
- Use `const` and `let`, avoid `var`
- Use arrow functions where appropriate
- Add JSDoc comments for functions
- Keep functions focused and under 50 lines where possible

Example:
```javascript
/**
 * Clear complete rows from the board
 * @param {Array<Array>} board - The game board
 * @returns {number} Number of rows cleared
 */
function clearCompleteRows(board) {
  let rowsCleared = 0;
  // Implementation
  return rowsCleared;
}
```

#### CSS
- Use CSS custom properties for colors and spacing
- Follow BEM naming convention for classes
- Group related styles together
- Use Tailwind classes where applicable

#### HTML
- Use semantic HTML elements
- Add ARIA labels for accessibility
- Include alt text for images
- Use meaningful class names

### Adding Features

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, well-documented code
   - Add comments for complex logic
   - Update relevant tests

3. **Test your changes**
   - Test in multiple browsers (Chrome, Firefox, Safari, Edge)
   - Test on mobile devices
   - Verify no existing functionality breaks

4. **Commit your changes**
   ```bash
   git commit -m "✨ Add your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Submit a Pull Request**
   - Use the PR template provided
   - Describe your changes clearly
   - Reference any related issues
   - Include screenshots if applicable

## Types of Contributions

### 🎮 Game Features
- New game mechanics
- Difficulty adjustments
- Special effects
- Sound and music

### 🐛 Bug Fixes
- Game logic issues
- Rendering problems
- Input handling bugs
- Collision detection fixes

### 📱 Mobile Optimization
- Touch controls improvement
- Responsive design fixes
- Performance optimization
- Battery usage optimization

### 🎨 UI/UX Improvements
- Visual enhancements
- User experience improvements
- Accessibility features
- Theme customization

### 📚 Documentation
- README improvements
- Code comments
- API documentation
- Setup guides

### ⚡ Performance
- Canvas rendering optimization
- Memory leak fixes
- Frame rate improvements
- File size reduction

## Pull Request Process

1. **Ensure your code quality**
   - Run linter: `npm run lint`
   - Format code: `npm run format`

2. **Write a clear PR description**
   - What does this PR do?
   - Why is it needed?
   - How can it be tested?

3. **Reference related issues**
   - Use `Closes #123` in PR description
   - Link related discussions

4. **Wait for review**
   - Respond to feedback promptly
   - Make requested changes
   - Push updates to your branch

5. **Get approval**
   - At least one maintainer approval required
   - All CI checks must pass

## Testing

### Manual Testing Checklist
- [ ] Feature works as expected
- [ ] No console errors
- [ ] Works on different browsers
- [ ] Works on mobile devices
- [ ] Keyboard controls work
- [ ] Touch controls work (if applicable)
- [ ] Performance is good (60 FPS)

### Browser Testing
Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari
- Chrome Mobile

## Documentation

### Updating README
If adding a new feature, update the README:
1. Add to feature list
2. Update controls section if needed
3. Add screenshots/GIFs if applicable

### Code Comments
- Comment complex algorithms
- Explain non-obvious logic
- Use JSDoc for functions
- Update comments with code changes

## Community Guidelines

### Be Respectful
- Treat all contributors with respect
- Assume good intentions
- Be open to different perspectives
- Avoid harsh or dismissive language

### Be Constructive
- Provide specific feedback
- Suggest improvements
- Ask questions if unclear
- Offer help when possible

### Report Issues Responsibly
- Don't publicly disclose security issues
- Email maintainers privately for security bugs
- Provide clear reproduction steps
- Include relevant system information

## Questions?

- 📖 Check the [README](README.md)
- 🐛 Search [existing issues](../../issues)
- 💬 Open a [discussion](../../discussions)
- 📧 Contact maintainers

## License

By contributing, you agree that your contributions will be licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Recognition

Contributors will be recognized:
- In the repository's contributor list
- In release notes for significant contributions
- On the project website (if applicable)

---

**Thank you for making Retro Puzzle Game awesome!** 🎮✨
