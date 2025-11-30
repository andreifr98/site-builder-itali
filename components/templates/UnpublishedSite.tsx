export default function UnpublishedSite() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#020510',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
      padding: '20px'
    }}>
      <div>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>🚧</h1>
        <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>Sito in costruzione</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)' }}>
          Questo sito non è ancora stato pubblicato.
        </p>
      </div>
    </div>
  );
}
