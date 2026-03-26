import React, { useState, useEffect, useRef } from 'react';

const chances = {
  aggressive: [
    { label: 'W', r: -1, p: 0.30, c: '#ff4d4d' },
    { label: '0', r: 0,  p: 0.10, c: '#808080' },
    { label: '1', r: 1,  p: 0.10, c: '#4CAF50' },
    { label: '2', r: 2,  p: 0.10, c: '#FFD700' },
    { label: '3', r: 3,  p: 0.05, c: '#FFA500' },
    { label: '4', r: 4,  p: 0.15, c: '#ff7300' },
    { label: '6', r: 6,  p: 0.20, c: '#9370DB' }
  ],
  defensive: [
    { label: 'W', r: -1, p: 0.10, c: '#ff4d4d' },
    { label: '0', r: 0,  p: 0.25, c: '#808080' },
    { label: '1', r: 1,  p: 0.30, c: '#4CAF50' },
    { label: '2', r: 2,  p: 0.20, c: '#FFD700' },
    { label: '3', r: 3,  p: 0.08, c: '#FFA500' },
    { label: '4', r: 4,  p: 0.05, c: '#ff7300' },
    { label: '6', r: 6,  p: 0.02, c: '#9370DB' }
  ]
};

const PowerBar = ({ mode, hit, lock }) => {
  const [pos, setPos] = useState(0);
  const req = useRef();
  const dir = useRef(1);

  const arr = chances[mode];

  useEffect(() => {
    const move = () => {
      if (lock) return;

      setPos((old) => {
        let nxt = old + 0.045 * dir.current; 
        if (nxt >= 1) { nxt = 1; dir.current = -1; }
        else if (nxt <= 0) { nxt = 0; dir.current = 1; }
        return nxt;
      });

      req.current = requestAnimationFrame(move);
    };

    if (!lock) {
      req.current = requestAnimationFrame(move);
    }

    return () => cancelAnimationFrame(req.current);
  }, [lock]);

  const clk = () => {
    if (lock) return;

    let sum = 0;
    let val = arr[arr.length - 1];

    for (let i = 0; i < arr.length; i++) {
      sum += arr[i].p;
      if (pos <= sum) {
        val = arr[i];
        break;
      }
    }

    hit(val);
  };

  return (
    <div style={s.box}>
      <h4 style={s.title}>POWER BAR</h4>
      <div style={s.bar}>
        {arr.map((itm, i) => (
          <div key={i} style={{ width: `${itm.p * 100}%`, background: itm.c, ...s.seg }}>
            {itm.label}
          </div>
        ))}
        <div style={{ ...s.ptr, left: `${pos * 100}%` }} />
      </div>

      <div style={s.buttonWrapper}>
        <button onClick={clk} disabled={lock} style={{ ...s.btn, opacity: lock ? 0.5 : 1 }}>
          PLAY SHOT
        </button>
      </div>
    </div>
  );
};

const s = {
  box: { marginTop: '10px', textAlign: 'center' },
  title: { margin: '0 0 10px 0', color: '#fff', fontSize: '16px', letterSpacing: '1px' },
  bar: { display: 'flex', height: '35px', border: '2px solid white', position: 'relative', marginBottom: '15px' },
  seg: { height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold' },
  ptr: { position: 'absolute', top: -5, bottom: -5, width: '6px', background: 'white', border: '1px solid black', transform: 'translateX(-50%)' },
  buttonWrapper: { display: 'flex', justifyContent: 'center' },
  btn: { padding: '10px 25px', cursor: 'pointer', backgroundColor: '#e94560', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', fontSize: '16px' }
};

export default PowerBar;