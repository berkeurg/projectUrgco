import { useState, useEffect, Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { isWebGLAvailable } from '../utils/checkWebGL';

// TEMBEL (Lazy) yüklenen 3D obje
const InfinityKnot = lazy(() => import('../components/InfinityKnot'));

function Home() {
  const { t } = useTranslation();

  // --- API'DEN GELEN VERİLER İÇİN STATE ---
  const [partnerLogos, setPartnerLogos] = useState([]);

  // --- WEBGL DESTEĞİ KONTROLÜ İÇİN STATE ---
  const [hasWebGL, setHasWebGL] = useState(true);

  // --- SAYFA YÜKLENDİĞİNDE VERİLERİ ÇEK VE CİHAZ KONTROLÜ YAP ---
  useEffect(() => {
    // Sayfa açıldığında cihazın 3D destekleyip desteklemediğine bak
    setHasWebGL(isWebGLAvailable());

    // Partner logolarını çek
    fetch('/api/partners')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPartnerLogos(data);
        } else {
          console.error("API'den dizi dışında bir veri geldi:", data);
          setPartnerLogos([]); 
        }
      })
      .catch((err) => {
        console.error("Logolar çekilirken hata oluştu:", err);
        setPartnerLogos([]);
      });
  }, []);

  // --- GÖRÜNÜRLÜK GÖZLEMCİLERİ (SCROLL ANİMASYONLARI) ---
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: brandsRef, inView: brandsInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: servicesRef, inView: servicesInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: contactRef, inView: contactInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
      
      {/* --- HERO İÇERİK BÖLÜMÜ --- */}
      <section className="hero-section">
        <div 
          ref={heroRef}
          className={`hero-content scroll-fade ${heroInView ? 'animate-up' : ''}`}
        >
          <h1 className="hero-title">
            {t('home.heroTitle')}
          </h1>
          <p className="hero-subtitle">
            {t('home.heroSubtitle')}
          </p>
        </div>
      </section>

      {/* --- DİNAMİK MARKA IZGARASI (GRID) --- */}
      <section className="brands-section">
        <div 
          ref={brandsRef}
          className={`brands-container scroll-fade ${brandsInView ? 'animate-up' : ''}`}
        >
          <p className="brands-label">{t('home.brandsLabel')}</p>
          <div className="brands-grid">
            {partnerLogos.map((brand) => (
              <a 
                key={brand.id} 
                href={brand.website_url || "#"} 
                target={brand.website_url ? "_blank" : "_self"} 
                rel="noopener noreferrer" 
                className="brand-item"
                style={{ pointerEvents: brand.website_url ? 'auto' : 'none' }} 
              >
                <img src={brand.logo_url} alt={brand.company_name} title={brand.company_name} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* --- WEB TASARIM HİZMETLERİMİZ (STICKY SCROLL) --- */}
      <section className="services-section">
        <div 
          ref={servicesRef}
          className={`services-container scroll-fade ${servicesInView ? 'animate-up' : ''}`}
        >
          {/* SOL PANEL */}
          <div className="services-left-panel">
            <h2 className="services-title">{t('home.servicesTitle')}</h2>
            <p className="services-subtitle">
              {t('home.servicesSubtitle')}
            </p>
            <div className="services-3d-wrapper">
              {/* Cihaz WebGL destekliyorsa 3D'yi yükle, desteklemiyorsa statik bırak */}
              {hasWebGL ? (
                <Suspense 
                  fallback={
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666666' }}>
                      3D Görsel Yükleniyor...
                    </div>
                  }
                >
                  <InfinityKnot />
                </Suspense>
              ) : (
                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666666' }}>
                  {/* 3D desteklemeyen cihazlar için zarif boşluk (veya ileride buraya img eklenebilir) */}
                </div>
              )}
            </div>
          </div>

          {/* SAĞ PANEL */}
          <div className="services-right-panel">
            {/* Kart 1 */}
            <div className="service-card sticky-card" style={{ zIndex: 1 }}>
              <div className="service-icon-wrapper">
                <span className="service-icon">✦</span>
              </div>
              <h3 className="service-card-title">{t('home.service1Title')}</h3>
              <p className="service-card-desc">
                {t('home.service1Desc')}
              </p>
            </div>

            {/* Kart 2 */}
            <div className="service-card sticky-card" style={{ zIndex: 2 }}>
              <div className="service-icon-wrapper">
                <span className="service-icon">✦</span>
              </div>
              <h3 className="service-card-title">{t('home.service2Title')}</h3>
              <p className="service-card-desc">
                {t('home.service2Desc')}
              </p>
            </div>

            {/* Kart 3 */}
            <div className="service-card sticky-card" style={{ zIndex: 3 }}>
              <div className="service-icon-wrapper">
                <span className="service-icon">✦</span>
              </div>
              <h3 className="service-card-title">{t('home.service3Title')}</h3>
              <p className="service-card-desc">
                {t('home.service3Desc')}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* --- İLETİŞİM (CTA) BÖLÜMÜ --- */}
      <section className="contact-section-dark">
        <div 
          ref={contactRef}
          className={`contact-container scroll-fade ${contactInView ? 'animate-up' : ''}`}
        >
          <h2 className="contact-title">{t('home.contactTitle')}</h2>
          <p className="contact-subtitle">
            {t('home.contactSubtitle')}
          </p>
          
          <div className="contact-actions">
            <a href="mailto:iletisim@urgco.tr" className="contact-btn primary-btn">
              {t('home.contactPrimaryBtn')}
            </a>
            
            <a href="https://wa.me/905332022073?text=Merhaba,%20web%20sitesi%20için%20bilgi%20almak%20istiyorum." className="contact-btn secondary-btn" target="_blank" rel="noopener noreferrer">
              {t('home.contactSecondaryBtn')}
            </a>
          </div>
        </div>
      </section>

      {/* SAYFA İÇİ STİLLER (CSS'in hiçbir yerine dokunmadık, hepsi duruyor) */}
      <style>{`
        /* --- SCROLL ANİMASYON SINIFLARI --- */
        .scroll-fade {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
          will-change: opacity, transform; 
        }

        .scroll-fade.animate-up {
          opacity: 1;
          transform: translateY(0);
        }

        /* --- HERO CSS --- */
        .hero-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 80px 20px 40px 20px;
        }

        .hero-content {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-title {
          font-size: clamp(40px, 6vw, 64px); 
          color: #0B0B0B;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 24px;
          letter-spacing: -1.5px;
        }

        .hero-subtitle {
          font-size: clamp(18px, 2vw, 22px);
          color: #666666;
          font-weight: 400;
          line-height: 1.6;
          max-width: 600px;
        }

        /* --- MARKA IZGARASI CSS --- */
          .brands-section {
          width: 100%;
          max-width: 1000px; 
          margin: 0 auto; 
          padding: 40px 20px; 
          background-color: #FFFFFF;  
          border-radius: 15px;
        }

        .brands-container {
          width: 100%;
          text-align: center;
        }

        .brands-label {
          font-size: 12px;
          color: #000000;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 40px;
          font-weight: 600;
        }

        .brands-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 40px;
          align-items: center;
          justify-items: center;
        }

        .brand-item {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease, filter 0.3s ease;
          opacity: 0.7;
          cursor: pointer;
        }

        .brand-item:hover {
          transform: scale(1.05);
          filter: grayscale(0%);
          opacity: 1;
        }

        .brand-item img {
          max-height: 60px;
          max-width: 130px;
          object-fit: contain;
        }

        /* --- HİZMETLER BÖLÜMÜ CSS --- */
        .services-section {
          width: 100%;
          padding: 100px 20px;
        }

        .services-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          gap: 60px;
          position: relative;
          align-items: flex-start; 
        }

        .services-left-panel {
          flex: 1;
          position: sticky;
          top: 120px; 
          display: flex;
          flex-direction: column;
          gap: 20px;
          height: calc(100vh - 150px);
        }

        .services-title {
          font-size: clamp(32px, 4vw, 48px);
          color: #0B0B0B;
          font-weight: 650;
          letter-spacing: -1.5px;
          line-height: 1.1;
        }

        .services-subtitle {
          font-size: clamp(16px, 2vw, 18px);
          color: #666666;
          max-width: 90%;
          line-height: 1.6;
        }

        .services-3d-wrapper {
          flex: 1;
          width: 100%;
          overflow: hidden;
        }

        .services-right-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 45vh; 
          padding-bottom: 20vh; 
        }

        .sticky-card {
          position: sticky;
          top: 150px; 
        }

        .service-card {
          background-color: #FFFFFF;
          border: 1px solid #EAEAEA;
          border-radius: 24px;
          padding: 50px 40px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: transform 0.5s ease;
        }

        .service-icon-wrapper {
          margin-bottom: 30px;
        }

        .service-icon {
          color: #7426B0;
          font-size: 40px;
        }

        .service-card-title {
          font-size: 24px;
          color: #0B0B0B;
          font-weight: 700;
          margin-bottom: 16px;
          letter-spacing: -0.5px;
        }

        .service-card-desc {
          font-size: 16px;
          color: #666666;
          line-height: 1.7;
        }

        /* --- MOBİL İÇİN DÜZEN --- */
        @media (max-width: 992px) {
          .services-container {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          
          .services-left-panel {
            position: relative;
            top: 0; 
            height: auto; 
            z-index: 1; 
            text-align: center; 
          }
          
          .services-3d-wrapper {
            height: 350px; 
            background-color: transparent;
            margin-bottom: 30px;
          }

          .services-title {
            font-size: 32px; 
          }
          
          .services-subtitle {
            margin: 0 auto;
          }

          .services-right-panel {
            position: relative;
            z-index: 2; 
            margin-top: 0;
            gap: 60px; 
            padding-bottom: 40px; 
          }

          .sticky-card {
            position: sticky;
            top: 90px;
          }
          
          .service-card {
            padding: 40px 20px; 
          }
        }

        /* --- İLETİŞİM BÖLÜMÜ CSS --- */
        .contact-section-dark {
          width: 100%;
          background-color: #7426B0;
          padding: 120px 20px; 
          display: flex;
          justify-content: center;
          border-radius: 15px;
        }

        .contact-container {
          max-width: 800px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .contact-title {
          font-size: clamp(32px, 4vw, 42px);
          color: #ffffff;
          font-weight: 700;
          letter-spacing: -1px;
          margin-bottom: 20px;
        }

        .contact-subtitle {
          font-size: clamp(16px, 2vw, 18px);
          color: #cecece; 
          max-width: 600px;
          line-height: 1.6;
          margin-bottom: 50px;
        }

        .contact-actions {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap; 
        }

        .contact-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 600;
          padding: 16px 36px;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .primary-btn {
          background-color: #FFFFFF;
          color: #0B0B0B;
        }

        .primary-btn:hover {
          transform: translateY(-4px);
          background-color: #F0F0F0;
          box-shadow: 0 10px 20px rgba(255, 255, 255, 0.1);
        }

        .secondary-btn {
          background-color: transparent;
          color: #FFFFFF;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .secondary-btn:hover {
          transform: translateY(-4px);
          background-color: rgba(255, 255, 255, 0.1);
          border-color: #FFFFFF;
        }
      `}</style>
    </div>
  );
}

export default Home;