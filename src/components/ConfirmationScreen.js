import React from 'react';

export default function ConfirmationScreen({ data }) {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.header}>Results</h2>
        <p style={styles.subtext}>Here's what the results:</p>
        <ul style={styles.list}>
          <li><span style={styles.label}>Name:</span> {data.name}</li>
          <li><span style={styles.label}>Email:</span> {data.email}</li>
          <li><span style={styles.label}>Preferences:</span> {Object.entries(data?.preferences).map(([key, value]) => (
        <div key={key}>
          {key}: {value}
        </div>
      ))}</li>
        </ul>
        <p style={styles.thankYou}>✅ Thank you for using AI!</p>
      </div>
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
    maxWidth: '500px',
    width: '100%',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    padding: '2rem',
    textAlign: 'center',
  },
  header: {
    marginBottom: '1rem',
    color: '#4a90e2',
    fontSize: '2rem',
  },
  subtext: {
    marginBottom: '1.5rem',
    color: '#555',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    marginBottom: '1.5rem',
    textAlign: 'left',
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  thankYou: {
    color: '#4caf50',
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
};
