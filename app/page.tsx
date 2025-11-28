export default function Home() {
  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
          Il Tuo Sito Web in 5 Minuti
        </h1>
        <p style={{ fontSize: '20px', color: '#666' }}>
          Per ristoranti, bar, negozi e professionisti italiani
        </p>
        <div style={{ marginTop: '30px' }}>
          <a href="/signup" style={{
            backgroundColor: '#0070f3',
            color: 'white',
            padding: '15px 40px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '18px',
            display: 'inline-block'
          }}>
            Inizia Gratis
          </a>
        </div>
      </header>

      <section style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '30px',
        marginTop: '60px'
      }}>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h3>1. Scegli Categoria</h3>
          <p>Ristorante, bar, negozio o professionista</p>
        </div>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h3>2. Inserisci Info</h3>
          <p>Nome, indirizzo, foto - fatto!</p>
        </div>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h3>3. Pubblica</h3>
          <p>Il tuo sito è online subito</p>
        </div>
      </section>
    </div>
  );
}
