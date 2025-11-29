'use client';

export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#050a1e',
      color: 'white',
      padding: '40px',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '48px', marginTop: '100px' }}>SitoFacile</h1>
      <p style={{ fontSize: '24px', marginTop: '20px' }}>Il Tuo Sito Web in 5 Minuti</p>
      <a href="/create" style={{
        display: 'inline-block',
        marginTop: '40px',
        padding: '18px 48px',
        backgroundColor: '#0070f3',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '8px',
        fontSize: '18px'
      }}>
        Crea Ora →
      </a>
    </div>
  );
}
