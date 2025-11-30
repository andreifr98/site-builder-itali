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

export default function Template3({ site }: Props) {
  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255,255,255,0.1); }
          50% { box-shadow: 0 0 40px rgba(255,255,255,0.2); }
        }
        .glow-card { animation: glow 3s ease-in-out infinite; }
        @media (max-width: 768px) {
          .dark-hero { font-size: 36px !important; }
          .dark-grid { grid-template-columns: 1fr !important; }
          .dark-nav { padding: 20px 30px !important; }
        }
      `}</style>
      <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff' }}>
        <nav className="dark-nav" style={{
          padding: '30px 60px',
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '300',
            letterSpacing: '3px',
            textTransform: 'uppercase'
          }}>
            {site.businessName}
          </h1>
        </nav>

        <div style={{ maxWidth: '1100px', margin: '150px auto', padding: '0 60px' }}>
          <div style={{
            marginBottom: '100px'
          }}>
            <div style={{ fontSize: '120px', marginBottom: '40px' }}>
              {site.category === 'ristorante' && '🍝'}
              {site.category === 'bar' && '☕'}
              {site.category === 'parrucchiere' && '💇'}
              {site.category === 'negozio' && '🛍️'}
              {site.category === 'artigiano' && '🔨'}
            </div>
            <h2 className="dark-hero" style={{
              fontSize: '72px',
              marginBottom: '30px',
              fontWeight: '700',
              lineHeight: '1.1',
              background: 'linear-gradient(135deg, #fff 0%, #888 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {site.businessName}
            </h2>
            {site.description && (
              <p style={{
                fontSize: '20px',
                lineHeight: '1.8',
                color: 'rgba(255,255,255,0.7)',
                maxWidth: '700px'
              }}>
                {site.description}
              </p>
            )}
          </div>

          <div className="dark-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '30px',
            marginTop: '100px'
          }}>
            {[
              { icon: '📍', label: 'Location', value: site.address },
              { icon: '📞', label: 'Phone', value: site.phone, href: `tel:${site.phone}` },
              { icon: '🕐', label: 'Hours', value: site.hours },
              { icon: '✉️', label: 'Email', value: site.email, href: `mailto:${site.email}` },
            ].filter(item => item.value).map((item, i) => (
              <div key={i} className="glow-card" style={{
                background: 'rgba(255,255,255,0.02)',
                padding: '50px 40px',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ fontSize: '40px', marginBottom: '20px' }}>{item.icon}</div>
                <div style={{
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  color: 'rgba(255,255,255,0.5)',
                  marginBottom: '12px'
                }}>
                  {item.label}
                </div>
                {item.href ? (
                  <a href={item.href} style={{ 
                    color: '#fff', 
                    textDecoration: 'none', 
                    fontSize: '18px',
                    fontWeight: '300'
                  }}>
                    {item.value}
                  </a>
                ) : (
                  <p style={{ fontSize: '18px', fontWeight: '300' }}>{item.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <footer style={{
          padding: '60px',
          textAlign: 'center',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          marginTop: '150px',
          fontSize: '13px',
          color: 'rgba(255,255,255,0.4)'
        }}>
          <p style={{ marginBottom: '12px' }}>© 2025 {site.businessName}</p>
          <p>Created with <a href="/" style={{ color: '#fff', textDecoration: 'none' }}>SitoFacile</a></p>
        </footer>
      </div>
    </>
  );
}
