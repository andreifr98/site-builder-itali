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

    // Incrementa views se pubblicato
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

  // Se non è pubblicato, mostra messaggio
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

  // Template 1: Moderno con Hero
  if (site.templateId === 1) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        {/* Header */}
        <nav style={{
          padding: '20px 40px',
          background: 'rgba(0,0,0,0.2)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>{site.businessName}</h1>
          <div style={{ display: 'flex', gap: '20px', fontSize: '14px' }}>
            <a href="#info" style={{ color: 'white', textDecoration: 'none' }}>Info</a>
            <a href="#contatti" style={{ color: 'white', textDecoration: 'none' }}>Contatti</a>
          </div>
        </nav>

        {/* Hero Section */}
        <div style={{
          padding: '100px 40px',
          textAlign: 'center',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>
            {site.category === 'ristorante' && '🍝'}
            {site.category === 'bar' && '☕'}
            {site.category === 'parrucchiere' && '💇'}
            {site.category === 'negozio' && '🛍️'}
            {site.category === 'artigiano' && '🔨'}
          </div>
          <h1 style={{
            fontSize: '56px',
            fontWeight: 'bold',
            marginBottom: '20px',
            lineHeight: '1.2'
          }}>
            {site.businessName}
          </h1>
          {site.description && (
            <p style={{
              fontSize: '20px',
              lineHeight: '1.6',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '40px'
            }}>
              {site.description}
            </p>
          )}
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={`tel:${site.phone}`}
              style={{
                display: 'inline-block',
                padding: '16px 32px',
                background: 'white',
                color: '#667eea',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '16px'
              }}
            >
              📞 Chiamaci
            </a>
            <a
              href={`mailto:${site.email}`}
              style={{
                display: 'inline-block',
                padding: '16px 32px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '16px',
                backdropFilter: 'blur(10px)'
              }}
            >
              ✉️ Email
            </a>
          </div>
        </div>

        {/* Info Section */}
        <div id="info" style={{
          background: 'rgba(0,0,0,0.2)',
          backdropFilter: 'blur(10px)',
          padding: '60px 40px'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '30px'
            }}>
              {site.address && (
                <div style={{
                  background: 'rgba(255,255,255,0.1)',
                  padding: '30px',
                  borderRadius: '12px'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '15px' }}>📍</div>
                  <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Dove Siamo</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)' }}>{site.address}</p>
                </div>
              )}

              <div style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '30px',
                borderRadius: '12px'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '15px' }}>📞</div>
                <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Telefono</h3>
                <a href={`tel:${site.phone}`} style={{ color: 'white', textDecoration: 'none' }}>
                  {site.phone}
                </a>
              </div>

              {site.hours && (
                <div style={{
                  background: 'rgba(255,255,255,0.1)',
                  padding: '30px',
                  borderRadius: '12px'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '15px' }}>🕐</div>
                  <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Orari</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)' }}>{site.hours}</p>
                </div>
              )}

              <div style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '30px',
                borderRadius: '12px'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '15px' }}>✉️</div>
                <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Email</h3>
                <a href={`mailto:${site.email}`} style={{ color: 'white', textDecoration: 'none', wordBreak: 'break-all' }}>
                  {site.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div id="contatti" style={{
          padding: '40px',
          textAlign: 'center',
          background: 'rgba(0,0,0,0.3)',
          fontSize: '14px',
          color: 'rgba(255,255,255,0.7)'
        }}>
          <p>© 2025 {site.businessName}. Tutti i diritti riservati.</p>
          <p style={{ marginTop: '10px' }}>
            Sito creato con <a href="/" style={{ color: 'white', fontWeight: 'bold' }}>SitoFacile</a>
          </p>
        </div>
      </div>
    );
  }

  // Template 2: Minimal bianco/nero
  if (site.templateId === 2) {
    return (
      <div style={{ minHeight: '100vh', background: '#ffffff', color: '#000' }}>
        <nav style={{
          padding: '30px 40px',
          borderBottom: '2px solid #000',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>{site.businessName}</h1>
          <div style={{ display: 'flex', gap: '30px', fontSize: '16px' }}>
            <a href="#about" style={{ color: '#000', textDecoration: 'none' }}>About</a>
            <a href="#contact" style={{ color: '#000', textDecoration: 'none' }}>Contact</a>
          </div>
        </nav>

        <div style={{ maxWidth: '800px', margin: '100px auto', padding: '0 40px' }}>
          <div style={{ fontSize: '72px', marginBottom: '30px' }}>
            {site.category === 'ristorante' && '🍝'}
            {site.category === 'bar' && '☕'}
            {site.category === 'parrucchiere' && '💇'}
            {site.category === 'negozio' && '🛍️'}
            {site.category === 'artigiano' && '🔨'}
          </div>
          <h2 style={{ fontSize: '48px', marginBottom: '20px', fontWeight: 'normal' }}>
            {site.businessName}
          </h2>
          {site.description && (
            <p style={{ fontSize: '20px', lineHeight: '1.8', marginBottom: '40px', color: '#333' }}>
              {site.description}
            </p>
          )}

          <div id="contact" style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid #e0e0e0' }}>
            <h3 style={{ fontSize: '24px', marginBottom: '30px' }}>Get in Touch</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '18px' }}>
              {site.address && <p>📍 {site.address}</p>}
              <p>📞 <a href={`tel:${site.phone}`} style={{ color: '#000' }}>{site.phone}</a></p>
              <p>✉️ <a href={`mailto:${site.email}`} style={{ color: '#000' }}>{site.email}</a></p>
              {site.hours && <p>🕐 {site.hours}</p>}
            </div>
          </div>
        </div>

        <footer style={{ padding: '40px', textAlign: 'center', borderTop: '1px solid #e0e0e0', marginTop: '100px' }}>
          <p style={{ fontSize: '14px', color: '#666' }}>
            © 2025 {site.businessName} • Powered by <a href="/" style={{ color: '#000', fontWeight: 'bold' }}>SitoFacile</a>
          </p>
        </footer>
      </div>
    );
  }

  // Template 3: Dark elegante
  if (site.templateId === 3) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff' }}>
        <nav style={{
          padding: '25px 50px',
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <h1 style={{
            fontSize: '22px',
            fontWeight: '300',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            {site.businessName}
          </h1>
        </nav>

        <div style={{ maxWidth: '1000px', margin: '120px auto', padding: '0 50px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '60px',
            marginBottom: '80px'
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '96px', marginBottom: '30px' }}>
                {site.category === 'ristorante' && '🍝'}
                {site.category === 'bar' && '☕'}
                {site.category === 'parrucchiere' && '💇'}
                {site.category === 'negozio' && '🛍️'}
                {site.category === 'artigiano' && '🔨'}
              </div>
              <h2 style={{
                fontSize: '52px',
                marginBottom: '25px',
                fontWeight: '700',
                lineHeight: '1.1'
              }}>
                {site.businessName}
              </h2>
              {site.description && (
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.7',
                  color: 'rgba(255,255,255,0.7)'
                }}>
                  {site.description}
                </p>
              )}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '30px',
            marginTop: '80px'
          }}>
            {[
              { icon: '📍', label: 'Location', value: site.address },
              { icon: '📞', label: 'Phone', value: site.phone, href: `tel:${site.phone}` },
              { icon: '🕐', label: 'Hours', value: site.hours },
              { icon: '✉️', label: 'Email', value: site.email, href: `mailto:${site.email}` },
            ].filter(item => item.value).map((item, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.02)',
                padding: '35px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{item.icon}</div>
                <div style={{
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: 'rgba(255,255,255,0.5)',
                  marginBottom: '8px'
                }}>
                  {item.label}
                </div>
                {item.href ? (
                  <a href={item.href} style={{ color: '#fff', textDecoration: 'none', fontSize: '16px' }}>
                    {item.value}
                  </a>
                ) : (
                  <p style={{ fontSize: '16px' }}>{item.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <footer style={{
          padding: '50px',
          textAlign: 'center',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          marginTop: '120px',
          fontSize: '13px',
          color: 'rgba(255,255,255,0.4)'
        }}>
          <p>© 2025 {site.businessName}</p>
          <p style={{ marginTop: '10px' }}>Created with <a href="/" style={{ color: '#fff' }}>SitoFacile</a></p>
        </footer>
      </div>
    );
  }

  // Template 4: Colorful
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #FFA07A)',
      backgroundSize: '400% 400%',
      animation: 'gradient 15s ease infinite',
      color: '#fff'
    }}>
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        backdropFilter: 'blur(100px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '120px', marginBottom: '30px' }}>
          {site.category === 'ristorante' && '🍝'}
          {site.category === 'bar' && '☕'}
          {site.category === 'parrucchiere' && '💇'}
          {site.category === 'negozio' && '🛍️'}
          {site.category === 'artigiano' && '🔨'}
        </div>
        <h1 style={{ fontSize: '72px', fontWeight: 'bold', marginBottom: '20px' }}>
          {site.businessName}
        </h1>
        {site.description && (
          <p style={{ fontSize: '24px', marginBottom: '50px', maxWidth: '700px', lineHeight: '1.6' }}>
            {site.description}
          </p>
        )}

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
          marginTop: '40px',
          fontSize: '18px'
        }}>
          {site.address && <div style={{ background: 'rgba(255,255,255,0.2)', padding: '15px 30px', borderRadius: '50px' }}>📍 {site.address}</div>}
          <a href={`tel:${site.phone}`} style={{ background: 'rgba(255,255,255,0.2)', padding: '15px 30px', borderRadius: '50px', color: '#fff', textDecoration: 'none' }}>📞 {site.phone}</a>
          <a href={`mailto:${site.email}`} style={{ background: 'rgba(255,255,255,0.2)', padding: '15px 30px', borderRadius: '50px', color: '#fff', textDecoration: 'none' }}>✉️ Email</a>
          {site.hours && <div style={{ background: 'rgba(255,255,255,0.2)', padding: '15px 30px', borderRadius: '50px' }}>🕐 {site.hours}</div>}
        </div>

        <footer style={{ marginTop: '100px', fontSize: '14px', opacity: 0.8 }}>
          <p>Powered by <a href="/" style={{ color: '#fff', fontWeight: 'bold' }}>SitoFacile</a></p>
        </footer>
      </div>
    </div>
  );
}
