'use client';

export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#050a1e',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* SVG Animated Particles */}
      <svg 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          opacity: 0.6
        }}
      >
        <defs>
          <radialGradient id="glow">
            <stop offset="0%" stopColor="#00bfff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0070f3" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {[...Array(6)].map((_, i) => (
          ircle
            key={`h${i}`}
            r="3"
            fill="url(#glow)"
          >
            <animateMotion
              dur={`${20 + i * 3}s`}
              repeatCount="indefinite"
              path={`M 0,${100 + i * 100} Q 500,${80 + i * 100} 1000,${100 + i * 100} T 2000,${100 + i * 100}`}
            />
          </circle>
        ))}

        {[...Array(4)].map((_, i) => (
          ircle
            key={`v${i}`}
            r="2.5"
            fill="url(#glow)"
          >
            <animateMotion
              dur={`${25 + i * 4}s`}
              repeatCount="indefinite"
              path={`M ${300 + i * 300},0 Q ${280 + i * 300},500 ${300 + i * 300},1000 T ${300 + i * 300},2000`}
            />
          </circle>
        ))}
      </svg>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hover-scale {
          transition: transform 0.3s ease;
        }
        .hover-scale:hover {
          transform: scale(1.05);
        }
        .card {
          transition: all 0.3s ease;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 191, 255, 0.2);
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
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ 
          fontSize: '24px', 
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #fff 0%, #00bfff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          SitoFacile
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <a href="/login" style={{ 
            color: 'rgba(255,255,255,0.7)', 
            textDecoration: 'none'
          }}>
            Accedi
          </a>
          <a href="/signup" className="hover-scale" style={{
            backgroundColor: '#0070f3',
            color: 'white',
            padding: '10px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '500'
          }}>
            Inizia Gratis
          </a>
        </div>
      </nav>

      <div style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Hero */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '100px 40px',
          textAlign: 'center'
        }}>
          <h1 style={{ 
            fontSize: '72px', 
            fontWeight: '700',
            marginBottom: '20px',
            lineHeight: '1.2',
            background: 'linear-gradient(135deg, #fff 0%, #00bfff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Il Tuo Sito Web<br/>in 5 Minuti
          </h1>
          <p style={{ 
            fontSize: '24px', 
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '40px'
          }}>
            Creazione automatica di siti web professionali<br/>
            per ristoranti, negozi e professionisti italiani
          </p>

          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            marginBottom: '80px',
            flexWrap: 'wrap'
          }}>
            <a href="/create" className="hover-scale" style={{
              backgroundColor: '#0070f3',
              color: 'white',
              padding: '18px 48px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
              Crea il Tuo Sito →
            </a>
            <a href="#perche" className="hover-scale" style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              color: 'white',
              padding: '18px 48px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '18px',
              fontWeight: 'bold',
              border: '1px solid rgba(255,255,255,0.1)'
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
              <div key={i} className="card" style={{
                padding: '30px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <div style={{ 
                  fontSize: '48px', 
                  fontWeight: 'bold', 
                  marginBottom: '10px',
                  background: 'linear-gradient(135deg, #fff 0%, #00bfff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>{stat.label}</div>
                <div style={{ color: 'rgba(255,255,255,0.6)' }}>{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Perché Section */}
        <div id="perche" style={{
          background: 'rgba(0, 112, 243, 0.02)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          padding: '100px 40px'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '60px',
              background: 'linear-gradient(135deg, #fff 0%, #00bfff 100%)',
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
              <div className="card" style={{
                background: 'rgba(255,255,255,0.03)',
                padding: '50px 40px',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.1)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '60px', marginBottom: '25px' }}>🔍</div>
                <h3 style={{ fontSize: '26px', marginBottom: '20px', color: '#00bfff' }}>
                  Visibilità su Google
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', fontSize: '17px' }}>
                  I tuoi clienti ti cercano online. Con un sito ottimizzato SEO appari su Google quando cercano servizi come il tuo nella tua zona. Più visibilità = più clienti.
                </p>
              </div>

              <div className="card" style={{
                background: 'rgba(255,255,255,0.03)',
                padding: '50px 40px',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.1)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '60px', marginBottom: '25px' }}>✨</div>
                <h3 style={{ fontSize: '26px', marginBottom: '20px', color: '#00bfff' }}>
                  Presentazione Professionale
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', fontSize: '17px' }}>
                  Un sito web moderno trasmette fiducia e professionalità. I clienti si fidano di più di attività con una presenza online curata e aggiornata.
                </p>
              </div>

              <div className="card" style={{
                background: 'linear-gradient(135deg, rgba(0, 112, 243, 0.1) 0%, rgba(0, 191, 255, 0.05) 100%)',
                padding: '50px 40px',
                borderRadius: '20px',
                border: '1px solid rgba(0, 191, 255, 0.3)',
                textAlign: 'center',
                position: 'relative'
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
                <div style={{ fontSize: '60px', marginBottom: '25px' }}>💰</div>
                <h3 style={{ fontSize: '26px', marginBottom: '20px', color: '#00bfff' }}>
                  Solo €19 all'Anno
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8', fontSize: '17px' }}>
                  Altri servizi costano €300-1000. Noi ti offriamo un sito professionale completo a meno di €2 al mese. Prezzo che non trovi da nessun'altra parte.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div style={{
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
            ].map((f, i) => (
              <div key={i} className="card" style={{
                background: 'rgba(255,255,255,0.02)',
                padding: '40px 30px',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <h3 style={{ fontSize: '22px', marginBottom: '15px', color: '#00bfff' }}>
                  {f.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Siti Complessi */}
        <div style={{
          background: 'rgba(0, 191, 255, 0.03)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: '100px 40px'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '30px' }}>
              Hai Bisogno di un Sito Più Complesso?
            </h2>
            <p style={{
              fontSize: '20px',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '40px',
              lineHeight: '1.8'
            }}>
              E-commerce, marketplace, portali personalizzati, sistemi di prenotazione avanzati o applicazioni web su misura. Realizziamo anche progetti complessi.
            </p>
            <a 
              href="mailto:info@sitofacile.it"
              className="hover-scale"
              style={{
                display: 'inline-block',
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: 'white',
                padding: '18px 48px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '18px',
                fontWeight: 'bold',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              📧 Contattaci via Email
            </a>
            <p style={{
              marginTop: '20px',
              color: 'rgba(255,255,255,0.5)',
              fontSize: '16px'
            }}>
              Rispondiamo entro 24 ore
            </p>
          </div>
        </div>

        {/* CTA */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '100px 40px'
        }}>
          <div style={{
            padding: '80px 40px',
            background: 'linear-gradient(135deg, rgba(0, 112, 243, 0.15) 0%, rgba(0, 191, 255, 0.1) 100%)',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.1)',
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
            <a href="/signup" className="hover-scale" style={{
              backgroundColor: '#0070f3',
              color: 'white',
              padding: '18px 48px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '18px',
              fontWeight: 'bold',
              display: 'inline-block'
            }}>
              Inizia Ora Gratis
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        padding: '40px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        color: 'rgba(255,255,255,0.5)'
      }}>
        <p>© 2025 SitoFacile. Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
}
