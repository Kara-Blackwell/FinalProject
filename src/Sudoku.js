import React, { useState } from 'react'; // Import React and the necessary hook
import Square from './Square'; //Import square component
import './App.css'; // Import the CSS file for styling

// SudokuBoard component
const SudokuGame = () => {
  // Initial Sudoku grid state
  const initialGrid = [
    [null, null, null, 2, 6, null, 7, null, 1],
    [6, 8, null, null, 7, null, null, 9, null],
    [1, 9, null, null, null, 4, 5, null, null],
    [8, 2, null, 1, null, null, null, 4, null],
    [null, null, 4, 6, null, 2, 9, null, null],
    [null, 5, null, null, null, 3, null, 2, 8],
    [null, null, 9, 3, null, null, null, 7, 4],
    [null, 4, null, null, 5, null, null, 3, 6],
    [7, null, 3, null, 1, 8, null, null, null],
  ];

  // State variables
  const [grid, setGrid] = useState(initialGrid); // Sudoku grid state
  const [selectedNumber, setSelectedNumber] = useState(null); // Selected number state

  // Handler for changing a square's value
  const handleSquareChange = (row, col, newValue) => {
    const newGrid = grid.map((rowArray, rowIndex) =>
      row === rowIndex ? rowArray.map((val, colIndex) => (col === colIndex ? newValue : val)) : rowArray
    );
    setGrid(newGrid);
  };

  // Function to check if a square is preset (initial value)
  const isPreset = (row, col) => initialGrid[row][col] !== null;

  // Function to highlight squares with the selected number
  const highlightNumbers = (number) => {
    const highlightedCells = [];
    grid.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        if (value === number) {
          highlightedCells.push({ row: rowIndex, col: colIndex });
        }
      });
    });
    return highlightedCells;
  };

  // Handler for selecting a number button
  const handleNumberSelect = (number) => {
    setSelectedNumber(number);
    const squaresToHighlight = highlightNumbers(number);
    console.log("Squares to highlight:", squaresToHighlight); // Debugging step to make sure it's accurately displaying the right cells in this array since the highlighting feature isn't working as I was expecting it to.
    const sudokuSquares = document.querySelectorAll('.sudoku-square');
    sudokuSquares.forEach((square) => {
      square.classList.remove('active');
    });
    squaresToHighlight.forEach(({ row, col }) => {
      const squareIndex = row * 9 + col;
      sudokuSquares[squareIndex].classList.add('active'); // Add 'active' class to the square
    });
  };

  // Function to check if a row is valid
  const isRowValid = (row, num) => {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === num) {
        return false;
      }
    }
    return true;
  };

  // Function to check if a column is valid
  const isColValid = (col, num) => {
    for (let row = 0; row < 9; row++) {
      if (grid[row][col] === num) {
        return false;
      }
    }
    return true;
  };

  // Function to check if a box is valid (box meaning the 3x3 sub-grids)
  const isBoxValid = (startRow, startCol, num) => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (grid[row + startRow][col + startCol] === num) {
          return false;
        }
      }
    }
    return true;
  };

  // Function to check if a move is valid
  const isMoveValid = (row, col, num) => {
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    return isRowValid(row, num) && isColValid(col, num) && isBoxValid(startRow, startCol, num);
  };

  // Function to check if the entire grid is valid
  const isGridValid = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const num = grid[row][col];
        if (num !== null && !isMoveValid(row, col, num)) {
          return false;
        }
      }
    }
    return true;
  };

// Handler for the check button
const handleCheck = () => {
    const correctCells = [];
    const incorrectCells = [];
    // Get all sudoku squares
    const sudokuSquares = document.querySelectorAll('.sudoku-square');
    // Iterate through each cell in the grid
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        // Check if the cell is preset
        if (!isPreset(row, col)) {
          const num = grid[row][col];
          // Check if the cell has a value
          if (num !== null) {
            // Check if the value violates Sudoku rules
            if (!isMoveValid(row, col, num)) {
              // If invalid, add the cell coordinates to the incorrectCells array
              incorrectCells.push({ row, col });
            } else {
              // If valid, add the cell coordinates to the correctCells array
              correctCells.push({ row, col });
            }
          } else {
            // If the cell is blank, add the 'blank' class to remove highlighting
            const squareIndex = row * 9 + col;
            sudokuSquares[squareIndex].classList.add('blank');
          }
        }
      }
    }

    // Check if the grid is valid using the isGridValid function
    if (isGridValid()) {
        alert('Congrats! You solved the Sudoku puzzle!');
    } else {
        alert('Sorry, the puzzle is not yet solved. Keep trying!');
    }

    // Highlight cells with a different color depending on situation
    sudokuSquares.forEach((square) => {
      square.classList.remove('incorrect');
      square.classList.remove('correct');
    });
    incorrectCells.forEach(({ row, col }) => {
      const squareIndex = row * 9 + col;
      sudokuSquares[squareIndex].classList.add('incorrect');
    });
    correctCells.forEach(({ row, col }) => {
      const squareIndex = row * 9 + col;
      sudokuSquares[squareIndex].classList.add('correct');
    });
  };

  // Render the Sudoku board
  return (
    <div className="sudoku-board">
    <h1>Sudoku Puzzle</h1>
      {/* Render each row */}
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="sudoku-row">
          {/* Render each square in the row */}
          {row.map((value, colIndex) => (
            <Square
              key={colIndex}
              value={value}
              row={rowIndex}
              col={colIndex}
              isPreset={isPreset(rowIndex, colIndex)}
              onChange={handleSquareChange}
              highlighted={selectedNumber && value === selectedNumber}
            />
          ))}
        </div>
      ))}
      {/* Render number input buttons */}
      <div className="number-input">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <button
            key={number}
            onClick={() => {
              handleNumberSelect(number);
            }}
          >
            {number}
          </button>
        ))}
      </div>
      {/* Render the check button */}
      <button className="sudoku-btn" onClick={handleCheck}>Check</button>
    </div>
  );
};

// Export the SudokuBoard component
export default SudokuGame;