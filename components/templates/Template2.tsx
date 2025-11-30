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

export default function Template2({ site }: Props) {
  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .slide-in { animation: slideIn 0.8s ease-out forwards; }
        @media (max-width: 768px) {
          .minimal-title { font-size: 32px !important; }
          .minimal-nav { padding: 20px !important; flex-direction: column; gap: 15px !important; }
          .contact-info { font-size: 16px !important; }
        }
      `}</style>
      <div style={{ minHeight: '100vh', background: '#ffffff', color: '#000' }}>
        <nav className="minimal-nav" style={{
          padding: '40px 60px',
          borderBottom: '2px solid #000',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700' }}>{site.businessName}</h1>
          <div style={{ display: 'flex', gap: '40px', fontSize: '16px' }}>
            <a href="#about" style={{ color: '#000', textDecoration: 'none', fontWeight: '500' }}>About</a>
            <a href="#contact" style={{ color: '#000', textDecoration: 'none', fontWeight: '500' }}>Contact</a>
          </div>
        </nav>

        <div style={{ maxWidth: '900px', margin: '150px auto 100px', padding: '0 60px' }} className="slide-in">
          <div style={{ fontSize: '100px', marginBottom: '40px' }}>
            {site.category === 'ristorante' && '🍝'}
            {site.category === 'bar' && '☕'}
            {site.category === 'parrucchiere' && '💇'}
            {site.category === 'negozio' && '🛍️'}
            {site.category === 'artigiano' && '🔨'}
          </div>
          <h2 className="minimal-title" style={{ 
            fontSize: '64px', 
            marginBottom: '30px', 
            fontWeight: '300',
            lineHeight: '1.1'
          }}>
            {site.businessName}
          </h2>
          {site.description && (
            <p style={{ 
              fontSize: '24px', 
              lineHeight: '1.8', 
              marginBottom: '60px', 
              color: '#333',
              fontWeight: '300'
            }}>
              {site.description}
            </p>
          )}

          <div id="contact" style={{ 
            marginTop: '100px', 
            paddingTop: '60px', 
            borderTop: '1px solid #e0e0e0' 
          }}>
            <h3 style={{ fontSize: '32px', marginBottom: '40px', fontWeight: '400' }}>Get in Touch</h3>
            <div className="contact-info" style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '25px', 
              fontSize: '20px',
              fontWeight: '300'
            }}>
              {site.address && (
                <p style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '28px' }}>📍</span> {site.address}
                </p>
              )}
              <p style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontSize: '28px' }}>📞</span> 
                <a href={`tel:${site.phone}`} style={{ color: '#000', textDecoration: 'none' }}>{site.phone}</a>
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontSize: '28px' }}>✉️</span> 
                <a href={`mailto:${site.email}`} style={{ color: '#000', textDecoration: 'none' }}>{site.email}</a>
              </p>
              {site.hours && (
                <p style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '28px' }}>🕐</span> {site.hours}
                </p>
              )}
            </div>
          </div>
        </div>

        <footer style={{ 
          padding: '60px', 
          textAlign: 'center', 
          borderTop: '1px solid #e0e0e0', 
          marginTop: '150px',
          background: '#fafafa'
        }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
            © 2025 {site.businessName}
          </p>
          <p style={{ fontSize: '14px', color: '#999' }}>
            Powered by <a href="/" style={{ color: '#000', fontWeight: '600', textDecoration: 'none' }}>SitoFacile</a>
          </p>
        </footer>
      </div>
    </>
  );
}
