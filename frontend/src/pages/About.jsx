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

// --- MİLİMETRİK VE MOBİL UYUMLU DİJİTAL AĞ DEVRESİ ---
function CircuitBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d'); 
    let animationFrameId;

    let particles = [];
    const isMobile = window.innerWidth < 768;
    const numParticles = isMobile ? 90 : 180; 
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
      const speedMultiplier = isMobile ? 0.08 : 0.15;

      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speedMultiplier,
          vy: (Math.random() - 0.5) * speedMultiplier,
          radius: Math.random() * 1.5 + 0.5 
        });
      }
    };

    window.addEventListener('resize', resize);
    setTimeout(resize, 0); 

    const handleMouseMove = (e) => {
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      mouse.x = (e.clientX - rect.left) * scaleX;
      mouse.y = (e.clientY - rect.top) * scaleY;
    };

    const handleTouchMove = (e) => {
      if (!canvas || !e.touches[0]) return;
      
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      mouse.x = (e.touches[0].clientX - rect.left) * scaleX;
      mouse.y = (e.touches[0].clientY - rect.top) * scaleY;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchend', handleMouseLeave);

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

        const interactionRadius = isMobile ? 120 : 180;

        if (distMouse < interactionRadius) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(116, 38, 176, ${(1 - distMouse / interactionRadius) * 0.25})`; 
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

          const linkRadius = isMobile ? 80 : 120;

          if (dist < linkRadius) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(116, 38, 176, ${(1 - dist / linkRadius) * 0.15})`;
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
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchend', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="canvas-wrapper">
      <canvas ref={canvasRef} className="circuit-canvas" />
    </div>
  );
}

