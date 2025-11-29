'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

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

  if (!session) {
    return null;
  }

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
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
        <div style={{ 
          fontSize: '24px', 
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #ffffff 0%, #00bfff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          SitoFacile
        </div>
        
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

        {/* Card Crea Nuovo Sito */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(0, 112, 243, 0.1) 0%, rgba(0, 191, 255, 0.05) 100%)',
          padding: '60px 40px',
          borderRadius: '20px',
          border: '1px solid rgba(0, 191, 255, 0.2)',
          textAlign: 'center',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{
            fontSize: '32px',
            marginBottom: '20px',
            color: '#00bfff'
          }}>
            Crea il Tuo Primo Sito
          </h2>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '30px',
            lineHeight: '1.6'
          }}>
            Inizia a costruire la tua presenza online in meno di 5 minuti.<br/>
            Scegli un template, inserisci i tuoi dati e pubblica!
          </p>
          <a
            href="/create"
            style={{
              display: 'inline-block',
              backgroundColor: '#0070f3',
              color: 'white',
              padding: '16px 40px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '18px',
              fontWeight: 'bold',
              boxShadow: '0 8px 30px rgba(0, 112, 243, 0.4)',
              transition: 'all 0.3s ease'
            }}
          >
            Crea Nuovo Sito →
          </a>
        </div>

        {/* Sezione I Miei Siti (vuota per ora) */}
        <div style={{
          marginTop: '60px'
        }}>
          <h2 style={{
            fontSize: '28px',
            marginBottom: '30px'
          }}>
            I Miei Siti
          </h2>
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            padding: '60px 40px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.05)',
            textAlign: 'center'
          }}>
            <p style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '16px'
            }}>
              Non hai ancora creato nessun sito.<br/>
              Clicca su "Crea Nuovo Sito" per iniziare!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
