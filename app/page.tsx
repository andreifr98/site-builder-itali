'use client';

export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a1128 0%, #001f54 50%, #034078 100%)',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(0, 112, 243, 0.1) 0%, transparent 50%),
                          radial-gradient(circle at 80% 80%, rgba(0, 191, 255, 0.1) 0%, transparent 50%),
                          radial-gradient(circle at 40% 20%, rgba(3, 64, 120, 0.2) 0%, transparent 50%)`,
        animation: 'pulse 15s ease-in-out infinite',
        zIndex: 0
      }} />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'linear-gradient(rgba(0, 112, 243, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 112, 243, 0.05) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        zIndex: 0
      }} />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .feature-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 40px rgba(0, 112, 243, 0.3);
        }
      `}</style>

      {/* Navigation */}
      <nav style={{
        position: 'relative',
        zIndex: 10,
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '1px' }}>
          SitoFacile
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="/login" style={{ 
            color: 'white', 
            textDecoration: 'none',
            opacity: 0.8,
            transition: 'opacity 0.3s'
          }}>
            Accedi
          </a>
          <a href="/signup" style={{
            backgroundColor: '#0070f3',
            color: 'white',
            padding: '10px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '500',
            boxShadow: '0 4px 15px rgba(0, 112, 243, 0.4)'
          }}>
            Inizia Gratis
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '100px 40px',
        textAlign: 'center'
      }}>
        <div style={{
          animation: 'slideUp 0.8s ease-out',
          marginBottom: '30px'
        }}>
          <h1 style={{ 
            fontSize: '64px', 
            fontWeight: '700',
            marginBottom: '20px',
            lineHeight: '1.2',
            background: 'linear-gradient(135deg, #ffffff 0%, #00bfff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Il Tuo Sito Web<br/>in 5 Minuti
          </h1>
          <p style={{ 
            fontSize: '24px', 
            color: 'rgba(255,255,255,0.8)',
            marginBottom: '40px',
            lineHeight: '1.6'
          }}>
            Creazione automatica di siti web professionali<br/>
            per ristoranti, negozi e professionisti italiani
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          marginBottom: '80px',
          animation: 'slideUp 1s ease-out'
        }}>
          <a href="/create" style={{
            backgroundColor: '#0070f3',
            color: 'white',
            padding: '18px 48px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: 'bold',
            boxShadow: '0 8px 30px rgba(0, 112, 243, 0.5)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            display: 'inline-block'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 112, 243, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 112, 243, 0.5)';
          }}>
            Crea il Tuo Sito →
          </a>
          <a href="#features" style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            color: 'white',
            padding: '18px 48px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: 'bold',
            border: '1px solid rgba(255,255,255,0.2)',
            transition: 'all 0.3s ease',
            display: 'inline-block'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
          }}>
            Scopri di Più
          </a>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '40px',
          marginBottom: '100px'
        }}>
          <div>
            <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>5 min</div>
            <div style={{ color: 'rgba(255,255,255,0.7)' }}>Tempo di creazione</div>
          </div>
          <div>
            <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>€19</div>
            <div style={{ color: 'rgba(255,255,255,0.7)' }}>All'anno</div>
          </div>
          <div>
            <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>100%</div>
            <div style={{ color: 'rgba(255,255,255,0.7)' }}>Responsive</div>
          </div>
        </div>

        {/* Features */}
        <div id="features" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          marginTop: '100px'
        }}>
          {[
            { title: 'Setup Automatico', desc: 'Scegli categoria, inserisci dati, pubblicato' },
            { title: 'Template Moderni', desc: 'Design professionali ottimizzati per mobile' },
            { title: 'Google Maps Integrato', desc: 'Mappa automatica dal tuo indirizzo' },
            { title: 'Zero Codice', desc: 'Nessuna competenza tecnica richiesta' },
            { title: 'SEO Ottimizzato', desc: 'Indicizzazione automatica sui motori di ricerca' },
            { title: 'Supporto Italiano', desc: 'Assistenza in italiano quando serve' }
          ].map((feature, i) => (
            <div key={i} className="feature-card" style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              padding: '40px 30px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              textAlign: 'left'
            }}>
              <h3 style={{ 
                fontSize: '22px', 
                marginBottom: '15px',
                color: '#00bfff'
              }}>
                {feature.title}
              </h3>
              <p style={{ 
                color: 'rgba(255,255,255,0.7)',
                lineHeight: '1.6'
              }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div style={{
          marginTop: '120px',
          padding: '80px 40px',
          background: 'linear-gradient(135deg, rgba(0, 112, 243, 0.2) 0%, rgba(0, 191, 255, 0.2) 100%)',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)'
        }}>
          <h2 style={{ fontSize: '42px', marginBottom: '20px' }}>
            Pronto a Iniziare?
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255,255,255,0.8)',
            marginBottom: '40px'
          }}>
            Crea il tuo sito professionale in meno tempo di quanto ci vuole per un caffè
          </p>
          <a href="/signup" style={{
            backgroundColor: 'white',
            color: '#0a1128',
            padding: '18px 48px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: 'bold',
            display: 'inline-block',
            boxShadow: '0 8px 30px rgba(255,255,255,0.3)',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            Inizia Ora Gratis
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        padding: '40px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        marginTop: '80px',
        color: 'rgba(255,255,255,0.6)'
      }}>
        <p>© 2025 SitoFacile. Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
}
