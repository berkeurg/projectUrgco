import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import InfinityKnot from '../components/InfinityKnot';

// Admin paneli (DB) gelene kadar kullanacağımız Mock Data
const partnerLogos = [
  { id: 1, name: 'Ciğerci Özkan', url: 'https://cigerciozkan.com', logo: 'https://resmim.net/cdn/2026/07/28/EkTtJ6.png' },
  ];

function Home() {
  const { t } = useTranslation();

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

      {/* --- YENİ: SABİT MARKA IZGARASI (GRID) --- */}
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
                href={brand.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="brand-item"
              >
                <img src={brand.logo} alt={brand.name} />
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
          
          {/* SOL PANEL: Ekrana yapışıp (sticky) sabit kalacak olan kısım */}
          <div className="services-left-panel">
            <h2 className="services-title">{t('home.servicesTitle')}</h2>
            <p className="services-subtitle">
              {t('home.servicesSubtitle')}
            </p>
            <div className="services-3d-wrapper">
              <InfinityKnot />
            </div>
          </div>

          {/* SAĞ PANEL: Aşağıdan kayarak gelip üst üste binecek kartlar */}
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

      {/* --- İLETİŞİM (CTA) BÖLÜMÜ (TAM EKRAN SİYAH) --- */}
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
            {/* 1. Buton: Mail uygulamasına atar */}
            <a href="mailto:iletisim@urgco.tr" className="contact-btn primary-btn">
              {t('home.contactPrimaryBtn')}
            </a>
            
            {/* 2. Buton: Arama uygulamasına atar (Numarayı kendine göre değiştir) */}
            <a href="https://wa.me/905332022073?text=Merhaba,%20web%20sitesi%20için%20bilgi%20almak%20istiyorum." className="contact-btn secondary-btn" target="_blank" rel="noopener noreferrer">
              {t('home.contactSecondaryBtn')}
            </a>
          </div>
        </div>
      </section>

      {/* SAYFA İÇİ STİLLER */}
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
          flex: 1; /* Ekranın üst kısmında boşluk dengelemesini sağlar */
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
          max-width: 1000px; /* BEYAZ ALANIN YANLARDAN KIRPILDIĞI YER BURASI */
          margin: 0 auto; /* Beyaz alanı ekranın tam ortasına hizalar */
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

        /* --- HİZMETLER BÖLÜMÜ CSS (Sticky Scroll & 2 Kolon) --- */
        .services-section {
          width: 100%;
          padding: 100px 20px;
          /* Siyah arka plandan ayrışması için hafif gri/beyaz veya kendi konseptine uygun bir renk */
        }

        .services-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          gap: 60px;
          position: relative;
          /* Sağ panel bitene kadar hizalamayı yukarıdan başlatır */
          align-items: flex-start; 
        }

        /* --- SOL PANEL (SABİT) --- */
        .services-left-panel {
          flex: 1;
          /* Aşağı inerken ekranda nerede sabitleneceği */
          position: sticky;
          top: 120px; 
          display: flex;
          flex-direction: column;
          gap: 20px;
          height: calc(100vh - 150px); /* 3D objeye ekran yüksekliğinde alan açar */
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
          flex: 1; /* Kalan tüm dikey boşluğu 3D objeye verir */
          width: 100%;
          overflow: hidden;
        }

        /* --- SAĞ PANEL (KAYAN KARTLAR) --- */
        .services-right-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          /* Kartların arasındaki scroll mesafesi (üst üste binmeleri için geniş tutuyoruz) */
          gap: 45vh; 
          padding-bottom: 20vh; /* En alt kartın da rahatça durması için */
        }

        /* Kartların birbiri üstüne yapışması */
        .sticky-card {
          position: sticky;
          /* Kartlar ekranın ortasına/üstüne gelince durup bekleyecek */
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
          /* Yumuşak bir estetik geçiş */
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

        /* --- MOBİL İÇİN KUSURSUZ DÜZEN --- */
        @media (max-width: 992px) {
          .services-container {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          
          /* SOL PANEL: Mobilde yapışkan (sticky) özelliği iptal, normal akışta duracak */
          .services-left-panel {
            position: relative;
            top: 0; 
            height: auto; 
            z-index: 1; 
            text-align: center; /* Mobilde yazıları ortalamak daha şık durur */
          }
          
          .services-3d-wrapper {
            /* vh yerine sabit px verdik ki kaydırırken adres çubuğu yüzünden boyut atlamasın */
            height: 350px; 
            background-color: transparent;
            margin-bottom: 30px;
          }

          .services-title {
            font-size: 32px; 
          }
          
          .services-subtitle {
            margin: 0 auto; /* Ortalamayı dengelemek için */
          }

          /* SAĞ PANEL: Kartların kaydığı bölüm */
          .services-right-panel {
            position: relative;
            z-index: 2; 
            margin-top: 0;
            gap: 60px; /* Mobilde kartların arasındaki scroll mesafesini açtık */
            padding-bottom: 40px; 
          }

          /* KARTLAR: 3D objenin üstüne değil, doğrudan ekranın en üstüne yapışsın */
          .sticky-card {
            position: sticky;
            top: 90px; /* Navbar'ın hemen altında üst üste birikecekler */
          }
          
          .service-card {
            padding: 40px 20px; 
          }
        }

        /* --- İLETİŞİM (CTA) BÖLÜMÜ CSS (Koyu Arka Plan) --- */
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
          color: #cecece; /* Siyah üzerinde göz yormayan gri */
          max-width: 600px;
          line-height: 1.6;
          margin-bottom: 50px;
        }

        .contact-actions {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap; /* Mobilde sığmazlarsa otomatik alt alta atar */
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

        /* Dolgulu Beyaz Buton */
        .primary-btn {
          background-color: #FFFFFF;
          color: #0B0B0B;
        }

        .primary-btn:hover {
          transform: translateY(-4px);
          background-color: #F0F0F0;
          box-shadow: 0 10px 20px rgba(255, 255, 255, 0.1);
        }

        /* Çizgili (Outlined) Transparan Buton */
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