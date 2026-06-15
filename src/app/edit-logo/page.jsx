"use client";

import { useEffect, useRef, useState } from 'react';

export default function EditLogoPage() {
  const canvasRef = useRef(null);
  const [status, setStatus] = useState('Loading original logo...');
  const [log, setLog] = useState([]);

  useEffect(() => {
    const img = new Image();
    img.src = '/images/logos.png'; // Load the original logo
    img.onload = () => {
      setStatus('Image loaded. Drawing to canvas...');
      const canvas = canvasRef.current;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const width = img.width;
      const height = img.height;
      
      // Get initial pixel data for analysis
      let imgData = ctx.getImageData(0, 0, width, height);
      let pixels = imgData.data;

      // Helper to check if pixel is dark in the original image
      const isDarkOriginal = (x, y) => {
        const idx = (y * width + x) * 4;
        const r = pixels[idx];
        const g = pixels[idx + 1];
        const b = pixels[idx + 2];
        const a = pixels[idx + 3];
        if (a < 50) return false;
        // Grayscale value
        return (r + g + b) / 3 < 150;
      };

      // Calculate column densities
      const density = new Array(width).fill(0);
      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          if (isDarkOriginal(x, y)) {
            density[x]++;
          }
        }
      }

      const logMsg = (msg) => setLog(prev => [...prev, msg]);

      // Function to find H in a given x range [minX, maxX] and draw crossbar
      const findAndDrawH = (minX, maxX, label) => {
        let bestX1 = -1;
        let bestX2 = -1;
        let maxScore = -1;

        for (let x1 = minX; x1 < maxX; x1++) {
          if (density[x1] < 15) continue;
          for (let x2 = x1 + 15; x2 <= Math.min(x1 + 45, maxX); x2++) {
            if (density[x2] < 15) continue;

            let valleySum = 0;
            for (let v = x1 + 2; v < x2 - 2; v++) {
              valleySum += density[v];
            }
            const valleyAvg = valleySum / (x2 - x1 - 3);

            const score = (density[x1] + density[x2]) - 2 * valleyAvg;
            if (score > maxScore) {
              maxScore = score;
              bestX1 = x1;
              bestX2 = x2;
            }
          }
        }

        if (bestX1 !== -1 && bestX2 !== -1) {
          let yTop = height;
          let yBottom = 0;
          for (let x of [bestX1, bestX2]) {
            for (let y = 0; y < height; y++) {
              if (isDarkOriginal(x, y)) {
                if (y < yTop) yTop = y;
                if (y > yBottom) yBottom = y;
              }
            }
          }

          const yMid = Math.round((yTop + yBottom) / 2);
          logMsg(`Completed H crossbar for ${label} between columns ${bestX1}-${bestX2} at y=${yMid}`);

          // Draw the horizontal crossbar (use the dark color of the original text first)
          ctx.strokeStyle = '#2b3a29';
          ctx.lineWidth = 5;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(bestX1, yMid);
          ctx.lineTo(bestX2, yMid);
          ctx.stroke();
          return true;
        }
        return false;
      };

      // Draw H's first
      findAndDrawH(90, 200, 'first H (CHEF)');
      findAndDrawH(750, 950, 'second H (AKANKSHA)');

      // Now fetch the pixel data again (which includes the drawn H crossbars!)
      imgData = ctx.getImageData(0, 0, width, height);
      pixels = imgData.data;

      // Helper to convert RGB to HSL
      const rgbToHsl = (r, g, b) => {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if (max === min) {
          h = s = 0;
        } else {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
        }
        return [h * 360, s * 100, l * 100];
      };

      // Scan to find minimum lightness/grayscale for non-green pixels (text) and green pixels (leaf)
      let minTextGray = 255;
      let minLeafGray = 255;

      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const a = pixels[i + 3];

        if (a < 50) continue;

        const [h, s, l] = rgbToHsl(r, g, b);
        const gray = (r + g + b) / 3;

        const isGreen = h >= 50 && h <= 170 && s > 12 && l < 95;

        if (isGreen) {
          if (gray < minLeafGray) minLeafGray = gray;
        } else if (l < 95) {
          if (gray < minTextGray) minTextGray = gray;
        }
      }

      logMsg(`Analysis of color bounds: Text min grayscale = ${minTextGray}, Leaf min grayscale = ${minLeafGray}`);

      // Perform color replacement
      const newImgData = ctx.createImageData(width, height);
      const newPixels = newImgData.data;

      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const a = pixels[i + 3];

        // Default: copy transparency
        newPixels[i + 3] = a;

        if (a < 10) {
          continue; // transparent
        }

        const [h, s, l] = rgbToHsl(r, g, b);
        const gray = (r + g + b) / 3;

        const isGreen = h >= 50 && h <= 170 && s > 12 && l < 98;

        if (isGreen) {
          // Leaf pixel -> Recolor to #6B7F5E (RGB: 107, 127, 94)
          const t = Math.max(0, Math.min(1, (gray - minLeafGray) / (255 - minLeafGray)));
          newPixels[i] = Math.round(107 * (1 - t) + 255 * t);
          newPixels[i + 1] = Math.round(127 * (1 - t) + 255 * t);
          newPixels[i + 2] = Math.round(94 * (1 - t) + 255 * t);
        } else if (l < 98) {
          // Text pixel -> Recolor to #5C4A32 (RGB: 92, 74, 50)
          const t = Math.max(0, Math.min(1, (gray - minTextGray) / (255 - minTextGray)));
          newPixels[i] = Math.round(92 * (1 - t) + 255 * t);
          newPixels[i + 1] = Math.round(74 * (1 - t) + 255 * t);
          newPixels[i + 2] = Math.round(50 * (1 - t) + 255 * t);
        } else {
          // White background
          newPixels[i] = r;
          newPixels[i + 1] = g;
          newPixels[i + 2] = b;
        }
      }

      // Draw the recolored pixels to canvas
      ctx.putImageData(newImgData, 0, 0);
      logMsg('Recolored text to #5C4A32 and leaf to #6B7F5E.');

      // Save updated logo to server
      setStatus('Recoloring complete. Saving updated logo...');
      const dataUrl = canvas.toDataURL('image/png');
      fetch('/api/save-logo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: dataUrl })
      })
      .then(res => res.json())
      .then(resData => {
        if (resData.success) {
          setStatus('Recolored logo saved successfully! 🎉');
        } else {
          setStatus(`Failed to save logo: ${resData.error}`);
        }
      })
      .catch(err => {
        setStatus(`Network error saving logo: ${err.message}`);
      });
    };
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', background: '#111', color: '#fff', minHeight: '100vh' }}>
      <h1>Logo Recolor & Edit Tool</h1>
      <p><strong>Status:</strong> {status}</p>
      
      <h2>Log</h2>
      <pre style={{ background: '#222', padding: '15px', borderRadius: '5px' }}>
        {log.join('\n')}
      </pre>

      <h2>Recolored Logo Preview</h2>
      <canvas ref={canvasRef} style={{ background: '#fff', padding: '20px', border: '1px solid #ccc', maxWidth: '100%' }} />
    </div>
  );
}
