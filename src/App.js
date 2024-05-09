import React, { useState } from 'react'; // Import React and useState hook
import './App.css'; // Import the CSS file for styling
import SudokuGame from './Sudoku'; // Import the Sudoku game component
import WordSearch from './wordSearch'; // Import the WordSearchPuzzle component


// Define App component
const App = () => {
  // State variables
  const [answers, setAnswers] = useState([]); // Store user answers
  const [showPuzzle, setShowPuzzle] = useState(false); // Flag to show puzzle

  // Handler to record user answers
  const handleAnswer = (questionIndex, answer) => {
    const newAnswers = [...answers]; // Create a copy of answers array
    newAnswers[questionIndex] = answer; // Update answer at the specified index
    setAnswers(newAnswers); // Update state with new answers
  };

  // Function to calculate the result based on user answers
  const calculateResult = () => {
    // Count occurrences of 'math' and 'literature' in answers array
    const mathScore = answers.filter(answer => answer === 'math').length;
    const literatureScore = answers.filter(answer => answer === 'literature').length;
    // Return the subject with the higher score
    return mathScore > literatureScore ? 'math' : 'literature';
  };

  // Handler to start the game
  const handleStartGame = () => {
    setShowPuzzle(true); // Set showPuzzle flag to true to render the puzzle
  };

  // Render the survey questions
  const renderSurvey = () => {
    // Array of survey questions
    const questions = [
      '1. Which subject do you enjoy more?',
      '2. When faced with a problem, do you find yourself naturally inclined to analyze it methodically or break it down into logical steps?',
      '3. In your free time, would you rather engage in activities like Sudoku or chess, or would you rather read a book?',
      '4. Which type of content do you prefer to consume? Scientific articles and documentaries or short stories and podcasts?',
      '5. Which activity do you find more enjoyable, solving mathematical problems or analyzing stories?'
    ];

    // Render each question along with answer options
    return (
      <div className="survey">
        <h1>Choose Your Adventure!</h1>
        {questions.map((question, index) => (
          <div key={index} className="question">
            <p>{question}</p>
            {/* Button to select 'Math' option */}
            <button className="math-btn" onClick={() => handleAnswer(index, 'math')}>Math</button>
            {/* Button to select 'Literature' option */}
            <button className="lit-btn" onClick={() => handleAnswer(index, 'literature')}>Literature</button>
          </div>
        ))}
        {/* Button to submit survey answers and start the game */}
        <button className="submit-btn" onClick={handleStartGame}>Submit</button>
      </div>
    );
  };

  // Render the appropriate puzzle based on the result
  const renderPuzzle = () => {
    const result = calculateResult(); // Calculate the result based on user answers
    // Render the Sudoku game or the Word Search puzzle to load based on the results of the survey
    if (result === 'math') {
      return <SudokuGame />;
    } else {
      return <WordSearch />;
    }
  };

  // Render the App component
  return (
    <div className="app">
      {/* Render survey if showPuzzle flag is false, otherwise render puzzle */}
      {!showPuzzle ? renderSurvey() : renderPuzzle()}
    </div>
  );
};

// Export the App component
export default App;