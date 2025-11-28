'use client';
import { useEffect, useRef } from 'react';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    function animate() {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 191, 255, ${p.opacity})`;
        ctx.fill();

        // Draw connections
        particles.forEach((p2, j) => {
          if (i === j) return;
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 191, 255, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });

        // Glow effect
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        gradient.addColorStop(0, `rgba(0, 191, 255, ${p.opacity * 0.3})`);
        gradient.addColorStop(1, 'rgba(0, 191, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a1128 0%, #001f54 50%, #034078 100%)',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated canvas background */}
      anvas 
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}
      />

      {/* Animated gradient orbs */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(0, 112, 243, 0.4) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 20s ease-in-out infinite',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '10%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(0, 191, 255, 0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 15s ease-in-out infinite reverse',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '50%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(3, 64, 120, 0.4) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 18s ease-in-out infinite',
        zIndex: 0
      }} />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'linear-gradient(rgba(0, 191, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 191, 255, 0.03) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        zIndex: 0
      }} />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .feature-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }
        .feature-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(0, 191, 255, 0.1) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .feature-card:hover::before {
          opacity: 1;
        }
        .feature-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 60px rgba(0, 191, 255, 0.4);
          border-color: rgba(0, 191, 255, 0.5);
        }
        .cta-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .cta-button::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }
        .cta-button:hover::after {
          width: 300px;
          height: 300px;
        }
      `}</style>

      {/* Navigation */}
      <nav style={{
        position: 'relative',
        zIndex: 10,
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        animation: 'fadeIn 1s ease-out'
      }}>
        <div style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          letterSpacing: '1px',
          background: 'linear-gradient(135deg, #ffffff 0%, #00bfff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          SitoFacile
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="/login" style={{ 
            color: 'white', 
            textDecoration: 'none',
            opacity: 0.8,
            transition: 'opacity 0.3s'
          }}>
            Accedi
          </a>
          <a href="/signup" className="cta-button" style={{
            backgroundColor: '#0070f3',
            color: 'white',
            padding: '10px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '500',
            boxShadow: '0 4px 15px rgba(0, 112, 243, 0.4)'
          }}>
            Inizia Gratis
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '100px 40px',
        textAlign: 'center'
      }}>
        <div style={{
          animation: 'slideUp 0.8s ease-out',
          marginBottom: '30px'
        }}>
          <h1 style={{ 
            fontSize: '72px', 
            fontWeight: '700',
            marginBottom: '20px',
            lineHeight: '1.2',
            background: 'linear-gradient(135deg, #ffffff 0%, #00bfff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 80px rgba(0, 191, 255, 0.5)'
          }}>
            Il Tuo Sito Web<br/>in 5 Minuti
          </h1>
          <p style={{ 
            fontSize: '24px', 
            color: 'rgba(255,255,255,0.8)',
            marginBottom: '40px',
            lineHeight: '1.6',
            animation: 'fadeIn 1.2s ease-out'
          }}>
            Creazione automatica di siti web professionali<br/>
            per ristoranti, negozi e professionisti italiani
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          marginBottom: '80px',
          animation: 'scaleIn 1s ease-out'
        }}>
          <a href="/create" className="cta-button" style={{
            backgroundColor: '#0070f3',
            color: 'white',
            padding: '18px 48px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: 'bold',
            boxShadow: '0 8px 30px rgba(0, 112, 243, 0.5)',
            transition: 'all 0.3s ease',
            display: 'inline-block',
            border: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 112, 243, 0.8)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 112, 243, 0.5)';
          }}>
            Crea il Tuo Sito →
          </a>
          <a href="#features" style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            color: 'white',
            padding: '18px 48px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: 'bold',
            border: '1px solid rgba(255,255,255,0.2)',
            transition: 'all 0.3s ease',
            display: 'inline-block',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            Scopri di Più
          </a>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '40px',
          marginBottom: '100px',
          animation: 'fadeIn 1.5s ease-out'
        }}>
          <div style={{
            padding: '30px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{ 
              fontSize: '48px', 
              fontWeight: 'bold', 
              marginBottom: '10px',
              background: 'linear-gradient(135deg, #ffffff 0%, #00bfff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>5 min</div>
            <div style={{ color: 'rgba(255,255,255,0.7)' }}>Tempo di creazione</div>
          </div>
          <div style={{
            padding: '30px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{ 
              fontSize: '48px', 
              fontWeight: 'bold', 
              marginBottom: '10px',
              background: 'linear-gradient(135deg, #ffffff 0%, #00bfff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>€19</div>
            <div style={{ color: 'rgba(255,255,255,0.7)' }}>All'anno</div>
          </div>
          <div style={{
            padding: '30px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{ 
              fontSize: '48px', 
              fontWeight: 'bold', 
              marginBottom: '10px',
              background: 'linear-gradient(135deg, #ffffff 0%, #00bfff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>100%</div>
            <div style={{ color: 'rgba(255,255,255,0.7)' }}>Responsive</div>
          </div>
        </div>

        {/* Features */}
        <div id="features" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          marginTop: '100px'
        }}>
          {[
            { title: 'Setup Automatico', desc: 'Scegli categoria, inserisci dati, pubblicato' },
            { title: 'Template Moderni', desc: 'Design professionali ottimizzati per mobile' },
            { title: 'Google Maps Integrato', desc: 'Mappa automatica dal tuo indirizzo' },
            { title: 'Zero Codice', desc: 'Nessuna competenza tecnica richiesta' },
            { title: 'SEO Ottimizzato', desc: 'Indicizzazione automatica sui motori di ricerca' },
            { title: 'Supporto Italiano', desc: 'Assistenza in italiano quando serve' }
          ].map((feature, i) => (
            <div key={i} className="feature-card" style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              padding: '40px 30px',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              textAlign: 'left',
              animation: `scaleIn ${1.2 + i * 0.1}s ease-out`
            }}>
              <h3 style={{ 
                fontSize: '22px', 
                marginBottom: '15px',
                color: '#00bfff'
              }}>
                {feature.title}
              </h3>
              <p style={{ 
                color: 'rgba(255,255,255,0.7)',
                lineHeight: '1.6'
              }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div style={{
          marginTop: '120px',
          padding: '80px 40px',
          background: 'linear-gradient(135deg, rgba(0, 112, 243, 0.2) 0%, rgba(0, 191, 255, 0.2) 100%)',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.2)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 60px rgba(0, 191, 255, 0.2)'
        }}>
          <h2 style={{ fontSize: '42px', marginBottom: '20px' }}>
            Pronto a Iniziare?
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255,255,255,0.8)',
            marginBottom: '40px'
          }}>
            Crea il tuo sito professionale in meno tempo di quanto ci vuole per un caffè
          </p>
          <a href="/signup" className="cta-button" style={{
            backgroundColor: 'white',
            color: '#0a1128',
            padding: '18px 48px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: 'bold',
            display: 'inline-block',
            boxShadow: '0 8px 30px rgba(255,255,255,0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(255,255,255,0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(255,255,255,0.3)';
          }}>
            Inizia Ora Gratis
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        padding: '40px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        marginTop: '80px',
        color: 'rgba(255,255,255,0.6)',
        backdropFilter: 'blur(10px)'
      }}>
        <p>© 2025 SitoFacile. Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
}
