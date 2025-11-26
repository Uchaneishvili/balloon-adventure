# Balloon Adventure – High Sky Escape

Embark on a whimsical hot-air balloon adventure! Soar as high as possible into the sky to collect points, but beware—the higher you go, the greater the risk of popping in the thin atmosphere.

## 🎮 How to Play

1.  **Start the Game:** Click "PLAY" on the main menu.
2.  **Ascend:** The balloon rises automatically.
3.  **Score:** Your score increases as you gain altitude.
4.  **Risk:** As you go higher, the risk of the balloon popping increases. Watch out for strong winds (screen shake)!
5.  **Land:** Press the **"LAND NOW"** button to safely descend and bank your score before disaster strikes.
6.  **Game Over:** If you wait too long, the balloon will pop, and you'll lose the round.

## ✨ Features

-   **Risk vs. Reward Gameplay:** The higher you go, the more points you earn, but the chance of popping increases.
-   **Dynamic Environment:**
    -   Parallax cloud scrolling for depth.
    -   Cloud density increases with altitude.
    -   Wind sound effects that intensify with speed.
-   **Visual Effects:**
    -   Balloon swaying animation.
    -   Confetti burst on safe landing.
    -   Explosion effect on balloon pop.
    -   Screen shake when risk is high.
-   **Responsive UI:**
    -   Clean HUD displaying Altitude and Score.
    -   Interactive Start and Game Over screens.
    -   "How to Play" rules modal.
    -   Mute button for audio control.
-   **Audio:** Immersive sound effects for wind, popping, and winning.

## 🛠️ Technical Details

Built with **PixiJS**, this project demonstrates efficient rendering and game loop management.

### Key Components

-   **`Game.js`**: Manages the core game loop, state (playing, game over), and risk calculations.
-   **`UI.js`**: Handles all user interface elements, including the HUD, menus, and buttons.
-   **`Balloon.js`**: Defines the balloon's visual structure using PixiJS Graphics.
-   **`Cloud.js`**: Generates procedural cloud shapes.
-   **`SoundManager.js`**: Manages audio playback and volume scaling based on game state.
-   **`EffectManager.js`**: Handles particle effects for bursts and confetti.

## 🚀 Installation & Running

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Uchaneishvili/balloon-adventure.git
    cd balloon-adventure
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npx serve
    ```

4.  **Open in Browser:**
    Navigate to `http://localhost:3000` (or the port shown in the terminal).
