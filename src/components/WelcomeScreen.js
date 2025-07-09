// src/components/WelcomeScreen.jsx
import React, { useState } from 'react';
import './WelcomeScreen.css';  // for styling

const WelcomeScreen = ({ onNext }) => {
  const [language, setLanguage] = useState('en');
  const [region, setRegion] = useState('US');

  const handleContinue = () => {
    console.log(`Selected language: ${language}, region: ${region}`);
  };

  return (
    <div className="welcome-container">
      <div className="branding">
        <h1 className="animated-logo">PlayStation</h1>
      </div>

      <div className="intro-video">
        <video width="100%" controls autoPlay muted>
          <source src="/assets/introVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="selection">
        <label>
          Language:
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="ja">Japanese</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
          </select>
        </label>

        <label>
          Region:
          <select value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="US">United States</option>
            <option value="EU">Europe</option>
            <option value="JP">Japan</option>
            <option value="Other">Other</option>
          </select>
        </label>
      </div>

      <button
        className="continue-button"
        onClick={() => {
          handleContinue();
          onNext();
        }}
      >
        Continue
      </button>
    </div>
  );
};

export default WelcomeScreen;
