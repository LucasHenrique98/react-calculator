import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './main/Calculator.js';
import Calculator from './main/Calculator.js';

ReactDOM.render(
  <React.StrictMode>
    <h1>Calculadora</h1>
    <Calculator />
  </React.StrictMode>,
  document.getElementById('root')
);
