import React, { useEffect } from 'react';

export default function Kvkk() {
  // Sayfa açıldığında Lenis motorundan bağımsız en tepeye çıkması için güvenlik önlemi
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="kvkk-page">
      <div className="kvkk-container">
        <h1 className="kvkk-title">KVKK ve Çerez Politikası</h1>
        <p className="kvkk-date">Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>

        <section className="kvkk-section">
          <h2>1. Veri Sorumlusu</h2>
          <p>
            Kişisel verileriniz; veri sorumlusu sıfatıyla UrgCo tarafından, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") hükümlerine uygun olarak işlenmektedir.
          </p>
        </section>

        <section className="kvkk-section">
          <h2>2. Kişisel Verilerin İşlenme Amacı</h2>
          <p>
            Web sitemizi ziyaretiniz sırasında elde edilen kişisel verileriniz (IP adresiniz, cihaz bilgileriniz, tarayıcı türünüz vb.);
          </p>
          <ul>
            <li>Web sitesinin güvenliğini ve teknik altyapısının sorunsuz çalışmasını sağlamak,</li>
            <li>Site kullanım verilerini analiz ederek hizmetlerimizi iyileştirmek,</li>
            <li>Oluşabilecek teknik yazılım hatalarını tespit edip çözmek amacıyla (Sentry vb. hata izleme araçları aracılığıyla) işlenmektedir.</li>
          </ul>
        </section>

        <section className="kvkk-section">
          <h2>3. Çerez (Cookie) Kullanımı</h2>
          <p>
            UrgCo, ziyaretçilere daha iyi bir hizmet sunabilmek ve site performansını analiz etmek amacıyla çerezleri kullanmaktadır. 
            Sitemizde Google Analytics gibi üçüncü taraf analiz araçları kullanılabilir. Çerezleri tarayıcı ayarlarınızdan dilediğiniz zaman devre dışı bırakabilirsiniz.
          </p>
        </section>

        <section className="kvkk-section">
          <h2>4. İletişim ve Haklarınız</h2>
          <p>
            KVKK'nın 11. maddesi kapsamında; verilerinizin işlenip işlenmediğini öğrenme, amacına uygun kullanılıp kullanılmadığını bilme, düzeltilmesini veya silinmesini talep etme hakkına sahipsiniz. 
            Talepleriniz için <strong>iletisim@urgco.tr</strong> adresi üzerinden bizimle iletişime geçebilirsiniz.
          </p>
        </section>
      </div>

      <style>{`
        .kvkk-page {
          min-height: 80vh;
          padding: 120px 20px 80px 20px;
          display: flex;
          justify-content: center;
        }

        .kvkk-container {
          max-width: 800px;
          width: 100%;
        }

        .kvkk-title {
          font-size: clamp(32px, 5vw, 48px);
          color: #0B0B0B;
          font-weight: 800;
          margin-bottom: 10px;
          letter-spacing: -1px;
        }

        .kvkk-date {
          color: #7426B0;
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 50px;
        }

        .kvkk-section {
          margin-bottom: 40px;
        }

        .kvkk-section h2 {
          font-size: 24px;
          color: #0B0B0B;
          margin-bottom: 16px;
          font-weight: 700;
        }

        .kvkk-section p {
          font-size: 16px;
          color: #666666;
          line-height: 1.8;
          margin-bottom: 16px;
        }

        .kvkk-section ul {
          padding-left: 20px;
          color: #666666;
          line-height: 1.8;
        }

        .kvkk-section li {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
}