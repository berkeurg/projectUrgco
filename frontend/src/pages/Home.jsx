import { useTranslation } from 'react-i18next';

// Admin paneli gelene kadar kullanacağımız Mock Data
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

      {/* --- TAM SAYFA GENİŞLİĞİNDE KAYAN BANT --- */}
      {/* Kapsayıcının dışına alarak tüm ekranı kaplamasını sağladık */}
      <div className="marquee-wrapper">
        <div className="marquee-container">
          <div className="marquee-track">
            
            {/* JS'in Gücü: 2K ve daha geniş ekranlardaki boşluğu kapatmak için diziyi 4 KERE birleştiriyoruz */}
            {[...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos].map((brand, index) => (
              <a 
                key={`${brand.id}-${index}`} 
                href={brand.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="marquee-item"
              >
                <img src={brand.logo} alt={brand.name} />
              </a>
            ))}
            
          </div>
        </div>
      </div>

      {/* SAYFA İÇİ STİLLER */}
      <style>{`
        .hero-section {
          /* Bandın alanı kaplaması için esneklik verdik */
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 80px 20px;
  
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

        /* --- YENİ BANT MİMARİSİ (Tam Sayfa ve Geniş) --- */
        .marquee-wrapper {
          width: 100%; /* Ekranın tamamını kaplar */
          background-color: #F8F9FA; /* Bandın ayrışması için çok hafif gri/beyaz bir ton */
          padding: 40px 0; /* Bandı yukardan ve aşağıdan daha geniş/kalın yaptık */
          border-top: 1px solid #EAEAEA;
          border-bottom: 1px solid #EAEAEA;
          margin-top: auto; /* İçeriğin en altına iter */
        }

        .marquee-container {
          width: 100%;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }

        .marquee-track {
          display: flex;
          gap: 60px; /* Logolar arasını açtık */
          width: max-content;
          animation: scroll 37s linear infinite; /* Daha pürüzsüz bir hız */
        }

        .marquee-wrapper:hover .marquee-track {
          animation-play-state: paused;
        }

        .marquee-item {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease, filter 0.3s ease;
          opacity: 0.6; 
          cursor: pointer;
        }

        .marquee-item:hover {
          transform: scale(1.08); 
          filter: grayscale(0%); /* Üzerine gelince orijinal renkleri parlar */
          opacity: 1; 
        }

        .marquee-item img {
          height: 65px; /* Logoları da belirgin şekilde büyüttük */
          object-fit: contain;
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 30px)); } 
          /* Gap (60px) değerinin yarısını (30px) çıkararak kusursuz birleştirme yapıyoruz */
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default Home;