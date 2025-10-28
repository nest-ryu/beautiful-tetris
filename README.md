<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Beautiful Tetris Game

A beautiful Tetris game built with React and TypeScript, featuring multiple themes and sound effects.

## 🎮 Features

- Multiple beautiful themes
- Sound effects for all actions
- Smooth gameplay with modern UI
- No grid lines for cleaner look
- Instant game over when blocks reach the top

## 🚀 Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the app:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## 📦 Deploy to GitHub Pages

### Option 1: Using GitHub Actions (Recommended)

1. Push the code to your GitHub repository
2. Go to repository Settings → Pages
3. Source: Deploy from a branch
4. Branch: `gh-pages` → Save
5. The GitHub Action will automatically build and deploy

### Option 2: Manual Upload

1. Build the project: `npm run build`
2. Go to your GitHub repository
3. Add file → Upload files
4. Upload `dist/index.html` and `dist/assets/` folder
5. Go to Settings → Pages and select "main" branch
6. Your site will be live at `https://username.github.io/repository-name`

## 🎯 How to Play

- **← →**: Move piece left/right
- **↓**: Rotate piece
- **Space**: Hard drop
- **P**: Pause game

Clear lines to score points and level up!
