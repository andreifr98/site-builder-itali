'use client';

export default function Home() {
  return (
    <>
      <style jsx global>{`
        @keyframes float-particle {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), var(--ty));
            opacity: 0;
          }
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
            text-shadow: 0 0 20px rgba(0, 191, 255, 0.3);
          }
          50% {
            text-shadow: 0 0 40px rgba(0, 191, 255, 0.6);
          }
        }

        .particles {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }
        
        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: rgba(0, 191, 255, 0.8);
          border-radius: 50%;
          box-shadow: 
            0 0 10px rgba(0, 191, 255, 1),
            0 0 20px rgba(0, 191, 255, 0.6),
            0 0 30px rgba(0, 191, 255, 0.3);
          animation: float-particle linear infinite;
        }

        .particle::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(0, 191, 255, 0.6) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(3px);
          transform: scale(4);
        }

        .particle::after {
          content: '';
          position: absolute;
          width: 200%;
          height: 200%;
          background: linear-gradient(to right, transparent, rgba(0, 191, 255, 0.3), transparent);
          top: -50%;
          left: -100%;
          filter: blur(5px);
          animation: trail 2s linear infinite;
        }

        @keyframes trail {
          0% { opacity: 0; transform: translateX(0); }
          50% { opacity: 0.5; }
          100% { opacity: 0; transform: translateX(-100px); }
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          z-index: 0;
          opacity: 0.6;
        }

        .orb-1 {
          top: 10%;
          left: 10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(0, 112, 243, 0.3) 0%, transparent 70%);
          animation: float-orb-1 20s ease-in-out infinite;
        }

        .orb-2 {
          top: 60%;
          right: 10%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(0, 191, 255, 0.2) 0%, transparent 70%);
          animation: float-orb-2 15s ease-in-out infinite;
        }

        .orb-3 {
          bottom: 10%;
          left: 50%;
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(3, 64, 120, 0.3) 0%, transparent 70%);
          animation: float-orb-3 18s ease-in-out infinite;
        }

        .grid-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(0, 191, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 191, 255, 0.02) 1px, transparent 1px);
          background-size: 50px 50px;
          z-index: 0;
        }

        .feature-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .feature-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 60px rgba(0, 191, 255, 0.4);
          border-color: rgba(0, 191, 255, 0.5) !important;
        }

        .reason-card {
          transition: all 0.3s ease;
        }

        .reason-card:hover {
          transform: scale(1.02);
          box-shadow: 0 20px 50px rgba(0, 112, 243, 0.3);
        }

        .animated-title {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .slide-up {
          animation: slideUp 0.8s ease-out;
        }

        .fade-in {
          animation: fadeIn 1.2s ease-out;
        }

        .scale-in {
          animation: scaleIn 1s ease-out;
        }
      `}</style>

      <div style={{ 
        minHeight: '100vh',
        background: '#020510',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated particles con scia */}
        <div className="particles">
          {[...Array(60)].map((_, i) => {
            const tx = (Math.random() - 0.5) * 800;
            const ty = (Math.random() - 0.5) * 800;
            return (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 25}s`,
                  animationDuration: `${20 + Math.random() * 15}s`,
                  '--tx': `${tx}px`,
                  '--ty': `${ty}px`
                } as React.CSSProperties}
              />
            );
          })}
        </div>

        {/* Animated gradient orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        {/* Grid overlay */}
        <div className="grid-overlay" />

        {/* Navigation */}
        <nav className="fade-in" style={{
          position: 'relative',
          zIndex: 10,
          padding: '20px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)'
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
              opacity: 0.7,
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
          <div className="slide-up" style={{ marginBottom: '30px' }}>
            <h1 className="animated-title" style={{ 
              fontSize: '72px', 
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
            <p className="fade-in" style={{ 
              fontSize: '24px', 
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '40px',
              lineHeight: '1.6'
            }}>
              Creazione automatica di siti web professionali<br/>
              per ristoranti, negozi e professionisti italiani
            </p>
          </div>

          <div className="scale-in" style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            marginBottom: '80px',
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
              display: 'inline-block'
            }}>
              Crea il Tuo Sito →
            </a>
            <a href="#perche" style={{
              backgroundColor: 'rgba(255,255,255,0.03)',
              color: 'white',
              padding: '18px 48px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '18px',
              fontWeight: 'bold',
              border: '1px solid rgba(255,255,255,0.1)',
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
            marginBottom: '100px'
          }}>
            {[
              { label: '5 min', desc: 'Tempo di creazione' },
              { label: '€19', desc: "All'anno" },
              { label: '100%', desc: 'Responsive' }
            ].map((stat, i) => (
              <div key={i} style={{
                padding: '30px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.05)',
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
                <div style={{ color: 'rgba(255,255,255,0.6)' }}>{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Perché Section - SENZA EMOJI */}
        <div id="perche" style={{
          background: 'rgba(0, 112, 243, 0.02)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          padding: '100px 40px',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '60px',
              background: 'linear-gradient(135deg, #ffffff 0%, #00bfff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Perché Dovresti Avere un Sito con Noi
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px'
            }}>
              <div className="reason-card" style={{
                background: 'rgba(255,255,255,0.02)',
                padding: '50px 40px',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.05)',
                textAlign: 'center',
                backdropFilter: 'blur(10px)'
              }}>
                <h3 style={{ fontSize: '26px', marginBottom: '20px', color: '#00bfff' }}>
                  Visibilità su Google
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', fontSize: '17px' }}>
                  I tuoi clienti ti cercano online. Con un sito ottimizzato SEO appari su Google quando cercano servizi come il tuo nella tua zona. Più visibilità = più clienti.
                </p>
              </div>

              <div className="reason-card" style={{
                background: 'rgba(255,255,255,0.02)',
                padding: '50px 40px',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.05)',
                textAlign: 'center',
                backdropFilter: 'blur(10px)'
              }}>
                <h3 style={{ fontSize: '26px', marginBottom: '20px', color: '#00bfff' }}>
                  Presentazione Professionale
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', fontSize: '17px' }}>
                  Un sito web moderno trasmette fiducia e professionalità. I clienti si fidano di più di attività con una presenza online curata e aggiornata.
                </p>
              </div>

              <div className="reason-card" style={{
                background: 'linear-gradient(135deg, rgba(0, 112, 243, 0.1) 0%, rgba(0, 191, 255, 0.05) 100%)',
                padding: '50px 40px',
                borderRadius: '20px',
                border: '1px solid rgba(0, 191, 255, 0.2)',
                textAlign: 'center',
                position: 'relative',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: '#0070f3',
                  color: 'white',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  MIGLIORE OFFERTA
                </div>
                <h3 style={{ fontSize: '26px', marginBottom: '20px', color: '#00bfff', marginTop: '20px' }}>
                  Solo €19 all'Anno
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', fontSize: '17px' }}>
                  Altri servizi costano €300-1000. Noi ti offriamo un sito professionale completo a meno di €2 al mese. Prezzo che non trovi da nessun'altra parte.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '100px 40px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
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
                backgroundColor: 'rgba(255,255,255,0.02)',
                padding: '40px 30px',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.05)',
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
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: '1.6'
                }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Siti Complessi */}
        <div style={{
          background: 'rgba(0, 191, 255, 0.02)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: '100px 40px',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '30px' }}>
              Hai Bisogno di un Sito Più Complesso?
            </h2>
            <p style={{
              fontSize: '20px',
              color: 'rgba(255,255,255,0.6)',
              marginBottom: '40px',
              lineHeight: '1.8'
            }}>
              E-commerce, marketplace, portali personalizzati, sistemi di prenotazione avanzati o applicazioni web su misura. Realizziamo anche progetti complessi.
            </p>
            <a 
              href="mailto:info@sitofacile.it"
              style={{
                display: 'inline-block',
                backgroundColor: 'rgba(255,255,255,0.05)',
                color: 'white',
                padding: '18px 48px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '18px',
                fontWeight: 'bold',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
            >
              Contattaci via Email
            </a>
            <p style={{
              marginTop: '20px',
              color: 'rgba(255,255,255,0.4)',
              fontSize: '16px'
            }}>
              Rispondiamo entro 24 ore
            </p>
          </div>
        </div>

        {/* CTA */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '100px 40px'
        }}>
          <div style={{
            padding: '80px 40px',
            background: 'linear-gradient(135deg, rgba(0, 112, 243, 0.1) 0%, rgba(0, 191, 255, 0.05) 100%)',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(0, 191, 255, 0.1)',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '42px', marginBottom: '20px' }}>
              Pronto a Iniziare?
            </h2>
            <p style={{ 
              fontSize: '20px', 
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '40px'
            }}>
              Crea il tuo sito professionale in meno tempo di quanto ci vuole per un caffè
            </p>
            <a href="/signup" style={{
              backgroundColor: '#0070f3',
              color: 'white',
              padding: '18px 48px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '18px',
              fontWeight: 'bold',
              display: 'inline-block',
              boxShadow: '0 8px 30px rgba(0, 112, 243, 0.4)',
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
          borderTop: '1px solid rgba(255,255,255,0.05)',
          color: 'rgba(255,255,255,0.5)',
          backdropFilter: 'blur(10px)'
        }}>
          <p>© 2025 SitoFacile. Tutti i diritti riservati.</p>
        </footer>
      </div>
    </>
  );
}
