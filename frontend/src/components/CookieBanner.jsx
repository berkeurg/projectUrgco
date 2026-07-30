import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  // Sayfa yüklendiğinde kullanıcının daha önce onay verip vermediğini kontrol et
  useEffect(() => {
    const consent = localStorage.getItem('urgco_cookie_consent');
    if (!consent) {
      // Sadece onay yoksa görünür yap
      const timer = setTimeout(() => setIsVisible(true), 1500); // 1.5 saniye gecikmeli çıksın, şık dursun
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('urgco_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-content">
        <p>
          Size daha iyi bir deneyim sunmak, site trafiğini analiz etmek ve teknik iyileştirmeler yapmak için çerezler kullanıyoruz. Siteyi kullanmaya devam ederek{' '}
          <Link to="/kvkk" className="cookie-link">KVKK ve Çerez Politikamızı</Link> kabul etmiş olursunuz.
        </p>
      </div>
      <button onClick={acceptCookies} className="cookie-btn">
        Kabul Et
      </button>

      <style>{`
        .cookie-banner {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 800px;
          background-color: #0B0B0B;
          color: #EAEAEA;
          padding: 20px 30px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          z-index: 9999;
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .cookie-content p {
          margin: 0;
          font-size: 14px;
          line-height: 1.6;
        }

        .cookie-link {
          color: #7426B0;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .cookie-link:hover {
          color: #923bdc;
          text-decoration: underline;
        }

        .cookie-btn {
          background-color: #7426B0;
          color: #FFFFFF;
          border: none;
          padding: 12px 28px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          white-space: nowrap;
          transition: transform 0.3s ease, background-color 0.3s ease;
        }

        .cookie-btn:hover {
          background-color: #923bdc;
          transform: translateY(-2px);
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translate(-50%, 50px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }

        @media (max-width: 600px) {
          .cookie-banner {
            flex-direction: column;
            text-align: center;
            bottom: 16px;
            padding: 20px;
          }
          .cookie-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}