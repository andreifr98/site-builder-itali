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
      {/* Animated particles CSS only */}
      <div className="particles">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Animated gradient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Grid overlay */}
      <div className="grid-overlay" />

      <style jsx>{`
        .particles {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }
        
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(0, 191, 255, 0.6);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(0, 191, 255, 0.8),
                      0 0 20px rgba(0, 191, 255, 0.4);
          animation: float-particle 20s infinite ease-in-out;
        }

        @keyframes float-particle {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          50% {
            transform: translate(
              ${Math.random() > 0.5 ? '' : '-'}${50 + Math.random() * 100}px,
              ${Math.random() > 0.5 ? '' : '-'}${50 + Math.random() * 100}px
            );
          }
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          z-index: 0;
        }

        .orb-1 {
          top: 10%;
          left: 10%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(0, 112, 243, 0.4) 0%, transparent 70%);
          animation: float-orb-1 20s ease-in-out infinite;
        }

        .orb-2 {
          top: 60%;
          right: 10%;
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(0, 191, 255, 0.3) 0%, transparent 70%);
          animation: float-orb-2 15s ease-in-out infinite;
        }

        .orb-3 {
          bottom: 10%;
          left: 50%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(3, 64, 120, 0.4) 0%, transparent 70%);
          animation: float-orb-3 18s ease-in-out infinite;
        }

        @keyframes float-orb-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes float-orb-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(0.9); }
          66% { transform: translate(30px, -20px) scale(1.1); }
        }

        @keyframes float-orb-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -40px) scale(1.05); }
        }

        .grid-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(0, 191, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 191, 255, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          z-index: 0;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(0, 191, 255, 0.4),
                        0 0 40px rgba(0, 191, 255, 0.2);
          }
          50% {
            box-shadow: 0 0 30px rgba(0, 191, 255, 0.6),
                        0 0 60px rgba(0, 191, 255, 0.3);
          }
        }

        :global(.feature-card) {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }

        :global(.feature-card::before) {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(0, 191, 255, 0.1) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        :global(.feature-card:hover::before) {
          opacity: 1;
        }

        :global(.feature-card:hover) {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 60px rgba(0, 191, 255, 0.4);
          border-color: rgba(0, 191, 255, 0.5) !important;
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
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        animation: 'fadeIn 1s ease-out'
      }}>
        <div style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          letterSpacing: '1px',
          background: 'linear-gradient(135deg, #ffffff 0%, #00bfff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          SitoFacile
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
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
            boxShadow: '0 4px 15px rgba(0, 112, 243, 0.4)',
            transition: 'all 0.3s ease'
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
            fontSize: '72px', 
            fontWeight: '700',
            marginBottom: '20px',
            lineHeight: '1.2',
            background: 'linear-gradient(135deg, #ffffff 0%, #00bfff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'pulse-glow 3s ease-in-out infinite'
          }}>
            Il Tuo Sito Web<br/>in 5 Minuti
          </h1>
          <p style={{ 
            fontSize: '24px', 
            color: 'rgba(255,255,255,0.8)',
            marginBottom: '40px',
            lineHeight: '1.6',
            animation: 'fadeIn 1.2s ease-out'
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
          animation: 'scaleIn 1s ease-out',
          flexWrap: 'wrap'
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
            transition: 'all 0.3s ease',
            display: 'inline-block',
            border: 'none'
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
            display: 'inline-block',
            backdropFilter: 'blur(10px)'
          }}>
            Scopri di Più
          </a>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '100px',
          animation: 'fadeIn 1.5s ease-out'
        }}>
          {[
            { label: '5 min', desc: 'Tempo di creazione' },
            { label: '€19', desc: "All'anno" },
            { label: '100%', desc: 'Responsive' }
          ].map((stat, i) => (
            <div key={i} style={{
              padding: '30px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              transition: 'transform 0.3s ease'
            }}>
              <div style={{ 
                fontSize: '48px', 
                fontWeight: 'bold', 
                marginBottom: '10px',
                background: 'linear-gradient(135deg, #ffffff 0%, #00bfff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>{stat.label}</div>
              <div style={{ color: 'rgba(255,255,255,0.7)' }}>{stat.desc}</div>
            </div>
          ))}
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
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              textAlign: 'left',
              animation: `scaleIn ${1.2 + i * 0.1}s ease-out`
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
          border: '1px solid rgba(255,255,255,0.2)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 60px rgba(0, 191, 255, 0.2)'
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
            transition: 'all 0.3s ease'
          }}>
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
        color: 'rgba(255,255,255,0.6)',
        backdropFilter: 'blur(10px)'
      }}>
        <p>© 2025 SitoFacile. Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
}
