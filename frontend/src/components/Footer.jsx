// 1. Kamyonu (Fonksiyonu) hazırlıyoruz
function Footer() {
  
  // 2. Yükü (Ekranda görünecek HTML/JSX kodlarını) return ile döndürüyoruz
  return (
    <footer style={{ 
      backgroundColor: '#121212', 
      color: '#e0e0e0', 
      textAlign: 'center', 
      padding: '20px 0', 
      marginTop: 'auto',
      borderTop: '1px solid #333'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ margin: '0', fontSize: '14px' }}>
          &copy; 2026 urgco - Tüm Hakları Saklıdır.
        </p>
      </div>
    </footer>
  );
}

// 3. Kamyonu yola çıkarıyoruz (Dışa aktarıyoruz)
export default Footer;