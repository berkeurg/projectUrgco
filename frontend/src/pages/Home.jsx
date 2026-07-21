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
        <h1 style={{ fontWeight: '500', fontSize: '36px', lineHeight: '1.2', color: '#000000' }}>
          <span style={{ color: '#7426B0', fontFamily: "armandine", fontWeight: '700' }}>urgco</span> ile tanışmaya hazır mısın?
        </h1>
      </section>

    </div>
  );
}

// 3. Kamyonu yola çıkarıyoruz (Dışa aktarıyoruz)
export default Home;