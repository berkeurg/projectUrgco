import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logoGorseli from '../assets/logo.png';

function Navbar() {
  // Mobil menünün açık olup olmadığını kontrol eden state
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
        flexWrap: 'wrap' // Mobilde esneklik sağlar
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

        {/* MOBİL İÇİN HAMBURGER BUTONU (Sadece küçük ekranda görünür) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          style={{ 
            display: 'none', // Büyük ekranda gizli
            background: 'none', 
            border: 'none', 
            fontSize: '28px', 
            cursor: 'pointer',
            color: '#333'
          }}
          className="hamburger-icon"
        >
          {isOpen ? '✕' : '☰'}
        </button>

        {/* SAĞ KISIM: Menü Linkleri (Masaüstü ve Mobil Duruma Göre Şekillenir) */}
        <div 
          className={`nav-links ${isOpen ? 'active' : ''}`}
          style={{ 
            display: 'flex', 
            gap: '25px',
            alignItems: 'center'
          }}
        >
          {/* Ana Sayfa Linki */}
          <NavLink 
            to="/" 
            onClick={() => setIsOpen(false)} // Mobilde bir linke tıklandığında menüyü kapatır
            style={({ isActive }) => ({
              textDecoration: 'none',
              fontSize: '20px',
              color: isActive ? '#7426B0' : '#000000',
              fontWeight: isActive ? 'normal' : 'normal',
              transition: 'color 0.2s ease-in-out'
            })}
          >
            Ana Sayfa
          </NavLink>

          {/* Hakkımda Linki */}
          <NavLink 
            to="/about" 
            onClick={() => setIsOpen(false)} // Mobilde bir linke tıklandığında menüyü kapatır
            style={({ isActive }) => ({
              textDecoration: 'none',
              fontSize: '20px',
              color: isActive ? '#7426B0' : '#000000',
              fontWeight: isActive ? 'normal' : 'normal',
              transition: 'color 0.2s ease-in-out'
            })}
          >
            Biz Kimiz?
          </NavLink>

        </div>
      </nav>

      {/* MOBİL İÇİN AÇILIR KAPANIR MENÜ ALANI (CSS ile ekran küçükken aktifleşir) */}
      <style>{`
        @media (max-width: 768px) {
          .hamburger-icon {
            display: block !important;
          }
          .nav-links {
            display: ${isOpen ? 'flex' : 'none'} !important;
            flex-direction: column;
            width: 100%;
            background-color: #F3F6FB;
            padding: 20px 0;
            gap: 15px !important;
            text-align: center;
            border-top: 1px solid #ddd;
          }
        }
      `}</style>
    </header>
  );
}

export default Navbar;