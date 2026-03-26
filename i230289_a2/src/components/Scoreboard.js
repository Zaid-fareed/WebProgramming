import React from 'react';

const Scoreboard = ({ runs, wickets, ballsLeft, totalBalls, maxWickets }) => {
  const ballsBowled = totalBalls - ballsLeft;
  const overFull = Math.floor(ballsBowled / 6);
  const ballsInOver = ballsBowled % 6;
  const oversDisplay = `${overFull}.${ballsInOver}`;

  return (
    <div style={styles.container}>
      <h1 style={styles.score}>{runs} / {wickets}</h1>
      <div style={styles.statsRow}>
        <div style={styles.statBox}>
          <span>OVERS</span>
          <strong>{oversDisplay} / {totalBalls / 6}</strong>
        </div>
        {/* <div style={styles.statBox}>
          <span>BALLS LEFT</span>
          <strong>{ballsLeft}</strong>
        </div> */}
        <div style={styles.statBox}>
          <span>WICKETS LEFT</span>
          <strong>{maxWickets - wickets}</strong>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#0f3460',
    // padding: '10px 20px',
    borderRadius: '10px',
    textAlign: 'center',
    width: '100%',
    // maxWidth: '600px',
    // boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
  },
  score: {
    fontSize: '30px',
    margin: '0 0 10px 0',
    color: '#fff',
    letterSpacing: '2px',
  },
  statsRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    backgroundColor: '#1a1a2e',
    padding: '15px',
    borderRadius: '8px',
  },
  statBox: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '14px',
    color: '#ccc',
  }
};

export default Scoreboard;