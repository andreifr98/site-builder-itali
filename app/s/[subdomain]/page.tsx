import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';

type Props = {
  params: {
    subdomain: string;
  };
};

async function getSiteData(subdomain: string) {
  try {
    const site = await prisma.site.findUnique({
      where: { subdomain },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!site) {
      return null;
    }

    if (site.published) {
      await prisma.site.update({
        where: { id: site.id },
        data: { views: { increment: 1 } },
      });
    }

    return site;
  } catch (error) {
    console.error('Error fetching site:', error);
    return null;
  }
}

export default async function PublicSitePage({ params }: Props) {
  const site = await getSiteData(params.subdomain);

  if (!site) {
    notFound();
  }

  if (!site.published) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#020510',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '20px'
      }}>
        <div>
          <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>🚧</h1>
          <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>Sito in costruzione</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)' }}>
            Questo sito non è ancora stato pubblicato.
          </p>
        </div>
      </div>
    );
  }

  // TEMPLATE 1: Gradient Hero (Moderno)
  if (site.templateId === 1) {
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
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
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
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
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
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
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
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
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
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
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
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
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

  // TEMPLATE 2: Minimal Clean (Bianco/Nero elegante)
  if (site.templateId === 2) {
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

  // TEMPLATE 3: Dark Luxury (Elegante scuro)
  if (site.templateId === 3) {
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
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                >
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

  // TEMPLATE 4: Colorful Modern (Vivace e giovane)
  if (site.templateId === 4) {
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
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
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
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
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

  // Fallback
  return <div>Template non trovato</div>;
}
