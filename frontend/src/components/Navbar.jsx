import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; 
import logoGorseli from '../assets/logo.png';

const menuLinkleri = [
  { id: 1, path: '/', labelKey: 'navbar.anaSayfa' },
  { id: 2, path: '/about', labelKey: 'navbar.bizKimiz' },
  { id: 3, path: '/projects', labelKey: 'navbar.nelerYaptik' } 
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation(); 

  return (
    <header style={{ 
      backgroundColor: '#F3F6FB', 
      borderBottom: '1px solid #333',
      width: '100%',
      position: 'sticky', 
      top: '0',           
      zIndex: '1000'      
    }}>
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',            
        padding: '15px 30px', 
        maxWidth: '1200px',              
        margin: '0 auto',
        flexWrap: 'wrap'
      }}>
        
        {/* SOL KISIM: Logo Alanı */}
        <div>
          <Link to="/">
            <img 
              src={logoGorseli} 
              alt="UrgCo" 
              style={{ height: '40px', display: 'block' }} 
            />
          </Link>
        </div>

        {/* MOBİL İÇİN HAMBURGER BUTONU */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          style={{ 
            display: 'none', 
            background: 'none', 
            border: 'none', 
            fontSize: '28px', 
            cursor: 'pointer',
            color: '#333',
            position: 'relative', 
            zIndex: '1002'        
          }}
          className="hamburger-icon"
        >
          {isOpen ? '✕' : '☰'}
        </button>

        {/* SAĞ KISIM: Dinamik Menü Linkleri ve Dil Seçeneği */}
        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          
          {/* SADECE MENÜ LİNKLERİNİ TUTAN KISIM */}
          <div className="menu-items">
            {/* MAP fonksiyonuna index parametresini ekledik */}
            {menuLinkleri.map((link, index) => (
              <NavLink 
                key={link.id}
                to={link.path} 
                onClick={() => setIsOpen(false)} 
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  fontSize: '20px',
                  color: isActive ? '#7426B0' : '#000000',
                  fontWeight: 'normal',
                  transition: 'color 0.2s ease-in-out',
                  
                  /* Animasyon Kodları */
                  opacity: 0, 
                  animation: 'slideDownFade 0.5s ease-out forwards',
                  animationDelay: `${index * 0.15}s` /* Her linke sırayla gecikme verir */
                })}
              >
                {t(link.labelKey)}
              </NavLink>
            ))}
          </div>

          {/* SADECE DİL DEĞİŞTİRİCİYİ TUTAN KISIM */}
          <div 
            className="lang-switcher"
            style={{
              /* Dil seçeneğinin de linklerden hemen sonra süzülerek gelmesi için */
              opacity: 0,
              animation: 'slideDownFade 0.5s ease-out forwards',
              animationDelay: `${menuLinkleri.length * 0.15}s` 
            }}
          >
            <span 
              onClick={() => {
                i18n.changeLanguage('tr');
                setIsOpen(false);
              }}
              style={{ 
                cursor: 'pointer', 
                fontSize: '16px',
                fontWeight: i18n.language === 'tr' ? '700' : '400', 
                color: i18n.language === 'tr' ? '#7426B0' : '#666',
                transition: 'all 0.2s'
              }}
            >
              TR
            </span>
            <span style={{ color: '#ccc', fontSize: '14px' }}>|</span>
            <span 
              onClick={() => {
                i18n.changeLanguage('en');
                setIsOpen(false);
              }}
              style={{ 
                cursor: 'pointer', 
                fontSize: '16px',
                fontWeight: i18n.language === 'en' ? '700' : '400', 
                color: i18n.language === 'en' ? '#7426B0' : '#666',
                transition: 'all 0.2s'
              }}
            >
              EN
            </span>
          </div>

        </div>
      </nav>

      {/* MOBİL İÇİN ARKA PLAN KARARTMASI (Overlay) */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="menu-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: '1000'
          }}
        />
      )}

      {/* CSS (MASAÜSTÜ VE MOBİL YERLEŞİMLERİ + ANİMASYONLAR) */}
      <style>{`
        /* --- YENİ EKLENEN ANİMASYON --- */
        @keyframes slideDownFade {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* --- MASAÜSTÜ (Varsayılan) --- */
        .nav-links {
          display: flex;
          flex: 1;
          justify-content: flex-end; 
          align-items: center;
        }

        .menu-items {
          display: flex;
          gap: 25px;
          align-items: center;
        }

        .lang-switcher {
          display: flex;
          gap: 8px;
          align-items: center;
          margin-left: 50px; 
        }

        /* --- MOBİL UYUM (max-width: 768px) --- */
        @media (max-width: 768px) {
          .hamburger-icon {
            display: block !important;
          }
          
          .nav-links {
            position: fixed !important;
            top: 0;
            right: 0;
            height: 100vh;           
            width: 250px;            
            background-color: #F3F6FB;
            flex-direction: column !important;
            justify-content: flex-start !important;
            padding-top: 80px !important; 
            padding-bottom: 40px !important; 
            box-shadow: -5px 0 15px rgba(0,0,0,0.1); 
            transition: transform 0.3s ease-in-out;
            transform: ${isOpen ? 'translateX(0)' : 'translateX(100%)'};
            z-index: 1001;
          }

          .menu-items {
            flex-direction: column;
            gap: 30px !important;
          }

          .lang-switcher {
            margin-left: 0 !important;
            margin-top: auto !important; 
            justify-content: center;
            width: 100%;
          }

          .menu-overlay {
            display: block;
          }
        }

        @media (min-width: 769px) {
          .menu-overlay {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}

export default Navbar;