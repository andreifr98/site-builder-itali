'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Site = {
  id: string;
  businessName: string;
  category: string;
  subdomain: string;
  published: boolean;
  views: number;
  createdAt: string;
  templateId: number;
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
    
    if (status === 'authenticated') {
      fetchSites();
    }
  }, [status, router]);

  const fetchSites = async () => {
    try {
      const res = await fetch('/api/sites');
      const data = await res.json();
      
      if (res.ok) {
        setSites(data.sites);
      }
    } catch (error) {
      console.error('Error fetching sites:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#020510',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}>
        <div>Caricamento...</div>
      </div>
    );
  }

  if (!session) return null;

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  const categoryEmojis: { [key: string]: string } = {
    ristorante: '🍝',
    bar: '☕',
    parrucchiere: '💇',
    negozio: '🛍️',
    artigiano: '🔨',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#020510',
      color: 'white'
    }}>
      {/* Header con Logout */}
      <nav style={{
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <a 
          href="/"
          style={{ 
            fontSize: '24px', 
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #ffffff 0%, #00bfff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textDecoration: 'none',
            cursor: 'pointer'
          }}
        >
          SitoFacile
        </a>
        
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
            {session.user.email}
          </span>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              color: 'white',
              padding: '10px 24px',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 40px'
      }}>
        <div style={{
          marginBottom: '40px'
        }}>
          <h1 style={{
            fontSize: '42px',
            fontWeight: 'bold',
            marginBottom: '10px'
          }}>
            Benvenuto, {session.user.name || session.user.email}!
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255,255,255,0.6)'
          }}>
            Gestisci i tuoi siti web da qui
          </p>
        </div>

        {/* Bottone Crea Nuovo Sito */}
        <a
          href="/create"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: '#0070f3',
            color: 'white',
            padding: '14px 28px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0 4px 20px rgba(0, 112, 243, 0.4)',
            marginBottom: '40px'
          }}
        >
          <span>+</span> Crea Nuovo Sito
        </a>

        {/* Sezione I Miei Siti */}
        <div style={{ marginTop: '60px' }}>
          <h2 style={{
            fontSize: '28px',
            marginBottom: '30px'
          }}>
            I Miei Siti ({sites.length})
          </h2>

          {loading ? (
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              padding: '40px',
              borderRadius: '16px',
              textAlign: 'center',
              color: 'rgba(255,255,255,0.5)'
            }}>
              Caricamento...
            </div>
          ) : sites.length === 0 ? (
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              padding: '60px 40px',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.05)',
              textAlign: 'center'
            }}>
              <p style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '16px',
                marginBottom: '20px'
              }}>
                Non hai ancora creato nessun sito.
              </p>
              <a
                href="/create"
                style={{
                  display: 'inline-block',
                  backgroundColor: '#0070f3',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                Crea il Tuo Primo Sito
              </a>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {sites.map((site) => (
                <div
                  key={site.id}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: '20px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                    <span style={{ fontSize: '32px' }}>{categoryEmojis[site.category] || '🌐'}</span>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>{site.businessName}</h3>
                      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
                        {site.subdomain}.sitofacile.it
                      </p>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    marginBottom: '15px',
                    fontSize: '12px'
                  }}>
                    <span style={{
                      padding: '4px 10px',
                      background: site.published ? 'rgba(34, 197, 94, 0.2)' : 'rgba(156, 163, 175, 0.2)',
                      color: site.published ? '#22c55e' : '#9ca3af',
                      borderRadius: '12px'
                    }}>
                      {site.published ? '✓ Pubblicato' : '○ Bozza'}
                    </span>
                    <span style={{
                      padding: '4px 10px',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '12px',
                      color: 'rgba(255,255,255,0.6)'
                    }}>
                      👁️ {site.views} visite
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <a
                      href={`https://${site.subdomain}.sitofacile.it`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        padding: '10px',
                        background: 'rgba(255,255,255,0.05)',
                        color: 'white',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontSize: '14px',
                        border: '1px solid rgba(255,255,255,0.1)'
                      }}
                    >
                      Visualizza
                    </a>
                      <button
                      onClick={async () => {
                        try {
                          const res = await fetch(`/api/sites/${site.id}/publish`, {
                            method: 'POST',
                          });
                          if (res.ok) {
                            fetchSites(); // Ricarica i siti
                          }
                        } catch (error) {
                          console.error('Error:', error);
                        }
                      }}
                      style={{
                        flex: 1,
                        padding: '10px',
                        background: site.published ? 'rgba(255,193,7,0.2)' : '#22c55e',
                        color: 'white',
                        border: site.published ? '1px solid rgba(255,193,7,0.5)' : 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                    >
                      {site.published ? 'Nascondi' : '✓ Pubblica'}
                    </button>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
