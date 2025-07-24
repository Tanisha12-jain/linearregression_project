import React from 'react';

const ResultDisplay = ({ prediction }) => {
  return (
    <div className="text-lg font-bold">
      {prediction !== null && !isNaN(prediction)
        ? `Predicted Oldpeak: ${prediction}`
        : 'No prediction yet.'}
    </div>
  );
};

export default ResultDisplay;
