import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';

// Admin paneli (DB) gelene kadar kullanacağımız Mock Data
const partnerLogos = [
  { id: 1, name: 'Ciğerci Özkan', url: 'https://cigerciozkan.com', logo: 'https://cigerciozkan.com/cigerciozkanassets/logo1.png' },
  { id: 2, name: 'Marka 2', url: '#', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Porsche_hood_emblem.png' },
  { id: 3, name: 'Marka 3', url: '#', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Mercedes-Benz_Star_%281969-1986%2C_2025-%29.svg' },
  { id: 4, name: 'Marka 4', url: '#', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg' },
  { id: 5, name: 'Marka 5', url: '#', logo: 'https://www.dogsar.com.tr/assets/img/logo-dogsar-01.png' },
];

function Home() {
  const { t } = useTranslation();

  // --- GÖRÜNÜRLÜK GÖZLEMCİLERİ (SCROLL ANİMASYONLARI) ---
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: brandsRef, inView: brandsInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: servicesRef, inView: servicesInView } = useInView({ triggerOnce: true, threshold: 0.2 });
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

      {/* --- WEB TASARIM HİZMETLERİMİZ --- */}
      <section className="services-section">
        <div 
          ref={servicesRef}
          className={`services-container scroll-fade ${servicesInView ? 'animate-up' : ''}`}
        >
          
          <div className="services-header">
            <h2 className="services-title">{t('home.servicesTitle')}</h2>
            <p className="services-subtitle">
              {t('home.servicesSubtitle')}
            </p>
          </div>

          <div className="services-grid">
            
            {/* Kart 1 */}
            <div className="service-card">
              <div className="service-icon-wrapper">
                <span className="service-icon">✦</span>
              </div>
              <h3 className="service-card-title">{t('home.service1Title')}</h3>
              <p className="service-card-desc">
                {t('home.service1Desc')}
              </p>
            </div>

            {/* Kart 2 */}
            <div className="service-card">
              <div className="service-icon-wrapper">
                <span className="service-icon">✦</span>
              </div>
              <h3 className="service-card-title">{t('home.service2Title')}</h3>
              <p className="service-card-desc">
                {t('home.service2Desc')}
              </p>
            </div>

            {/* Kart 3 */}
            <div className="service-card">
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
            <a href="mailto:iletisim@urgco.com" className="contact-btn primary-btn">
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

        /* --- HİZMETLER BÖLÜMÜ CSS --- */
        .services-section {
          width: 100%;
          padding: 120px 20px 100px 20px;
        }

        .services-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .services-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .services-title {
          font-size: clamp(32px, 4vw, 42px);
          color: #0B0B0B;
          font-weight: 600;
          letter-spacing: -1px;
          margin-bottom: 16px;
        }

        .services-subtitle {
          font-size: clamp(16px, 2vw, 18px);
          color: #666666;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .services-grid {
          display: grid;
          /* Kartları otomatik olarak sığdırır, mobilde alt alta atar */
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .service-card {
          background-color: #F8F9FA;
          border: 1px solid #EAEAEA;
          border-radius: 16px;
          padding: 40px 30px;
          transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
          cursor: default;
        }

        .service-card:hover {
          background-color: #FFFFFF;
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.04);
          border-color: #DEDEDE;
        }

        .service-icon-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background-color: #0B0B0B;
          border-radius: 10px;
          margin-bottom: 24px;
        }

        .service-icon {
          color: #FFFFFF;
          font-size: 18px;
        }

        .service-card-title {
          font-size: 20px;
          color: #0B0B0B;
          font-weight: 700;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }

        .service-card-desc {
          font-size: 15px;
          color: #666666;
          line-height: 1.6;
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