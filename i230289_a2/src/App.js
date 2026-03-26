import React, { useState, useCallback } from 'react';
import './App.css';
import Ground from './components/Ground';
import Scoreboard from './components/Scoreboard';
import BattingStyle from './components/BattingStyle';
import PowerBar from './components/PowerBar';
import GameOver from './components/GameOver'; // <-- Imported the new component

function App() {
  // State for batting style selection
  const [battingMode, setBattingMode] = useState('aggressive');
  
  // State to track match scores
  const [runs, setRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [ballsBowled, setBallsBowled] = useState(0);
  
  // State to track animations
  const [isAnimating, setIsAnimating] = useState(false);
  const [shotResult, setShotResult] = useState(null);

  // Match constraints
  const totalBalls = 12;
  const maxWickets = 2;
  const isGameOver = ballsBowled >= totalBalls || wickets >= maxWickets;

  // Function to reset the game back to 0
  const resetGame = () => {
    setRuns(0);
    setWickets(0);
    setBallsBowled(0);
    setBattingMode('aggressive');
    setShotResult(null);
    setIsAnimating(false);
  };

  // Called when user clicks PLAY SHOT in the PowerBar
  const handleShot = (result) => {
    if (isGameOver || isAnimating) return;
    setShotResult(result);
    setIsAnimating(true); // Triggers the canvas animation
  };

  // Called automatically by Ground.js when animation finishes
  const handleAnimationComplete = useCallback(() => {
    if (shotResult) {
      if (shotResult.label === 'W') {
        setWickets((w) => w + 1);
      } else {
        setRuns((r) => r + shotResult.r);
      }
      setBallsBowled((b) => b + 1);
    }
    setIsAnimating(false);
  }, [shotResult]);

  return (
    <div className="App">
      <h2>2D Cricket Game</h2>
      
      <div className="game-container">
        
        <div className="left-column">
          <Scoreboard 
            runs={runs} 
            wickets={wickets} 
            ballsLeft={totalBalls - ballsBowled} 
            totalBalls={totalBalls} 
            maxWickets={maxWickets} 
          />
        </div>
        
        <div className="right-column">
          <Ground 
            isAnimating={isAnimating} 
            resultText={shotResult ? shotResult.label : null} 
            onAnimEnd={handleAnimationComplete} 
          />
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
        
        <BattingStyle 
            selected={battingMode} 
            onChange={setBattingMode} 
            disabled={isGameOver || isAnimating} 
        />
        
        <div className="powerbar-container" style={{ width: '100%', marginTop: '15px' }}>
          <PowerBar 
              mode={battingMode} 
              hit={handleShot} 
              lock={isGameOver || isAnimating} 
          />
        </div>
      </div>

      {/* Shows the Game Over popup overlay ONLY if the game has ended */}
      {isGameOver && (
        <GameOver 
          runs={runs} 
          wickets={wickets} 
          ballsBowled={ballsBowled} 
          onRestart={resetGame} 
        />
      )}

    </div>
  );
}

export default App;