"use client";

import { useEffect, useRef, useState } from 'react';

export default function EditLogoPage() {
  const canvasRef = useRef(null);
  const [status, setStatus] = useState('Loading image...');
  const [log, setLog] = useState([]);

  useEffect(() => {
    const img = new Image();
    img.src = '/images/logos.png';
    img.onload = () => {
      setStatus('Image loaded. Analyzing...');
      const canvas = canvasRef.current;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const width = img.width;
      const height = img.height;
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;

      // Helper to check if pixel is dark (text)
      const isDark = (x, y) => {
        const idx = (y * width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const a = data[idx + 3];
        // If transparent or near white, it is not dark
        if (a < 50) return false;
        return (r + g + b) / 3 < 150;
      };

      // Calculate column densities
      const density = new Array(width).fill(0);
      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          if (isDark(x, y)) {
            density[x]++;
          }
        }
      }

      const logMsg = (msg) => setLog(prev => [...prev, msg]);

      // Function to find H in a given x range [minX, maxX]
      const findH = (minX, maxX, label) => {
        let bestX1 = -1;
        let bestX2 = -1;
        let maxScore = -1;

        // Search for two vertical lines (peaks) with a gap of 15 to 45 pixels
        for (let x1 = minX; x1 < maxX; x1++) {
          if (density[x1] < 15) continue; // Must be a line-like column
          for (let x2 = x1 + 15; x2 <= Math.min(x1 + 45, maxX); x2++) {
            if (density[x2] < 15) continue; // Must be a line-like column

            // Calculate score based on peak heights and lower valley in between
            let valleySum = 0;
            for (let v = x1 + 2; v < x2 - 2; v++) {
              valleySum += density[v];
            }
            const valleyAvg = valleySum / (x2 - x1 - 3);

            // We want strong peaks and a low valley in between
            const score = (density[x1] + density[x2]) - 2 * valleyAvg;
            if (score > maxScore) {
              maxScore = score;
              bestX1 = x1;
              bestX2 = x2;
            }
          }
        }

        if (bestX1 !== -1 && bestX2 !== -1) {
          // Find y range for these columns
          let yTop = height;
          let yBottom = 0;
          for (let x of [bestX1, bestX2]) {
            for (let y = 0; y < height; y++) {
              if (isDark(x, y)) {
                if (y < yTop) yTop = y;
                if (y > yBottom) yBottom = y;
              }
            }
          }

          const yMid = Math.round((yTop + yBottom) / 2);
          logMsg(`Found ${label} at columns ${bestX1} and ${bestX2}, vertical range ${yTop}-${yBottom}, drawing at y=${yMid}`);

          // Draw the horizontal crossbar
          ctx.strokeStyle = '#2b3a29'; // Charcoal color matching the logo text
          ctx.lineWidth = 5; // Stroke thickness matching logo font weight
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(bestX1, yMid);
          ctx.lineTo(bestX2, yMid);
          ctx.stroke();

          return true;
        } else {
          logMsg(`Failed to find ${label} in range [${minX}, ${maxX}]`);
          return false;
        }
      };

      // Find first H (in CHEF, typically x around 100-220)
      const foundH1 = findH(90, 200, 'first H (CHEF)');

      // Find second H (in AKANKSHA, typically x around 750-950)
      const foundH2 = findH(750, 950, 'second H (AKANKSHA)');

      if (foundH1 || foundH2) {
        setStatus('Analysis complete. Saving updated logo...');
        // Save canvas to server
        const dataUrl = canvas.toDataURL('image/png');
        fetch('/api/save-logo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: dataUrl })
        })
        .then(res => res.json())
        .then(resData => {
          if (resData.success) {
            setStatus('Logo updated and saved successfully! 🎉');
          } else {
            setStatus(`Failed to save logo: ${resData.error}`);
          }
        })
        .catch(err => {
          setStatus(`Network error saving logo: ${err.message}`);
        });
      } else {
        setStatus('No letter H detected. Check coordinates.');
      }
    };
    img.onerror = () => {
      setStatus('Failed to load logos.png');
    };
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', background: '#111', color: '#fff', minHeight: '100vh' }}>
      <h1>Logo Editor (H-Completer)</h1>
      <p><strong>Status:</strong> {status}</p>
      
      <h2>Log Output</h2>
      <pre style={{ background: '#222', padding: '15px', borderRadius: '5px', maxHeight: '200px', overflowY: 'auto' }}>
        {log.join('\n')}
      </pre>

      <h2>Updated Logo Preview</h2>
      <canvas ref={canvasRef} style={{ background: '#fff', border: '1px solid #ccc', maxWidth: '100%' }} />
    </div>
  );
}
