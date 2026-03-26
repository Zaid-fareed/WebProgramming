import React, { useRef, useEffect } from 'react';

const Ground = ({ isAnimating, resultText, onAnimEnd }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animId;

        let ballX = 470;
        let ballY = 130;
        let batAngle = 0;
        let textY = 100;
        let textAlpha = 1;
        let isHit = false;
        let frameCount = 0;

        const draw = () => {
            ctx.clearRect(0, 0, 600, 240);

            ctx.fillStyle = '#87CEEB'; ctx.fillRect(0, 0, 600, 110);
            ctx.fillStyle = '#4CAF50'; ctx.fillRect(0, 110, 600, 130);
            ctx.fillStyle = '#DEB887'; ctx.fillRect(100, 110, 400, 80);
            ctx.fillStyle = 'white'; ctx.fillRect(120, 110, 5, 80); ctx.fillRect(480, 110, 5, 80);

            ctx.fillStyle = 'white'; ctx.strokeStyle = '#333'; ctx.lineWidth = 1;
            ctx.fillRect(105, 130, 3, 30); ctx.strokeRect(105, 130, 3, 30);
            ctx.fillRect(108, 125, 3, 30); ctx.strokeRect(108, 125, 3, 30);
            ctx.fillRect(111, 120, 3, 30); ctx.strokeRect(111, 120, 3, 30);
            ctx.fillRect(490, 130, 3, 25); ctx.strokeRect(490, 130, 3, 25);
            ctx.fillRect(494, 125, 3, 25); ctx.strokeRect(494, 125, 3, 25);
            ctx.fillRect(498, 120, 3, 25); ctx.strokeRect(498, 120, 3, 25);

            ctx.fillStyle = '#111'; ctx.strokeStyle = '#111'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.arc(130, 80, 10, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.moveTo(130, 90); ctx.lineTo(130, 130); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(130, 130); ctx.lineTo(120, 160); ctx.moveTo(130, 130); ctx.lineTo(140, 160); ctx.stroke();

            ctx.save();
            ctx.translate(130, 110);
            ctx.rotate(batAngle);
            ctx.strokeStyle = '#8B4513'; ctx.lineWidth = 5;
            ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(15, 35); ctx.stroke();
            ctx.restore();

            ctx.fillStyle = 'red';
            ctx.beginPath(); ctx.arc(ballX, ballY, 5, 0, Math.PI * 2); ctx.fill();

            if (isHit && resultText) {
                let msg = resultText;
                if (msg === 'W') msg = "OUT!";
                else if (msg === '4') msg = "FOUR!";
                else if (msg === '6') msg = "SIX!";
                else if (msg === '0') msg = "DOT BALL";
                else msg = msg + " RUNS";

                ctx.fillStyle = `rgba(255, 255, 255, ${textAlpha})`;
                ctx.font = "bold 40px Arial";
                ctx.textAlign = "center";
                ctx.fillText(msg, 300, textY);
            }

            if (isAnimating) {
                if (ballX > 145 && !isHit) {
                    ballX -= 8;
                } else {
                    isHit = true;
                    batAngle = -0.6;
                    
                    if (resultText !== 'W' && resultText !== '0') {
                        ballX += 12;
                        ballY -= 5;
                    } else {
                        ballX -= 2;
                    }

                    textY -= 1;
                    textAlpha -= 0.015;
                    frameCount++;

                    if (frameCount > 70) {
                        if (onAnimEnd) onAnimEnd();
                        return;
                    }
                }
                animId = requestAnimationFrame(draw);
            }
        };

        draw();

        return () => cancelAnimationFrame(animId);
    }, [isAnimating, resultText]);

    return (
    <div style={{ width: '100%' }}>
      <canvas 
        ref={canvasRef} 
        width={600} 
        height={240} 
        style={{ 
          border: '3px solid #444', 
          borderRadius: '8px', 
          backgroundColor: '#000',
          width: '100%',  
          height: 'auto' 
        }}
      />
    </div>
  );
};

export default Ground;
