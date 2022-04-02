import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import i18n from 'i18next';
import resources from './translations';
import LanguageDetector from 'i18next-browser-languagedetector';
import App from './App';
import { initReactI18next } from 'react-i18next';

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
