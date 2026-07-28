import { useState, useEffect } from 'react';

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  
  // Veri Listeleri
  const [partnerList, setPartnerList] = useState([]);
  const [projectList, setProjectList] = useState([]);

  // --- 1. PARTNER (BİZE GÜVENENLER) FORM STATE ---
  const [partnerForm, setPartnerForm] = useState({
    company_name: '', logo_url: '', website_url: '', is_active: true, sort_order: 1 
  });

  // --- 2. PROJE FORM STATE ---
  const [projectForm, setProjectForm] = useState({
    projectId: 'PRJ-05',
    slug: '',
    title: '',
    client: '',
    year: '2026',
    category: '',
    techStack: '["React", "Node.js"]',
    shortDesc: '',
    content: '["Paragraf 1", "Paragraf 2"]',
    coverImage: '',
    features: '["Özellik 1", "Özellik 2"]',
    liveLink: '#',
    githubLink: '#',
    sort_order: 1,
    isActive: true
  });

  const fetchData = async (currentPassword = password) => {
    try {
      // Partnerleri Çek
      const resPartners = await fetch('/api/partners?all=true', {
        headers: { 'Authorization': currentPassword } 
      });
      if (resPartners.ok) {
        const data = await resPartners.json();
        setPartnerList(Array.isArray(data) ? data : []);
        setIsAuthenticated(true);
      } else if (resPartners.status === 401) {
        alert("Yetkisiz erişim: Hatalı şifre!");
        setIsAuthenticated(false);
        return;
      }

      // Projeleri Çek
      const resProjects = await fetch('/api/projects?all=true', {
        headers: { 'Authorization': currentPassword }
      });
      if (resProjects.ok) {
        const data = await resProjects.json();
        setProjectList(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Veriler çekilemedi:", error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetchData(password);
  };

  // --- PARTNER İŞLEMLERİ ---
  const handlePartnerSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('⏳ Logo kaydediliyor...');
    try {
      const response = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': password },
        body: JSON.stringify(partnerForm),
      });
      if (response.ok) {
        setStatusMessage('✅ Logo başarıyla eklendi!');
        setPartnerForm({ company_name: '', logo_url: '', website_url: '', is_active: true, sort_order: 1 });
        fetchData();
      } else { setStatusMessage('❌ Logo eklenemedi.'); }
    } catch (error) { setStatusMessage('❌ Sunucu hatası.'); }
  };

  const handlePartnerQuickUpdate = async (id, updates) => {
    try {
      await fetch('/api/partners', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': password },
        body: JSON.stringify({ id, ...updates }),
      });
      fetchData();
    } catch (error) { console.error(error); }
  };

  const handlePartnerDelete = async (id, name) => {
    if (!window.confirm(`"${name}" adlı markayı silmek istediğinize emin misiniz?`)) return;
    try {
      await fetch('/api/partners', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': password },
        body: JSON.stringify({ id }),
      });
      setStatusMessage('🗑️ Marka silindi.');
      fetchData();
    } catch (error) { console.error(error); }
  };

  // --- PROJE İŞLEMLERİ ---
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('⏳ Proje kaydediliyor...');
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': password },
        body: JSON.stringify(projectForm),
      });
      if (response.ok) {
        setStatusMessage('✅ Proje başarıyla eklendi!');
        setProjectForm({
          projectId: 'PRJ-06', slug: '', title: '', client: '', year: '2026', category: '',
          techStack: '["React"]', shortDesc: '', content: '["Açıklama"]', coverImage: '',
          features: '["Özellik"]', liveLink: '#', githubLink: '#', sort_order: 1, isActive: true
        });
        fetchData();
      } else { setStatusMessage('❌ Proje eklenemedi.'); }
    } catch (error) { setStatusMessage('❌ Sunucu hatası.'); }
  };

  const handleProjectQuickUpdate = async (id, updates) => {
    try {
      await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': password },
        body: JSON.stringify({ id, ...updates }),
      });
      fetchData();
    } catch (error) { console.error(error); }
  };

  const handleProjectDelete = async (id, title) => {
    if (!window.confirm(`"${title}" adlı projeyi silmek istediğinize emin misiniz?`)) return;
    try {
      await fetch('/api/projects', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': password },
        body: JSON.stringify({ id }),
      });
      setStatusMessage('🗑️ Proje silindi.');
      fetchData();
    } catch (error) { console.error(error); }
  };

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
        <div className="admin-wrapper">
          {statusMessage && <div className="global-status">{statusMessage}</div>}

          {/* ================= 1. BÖLÜM: BİZE GÜVENENLER (PARTNERS) ================= */}
          <div className="section-title-box">
            <h2>Bize Güvenenler Yönetimi</h2>
          </div>
          
          <div className="dashboard-grid">
            <div className="admin-box">
              <h3>Yeni Logo Ekle</h3>
              <form onSubmit={handlePartnerSubmit}>
                <div className="input-group">
                  <label>Şirket/Marka Adı *</label>
                  <input type="text" name="company_name" value={partnerForm.company_name} onChange={(e) => setPartnerForm({...partnerForm, company_name: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label>Logo URL (Link) *</label>
                  <input type="text" name="logo_url" value={partnerForm.logo_url} onChange={(e) => setPartnerForm({...partnerForm, logo_url: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label>Web Sitesi Linki</label>
                  <input type="url" name="website_url" value={partnerForm.website_url} onChange={(e) => setPartnerForm({...partnerForm, website_url: e.target.value})} />
                </div>
                <div className="inline-group">
                  <div className="input-group flex-1">
                    <label>Sıralama</label>
                    <input type="number" value={partnerForm.sort_order} onChange={(e) => setPartnerForm({...partnerForm, sort_order: e.target.value})} min="1" required />
                  </div>
                  <div className="checkbox-group flex-2">
                    <label>
                      <input type="checkbox" checked={partnerForm.is_active} onChange={(e) => setPartnerForm({...partnerForm, is_active: e.target.checked})} />
                      Sitede Görünsün
                    </label>
                  </div>
                </div>
                <button type="submit" className="save-btn">Markayı Kaydet</button>
              </form>
            </div>

            <div className="admin-box list-box">
              <h3>Logolar ({partnerList.length})</h3>
              <div className="partners-list">
                {partnerList.length === 0 ? <p className="empty-text">Henüz logo yok.</p> : partnerList.map((item) => (
                  <div key={item.id} className={`partner-item ${item.is_active === 0 ? 'pasif-item' : ''}`}>
                    <div className="quick-action">
                      <label>Sıra</label>
                      <input type="number" defaultValue={item.sort_order} onBlur={(e) => handlePartnerQuickUpdate(item.id, { sort_order: e.target.value })} className="sort-input" min="1" />
                    </div>
                    <img src={item.logo_url} alt={item.company_name} />
                    <div className="partner-info"><h4>{item.company_name}</h4></div>
                    <div className="quick-action active-toggle">
                      <label>
                        <input type="checkbox" checked={item.is_active === 1} onChange={(e) => handlePartnerQuickUpdate(item.id, { is_active: e.target.checked })} />
                        <span>Aktif</span>
                      </label>
                    </div>
                    <button className="delete-btn" onClick={() => handlePartnerDelete(item.id, item.company_name)}>Sil</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* --- BÖLÜCÜ ÇİZGİ --- */}
          <hr className="admin-divider" />

          {/* ================= 2. BÖLÜM: NELER YAPTIK (PROJELER) ================= */}
          <div className="section-title-box">
            <h2>Neler Yaptık (Projeler) Yönetimi</h2>
          </div>

          <div className="dashboard-grid">
            <div className="admin-box">
              <h3>Yeni Proje Ekle</h3>
              <form onSubmit={handleProjectSubmit}>
                <div className="input-group">
                  <label>Proje ID (Örn: PRJ-01)</label>
                  <input type="text" value={projectForm.projectId} onChange={(e) => setProjectForm({...projectForm, projectId: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label>Slug (URL Adı - Örn: cigerci-ozkan)</label>
                  <input type="text" value={projectForm.slug} onChange={(e) => setProjectForm({...projectForm, slug: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label>Proje Başlığı *</label>
                  <input type="text" value={projectForm.title} onChange={(e) => setProjectForm({...projectForm, title: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label>Müşteri / Tür</label>
                  <input type="text" value={projectForm.client} onChange={(e) => setProjectForm({...projectForm, client: e.target.value})} />
                </div>
                <div className="input-group">
                  <label>Yıl</label>
                  <input type="text" value={projectForm.year} onChange={(e) => setProjectForm({...projectForm, year: e.target.value})} />
                </div>
                <div className="input-group">
                  <label>Kategori (Örn: Kurumsal Web Sistemi)</label>
                  <input type="text" value={projectForm.category} onChange={(e) => setProjectForm({...projectForm, category: e.target.value})} />
                </div>
                <div className="input-group">
                  <label>Kapak Görseli URL *</label>
                  <input type="text" value={projectForm.coverImage} onChange={(e) => setProjectForm({...projectForm, coverImage: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label>Kısa Açıklama (Lead Text)</label>
                  <textarea rows="2" value={projectForm.shortDesc} onChange={(e) => setProjectForm({...projectForm, shortDesc: e.target.value})} />
                </div>
                <div className="input-group">
                  <label>Teknolojiler (JSON Dizi: ["React", "PHP"])</label>
                  <input type="text" value={projectForm.techStack} onChange={(e) => setProjectForm({...projectForm, techStack: e.target.value})} />
                </div>
                <div className="input-group">
                  <label>Detay Paragrafları (JSON Dizi: ["Yazı 1", "Yazı 2"])</label>
                  <textarea rows="3" value={projectForm.content} onChange={(e) => setProjectForm({...projectForm, content: e.target.value})} />
                </div>
                <div className="input-group">
                  <label>Özellikler (JSON Dizi: ["Özellik 1", "Özellik 2"])</label>
                  <input type="text" value={projectForm.features} onChange={(e) => setProjectForm({...projectForm, features: e.target.value})} />
                </div>
                <div className="input-group">
                  <label>Canlı Sistem Linki</label>
                  <input type="url" value={projectForm.liveLink} onChange={(e) => setProjectForm({...projectForm, liveLink: e.target.value})} />
                </div>
                <div className="input-group">
                  <label>GitHub Linki</label>
                  <input type="url" value={projectForm.githubLink} onChange={(e) => setProjectForm({...projectForm, githubLink: e.target.value})} />
                </div>
                <div className="inline-group">
                  <div className="input-group flex-1">
                    <label>Sıralama</label>
                    <input type="number" value={projectForm.sort_order} onChange={(e) => setProjectForm({...projectForm, sort_order: e.target.value})} min="1" required />
                  </div>
                  <div className="checkbox-group flex-2">
                    <label>
                      <input type="checkbox" checked={projectForm.isActive} onChange={(e) => setProjectForm({...projectForm, isActive: e.target.checked})} />
                      Sitede Görünsün
                    </label>
                  </div>
                </div>
                <button type="submit" className="save-btn">Projeyi Kaydet</button>
              </form>
            </div>

            <div className="admin-box list-box">
              <h3>Projeler ({projectList.length})</h3>
              <div className="partners-list">
                {projectList.length === 0 ? <p className="empty-text">Henüz proje yok.</p> : projectList.map((item) => (
                  <div key={item.id} className={`partner-item ${item.isActive === 0 ? 'pasif-item' : ''}`}>
                    <div className="quick-action">
                      <label>Sıra</label>
                      <input type="number" defaultValue={item.sortOrder} onBlur={(e) => handleProjectQuickUpdate(item.id, { sortOrder: e.target.value })} className="sort-input" min="1" />
                    </div>
                    <img src={item.coverImage} alt={item.title} />
                    <div className="partner-info">
                      <h4>{item.title}</h4>
                      <span style={{ fontSize: '11px', color: '#666' }}>{item.category}</span>
                    </div>
                    <div className="quick-action active-toggle">
                      <label>
                        <input type="checkbox" checked={item.isActive === 1} onChange={(e) => handleProjectQuickUpdate(item.id, { isActive: e.target.checked })} />
                        <span>Aktif</span>
                      </label>
                    </div>
                    <button className="delete-btn" onClick={() => handleProjectDelete(item.id, item.title)}>Sil</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* STİLLER */}
      <style>{`
        .admin-container { 
          min-height: calc(100vh - 80px); display: flex; justify-content: center; 
          background-color: #f5f5f5; padding: 40px 20px; box-sizing: border-box;
        }
        .admin-wrapper { width: 100%; max-width: 1100px; display: flex; flex-direction: column; gap: 30px; }
        .login-box { 
          background: #fff; padding: 40px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); 
          width: 100%; max-width: 400px; text-align: center; margin: auto;
        }
        .global-status {
          background: #7426B0; color: white; padding: 12px 20px; border-radius: 8px; font-weight: 600; text-align: center;
        }
        .section-title-box h2 { font-size: 24px; color: #080808; border-left: 4px solid #7426B0; padding-left: 12px; margin: 0; }
        .admin-divider { border: none; height: 2px; background: #e0e0e0; margin: 20px 0; }

        .dashboard-grid { 
          display: grid; grid-template-columns: 1fr 1.3fr; gap: 30px; align-items: start; 
        }
        .admin-box { background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .admin-box h3 { margin-top: 0; margin-bottom: 20px; color: #0b0b0b; font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
        
        .input-group { margin-bottom: 15px; } 
        .inline-group { display: flex; align-items: center; gap: 20px; margin-top: 15px; }
        .flex-1 { flex: 1; margin-bottom: 0; }
        .flex-2 { flex: 2; }
        
        .input-group label { display: block; font-weight: 600; margin-bottom: 6px; color: #333; font-size: 13px; }
        input[type="text"], input[type="url"], input[type="password"], input[type="number"], textarea { 
          width: 100%; padding: 10px 14px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; outline: none; box-sizing: border-box; font-family: inherit;
        }
        textarea { resize: vertical; }
        .checkbox-group { font-size: 14px; font-weight: 600; color: #333; } 
        .checkbox-group input { margin-right: 8px; width: 16px; height: 16px; cursor: pointer; }
        
        button.save-btn, button[type="submit"] { 
          width: 100%; padding: 12px; background-color: #7426B0; color: white; border: none; 
          border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer; margin-top: 10px;
        }
        button.save-btn:hover { background-color: #5a1d8c; }
        
        .partners-list { display: flex; flex-direction: column; gap: 15px; max-height: 600px; overflow-y: auto; padding-right: 5px; }
        .empty-text { text-align: center; color: #666; font-size: 14px; }
        .partner-item { 
          display: flex; align-items: center; justify-content: space-between; padding: 12px 15px; 
          background-color: #fafafa; border: 1px solid #eee; border-radius: 8px; gap: 10px; 
        }
        .pasif-item { opacity: 0.55; background-color: #f5f5f5; border-style: dashed; }
        .partner-item img { max-width: 60px; max-height: 40px; object-fit: cover; border-radius: 4px; }
        .partner-info { flex: 1; } .partner-info h4 { margin: 0; font-size: 14px; color: #333; word-break: break-word; }
        
        .quick-action { display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .quick-action label { font-size: 10px; color: #888; font-weight: bold; text-transform: uppercase; }
        .sort-input { width: 45px !important; text-align: center; padding: 4px !important; font-size: 13px !important; }
        .active-toggle { flex-direction: row; }
        .active-toggle label { font-size: 13px; color: #333; display: flex; align-items: center; gap: 5px; cursor: pointer; }
        .delete-btn { 
          background-color: #ff4757; color: white; border: none; padding: 6px 12px; 
          border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold; 
        }
        .delete-btn:hover { background-color: #ff2a3f; }

        @media (max-width: 900px) { 
          .dashboard-grid { grid-template-columns: 1fr; } 
        }
      `}</style>
    </div>
  );
}

export default Admin;