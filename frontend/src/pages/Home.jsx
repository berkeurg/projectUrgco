import { useTranslation } from 'react-i18next';

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

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
      
      {/* --- HERO İÇERİK BÖLÜMÜ --- */}
      <section className="hero-section">
        <div className="hero-content">
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
        <div className="brands-container">
          
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
        <div className="services-container">
          
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

      {/* SAYFA İÇİ STİLLER */}
      <style>{`
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
          animation: fadeUp 0.8s ease-out forwards;
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

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
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
          animation: fadeUp 0.8s ease-out forwards;
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
      `}</style>
    </div>
  );
}

export default Home;