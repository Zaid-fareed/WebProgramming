import React, { useRef, useEffect } from 'react';

const Ground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // 1. Draw Sky
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, 600, 110); 

    // 2. Draw Outfield Grass
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(0, 110, 600, 130);

    // 3. Draw Pitch (Sandy brown)
    ctx.fillStyle = '#DEB887'; 
    ctx.fillRect(100, 110, 400, 80); 

    // 4. Crease Lines (White)
    ctx.fillStyle = 'white';
    ctx.fillRect(120, 110, 5, 80); 
    ctx.fillRect(480, 110, 5, 80); 

    // 5. Stumps
    ctx.fillStyle = 'white';
    ctx.strokeStyle = '#333'; 
    ctx.lineWidth = 1;

    ctx.fillRect(105, 130, 3, 30);
    ctx.strokeRect(105, 130, 3, 30);
    ctx.fillRect(108, 125, 3, 30);
    ctx.strokeRect(108, 125, 3, 30);
    ctx.fillRect(111, 120, 3, 30);
    ctx.strokeRect(111, 120, 3, 30);
    // Bowling end stumps
    ctx.fillRect(490, 130, 3, 25);
    ctx.strokeRect(490, 130, 3, 25);

    ctx.fillRect(494, 125, 3, 25);
    ctx.strokeRect(494, 125, 3, 25);

    ctx.fillRect(498, 120, 3, 25);
    ctx.strokeRect(498, 120, 3, 25);
    // 6. Basic Stickman Batsman 
    ctx.fillStyle = '#111';
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 2;

    // Head
    ctx.beginPath();
    ctx.arc(130, 80, 10, 0, Math.PI * 2);
    ctx.fill();

    // Torso
    ctx.beginPath();
    ctx.moveTo(130, 90);
    ctx.lineTo(130, 130);
    ctx.stroke();

    // Legs
    ctx.beginPath();
    ctx.moveTo(130, 130);
    ctx.lineTo(120, 160);
    ctx.moveTo(130, 130);
    ctx.lineTo(140, 160);
    ctx.stroke();

    // Bat
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(130, 110);
    ctx.lineTo(145, 145);
    ctx.stroke();

    // 7. Ball 
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(470, 130, 5, 0, Math.PI * 2);
    ctx.fill();

  }, []);

  return (
    <div>
      <canvas 
        ref={canvasRef} 
        width={600} 
        height={240} 
        style={{ border: '3px solid #444', borderRadius: '8px', backgroundColor: '#000' }}
      />
    </div>
  );
};

export default Ground;