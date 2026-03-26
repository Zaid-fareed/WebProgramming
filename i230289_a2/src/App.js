import React from 'react';
import './App.css';
import Ground from './components/Ground';
import Scoreboard from './components/Scoreboard';
import BattingStyle from './components/BattingStyle';

function App() {
  return (
    <div className="App">
      <h2>2D Cricket Game</h2>
      <div className="game-container">
        <div className="left-column">
          <Scoreboard 
            runs={45} 
            wickets={1} 
            ballsLeft={5} 
            totalBalls={12} 
            maxWickets={2} 
          />
        </div>
        <div className="right-column">
          <Ground />
        </div>
      </div>
        <BattingStyle 
            selected="aggressive" 
            onChange={() => {}} 
            disabled={false} 
        />
    </div>
  );
}

export default App;