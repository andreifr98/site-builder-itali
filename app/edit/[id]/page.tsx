'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Site = {
  id: string;
  businessName: string;
  category: string;
  address: string | null;
  phone: string;
  email: string;
  description: string | null;
  hours: string | null;
  subdomain: string;
  templateId: number;
  published: boolean;
};

type Props = {
  params: {
    id: string;
  };
};

export default function EditSitePage({ params }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [site, setSite] = useState<Site | null>(null);

  const [formData, setFormData] = useState({
    businessName: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    hours: '',
    templateId: 1,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
    
    if (status === 'authenticated') {
      fetchSite();
    }
  }, [status, router]);

  const fetchSite = async () => {
    try {
      const res = await fetch(`/api/sites/${params.id}`);
      const data = await res.json();
      
      if (res.ok) {
        setSite(data.site);
        setFormData({
          businessName: data.site.businessName,
          address: data.site.address || '',
          phone: data.site.phone,
          email: data.site.email,
          description: data.site.description || '',
          hours: data.site.hours || '',
          templateId: data.site.templateId,
        });
      } else {
        setError(data.error || 'Sito non trovato');
      }
    } catch (error) {
      setError('Errore nel caricamento');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`/api/sites/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Errore nel salvataggio');
        setSaving(false);
        return;
      }

      setSuccess('✓ Modifiche salvate con successo!');
      setSaving(false);
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);

    } catch (err) {
      setError('Errore di connessione');
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Sei sicuro di voler eliminare questo sito? Questa azione non può essere annullata.')) {
      return;
    }

    setDeleting(true);
    setError('');

    try {
      const res = await fetch(`/api/sites/${params.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.push('/dashboard');
      } else {
        const data = await res.json();
        setError(data.error || 'Errore nell\'eliminazione');
        setDeleting(false);
      }
    } catch (err) {
      setError('Errore di connessione');
      setDeleting(false);
    }
  };

  if (status === 'loading' || loading) {
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

  if (!session || !site) {
    return null;
  }

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
        <h1 style={{ fontSize: '36px', marginBottom: '10px' }}>
          Modifica Sito
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '40px' }}>
          {site.subdomain}.sitofacile.it
        </p>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#ef4444',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            color: '#22c55e',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                Nome Attività *
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                required
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
                  required
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
                  required
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

            <div>
              <label style={{ display: 'block', marginBottom: '15px', fontSize: '14px' }}>
                Template
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {[1, 2, 3, 4].map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setFormData({ ...formData, templateId: id })}
                    style={{
                      padding: '30px 10px',
                      background: formData.templateId === id ? 'rgba(0, 112, 243, 0.2)' : 'rgba(255,255,255,0.05)',
                      border: formData.templateId === id ? '2px solid #0070f3' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      color: 'white',
                      fontSize: '14px'
                    }}
                  >
                    Template {id}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <button
                type="submit"
                disabled={saving}
                style={{
                  flex: 2,
                  padding: '14px',
                  background: saving ? 'rgba(0, 112, 243, 0.5)' : '#0070f3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                {saving ? 'Salvataggio...' : '💾 Salva Modifiche'}
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                style={{
                  flex: 1,
                  padding: '14px',
                  background: deleting ? 'rgba(239, 68, 68, 0.5)' : 'rgba(239, 68, 68, 0.1)',
                  color: '#ef4444',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '8px',
                  cursor: deleting ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                {deleting ? 'Eliminazione...' : '🗑️ Elimina'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
