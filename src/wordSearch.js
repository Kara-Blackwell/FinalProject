import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import './App.css'; // Import the CSS file for styling

// WordSearchGame component
const WordSearchGame = ({ puzzle, words, onWordFound }) => {
  // State for selected letters, found words, and their positions
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [foundWordPositions, setFoundWordPositions] = useState([]);

  // Reset selected letters, found words, and their positions when puzzle changes
  useEffect(() => {
    setSelectedLetters([]);
    setFoundWords([]);
    setFoundWordPositions([]);
  }, [puzzle]);

  // Handler for clicking on a letter
  const handleLetterClick = (row, col) => {
    setSelectedLetters([...selectedLetters, [row, col]]);
  };

  // Check if selected letters form a word
  const checkWord = () => {
    const selectedWord = selectedLetters.map(([row, col]) => puzzle[row][col]).join('');
    if (words.includes(selectedWord) && !foundWords.includes(selectedWord)) {
      setFoundWords([...foundWords, selectedWord]);
      setFoundWordPositions([...foundWordPositions, ...selectedLetters]);
      onWordFound(selectedWord);
    }
    setSelectedLetters([]);
  };

  // Render the puzzle grid
  const renderPuzzle = () => {
    return puzzle.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((letter, colIndex) => (
          <span
            key={colIndex}
            className={`cell ${selectedLetters.some(([row, col]) => row === rowIndex && col === colIndex) ? 'selected' : ''} ${foundWordPositions.some(([row, col]) => row === rowIndex && col === colIndex) ? 'found' : ''}`}
            onClick={() => handleLetterClick(rowIndex, colIndex)}
          >
            {letter}
          </span>
        ))}
      </div>
    ));
  };

  // Render WordSearchGame component
  return (
    <div className="word-search-game">
      <div className="puzzle">{renderPuzzle()}</div>
      <div className="words-to-find">
        <h2>Words to Find:</h2>
        <ul>
          {words.map((word, index) => (
            <li key={index} className={foundWords.includes(word) ? 'found' : ''}>{word}</li>
          ))}
        </ul>
      </div>
      <button className="checkWord-btn" onClick={checkWord}>Check Word</button>
    </div>
  );
};

// Function to generate a random puzzle grid
const generateRandomPuzzle = (rows, cols, wordList) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const puzzle = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      row.push(alphabet[randomIndex]);
    }
    puzzle.push(row);
  }

  wordList.forEach(word => {
    const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
    let startX, startY;
    do {
      startX = Math.floor(Math.random() * rows);
      startY = Math.floor(Math.random() * cols);
    } while (!isWordPlaceable(word, startX, startY, direction, rows, cols));
    
    for (let i = 0; i < word.length; i++) {
      if (direction === 'horizontal') {
        puzzle[startX][startY + i] = word[i];
      } else {
        puzzle[startX + i][startY] = word[i];
      }
    }
  });

  return puzzle;
};

// Function to check if a word can be placed in the puzzle
const isWordPlaceable = (word, startX, startY, direction, rows, cols) => {
  if (direction === 'horizontal' && startY + word.length > cols) return false;
  if (direction === 'vertical' && startX + word.length > rows) return false;
  for (let i = 0; i < word.length; i++) {
    const x = direction === 'horizontal' ? startX : startX + i;
    const y = direction === 'horizontal' ? startY + i : startY;
    if (x < 0 || x >= rows || y < 0 || y >= cols) return false;
  }
  return true;
};

// WordSearch component
const WordSearch = () => {
  const words = ['WORDS', 'SEARCH', 'FINAL', 'WEB']; // List of words to find
  const [puzzle, setPuzzle] = useState([]);

  // Generate puzzle grid
  useEffect(() => {
    const newPuzzle = generateRandomPuzzle(10, 10, words); // 10x10 puzzle
    setPuzzle(newPuzzle);
  }, []);

  // Handler for word found
  const handleWordFound = (word) => {
    console.log(`Found word: ${word}`);
  };

  // Render WordSearch component
  return (
    <div className="wordSearch">
      <h1>Word Search Puzzle</h1>
      <WordSearchGame puzzle={puzzle} words={words} onWordFound={handleWordFound} />
    </div>
  );
};

// Export the WordSearch component
export default WordSearch;