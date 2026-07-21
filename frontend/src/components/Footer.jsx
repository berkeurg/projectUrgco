import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // 1. Çeviri fonksiyonunu import ettik
import logoGorseliBeyaz from '../assets/logo2.png';

function Footer() {
  const { t } = useTranslation(); // 2. Fonksiyonu bileşen içinde çağırdık

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
          {/* 3. Sabit yazıları JSON anahtarlarıyla değiştirdik */}
          {t('footer.mesaj1')} <span style={{ fontWeight: '700', color: '#7426B0' }}>{t('footer.mesaj2')}</span>
        </p>
      </div>

      {/* 3. ÇİZGİ VE TELİF HAKKI KISMI */}
      <div style={{ 
        borderTop: '1px solid', 
        borderImage: 'linear-gradient(to right, transparent, #3a3a3a, transparent) 1', 
        paddingTop: '20px', 
        textAlign: 'center', 
        marginTop: '50px' 
      }}>
        <div style={{ margin: 0, color: '#a0a0a0', fontFamily: 'amandine' }}>
          <p style={{ fontFamily: "vesterbro-sans-vf", fontWeight: '400', marginTop: '5px', fontSize: '14px' }}>
            {/* Dinamik yılı koruyup sadece telif yazısını çevirdik */}
            © {new Date().getFullYear()}. {t('footer.telif')}
          </p>
        </div>
      </div>

    </footer>
  );
}

export default Footer;