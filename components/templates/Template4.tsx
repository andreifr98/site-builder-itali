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

export default function Template4({ site }: Props) {
  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .bounce { animation: bounce 2s ease-in-out infinite; }
        @media (max-width: 768px) {
          .colorful-title { font-size: 48px !important; }
          .colorful-desc { font-size: 18px !important; }
          .colorful-tags { flex-direction: column !important; }
        }
      `}</style>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #FFA07A)',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
        color: '#fff'
      }}>
        <div style={{
          minHeight: '100vh',
          backdropFilter: 'blur(150px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '60px 40px',
          textAlign: 'center'
        }}>
          <div className="bounce" style={{ fontSize: '140px', marginBottom: '40px' }}>
            {site.category === 'ristorante' && '🍝'}
            {site.category === 'bar' && '☕'}
            {site.category === 'parrucchiere' && '💇'}
            {site.category === 'negozio' && '🛍️'}
            {site.category === 'artigiano' && '🔨'}
          </div>
          <h1 className="colorful-title" style={{ 
            fontSize: '80px', 
            fontWeight: 'bold', 
            marginBottom: '25px',
            textShadow: '0 8px 30px rgba(0,0,0,0.3)'
          }}>
            {site.businessName}
          </h1>
          {site.description && (
            <p className="colorful-desc" style={{ 
              fontSize: '26px', 
              marginBottom: '60px', 
              maxWidth: '800px', 
              lineHeight: '1.6',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}>
              {site.description}
            </p>
          )}

          <div className="colorful-tags" style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '25px',
            justifyContent: 'center',
            marginTop: '50px',
            fontSize: '18px',
            maxWidth: '900px'
          }}>
            {site.address && (
              <div style={{ 
                background: 'rgba(255,255,255,0.25)', 
                padding: '20px 35px', 
                borderRadius: '50px',
                backdropFilter: 'blur(10px)',
                fontWeight: '500',
                boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
              }}>
                📍 {site.address}
              </div>
            )}
            <a href={`tel:${site.phone}`} style={{ 
              background: 'rgba(255,255,255,0.25)', 
              padding: '20px 35px', 
              borderRadius: '50px', 
              color: '#fff', 
              textDecoration: 'none',
              backdropFilter: 'blur(10px)',
              fontWeight: '500',
              boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
              transition: 'transform 0.3s ease'
            }}>
              📞 {site.phone}
            </a>
            <a href={`mailto:${site.email}`} style={{ 
              background: 'rgba(255,255,255,0.25)', 
              padding: '20px 35px', 
              borderRadius: '50px', 
              color: '#fff', 
              textDecoration: 'none',
              backdropFilter: 'blur(10px)',
              fontWeight: '500',
              boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
              transition: 'transform 0.3s ease'
            }}>
              ✉️ Email
            </a>
            {site.hours && (
              <div style={{ 
                background: 'rgba(255,255,255,0.25)', 
                padding: '20px 35px', 
                borderRadius: '50px',
                backdropFilter: 'blur(10px)',
                fontWeight: '500',
                boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
              }}>
                🕐 {site.hours}
              </div>
            )}
          </div>

          <footer style={{ marginTop: '120px', fontSize: '15px', opacity: 0.9 }}>
            <p style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
              Powered by <a href="/" style={{ color: '#fff', fontWeight: 'bold', textDecoration: 'none' }}>SitoFacile ✨</a>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
