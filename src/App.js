import { useState } from 'react';
import './App.css';

function App() {
  const [baseColors, setBaseColors] = useState(['#000000', '#000000', '#000000']);
  const [generatedPalette, setGeneratedPalette] = useState([]);
  const [copiedColor, setCopiedColor] = useState(null);
  const [isSelectionMode, setIsSelectionMode] = useState(true);
  const [colorHarmony, setColorHarmony] = useState('complementary');
  
  const generatePalette = () => {
    const newPalette = [];
    
    newPalette.push(baseColors[0]);
    newPalette.push(getComplementaryColor(baseColors[0]));
    newPalette.push(baseColors[1]);
    newPalette.push(baseColors[2]);
    
    const hslColor = hexToHSL(baseColors[2]);
    newPalette.push(hslToHex(hslColor.h + 30, hslColor.s, hslColor.l));
    
    setGeneratedPalette(newPalette.slice(0, 5));
    setIsSelectionMode(false);
  };

  const regeneratePalette = () => {
    const newPalette = [];
    
    newPalette.push(adjustBrightness(baseColors[0], -0.2));
    newPalette.push(baseColors[1]);
    newPalette.push(getComplementaryColor(baseColors[1]));
    newPalette.push(baseColors[2]);
    newPalette.push(adjustBrightness(baseColors[2], 0.2));
    
    setGeneratedPalette(newPalette.slice(0, 5));
  };

  const adjustBrightness = (hex, factor) => {
    hex = hex.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    r = Math.min(255, Math.max(0, Math.round(r + (factor * 255))));
    g = Math.min(255, Math.max(0, Math.round(g + (factor * 255))));
    b = Math.min(255, Math.max(0, Math.round(b + (factor * 255))));

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const hexToHSL = (hex) => {
    hex = hex.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
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
        default: h = 0;
      }
      
      h = Math.round(h * 60);
    }

    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return { h, s, l };
  };

  const hslToHex = (h, s, l) => {
    h = ((h % 360) + 360) % 360;
    s = Math.max(0, Math.min(100, s)) / 100;
    l = Math.max(0, Math.min(100, l)) / 100;

    if (s === 0) {
      const val = Math.round(l * 255);
      return `#${val.toString(16).padStart(2, '0').repeat(3)}`;
    }

    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const r = hue2rgb(p, q, (h / 360) + 1/3);
    const g = hue2rgb(p, q, h / 360);
    const b = hue2rgb(p, q, (h / 360) - 1/3);

    const toHex = (x) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const getComplementaryColor = (hex) => {
    const hsl = hexToHSL(hex);
    return hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l);
  };

  const handleColorChange = (index, newColor) => {
    const updatedColors = [...baseColors];
    updatedColors[index] = newColor;
    setBaseColors(updatedColors);
  };

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color).then(() => {
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 1500);
    });
  };

  const resetToSelectionMode = () => {
    setIsSelectionMode(true);
  };

  const generateRandomColor = (index) => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    handleColorChange(index, randomColor);
  };

  return (
    <div className="app">
      {isSelectionMode ? (
        <div className="selection-mode">
          <header className="app-header">
            <h1>Color Palette Generator</h1>
            <p className="subtitle">Create color schemes for your projects</p>
          </header>
          
          <div className="harmony-selector">
            <label>Color Harmony:</label>
            <select 
              value={colorHarmony} 
              onChange={(e) => setColorHarmony(e.target.value)}
              className="harmony-select"
            >
              <option value="complementary">Complementary</option>
              <option value="analogous">Analogous</option>
              <option value="triadic">Triadic</option>
              <option value="monochromatic">Monochromatic</option>
            </select>
          </div>

          <main className="selection-content">
            <div className="color-selection">
              {baseColors.map((color, index) => (
                <div key={index} className="color-card">
                  <div className="color-header">
                    <h3>Color {index + 1}</h3>
                    <button 
                      onClick={() => generateRandomColor(index)}
                      className="icon-button"
                      title="Generate random color"
                    >
                      <span className="material-icons-round">shuffle</span>
                    </button>
                  </div>
                  <div 
                    className="color-preview" 
                    style={{ backgroundColor: color }}
                    onClick={() => copyToClipboard(color)}
                  >
                    {copiedColor === color && (
                      <div className="copied-tooltip">Copied!</div>
                    )}
                  </div>
                  <div className="color-controls">
                    <div className="color-input-group">
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => handleColorChange(index, e.target.value)}
                        className="color-picker"
                        id={`color-picker-${index}`}
                      />
                      <label htmlFor={`color-picker-${index}`} className="color-picker-label">
                        <span className="material-icons-round">colorize</span>
                      </label>
                      <input
                        type="text"
                        value={color}
                        onChange={(e) => handleColorChange(index, e.target.value)}
                        className="color-text"
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="action-container">
              <button 
                onClick={generatePalette} 
                className="primary-button"
              >
                <span className="material-icons-round">palette</span>
                Generate Palette
              </button>
            </div>
          </main>
        </div>
      ) : (
        <div className="palette-mode">
          <div className="palette-controls">
            <button onClick={resetToSelectionMode} className="back-button">
              <span className="material-icons-round">arrow_back</span>
            </button>
            <button onClick={regeneratePalette} className="refresh-button">
              <span className="material-icons-round">refresh</span>
            </button>
          </div>
          
          <div className="color-palette">
            {generatedPalette.map((color, index) => (
              <div 
                key={index} 
                className="palette-swatch"
                onClick={() => copyToClipboard(color)}
                style={{ backgroundColor: color }}
              >
                <div className="swatch-content">
                  <span className="color-value">{color}</span>
                  {copiedColor === color && (
                    <div className="copied-tooltip">Copied!</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
