import React, { useState, useCallback } from 'react';
import './App.css';
import Ground from './components/Ground';
import Scoreboard from './components/Scoreboard';
import BattingStyle from './components/BattingStyle';
import PowerBar from './components/PowerBar';
import GameOver from './components/GameOver';

function App() {
  // Variable Declaration for future use
  const [battingMode, setBattingMode] = useState('aggressive');
  
  const [runs, setRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [ballsBowled, setBallsBowled] = useState(0);
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [shotResult, setShotResult] = useState(null);

  const totalBalls = 12;
  const maxWickets = 2;
  const isGameOver = ballsBowled >= totalBalls || wickets >= maxWickets;

  // Resets the game to initial state
  const resetGame = () => {
    setRuns(0);
    setWickets(0);
    setBallsBowled(0);
    setBattingMode('aggressive');
    setShotResult(null);
    setIsAnimating(false);
  };

  // Handles the shot result from PowerBar and triggers animation
  const handleShot = (result) => {
    if (isGameOver || isAnimating) return;
    setShotResult(result);
    setIsAnimating(true);
  };

  // Updates the scoreboard and state after the shot animation completes
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

  // Main render function for the app
  return (
    <div className="App">
      <h2 style={{ fontSize: '30px', marginBottom: '10px' }}>2D Cricket Game</h2>
      {/* Divides the game area for canvas and scoreboard */}
      <div className="gameContainer">
        
        <div className="leftCol">
          <Scoreboard 
            runs={runs} 
            wickets={wickets} 
            ballsLeft={totalBalls - ballsBowled}
            totalBalls={totalBalls} 
            maxWickets={maxWickets} 
          />
          <button 
            className="resetBtn"
            onClick={resetGame}
          >
            Reset Game
          </button>
        </div>
        
        <div className="rightCol">
          <Ground 
            isAnimating={isAnimating} 
            resultText={shotResult ? shotResult.label : null} 
            onAnimEnd={handleAnimationComplete} 
          />
        </div>
      </div>
      {/* Batting Style and Power Bar */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
        <BattingStyle 
            selected={battingMode} 
            onChange={setBattingMode} 
            disabled={isGameOver || isAnimating} 
        />
        <div className="powerBarContainer" style={{ width: '100%', marginTop: '15px' }}>
          <PowerBar 
              mode={battingMode} 
              hit={handleShot} 
              lock={isGameOver || isAnimating} 
          />
        </div>
      </div>
    {/* Calls GameOver component when the game is over */}
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
