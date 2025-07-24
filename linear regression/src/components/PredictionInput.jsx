import React, { useState } from 'react';

const PredictionInput = ({ onPredict }) => {
  const [inputValues, setInputValues] = useState({ age: '', chol: '', thalach: '' });

  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onPredict(inputValues);
  };

  return (
    <div className="mb-4">
      <input className="border m-1 p-1" name="age" placeholder="Age" onChange={handleChange} />
      <input className="border m-1 p-1" name="chol" placeholder="Chol" onChange={handleChange} />
      <input className="border m-1 p-1" name="thalach" placeholder="Thalach" onChange={handleChange} />
      <button className="bg-blue-500 text-white p-2 rounded m-1" onClick={handleSubmit}>Predict</button>
    </div>
  );
};

export default PredictionInput;
