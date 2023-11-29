import React, { useState, useEffect } from 'react';

const Question = ({ data, onAnswer, allDivisions, allCoaches }) => {
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedCoach, setSelectedCoach] = useState('');
  const [divisionOptions, setDivisionOptions] = useState([]);
  const [coachOptions, setCoachOptions] = useState([]);
  const [answerFeedback, setAnswerFeedback] = useState({ division: '', coach: '' });
  const [feedbackMessage, setFeedbackMessage] = useState('');

    const generateOptions = (correctOption, allOptions) => {
      let options = new Set([correctOption]);
      while (options.size < 4) {
        options.add(allOptions[Math.floor(Math.random() * allOptions.length)]);
      }

      // Convert the Set to an array and shuffle
      let optionsArray = [...options];
      for (let i = optionsArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [optionsArray[i], optionsArray[j]] = [optionsArray[j], optionsArray[i]]; // Swap elements
      }

      return optionsArray;
    };

  useEffect(() => {
    setDivisionOptions(generateOptions(data.division, allDivisions));
    setCoachOptions(generateOptions(data.coach, allCoaches));
    setSelectedDivision('');
    setSelectedCoach('');
    setAnswerFeedback({ division: '', coach: '' });
    setFeedbackMessage('');
  }, [data, allDivisions, allCoaches]);

    const handleSubmit = () => {
      const isDivisionCorrect = selectedDivision === data.division;
      const isCoachCorrect = selectedCoach === data.coach;
      setAnswerFeedback({
        division: isDivisionCorrect ? 'correct' : 'incorrect',
        coach: isCoachCorrect ? 'correct' : 'incorrect',
      });
      setFeedbackMessage(isDivisionCorrect && isCoachCorrect ? 'Correct' : 'Incorrect');

      // Delay before moving to next question
      setTimeout(() => {
        onAnswer(isDivisionCorrect, isCoachCorrect);
        // Reset the feedback message
        setFeedbackMessage('');
      }, 1000); // 2 seconds delay
    };


  const optionButtonStyle = (option, category) => {
    if (answerFeedback[category] !== '') {
      return (option === data[category]) ? 'bg-green-500' : 'bg-blue-500';
    }
    return (category === 'division' && option === selectedDivision) || (category === 'coach' && option === selectedCoach)
      ? 'bg-purple-500' : 'bg-blue-500 hover:bg-blue-700';
  };

  return (
    <div>
      <h2>{data.team}</h2>
      <div>
        {divisionOptions.map(option => (
          <button
            key={option}
            className={`py-2 px-4 rounded-full text-white font-semibold transition-colors ${optionButtonStyle(option, 'division')}`}
            onClick={() => setSelectedDivision(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div>
        {coachOptions.map(option => (
          <button
            key={option}
            className={`py-2 px-4 rounded-full text-white font-semibold transition-colors ${optionButtonStyle(option, 'coach')}`}
            onClick={() => setSelectedCoach(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        className="py-2 px-4 rounded bg-purple-500 text-white font-bold hover:bg-purple-700 transition-colors"
        onClick={handleSubmit}
        disabled={selectedDivision === '' || selectedCoach === ''}
      >
        Submit
      </button>
      {feedbackMessage && (
        <div className={`text-lg font-bold mt-2 ${feedbackMessage === 'Correct' ? 'text-green-500' : 'text-red-500'}`}>
          {feedbackMessage}
        </div>
      )}
    </div>
  );
};

export default Question;
