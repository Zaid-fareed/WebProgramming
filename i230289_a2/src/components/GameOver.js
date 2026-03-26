import React from 'react';

const GameOver = ({ runs, wickets, ballsBowled, onRestart }) => {
  // Calculate strike rate just for fun summary stats
  const strikeRate = ballsBowled > 0 ? ((runs / ballsBowled) * 100).toFixed(2) : 0;

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <h2 style={styles.title}>🏏 INNINGS COMPLETE!</h2>
        
        {/* Match Summary Stats */}
        <div style={styles.stats}>
          <p><strong>Final Score:</strong> {runs} / {wickets}</p>
          <p><strong>Balls Played:</strong> {ballsBowled}</p>
          <p><strong>Strike Rate:</strong> {strikeRate}</p>
        </div>

        {/* Play Again Button */}
        <button style={styles.btn} onClick={onRestart}>
          🔄 PLAY AGAIN
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.85)', // Dark semi-transparent background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Makes sure it sits on top of everything else
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