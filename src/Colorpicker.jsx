import { useState } from "react";
import "./colorpicker.css";

export default function ColorPicker() {
    const [color, setColor] = useState("#3498db");
    const [textColor, setTextColor] = useState("white");

    // Update color and dynamically choose readable text color
    const handleChange = (e) => {
        const newColor = e.target.value;
        setColor(newColor);

        // Simple luminance check for contrast
        const rgb = parseInt(newColor.slice(1), 16); // remove '#'
        const r = (rgb >> 16) & 0xff;
        const g = (rgb >> 8) & 0xff;
        const b = rgb & 0xff;
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

        setTextColor(luminance > 186 ? "black" : "white");
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(color);
        alert(`Copied ${color} to clipboard!`);
    };

    return (
        <div className="color-picker-container">
            <h1>🎨 Color Picker</h1>

            <div
                className="color-preview"
                style={{ backgroundColor: color, color: textColor }}
            >
                <p>{color}</p>
            </div>

            <div className="color-controls">
                <input type="color" value={color} onChange={handleChange} />
                <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    maxLength={7}
                />
                <button onClick={copyToClipboard}>Copy</button>
            </div>
        </div>
    );
}