// --- THE CORE: YATAY KAYDIRMA (HORIZONTAL SCROLL) BİLEŞENİ ---
function TheCoreSection() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !trackRef.current) return;

      const container = containerRef.current;
      const track = trackRef.current;

      const rect = container.getBoundingClientRect();
      const offset = 80 + (window.innerHeight * 0.05); 
      
      const maxScrollY = container.scrollHeight - window.innerHeight;
      const scrollY = offset - rect.top;

      if (scrollY >= 0 && scrollY <= maxScrollY) {
        const percentage = scrollY / maxScrollY;
        const maxTranslateX = track.scrollWidth - track.parentElement.clientWidth;
        track.style.transform = `translateX(-${maxTranslateX * percentage}px)`;
      } 
      else if (scrollY < 0) {
        track.style.transform = `translateX(0px)`;
      } 
      else {
        const maxTranslateX = track.scrollWidth - track.parentElement.clientWidth;
        track.style.transform = `translateX(-${maxTranslateX}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    setTimeout(handleScroll, 0); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="core-container">
      <div className="core-sticky">
        
        <div className="core-intro">
          <span className="core-badge">{t('about.core.badge')}</span>
          <h2 className="core-heading">{t('about.core.heading')}</h2>
        </div>

        <div ref={trackRef} className="core-track">
          
          <div className="core-card">
            <span className="core-number">01</span>
            <h3 className="core-title">{t('about.core.card1.title')}</h3>
            <p className="core-text">{t('about.core.card1.text')}</p>
          </div>

          <div className="core-card">
            <span className="core-number">02</span>
            <h3 className="core-title">{t('about.core.card2.title')}</h3>
            <p className="core-text">{t('about.core.card2.text')}</p>
          </div>

          <div className="core-card">
            <span className="core-number">03</span>
            <h3 className="core-title">{t('about.core.card3.title')}</h3>
            <p className="core-text">{t('about.core.card3.text')}</p>
          </div>

        </div>
      </div>
    </section>
  );
}

// --- YENİ: TERMİNAL / BAŞLATMA SEKANSI (BOOT SEQUENCE) BİLEŞENİ ---
// --- TERMİNAL / BAŞLATMA SEKANSI (BOOT SEQUENCE) BİLEŞENİ ---
// --- TERMİNAL / BAŞLATMA SEKANSI (BOOT SEQUENCE) BİLEŞENİ ---
function TerminalTechSection() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeLines, setActiveLines] = useState([]);

  // Kendi yeteneklerine göre tam kalibre edilmiş sistem sekansı
  const bootSequence = [
    { type: "cmd", text: "urgco system.init --mode=\"engineering_discipline\"" },
    { type: "sys", text: "<span class='term-status'>[OK]</span> Core Engine Loaded." },
    { type: "sys", text: "<span class='term-status'>[OK]</span> Network & Infrastructure Online... <span class='term-hl'>[CLOUDFLARE]</span>" },
    { type: "sys", text: "<span class='term-status'>[OK]</span> Frontend Subsystems Initialized... <span class='term-hl'>[REACT, HTML/CSS, JS, I18N]</span>" },
    { type: "sys", text: "<span class='term-status'>[OK]</span> Backend Architecture Deployed... <span class='term-hl'>[NODE.JS, PHP, XAMPP]</span>" },
    { type: "sys", text: "<span class='term-status'>[OK]</span> Relational Databases Connected... <span class='term-hl'>[ORACLE SQL, MYSQL]</span>" },
    { type: "sys", text: "<span class='term-status'>[OK]</span> Mobile Cross-Platform Compiled... <span class='term-hl'>[FLUTTER, DART]</span>" },
    { type: "sys", text: "<span class='term-status'>[OK]</span> 3D & Creative Render Engines Active... <span class='term-hl'>[REACT 3D FIBER, PHOTOSHOP]</span>" },
    { type: "success", text: "SYSTEM FULLY OPERATIONAL. READY TO BUILD." }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.4 } 
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    
    let timeouts = [];
    bootSequence.forEach((line, index) => {
      const delay = index === 0 ? 500 : 500 + (index * 400); 
      
      const timeout = setTimeout(() => {
        setActiveLines(prev => [...prev, line]);
      }, delay);
      
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [isVisible]);

  return (
    <section ref={containerRef} className="terminal-container">
      
      <div className="terminal-header">
        <span className="terminal-badge">{t('about.tech.badge')}</span>
        <h2 className="terminal-heading">{t('about.tech.heading')}</h2>
      </div>

      <div className="terminal-window">
        <div className="terminal-top-bar">
          <div className="mac-buttons">
            <span className="mac-btn red"></span>
            <span className="mac-btn yellow"></span>
            <span className="mac-btn green"></span>
          </div>
          <span className="terminal-title">bash - urgco-core ~ {isVisible ? 'running' : 'idle'}</span>
        </div>
        
        <div className="terminal-body">
          {activeLines.map((line, index) => (
            <div key={index} className={`terminal-line ${line.type}`}>
              {line.type === "cmd" && <span className="terminal-prompt">~ %</span>}
              <span className="terminal-text" dangerouslySetInnerHTML={{ __html: line.text }}></span>
            </div>
          ))}
          
          <div className="terminal-line">
            <span className="terminal-prompt">~ %</span>
            <span className="terminal-cursor"></span>
          </div>
        </div>
      </div>
      
    </section>
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
      
      {/* --- HERO SECTION --- */}
      <section className="hero-section">
        <CircuitBackground />
        <div className="about-hero">
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
        </div>
      </section>

      {/* --- THE CORE (YATAY KAYDIRMA) SECTION --- */}
      <TheCoreSection />

      {/* --- YENİ: TERMİNAL / BOOT SEQUENCE BÖLÜMÜ --- */}
      <TerminalTechSection />

      {/* --- SAYFA İÇİ CSS --- */}
      <style>{`
        .about-page {
          background-color: transparent; 
          width: 100%;
        }

        /* --- HERO CSS --- */
        .hero-section {
          position: relative;
          width: 100%;
          height: calc(100vh - 80px); 
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden; 
        }

        .canvas-wrapper {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          z-index: 1;
        } 

        .circuit-canvas {
          width: 100%; height: 100%;
          display: block; 
        }

        .about-hero {
          position: relative;
          z-index: 2; 
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none; 
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
          min-height: 1.2em;
        }

        .about-hero-subtitle {
          font-size: clamp(16px, 2.5vw, 22px);
          color: #626262;
          line-height: 1.8;
          font-weight: 300;
          min-height: 3em;
        }

        .cursor {
          display: inline-bottom;
          color: #7426B0;
          animation: blink 1s step-end infinite;
          margin-left: 5px;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* --- THE CORE YATAY KAYDIRMA CSS --- */
        
        .core-container {
          position: relative;
          height: 300vh; 
          background-color: transparent; 
          color: #FFFFFF;
        }

        .core-sticky {
          position: sticky;
          top: calc(80px + 3vh); 
          height: calc(100vh - 80px - 6vh); 
          width: 95%; 
          margin: 0 auto; 
          background-color: #030303; 
          border-radius: 40px; 
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden; 
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4); 
        }

        .core-intro {
          position: absolute;
          top: 40px;
          left: 5vw;
          z-index: 10;
        }

        .core-badge {
          display: inline-block;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 2px;
          color: #7426B0;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .core-heading {
          font-size: clamp(32px, 5vw, 64px);
          font-weight: 800;
          color: #FFFFFF;
          margin: 0; 
        }

        .core-track {
          display: flex;
          align-items: center;
          gap: 15vw; 
          padding-left: 55vw; 
          padding-right: 20vw; 
          width: fit-content;
          will-change: transform; 
        }

        .core-card {
          width: 70vw;
          max-width: 550px;
          flex-shrink: 0; 
          display: flex;
          flex-direction: column;
          cursor: default;
          padding-top: 60px; 
        }

        .core-number {
          font-size: clamp(60px, 10vw, 120px);
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 2px #7426B0;
          line-height: 1;
          margin-bottom: -15px; 
          display: inline-block;
          transition: text-shadow 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          width: fit-content; 
        }

        .core-number:hover {
          text-shadow: 
            0 0 20px rgba(116, 38, 176, 0.9),
            0 0 40px rgba(116, 38, 176, 0.7),
            0 0 70px rgba(116, 38, 176, 0.5),
            0 0 100px rgba(116, 38, 176, 0.3);
        }

        .core-card .core-title {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 700;
          margin-bottom: 20px;
          color: #FFFFFF;
          z-index: 2; 
        }

        .core-card .core-text {
          font-size: clamp(16px, 1.5vw, 20px);
          color: #A0A0A0;
          line-height: 1.8;
          font-weight: 300;
        }

        /* --- YENİ: TERMİNAL / BOOT SEQUENCE CSS --- */
        
        .terminal-container {
          padding: 120px 5vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 1000px;
          margin: 0 auto;
        }

        .terminal-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .terminal-badge {
          display: inline-block;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 2px;
          color: #7426B0;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .terminal-heading {
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 800;
          color: #080808;
          margin: 0;
          letter-spacing: -1px;
        }

        /* Terminal Penceresi Tasarımı */
        .terminal-window {
          width: 100%;
          background: #060606; /* Derin terminal siyahı */
          border: 1px solid rgba(116, 38, 176, 0.2); /* Etrafında hafif mor ışıma */
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(116, 38, 176, 0.05);
          /* Kod fontu zorunlu. Eğer Fira Code yoksa Courier New kullanır */
          font-family: 'Fira Code', 'Consolas', 'Courier New', monospace;
        }

        /* Mac OS Tarzı Üst Çubuk */
        .terminal-top-bar {
          background: #121212;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
        }

        .mac-buttons {
          display: flex;
          gap: 8px;
        }

        .mac-btn {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .mac-btn.red { background: #FF5F56; }
        .mac-btn.yellow { background: #FFBD2E; }
        .mac-btn.green { background: #27C93F; }

        .terminal-title {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          color: #666666;
          font-size: 13px;
          font-weight: 500;
        }

        /* Terminal İçeriği */
        .terminal-body {
          padding: 30px;
          min-height: 350px; /* Boot olmadan önce ekran küçük kalmasın diye */
        }

        .terminal-line {
          display: flex;
          margin-bottom: 12px;
          font-size: clamp(14px, 2vw, 16px);
          line-height: 1.6;
        }

        .terminal-prompt {
          color: #7426B0; /* Mor komut imleci */
          margin-right: 15px;
          font-weight: bold;
        }

        .terminal-text {
          color: #A0A0A0; /* Gri standart terminal çıktısı */
        }

        /* Sınıflandırılmış Çıktı Renklendirmeleri */
        .terminal-line.cmd .terminal-text {
          color: #FFFFFF; /* Kullanıcı komutu beyaz olur */
        }

        .terminal-line.success .terminal-text {
          color: #7426B0; /* En son onay mesajı güçlü mor */
          font-weight: bold;
          margin-top: 20px; /* Son satırdan önce boşluk */
        }

        /* JSON içindeki span elementlerine uygulanan CSS sınıfları */
        .term-status {
          color: #27C93F; /* Yeşil [OK] ibaresi */
          font-weight: bold;
          margin-right: 8px;
        }

        .term-hl {
          color: #FFFFFF; /* Vurgulanan teknolojiler bembeyaz parlar */
          font-weight: bold;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }

        /* Yanıp Sönen Blok İmleç */
        .terminal-cursor {
          display: inline-block;
          width: 10px;
          height: 1.2em;
          background: #7426B0;
          animation: terminal-blink 1s step-end infinite;
        }

        @keyframes terminal-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* --- MOBİL UYUMLULUK DÜZELTMELERİ --- */
        @media (max-width: 768px) {
          .core-sticky {
            height: 75vh;
            top: calc(80px + 2vh);
            border-radius: 24px;
            width: 92%;
          }

          .core-intro {
            position: relative;
            top: auto;
            left: auto;
            text-align: center;
            padding: 0px 20px 0 20px;
            width: 100%;
          }

          .core-track {
            padding-left: 30vw;
            gap: 10vw;
            padding-top: 10px;
          }

          .core-card {
            width: 80vw;
            padding-top: 20px;
          }

          .core-number {
            margin-bottom: 10px;
          }

          /* Mobil Terminal Düzeltmeleri */
          .terminal-container {
            padding: 80px 5vw;
          }

          .terminal-body {
            padding: 20px;
            min-height: 250px;
          }

          .terminal-title {
            display: none; /* Mobilde yer darlığından dolayı title gizlenir */
          }
        }
      `}</style>
    </div>
  );
}