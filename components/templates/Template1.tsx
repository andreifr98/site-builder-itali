type Site = {
  businessName: string;
  category: string;
  description: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  hours: string | null;
};

type Props = {
  site: Site;
};

export default function Template1({ site }: Props) {
  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeInUp 0.8s ease-out forwards; }
        @media (max-width: 768px) {
          .hero-title { font-size: 36px !important; }
          .hero-desc { font-size: 16px !important; }
          .nav { padding: 15px 20px !important; }
          .info-grid { grid-template-columns: 1fr !important; }
          .cta-buttons { flex-direction: column !important; }
        }
      `}</style>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <nav className="nav" style={{
          padding: '25px 50px',
          background: 'rgba(0,0,0,0.2)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', letterSpacing: '1px' }}>
            {site.businessName}
          </h1>
          <div style={{ display: 'flex', gap: '30px', fontSize: '15px' }}>
            <a href="#info" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Info</a>
            <a href="#contatti" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Contatti</a>
          </div>
        </nav>

        <div style={{
          padding: '120px 40px',
          textAlign: 'center',
          maxWidth: '1000px',
          margin: '0 auto'
        }} className="fade-in">
          <div style={{ 
            fontSize: '96px', 
            marginBottom: '30px',
            animation: 'float 3s ease-in-out infinite'
          }}>
            {site.category === 'ristorante' && '🍝'}
            {site.category === 'bar' && '☕'}
            {site.category === 'parrucchiere' && '💇'}
            {site.category === 'negozio' && '🛍️'}
            {site.category === 'artigiano' && '🔨'}
          </div>
          <h1 className="hero-title" style={{
            fontSize: '64px',
            fontWeight: 'bold',
            marginBottom: '25px',
            lineHeight: '1.2',
            textShadow: '0 4px 20px rgba(0,0,0,0.2)'
          }}>
            {site.businessName}
          </h1>
          {site.description && (
            <p className="hero-desc" style={{
              fontSize: '22px',
              lineHeight: '1.7',
              color: 'rgba(255,255,255,0.95)',
              marginBottom: '50px',
              maxWidth: '700px',
              margin: '0 auto 50px'
            }}>
              {site.description}
            </p>
          )}
          <div className="cta-buttons" style={{ 
            display: 'flex', 
            gap: '20px', 
            justifyContent: 'center', 
            flexWrap: 'wrap' 
          }}>
            <a
              href={`tel:${site.phone}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '18px 40px',
                background: 'white',
                color: '#667eea',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '18px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                transition: 'transform 0.3s ease'
              }}
            >
              📞 Chiamaci Ora
            </a>
            <a
              href={`mailto:${site.email}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '18px 40px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '18px',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,255,255,0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              ✉️ Invia Email
            </a>
          </div>
        </div>

        <div id="info" style={{
          background: 'rgba(0,0,0,0.25)',
          backdropFilter: 'blur(20px)',
          padding: '80px 40px'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ 
              fontSize: '42px', 
              textAlign: 'center', 
              marginBottom: '60px',
              fontWeight: 'bold'
            }}>
              Come Trovarci
            </h2>
            <div className="info-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '30px'
            }}>
              {site.address && (
                <div style={{
                  background: 'rgba(255,255,255,0.1)',
                  padding: '40px 30px',
                  borderRadius: '20px',
                  textAlign: 'center',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  transition: 'transform 0.3s ease'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '20px' }}>📍</div>
                  <h3 style={{ fontSize: '20px', marginBottom: '15px', fontWeight: 'bold' }}>Dove Siamo</h3>
                  <p style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.6', fontSize: '16px' }}>{site.address}</p>
                </div>
              )}

              <div style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '40px 30px',
                borderRadius: '20px',
                textAlign: 'center',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                transition: 'transform 0.3s ease'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>📞</div>
                <h3 style={{ fontSize: '20px', marginBottom: '15px', fontWeight: 'bold' }}>Telefono</h3>
                <a href={`tel:${site.phone}`} style={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  fontSize: '18px',
                  fontWeight: '500'
                }}>
                  {site.phone}
                </a>
              </div>

              {site.hours && (
                <div style={{
                  background: 'rgba(255,255,255,0.1)',
                  padding: '40px 30px',
                  borderRadius: '20px',
                  textAlign: 'center',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  transition: 'transform 0.3s ease'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '20px' }}>🕐</div>
                  <h3 style={{ fontSize: '20px', marginBottom: '15px', fontWeight: 'bold' }}>Orari</h3>
                  <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px' }}>{site.hours}</p>
                </div>
              )}

              <div style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '40px 30px',
                borderRadius: '20px',
                textAlign: 'center',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                transition: 'transform 0.3s ease'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>✉️</div>
                <h3 style={{ fontSize: '20px', marginBottom: '15px', fontWeight: 'bold' }}>Email</h3>
                <a href={`mailto:${site.email}`} style={{ 
                  color: 'white', 
                  textDecoration: 'none', 
                  wordBreak: 'break-all',
                  fontSize: '16px'
                }}>
                  {site.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div id="contatti" style={{
          padding: '50px 40px',
          textAlign: 'center',
          background: 'rgba(0,0,0,0.3)',
          fontSize: '15px',
          color: 'rgba(255,255,255,0.8)'
        }}>
          <p style={{ marginBottom: '15px' }}>© 2025 {site.businessName}. Tutti i diritti riservati.</p>
          <p>
            Sito creato con <a href="/" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }}>SitoFacile ⚡</a>
          </p>
        </div>
      </div>
    </>
  );
}
