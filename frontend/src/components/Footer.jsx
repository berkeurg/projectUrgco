import { Link } from 'react-router-dom';
import logoGorseliBeyaz from '../assets/logo2.png';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#0B0B0B', color: '#FFFAFA', padding: '60px 20px 20px 20px', marginTop: 'auto' }}>
      
      {/* 1. LOGO KISMI */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <Link to="/">
          <img src={logoGorseliBeyaz} alt="UrgCo" style={{ height: '45px', objectFit: 'contain' }} />
        </Link>
      </div>

      {/* 2. MESAJ KISMI */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <p style={{ fontSize: '14px', color: '#a0a0a0', fontFamily: "vesterbro-sans-vf", fontWeight: '400'}}>
          İşletmenize değer katmak için buradayız. <span style={{ fontWeight: '700', color: '#7426B0' }}>Saygılarımızla.</span>
        </p>
      </div>

      {/* 3. ÇİZGİ VE TELİF HAKKI KISMI */}
      <div style={{ 
        borderTop: '1px solid', 
        borderImage: 'linear-gradient(to right, transparent, #3a3a3a, transparent) 1', // Çizgiyi kenarlarda yok eder
        paddingTop: '20px', 
        textAlign: 'center', 
        marginTop: '50px' 
      }}>
        {/* İç içe p etiketleri yerine div ve p kullanarak HTML yapısını düzelttik */}
        <div style={{ margin: 0, color: '#a0a0a0', fontFamily: 'amandine' }}>
          <p style={{ fontFamily: "vesterbro-sans-vf", fontWeight: '400', marginTop: '5px', fontSize: '14px' }}>
            © {new Date().getFullYear()}. Tüm hakları saklıdır.
          </p>
        </div>
      </div>

    </footer>
  );
}

export default Footer;