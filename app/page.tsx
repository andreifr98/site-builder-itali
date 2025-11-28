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
          zIndex: 0
        }}
      >
        <defs>
          <radialGradient id="particleGlow">
            <stop offset="0%" stopColor="#00bfff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0070f3" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Horizontal flowing particles */}
        {[...Array(8)].map((_, i) => (
          ircle
            key={`h-${i}`}
            r="3"
            fill="url(#particleGlow)"
            style={{
              animation: `flowHorizontal ${20 + i * 2}s linear infinite`,
              animationDelay: `${i * 2.5}s`
            }}
          >
            <animateMotion
              dur={`${20 + i * 2}s`}
              repeatCount="indefinite"
              path={`M 0,${100 + i * 80} Q 400,${80 + i * 80} 800,${100 + i * 80} T 1600,${100 + i * 80}`}
            />
          </circle>
        ))}

        {/* Vertical flowing particles */}
        {[...Array(6)].map((_, i) => (
          ircle
            key={`v-${i}`}
            r="2.5"
            fill="url(#particleGlow)"
            style={{
              animation: `flowVertical ${25 + i * 3}s linear infinite`,
              animationDelay: `${i * 3}s`
            }}
          >
            <animateMotion
              dur={`${25 + i * 3}s`}
              repeatCount="indefinite"
              path={`M ${200 + i * 200},0 Q ${180 + i * 200},400 ${200 + i * 200},800 T ${200 + i * 200},1600`}
            />
          </circle>
        ))}

        {/* Diagonal crossing particles */}
        {[...Array(6)].map((_, i) => (
          ircle
            key={`d-${i}`}
            r="2"
            fill="#00bfff"
            opacity="0.4"
            style={{
              animation: `flowDiagonal ${30 + i * 2}s linear infinite`,
              animationDelay: `${i * 4}s`
            }}
          >
            <animateMotion
              dur={`${30 + i * 2}s`}
              repeatCount="indefinite"
              path={`M 0,${i * 150} L 1600,${800 + i * 100}`}
            />
          </circle>
        ))}
      </svg>

      {/* Subtle gradient overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(0, 112, 243, 0.05) 0%, transparent 50%)',
        zIndex: 0
      }} />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        :global(.feature-card) {
          transition: all 0.3s ease;
        }

        :global(.feature-card:hover) {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 191, 255, 0.2);
          border-color: rgba(0, 191, 255, 0.4) !important;
        }

        :global(.reason-card) {
          transition: all 0.3s ease;
          cursor: default;
        }

        :global(.reason-card:hover) {
          transform: scale(1.02);
          box-shadow: 0 20px 50px rgba(0, 112, 243, 0.3);
        }

        @media (max-width: 768px) {
          h1 { font-size: 48px !important; }
          h2 { font-size: 32px !important; }
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
        borderBottom: '1px solid rgba(255,255,255,0.05)',
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
            transition: 'all 0.3s ease'
          }}>
            Inizia Gratis
          </a>
        </div>
      </nav>

      {/* Content Container */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Hero Section */}
        <div style={{
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
              backgroundClip: 'text'
            }}>
              Il Tuo Sito Web<br/>in 5 Minuti
            </h1>
            <p style={{ 
              fontSize: '24px', 
              color: 'rgba(255,255,255,0.7)',
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
              transition: 'all 0.3s ease',
              display: 'inline-block'
            }}>
              Crea il Tuo Sito →
            </a>
            <a href="#perche" style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              color: 'white',
              padding: '18px 48px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '18px',
              fontWeight: 'bold',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.3s ease',
              display: 'inline-block'
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
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)'
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

        {/* NUOVA SEZIONE: Perché Dovresti Avere un Sito */}
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
              {/* Motivo 1: SEO */}
              <div className="reason-card" style={{
                background: 'rgba(255,255,255,0.03)',
                padding: '50px 40px',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.1)',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '60px',
                  marginBottom: '25px'
                }}>🔍</div>
                <h3 style={{
                  fontSize: '26px',
                  marginBottom: '20px',
                  color: '#00bfff'
                }}>
                  Visibilità su Google
                </h3>
                <p style={{
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: '1.8',
                  fontSize: '17px'
                }}>
                  I tuoi clienti ti cercano online. Con un sito ottimizzato SEO appari su Google quando cercano servizi come il tuo nella tua zona. Più visibilità = più clienti.
                </p>
              </div>

              {/* Motivo 2: Professionalità */}
              <div className="reason-card" style={{
                background: 'rgba(255,255,255,0.03)',
                padding: '50px 40px',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.1)',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '60px',
                  marginBottom: '25px'
                }}>✨</div>
                <h3 style={{
                  fontSize: '26px',
                  marginBottom: '20px',
                  color: '#00bfff'
                }}>
                  Presentazione Professionale
                </h3>
                <p style={{
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: '1.8',
                  fontSize: '17px'
                }}>
                  Un sito web moderno trasmette fiducia e professionalità. I clienti si fidano di più di attività con una presenza online curata e aggiornata.
                </p>
              </div>

              {/* Motivo 3: Prezzo Imbattibile */}
              <div className="reason-card" style={{
                background: 'linear-gradient(135deg, rgba(0, 112, 243, 0.1) 0%, rgba(0, 191, 255, 0.05) 100%)',
                padding: '50px 40px',
                borderRadius: '20px',
                border: '1px solid rgba(0, 191, 255, 0.3)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
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
                <div style={{
                  fontSize: '60px',
                  marginBottom: '25px'
                }}>💰</div>
                <h3 style={{
                  fontSize: '26px',
                  marginBottom: '20px',
                  color: '#00bfff'
                }}>
                  Solo €19 all'Anno
                </h3>
                <p style={{
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: '1.8',
                  fontSize: '17px'
                }}>
                  Altri servizi costano €300-1000. Noi ti offriamo un sito professionale completo a meno di €2 al mese. Prezzo che non trovi da nessun'altra parte.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
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

        {/* NUOVA SEZIONE: Siti Più Complessi */}
        <div style={{
          background: 'rgba(0, 191, 255, 0.03)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: '100px 40px'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '42px',
              fontWeight: 'bold',
              marginBottom: '30px',
              color: 'white'
            }}>
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
              style={{
                display: 'inline-block',
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: 'white',
                padding: '18px 48px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '18px',
                fontWeight: 'bold',
                border: '1px solid rgba(255,255,255,0.2)',
                transition: 'all 0.3s ease'
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

        {/* CTA Section */}
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
            backdropFilter: 'blur(20px)',
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
              transition: 'all 0.3s ease'
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
