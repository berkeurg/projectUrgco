// 1. Kamyonu (Fonksiyonu) hazırlıyoruz
function Home() {
  
  // 2. Yükü (Ekranda görünecek HTML/JSX kodlarını) döndürüyoruz
  return (
    <div style={{ 
      padding: '40px 20px', 
      maxWidth: '1200px', 
      margin: '0 auto', 
      color: '#ff4747',
      fontFamily: 'sans-serif'
    }}>
      
      {/* Karşılama Alanı (Hero Section) */}
      <section style={{ textAlign: 'center',
        marginBottom: '60px',
        marginTop: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', lineHeight: '1.2' }}>
          urgco ile tanışmaya hazır mısınız?
        </h1>
      </section>

      {/* Projeler Alanı */}
      <section>
        <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>
          Öne Çıkan Çalışmalarım
        </h2>
        
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
          
          {/* Proje Kartı 1 */}
          <div style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '8px', flex: '1 1 300px', border: '1px solid #333' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#fff' }}>Ciğerci Özkan Platformu</h3>
            <p style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.5' }}>
              Yerel bir işletme için geliştirilmiş, entegre QR menü sistemine sahip,
              arama motoru (SEO) optimizasyonlu, tamamen duyarlı (responsive) ticari web platformu.
            </p>
          </div>
          
          {/* Proje Kartı 2 */}
          <div style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '8px', flex: '1 1 300px', border: '1px solid #333' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#fff' }}>CoupleFun & Veritabanı Mimarisi</h3>
            <p style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.5' }}>
              İlişkisel veritabanı şemaları (MySQL) ve PDO entegrasyonu kullanılarak 
              sıfırdan tasarlanmış, güvenli ve interaktif özel web uygulaması.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}

// 3. Kamyonu yola çıkarıyoruz (Dışa aktarıyoruz)
export default Home;