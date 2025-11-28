'use client';
import { useState } from 'react';

export default function CreateSite() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    businessName: '',
    address: '',
    phone: '',
    email: '',
    hours: '',
    description: '',
    photos: [],
    templateId: 1
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px' }}>
      <div style={{ marginBottom: '30px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginBottom: '10px'
        }}>
          {[1,2,3,4,5].map(num => (
            <div key={num} style={{
              width: '18%',
              height: '4px',
              backgroundColor: step >= num ? '#0070f3' : '#e0e0e0',
              borderRadius: '2px'
            }} />
          ))}
        </div>
        <p>Step {step} di 5</p>
      </div>

      {step === 1 && (
        <div>
          <h2>Che tipo di attività hai?</h2>
          <select 
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            style={{ width: '100%', padding: '12px', fontSize: '16px' }}
          >
            <option value="">Seleziona categoria</option>
            <option value="ristorante">Ristorante/Pizzeria</option>
            <option value="bar">Bar/Caffetteria</option>
            <option value="parrucchiere">Parrucchiere/Estetista</option>
            <option value="artigiano">Artigiano/Professionista</option>
            <option value="negozio">Negozio</option>
          </select>
          <button 
            onClick={nextStep}
            disabled={!formData.category}
            style={{
              marginTop: '20px',
              padding: '12px 30px',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Avanti
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Informazioni Base</h2>
          <input 
            type="text"
            placeholder="Nome attività"
            value={formData.businessName}
            onChange={(e) => setFormData({...formData, businessName: e.target.value})}
            style={{ width: '100%', padding: '12px', marginBottom: '15px' }}
          />
          <input 
            type="text"
            placeholder="Indirizzo completo (Via Roma 10, Forlì)"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            style={{ width: '100%', padding: '12px', marginBottom: '15px' }}
          />
          <input 
            type="tel"
            placeholder="Telefono"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            style={{ width: '100%', padding: '12px', marginBottom: '15px' }}
          />
          <input 
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            style={{ width: '100%', padding: '12px', marginBottom: '15px' }}
          />
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button onClick={prevStep}>Indietro</button>
            <button onClick={nextStep}>Avanti</button>
          </div>
        </div>
      )}

      {/* Step 3, 4, 5 simili... */}
    </div>
  );
}

