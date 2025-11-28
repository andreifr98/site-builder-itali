export default function Home() {
  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '40px 20px',
    }}>
      <header style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px', color: '#0070f3' }}>
          🚀 SitoFacile
        </h1>
        <p style={{ fontSize: '24px', color: '#666', marginBottom: '10px' }}>
          Il Tuo Sito Web in 5 Minuti
        </p>
        <p style={{ fontSize: '18px', color: '#999' }}>
          Per ristoranti, bar, negozi e professionisti italiani
        </p>
        <div style={{ marginTop: '40px' }}>
          <a href="/signup" style={{
            backgroundColor: '#0070f3',
            color: 'white',
            padding: '16px 48px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: 'bold',
            display: 'inline-block',
            boxShadow: '0 4px 12px rgba(0,112,243,0.3)'
          }}>
            Inizia Gratis →
          </a>
        </div>
      </header>

      <section style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '30px',
        marginTop: '80px'
      }}>
        <div style={{ 
          textAlign: 'center', 
          padding: '30px',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>📱</div>
          <h3 style={{ marginBottom: '15px' }}>1. Scegli Categoria</h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            Ristorante, bar, negozio o professionista
          </p>
        </div>
        <div style={{ 
          textAlign: 'center', 
          padding: '30px',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>✍️</div>
          <h3 style={{ marginBottom: '15px' }}>2. Inserisci Info</h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            Nome, indirizzo, foto - fatto!
          </p>
        </div>
        <div style={{ 
          textAlign: 'center', 
          padding: '30px',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🚀</div>
          <h3 style={{ marginBottom: '15px' }}>3. Pubblica</h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            Il tuo sito è online subito
          </p>
        </div>
      </section>

      <section style={{ 
        textAlign: 'center', 
        marginTop: '100px',
        padding: '60px 20px',
        backgroundColor: '#0070f3',
        borderRadius: '16px',
        color: 'white'
      }}>
        <h2 style={{ fontSize: '36px', marginBottom: '20px' }}>
          Solo 19€ all'anno
        </h2>
        <p style={{ fontSize: '20px', opacity: 0.9 }}>
          Nessun costo nascosto. Cancella quando vuoi.
        </p>
      </section>
    </div>
  );
}
