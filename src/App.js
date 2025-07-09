import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import UserInfoForm from './components/UserInfoForm';
import PreferencesForm from './components/PreferencesForm';
import ConfirmationScreen from './components/ConfirmationScreen';


function App() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    preferences: '',
  });

  const nextStep = () => setStep((prev) => prev + 1);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      {step === 0 && <WelcomeScreen onNext={nextStep} />}
      {step === 1 && (
        <UserInfoForm onNext={nextStep} data={formData} setData={setFormData} />
      )}
      {step === 2 && (
        <PreferencesForm onNext={nextStep} data={formData} setData={setFormData} />
      )}
      {step === 3 && <ConfirmationScreen data={formData} />}
    </div>
  );
}

export default App;
