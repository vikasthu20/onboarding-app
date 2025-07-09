import React, { useState } from 'react';

export default function UserInfoForm({ onNext, data, setData }) {
  const [name, setName] = useState(data.name || '');
  const [email, setEmail] = useState(data.email || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    setData((prev) => ({ ...prev, name, email }));
    onNext();
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={styles.header}>Fill your information</h2>
        <input
          style={styles.input}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
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
