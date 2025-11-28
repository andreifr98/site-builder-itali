export default function Dashboard() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px' }}>
      <h1>I Tuoi Siti</h1>
      <p>Qui vedrai la lista dei siti che hai creato</p>
      <a 
        href="/create"
        style={{
          display: 'inline-block',
          marginTop: '20px',
          padding: '12px 30px',
          backgroundColor: '#0070f3',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '6px'
        }}
      >
        + Crea Nuovo Sito
      </a>
    </div>
  );
}
