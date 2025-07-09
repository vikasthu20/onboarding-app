import React, { useState } from 'react';

export default function PreferencesForm({ onNext, data, setData }) {
  const [preferences, setPreferences] = useState({
    jira: data.preferences?.jira || '',
    confluence: data.preferences?.confluence || '',
    figma: data.preferences?.figma || '',
  });

  const handleChange = (field) => (e) => {
    setPreferences((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData((prev) => ({ ...prev, preferences }));
    console.log('Preferences submitted:', preferences);
    onNext();
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={styles.header}>Select Your Preferences</h2>

        <label style={styles.label}>
          JIRA
          <input
            type="text"
            placeholder="Search in JIRA"
            value={preferences.jira}
            onChange={handleChange('jira')}
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          CONFLUENCE
          <input
            type="text"
            placeholder="Search in Confluence"
            value={preferences.confluence}
            onChange={handleChange('confluence')}
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          FIGMA
          <input
            type="text"
            placeholder="Search in Figma"
            value={preferences.figma}
            onChange={handleChange('figma')}
            style={styles.input}
          />
        </label>

        <button type="submit" style={styles.button}>Next ➜</button>
      </form>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    padding: '2rem',
  },
  card: {
    backgroundColor: '#fff',
    maxWidth: '400px',
    width: '100%',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  header: {
    marginBottom: '0.5rem',
    color: '#4a90e2',
    fontSize: '1.8rem',
    textAlign: 'center',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1rem',
    color: '#333',
    gap: '0.25rem',
  },
  input: {
    padding: '0.75rem 1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'border-color 0.2s',
  },
  button: {
    backgroundColor: '#4a90e2',
    color: '#fff',
    padding: '0.75rem 1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.2s',
  },
};
