import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logoGorseli from '../assets/logo.png';


const menuLinkleri = [
  { id: 1, path: '/', label: 'Ana Sayfa' },
  { id: 2, path: '/about', label: 'Biz Kimiz?' },
  { id: 3, path: '/projects', label: 'Neler Yaptık?' }
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
              style={{ 
                height: '40px', 
                display: 'block' 
              }} 
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
            position: 'relative', // Z-index'in çalışması için gerekli
            zIndex: '1002'        // Menünün üstünde kalıp (X) ikonunun tıklanabilir olmasını sağlar
          }}
          className="hamburger-icon"
        >
          {isOpen ? '✕' : '☰'}
        </button>

        {/* SAĞ KISIM: Dinamik Menü Linkleri */}
        <div 
          className={`nav-links ${isOpen ? 'active' : ''}`}
          style={{ 
            display: 'flex', 
            gap: '25px',
            alignItems: 'center'
          }}
        >
          {/* 2. DİNAMİK ÜRETİM: Linkleri veriden map() ile çekiyoruz */}
          {menuLinkleri.map((link) => (
            <NavLink 
              key={link.id}
              to={link.path} 
              onClick={() => setIsOpen(false)} 
              style={({ isActive }) => ({
                textDecoration: 'none',
                fontSize: '20px',
                color: isActive ? '#7426B0' : '#000000',
                fontWeight: 'normal',
                transition: 'color 0.2s ease-in-out'
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* MOBİL İÇİN ARKA PLAN KARARTMASI (Overlay) */}
      {/* Menü açıkken sayfanın geri kalanını hafif karartır ve tıklandığında menüyü kapatır */}
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

      {/* MOBİL İÇİN YANDAN KAYAN MENÜ CSS'İ */}
      <style>{`
        @media (max-width: 768px) {
          .hamburger-icon {
            display: block !important;
          }
          
          /* Yandan Açılma Mantığı Burada Devreye Giriyor */
          .nav-links {
            position: fixed !important;
            top: 0;
            right: 0;
            height: 100vh;           /* Ekranın tamamını dikeyde kaplar */
            width: 250px;            /* Menünün genişliği */
            background-color: #F3F6FB;
            flex-direction: column;
            padding-top: 80px !important; /* X butonunun altında kalsın diye üstten boşluk */
            gap: 30px !important;
            box-shadow: -5px 0 15px rgba(0,0,0,0.1); /* Sol tarafına hafif bir gölge ekler */
            
            /* Animasyon (Kayarak gelme efekti) */
            transition: transform 0.3s ease-in-out;
            transform: ${isOpen ? 'translateX(0)' : 'translateX(100%)'};
            z-index: 1001;
          }

          /* Masaüstünde karartmanın görünmemesini garantiye alıyoruz */
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