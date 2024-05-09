import React from 'react';
import './App.css';

const Square = ({ value, row, col, isPreset, onChange }) => {
  // Handler for input change
  const handleChange = (e) => {
    // Get new value from input
    const newValue = e.target.value === '' ? null : parseInt(e.target.value, 10);
    // Call parent function to update square value
    onChange(row, col, newValue);
  };

  return (
    <input
      className={`sudoku-square ${isPreset ? 'preset' : ''}`}
      type="number"
      value={value || ''}
      min="1"
      max="9"
      readOnly={isPreset}
      onChange={handleChange}
    />
  );
};

// Export the square component for the Sudoku puzzle
export default Square;