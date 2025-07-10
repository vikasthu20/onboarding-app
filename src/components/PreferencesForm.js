import React, { useState } from 'react';

// Simulated "LLM" call — replace with your real API
async function fetchLLMResponse(preferences) {
  await new Promise((res) => setTimeout(res, 1500));

  const lowerInput = preferences.toLowerCase();

  if (
    lowerInput.includes('place an order') &&
    (lowerInput.includes('e-commerce') || lowerInput.includes('ecommerce'))
  ) {
    return [
      'Go to the required e-commerce website and sign-in using your credentials.',
      'Add the required product to the cart.',
      'Open the cart.',
      'Select the payment method through which you want to pay from.',
      'Make payment by providing the required payment details. (Example: card details, UPI details, etc)',
      'Validate your order on Order history page and emails.'
    ];
  }

  // Default help suggestion (split into lines for easier rendering)
  return [
    `✅ You asked: "${preferences}"`,
    '',
    'Here’s how I can help you more:',
    '- For Figma: Review components and design systems.',
    '- For Atlas: View and update project plans.',
    '- For GitHub: Review code, manage pull requests and issues.',
    '- For Test Case Repository: Retrieve, edit, and manage test cases.',
  ];
}

export default function PreferencesForm({
  onNext = () => {},
  data = {},
  setData = () => {},
}) {
  const initialPreferences = String(data?.preferences ?? '');
  const [preferences, setPreferences] = useState(initialPreferences);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const safePreferences = String(preferences ?? '');

    setData((prev) => ({
      ...prev,
      preferences: safePreferences,
    }));

    setLoading(true);
    setResponse('');

    try {
      const answer = await fetchLLMResponse(safePreferences);
      setResponse(answer);
    } catch (err) {
      console.error('Error:', err);
      setResponse(['❗ Sorry, there was an error fetching the response.']);
    } finally {
      setLoading(false);
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    if (Array.isArray(response)) {
      const hasBullets = response.some(line => line.trim().startsWith('-'));
      const questionLine = response.find(line => line.startsWith('✅ You asked:'));
      const otherLines = response.filter(line => line && !line.startsWith('✅ You asked:'));

      if (response.every(line => !line.startsWith('-'))) {
        // Render e-commerce steps as ordered list
        return (
          <ol style={styles.list}>
            {response.map((item, index) => (
              <li key={index} style={styles.listItem}>{item}</li>
            ))}
          </ol>
        );
      }

      // Render default help suggestion with header and bullets
      return (
        <div>
          {questionLine && <p style={styles.questionLine}>{questionLine}</p>}
          <p style={styles.helpHeader}>Here’s how I can help you more:</p>
          <ul style={styles.bulletList}>
            {otherLines
              .filter(line => line.trim().startsWith('-'))
              .map((line, index) => (
                <li key={index} style={styles.bulletItem}>
                  {line.replace(/^-\s*/, '')}
                </li>
              ))}
          </ul>
        </div>
      );
    }

    return <pre style={styles.responseText}>{response}</pre>;
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={styles.header}>How can I help you?</h2>

        <label style={styles.label}>
          <input
            type="text"
            placeholder="Preferences"
            value={preferences}
            onChange={(e) => setPreferences(String(e.target.value ?? ''))}
            required
            style={styles.input}
          />
        </label>

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Searching...' : 'Submit'}
        </button>
      </form>

      {response && (
        <div style={styles.responseBox}>
          <h3 style={styles.responseHeader}>Assistant Response:</h3>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
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
  responseBox: {
    marginTop: '2rem',
    backgroundColor: '#fff',
    maxWidth: '600px',
    width: '100%',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    padding: '1.5rem',
  },
  responseHeader: {
    marginBottom: '1rem',
    color: '#4a90e2',
    fontSize: '1.4rem',
  },
  questionLine: {
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#333',
  },
  helpHeader: {
    marginTop: '1rem',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    color: '#333',
  },
  responseText: {
    whiteSpace: 'pre-wrap',
    fontFamily: 'monospace',
    color: '#333',
  },
  list: {
    paddingLeft: '1.5rem',
    color: '#333',
    fontSize: '1rem',
    lineHeight: '1.5',
  },
  listItem: {
    marginBottom: '0.75rem',
  },
  bulletList: {
    paddingLeft: '1.5rem',
    color: '#333',
    fontSize: '1rem',
    lineHeight: '1.5',
  },
  bulletItem: {
    marginBottom: '0.5rem',
  },
};
