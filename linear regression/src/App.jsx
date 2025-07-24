import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import * as tf from '@tensorflow/tfjs';
import FileUpload from './components/FileUpload';
import PredictionInput from './components/PredictionInput';
import ResultDisplay from './components/ResultDisplay';
import './index.css';

function App() {
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [normData, setNormData] = useState({});

  const normalize = (value, min, max) => (value - min) / (max - min);
  const denormalize = (value, min, max) => value * (max - min) + min;

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    const inputKeys = ['age', 'chol', 'thalach'];
    const outputKey = 'oldpeak';

    const inputMins = {}, inputMaxs = {};
    inputKeys.forEach(k => {
      inputMins[k] = Math.min(...jsonData.map(d => parseFloat(d[k])));
      inputMaxs[k] = Math.max(...jsonData.map(d => parseFloat(d[k])));
    });
    const outputMin = Math.min(...jsonData.map(d => parseFloat(d[outputKey])));
    const outputMax = Math.max(...jsonData.map(d => parseFloat(d[outputKey])));

    const inputs = jsonData.map(d => inputKeys.map(k => normalize(parseFloat(d[k]), inputMins[k], inputMaxs[k])));
    const labels = jsonData.map(d => normalize(parseFloat(d[outputKey]), outputMin, outputMax));

    const xs = tf.tensor2d(inputs);
    const ys = tf.tensor2d(labels, [labels.length, 1]);

    const linearModel = tf.sequential();
    linearModel.add(tf.layers.dense({ units: 1, inputShape: [3] }));
    linearModel.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

    await linearModel.fit(xs, ys, { epochs: 100 });

    setModel(linearModel);
    setNormData({ inputMins, inputMaxs, outputMin, outputMax });
    alert('✅ Model trained successfully!');
  };

  const handlePredict = async (inputValues) => {
    if (!model) return alert("⚠️ Model not trained yet.");

    const { inputMins, inputMaxs, outputMin, outputMax } = normData;

    const inputTensor = tf.tensor2d([
      ['age', 'chol', 'thalach'].map(k =>
        normalize(parseFloat(inputValues[k]), inputMins[k], inputMaxs[k])
      )
    ]);

    const output = model.predict(inputTensor);
    const predValue = await output.data();
    const denormPred = denormalize(predValue[0], outputMin, outputMax);
    setPrediction(denormPred.toFixed(2));
  };

  return (
    <div className="text-center p-10">
      <h1 className="text-2xl font-bold mb-4">📊 Linear Regression App</h1>
      <FileUpload handleFile={handleFile} />
      <PredictionInput onPredict={handlePredict} />
      <ResultDisplay prediction={prediction} />
    </div>
  );
}

export default App;
