'use client';

export default function Signup() {
  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '100px auto', 
      padding: '40px',
      border: '1px solid #ddd',
      borderRadius: '8px'
    }}>
      <h1 style={{ marginBottom: '30px' }}>Registrati</h1>
      <input 
        type="email" 
        placeholder="Email" 
        style={{ 
          width: '100%', 
          padding: '12px', 
          marginBottom: '15px',
          fontSize: '16px'
        }} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        style={{ 
          width: '100%', 
          padding: '12px', 
          marginBottom: '20px',
          fontSize: '16px'
        }} 
      />
      <button style={{
        width: '100%',
        padding: '12px',
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '16px',
        cursor: 'pointer'
      }}>
        Crea Account
      </button>
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Hai già un account? <a href="/login">Accedi</a>
      </p>
    </div>
  );
}
