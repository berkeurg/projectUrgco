import { useState, useEffect } from 'react';

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [partnerList, setPartnerList] = useState([]);
  
  const [formData, setFormData] = useState({
    company_name: '', logo_url: '', website_url: '', is_active: true, sort_order: 1 
  });

  // Giriş yapıldığında verileri çeken fonksiyon
  const fetchPartners = async (currentPassword = password) => {
    try {
      const res = await fetch('/api/partners?all=true', {
        headers: { 'Authorization': currentPassword } // API'ye şifremizi gizlice yolluyoruz
      });
      
      if (res.ok) {
        const data = await res.json();
        setPartnerList(Array.isArray(data) ? data : []);
        setIsAuthenticated(true);
      } else if (res.status === 401) {
        alert("Yetkisiz erişim: Hatalı şifre!");
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Veriler çekilemedi:", error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetchPartners(password); // Login butonuna basınca API'yi bu şifreyle test et
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('⏳ Kaydediliyor...');

    try {
      const response = await fetch('/api/partners', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': password 
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatusMessage('✅ Logo eklendi!');
        setFormData({ company_name: '', logo_url: '', website_url: '', is_active: true, sort_order: 1 });
        fetchPartners();
      } else {
        setStatusMessage('❌ Hata: Veri eklenemedi.');
      }
    } catch (error) {
      setStatusMessage('❌ Sunucu hatası.');
    }
  };

  const handleQuickUpdate = async (id, updates) => {
    try {
      const response = await fetch('/api/partners', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': password
        },
        body: JSON.stringify({ id, ...updates }),
      });
      if (response.ok) fetchPartners();
    } catch (error) { console.error(error); }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`"${name}" adlı markayı silmek istediğinize emin misiniz?`)) return;
    try {
      const response = await fetch('/api/partners', {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': password
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        setStatusMessage('🗑️ Marka silindi.');
        fetchPartners();
      }
    } catch (error) { console.error(error); }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  // --- BURANIN AŞAĞISINDAKİ RETURN VE STİL KISMI ÖNCEKİYLE BİREBİR AYNIDIR, KORUNDU ---
  return (
    <div className="admin-container">
      {!isAuthenticated ? (
        <div className="login-box">
          <h2>Admin Girişi</h2>
          <form onSubmit={handleLogin}>
            <input 
              type="password" placeholder="Şifrenizi girin..." 
              value={password} onChange={(e) => setPassword(e.target.value)} required 
            />
            <button type="submit">Giriş Yap</button>
          </form>
        </div>
      ) : (
        <div className="dashboard-grid">
          <div className="admin-box">
            <h2>Bize Güvenenler - Yeni Ekle</h2>
            {statusMessage && <p className="status-message">{statusMessage}</p>}
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Şirket/Marka Adı *</label>
                <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Logo URL (Link) *</label>
                <input type="text" name="logo_url" value={formData.logo_url} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Web Sitesi Linki (Opsiyonel)</label>
                <input type="url" name="website_url" value={formData.website_url} onChange={handleChange} />
              </div>
              <div className="inline-group">
                <div className="input-group" style={{ flex: 1 }}>
                  <label>Sıralama</label>
                  <input type="number" name="sort_order" value={formData.sort_order} onChange={handleChange} min="1" required />
                </div>
                <div className="checkbox-group" style={{ flex: 2, marginLeft: '20px', marginTop: '10px' }}>
                  <label>
                    <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
                    Sitede Görünsün (Aktif)
                  </label>
                </div>
              </div>
              <button type="submit" className="save-btn">Markayı Kaydet</button>
            </form>
          </div>

          <div className="admin-box list-box">
            <h2>Sistemdeki Logolar ({partnerList.length})</h2>
            <div className="partners-list">
              {partnerList.length === 0 ? (
                <p style={{textAlign: 'center', color: '#666'}}>Henüz hiç logo eklenmemiş.</p>
              ) : (
                partnerList.map((item) => (
                  <div key={item.id} className={`partner-item ${item.is_active === 0 ? 'pasif-item' : ''}`}>
                    <div className="quick-action">
                      <label>Sıra</label>
                      <input 
                        type="number" defaultValue={item.sort_order} 
                        onBlur={(e) => handleQuickUpdate(item.id, { sort_order: e.target.value })}
                        className="sort-input" min="1"
                      />
                    </div>
                    <img src={item.logo_url} alt={item.company_name} />
                    <div className="partner-info"><h4>{item.company_name}</h4></div>
                    <div className="quick-action active-toggle">
                      <label>
                        <input 
                          type="checkbox" checked={item.is_active === 1}
                          onChange={(e) => handleQuickUpdate(item.id, { is_active: e.target.checked })}
                        />
                        Aktif
                      </label>
                    </div>
                    <button className="delete-btn" onClick={() => handleDelete(item.id, item.company_name)}>Sil</button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
      <style>{`
        .admin-container { min-height: calc(100vh - 80px); display: flex; align-items: center; justify-content: center; background-color: #f5f5f5; padding: 40px 20px; }
        .login-box { background: #fff; padding: 40px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); width: 100%; max-width: 400px; text-align: center; }
        .dashboard-grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: 30px; width: 100%; max-width: 1100px; align-items: start; }
        @media (max-width: 900px) { .dashboard-grid { grid-template-columns: 1fr; } }
        .admin-box { background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .admin-box h2 { margin-bottom: 24px; color: #0b0b0b; font-size: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
        .input-group { margin-bottom: 15px; } .inline-group { display: flex; align-items: center; }
        .input-group label { display: block; font-weight: 600; margin-bottom: 6px; color: #333; font-size: 13px; }
        input[type="text"], input[type="url"], input[type="password"], input[type="number"] { width: 100%; padding: 10px 14px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; outline: none; }
        .checkbox-group { font-size: 14px; font-weight: 600; color: #333; } .checkbox-group input { margin-right: 8px; width: 16px; height: 16px; cursor: pointer; }
        button.save-btn, button[type="submit"] { width: 100%; padding: 12px; background-color: #7426B0; color: white; border: none; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer; }
        .status-message { margin-bottom: 15px; font-size: 14px; font-weight: 600; color: #7426B0; }
        .partners-list { display: flex; flex-direction: column; gap: 15px; max-height: 550px; overflow-y: auto; padding-right: 10px; }
        .partner-item { display: flex; align-items: center; justify-content: space-between; padding: 12px 15px; background-color: #fafafa; border: 1px solid #eee; border-radius: 8px; transition: all 0.2s; }
        .pasif-item { opacity: 0.55; background-color: #f5f5f5; border-style: dashed; }
        .partner-item img { max-width: 60px; max-height: 40px; object-fit: contain; margin: 0 15px; }
        .partner-info { flex: 1; } .partner-info h4 { margin: 0; font-size: 14px; color: #333; }
        .quick-action { display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .quick-action label { font-size: 10px; color: #888; font-weight: bold; text-transform: uppercase; }
        .sort-input { width: 45px !important; text-align: center; padding: 4px !important; font-size: 13px !important; }
        .active-toggle { margin-right: 15px; flex-direction: row; }
        .active-toggle label { font-size: 13px; color: #333; display: flex; align-items: center; gap: 5px; cursor: pointer; text-transform: none; }
        .active-toggle input { cursor: pointer; }
        .delete-btn { background-color: #ff4757; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold; }
        .delete-btn:hover { background-color: #ff2a3f; }
      `}</style>
    </div>
  );
}

export default Admin;