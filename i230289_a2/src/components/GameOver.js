import React from 'react';

// Component to display game summary and restart option when the game is over
const GameOver = ({ runs, wickets, ballsBowled, onRestart }) => {
  const strikeRate = ballsBowled > 0 ? ((runs / ballsBowled) * 100).toFixed(2) : 0;
  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <h2 style={styles.title}>INNINGS COMPLETE!</h2>
        <div style={styles.stats}>
          <p><strong>Final Score:</strong> {runs} / {wickets}</p>
          <p><strong>Balls Played:</strong> {ballsBowled}</p>
          <p><strong>Strike Rate:</strong> {strikeRate}</p>
        </div>
        <button style={styles.btn} onClick={onRestart}>
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
};

// Inline styles for the Gameover
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.85)', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, 
  },
  card: {
    backgroundColor: '#1a1a2e',
    padding: '40px',
    borderRadius: '15px',
    border: '3px solid #e94560',
    textAlign: 'center',
    color: 'white',
    boxShadow: '0 0 20px rgba(233, 69, 96, 0.5)',
  },
  title: {
    fontSize: '32px',
    marginBottom: '20px',
    color: '#e94560',
  },
  stats: {
    fontSize: '20px',
    marginBottom: '30px',
    lineHeight: '1.8',
    color: '#ccc',
  },
  btn: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '15px 30px',
    fontSize: '18px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: '0.2s',
  }
};

export default GameOver;