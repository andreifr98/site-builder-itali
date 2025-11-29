'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type FormData = {
  category: string;
  businessName: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  hours: string;
  subdomain: string;
  templateId: number;
};

export default function CreatePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<FormData>({
    category: '',
    businessName: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    hours: '',
    subdomain: '',
    templateId: 1,
  });

  // Protezione: redirect se non loggato
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
        Caricamento...
      </div>
    );
  }

  if (!session) return null;

  const categories = [
    { id: 'ristorante', name: 'Ristorante', icon: '🍝' },
    { id: 'bar', name: 'Bar/Caffè', icon: '☕' },
    { id: 'parrucchiere', name: 'Parrucchiere', icon: '💇' },
    { id: 'negozio', name: 'Negozio', icon: '🛍️' },
    { id: 'artigiano', name: 'Artigiano', icon: '🔨' },
  ];

  const handleCategorySelect = (categoryId: string) => {
    setFormData({ ...formData, category: categoryId });
    setStep(2);
  };

  const handleNextStep = () => {
    if (step === 2) {
      if (!formData.businessName || !formData.phone || !formData.email) {
        setError('Nome attività, telefono ed email sono obbligatori');
        return;
      }
      setError('');
      setStep(3);
    }
  };

  const handleSubmit = async () => {
    if (!formData.subdomain) {
      setError('Il nome del sito (subdomain) è obbligatorio');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/sites/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Errore nella creazione del sito');
        setLoading(false);
        return;
      }

      // Redirect al sito creato o alla dashboard
      router.push('/dashboard');
    } catch (err) {
      setError('Errore di connessione');
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#020510', color: 'white' }}>
      {/* Header */}
      <nav style={{
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <a href="/" style={{
          fontSize: '24px',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #ffffff 0%, #00bfff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textDecoration: 'none'
        }}>
          SitoFacile
        </a>
        <a href="/dashboard" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
          ← Torna alla Dashboard
        </a>
      </nav>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 40px' }}>
        {/* Progress Bar */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            {[1, 2, 3].map((s) => (
              <div key={s} style={{
                width: '30%',
                height: '4px',
                background: step >= s ? '#0070f3' : 'rgba(255,255,255,0.1)',
                borderRadius: '2px',
                transition: 'all 0.3s ease'
              }} />
            ))}
          </div>
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
            Step {step} di 3
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#ef4444',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '30px'
          }}>
            {error}
          </div>
        )}

        {/* STEP 1: Categoria */}
        {step === 1 && (
          <div>
            <h1 style={{ fontSize: '36px', marginBottom: '20px', textAlign: 'center' }}>
              Che tipo di attività hai?
            </h1>
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', marginBottom: '50px' }}>
              Scegli la categoria che rappresenta meglio la tua attività
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '20px'
            }}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: '30px 20px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'center'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 112, 243, 0.1)';
                    e.currentTarget.style.borderColor = '#0070f3';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  }}
                >
                  <div style={{ fontSize: '48px', marginBottom: '10px' }}>{cat.icon}</div>
                  <div style={{ color: 'white', fontWeight: '500' }}>{cat.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Dati Business */}
        {step === 2 && (
          <div>
            <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>
              Parlaci della tua attività
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '40px' }}>
              Inserisci le informazioni base che verranno mostrate sul tuo sito
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                  Nome Attività *
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="Es: Ristorante Da Mario"
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                  Indirizzo
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Via Roma 123, Milano"
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                    Telefono *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+39 333 1234567"
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="info@esempio.it"
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '16px'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                  Orari di Apertura
                </label>
                <input
                  type="text"
                  value={formData.hours}
                  onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                  placeholder="Lun-Ven 9:00-18:00"
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                  Descrizione
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descrivi la tua attività in poche righe..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '16px',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    flex: 1,
                    padding: '14px',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  ← Indietro
                </button>
                <button
                  onClick={handleNextStep}
                  style={{
                    flex: 2,
                    padding: '14px',
                    background: '#0070f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  Continua →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Template e Subdomain */}
        {step === 3 && (
          <div>
            <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>
              Scegli il design del tuo sito
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '40px' }}>
              Seleziona un template e scegli l'indirizzo del tuo sito
            </p>

            <div>
              <label style={{ display: 'block', marginBottom: '15px', fontSize: '16px', fontWeight: '500' }}>
                Template
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '40px' }}>
                {[1, 2, 3, 4].map((id) => (
                  <button
                    key={id}
                    onClick={() => setFormData({ ...formData, templateId: id })}
                    style={{
                      padding: '60px 20px',
                      background: formData.templateId === id ? 'rgba(0, 112, 243, 0.2)' : 'rgba(255,255,255,0.05)',
                      border: formData.templateId === id ? '2px solid #0070f3' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ fontSize: '32px', marginBottom: '10px' }}>🎨</div>
                    <div style={{ color: 'white', fontWeight: '500' }}>Template {id}</div>
                  </button>
                ))}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                  Indirizzo Sito (Subdomain) *
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="text"
                    value={formData.subdomain}
                    onChange={(e) => setFormData({ ...formData, subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                    placeholder="il-mio-ristorante"
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '16px'
                    }}
                  />
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>.sitofacile.it</span>
                </div>
                <p style={{ marginTop: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
                  Solo lettere minuscole, numeri e trattini
                </p>
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '40px' }}>
                <button
                  onClick={() => setStep(2)}
                  style={{
                    flex: 1,
                    padding: '14px',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  ← Indietro
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{
                    flex: 2,
                    padding: '14px',
                    background: loading ? 'rgba(0, 112, 243, 0.5)' : '#0070f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  {loading ? 'Creazione in corso...' : '🚀 Crea il Mio Sito'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
