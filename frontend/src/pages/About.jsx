import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

// --- ÖZEL KANCA (HOOK): Daktilo Efekti ---
const useTypewriter = (text, speed = 50, delay = 0, startTyping = true) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsFinished(false);

    if (!startTyping || !text) return;

    let currentIndex = 0;
    let timeoutId;

    const type = () => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.substring(0, currentIndex));
        currentIndex++;
        timeoutId = setTimeout(type, speed);
      } else {
        setIsFinished(true);
      }
    };

    const delayTimeout = setTimeout(type, delay);

    return () => {
      clearTimeout(delayTimeout);
      clearTimeout(timeoutId);
    };
  }, [text, speed, delay, startTyping]);

  return { displayedText, isFinished };
};

// --- ÖZGÜR BIRAKILMIŞ, ZARİF DİJİTAL AĞ DEVRESİ ---
// --- ÖZGÜR BIRAKILMIŞ, MİLİMETRİK KALİBRE DİJİTAL AĞ DEVRESİ ---
function CircuitBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d'); 
    let animationFrameId;

    let particles = [];
    const numParticles = 180; 
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          radius: Math.random() * 1.5 + 0.5 
        });
      }
    };

    window.addEventListener('resize', resize);
    setTimeout(resize, 0); 

    const handleMouseMove = (e) => {
      if (!canvas) return;
      
      // SİHİRLİ MATEMATİK: Canvas'ın ekrandaki gerçek kapladığı alanı alıyoruz
      const rect = canvas.getBoundingClientRect();
      
      // CSS boyutu ile Canvas'ın iç piksel çözünürlüğü arasındaki oranı (scale) hesaplıyoruz
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      // Farenin konumunu, ekran sapmalarını (rect.left/top) çıkarıp bu oranla çarpıyoruz
      mouse.x = (e.clientX - rect.left) * scaleX;
      mouse.y = (e.clientY - rect.top) * scaleY;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    
    // KESİN ÇÖZÜM 2: Etkileşimi tekrar tüm 'window' (pencere) üzerine alıyoruz.
    // Böylece fare yazıların üstünden geçse bile Canvas takibi asla bırakmıyor.
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < 180) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(116, 38, 176, ${(1 - distMouse / 180) * 0.25})`; 
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(116, 38, 176, 0.25)'; 
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(116, 38, 176, ${(1 - dist / 120) * 0.15})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="canvas-wrapper">
      <canvas ref={canvasRef} className="circuit-canvas" />
    </div>
  );
}

export default function About() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const titleText = t('about.heroTitle');
  const { displayedText: titleDisplay, isFinished: titleFinished } = useTypewriter(titleText, 80, 500, true);

  const subtitleText = t('about.heroSubtitle');
  const { displayedText: subtitleDisplay } = useTypewriter(subtitleText, 30, 200, titleFinished);

  return (
    <div className="about-page" key={currentLang}>
      
      {/* Özgür bırakılmış, tam ekran devre ağı */}
      <CircuitBackground />
      
      {/* --- HERO SECTION YAZILARI --- */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-hero-title">
            {titleDisplay}
            {!titleFinished && <span className="cursor">|</span>}
          </h1>
          <p className="about-hero-subtitle">
            {subtitleDisplay}
            {titleFinished && <span className="cursor">|</span>}
          </p>
        </div>
      </section>

      {/* --- SAYFA İÇİ CSS --- */}
      <style>{`
        /* --- SAYFA İÇİ CSS --- */
        .about-page {
          position: relative;
          background-color: transparent; 
          /* SİHİRLİ DOKUNUŞ 1: Navbar yüksekliğini (yaklaşık 80px) 100vh'den çıkartıyoruz */
          min-height: calc(100vh - 80px);
          width: 100%;
          /* Kapsayıcının kendisini flex yapıp her şeyi kusursuz ortalıyoruz */
          display: flex;
          align-items: center; 
          justify-content: center;
          overflow: hidden;
        }

        .canvas-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        } 

        .circuit-canvas {
          width: 100%;
          height: 100%;
          display: block; 
        }

        .about-hero {
          position: relative;
          z-index: 2; 
          width: 100%;
          /* SİHİRLİ DOKUNUŞ 2: Yüksekliği sildik, sadece içeriği saran bir yapıya geçtik */
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none; 
          /* SİHİRLİ DOKUNUŞ 3: İnsan gözünün optik merkezi için yazıyı çok hafif yukarı itiyoruz */
          margin-top: -5vh; 
        }

        .about-hero-content {
          text-align: center;
          max-width: 800px;
          padding: 0 20px;
          pointer-events: auto; 
        }

        .about-hero-title {
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 800;
          letter-spacing: -2px;
          margin-bottom: 24px;
          color: #080808;
          min-height: 1.2em; /* Metin yazılırken satırın zıplamasını engeller */
        }

        .about-hero-subtitle {
          font-size: clamp(16px, 2.5vw, 22px);
          color: #626262;
          line-height: 1.8;
          font-weight: 300;
          min-height: 3em; /* Metin yazılırken satırın zıplamasını engeller */
        }

        .cursor {
          display: inline-block;
          color: #7426B0;
          animation: blink 1s step-end infinite;
          margin-left: 5px;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}