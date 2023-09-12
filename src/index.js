import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTableCells,
  faChartSimple,
  faGears,
  faBars,
  faClose,
  faBook,
  faSpinner,
  faArrowLeft,
  faCalculator,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';

//styles
import './styles/general.css'
import './styles/containers.css';


library.add(
  faTableCells,
  faChartSimple,
  faGears,
  faBars,
  faClose,
  faBook,
  faSpinner,
  faArrowLeft,
  faCalculator,
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);