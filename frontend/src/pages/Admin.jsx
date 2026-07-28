import { useState, useEffect } from 'react';

// Gelen eski düz string verileri veya yeni JSON i18n verilerini güvenlice ayrıştıran yardımcı fonksiyon
const safeParseI18n = (val, defaultVal = '') => {
  if (!val) return { tr: defaultVal, en: defaultVal };
  try {
    const parsed = JSON.parse(val);
    if (parsed.tr !== undefined || parsed.en !== undefined) {
      return { tr: parsed.tr || defaultVal, en: parsed.en || defaultVal };
    }
    return { tr: val, en: val }; // Veri eskiden kalma düz metinse her iki dile de kopyala
  } catch {
    return { tr: val, en: val }; // Parse edilemeyen string ise
  }
};

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  
  const [partnerList, setPartnerList] = useState([]);
  const [projectList, setProjectList] = useState([]);

  // --- DÜZENLEME (EDIT) MODU STATE'LERİ ---
  const [editingPartnerId, setEditingPartnerId] = useState(null);
  const [editingProjectId, setEditingProjectId] = useState(null);

  // --- İ18N DİL SEKME STATE'İ ---
  const [activeLangTab, setActiveLangTab] = useState('tr');

  const initialPartnerForm = { company_name: '', logo_url: '', website_url: '', is_active: true, sort_order: 1 };
  const [partnerForm, setPartnerForm] = useState(initialPartnerForm);

  const initialProjectForm = {
    projectId: `PRJ-${Date.now().toString().slice(-4)}`, slug: '', year: '2026',
    techStack: '["React", "Node.js"]', coverImage: '', liveLink: '#', githubLink: '#',
    sortOrder: 1, isActive: true,
    // Çoklu dil (i18n) destekleyen alanlar
    title: { tr: '', en: '' },
    client: { tr: '', en: '' },
    category: { tr: '', en: '' },
    shortDesc: { tr: '', en: '' },
    content: { tr: '["Paragraf 1"]', en: '["Paragraph 1"]' },
    features: { tr: '["Özellik 1"]', en: '["Feature 1"]' }
  };
  const [projectForm, setProjectForm] = useState(initialProjectForm);

  const fetchData = async (currentPassword = password) => {
    try {
      const resPartners = await fetch('/api/partners?all=true', { headers: { 'Authorization': currentPassword } });
      if (resPartners.ok) {
        const data = await resPartners.json();
        setPartnerList(Array.isArray(data) ? data : []);
        setIsAuthenticated(true);
      } else if (resPartners.status === 401) {
        alert("Yetkisiz erişim: Hatalı şifre!");
        setIsAuthenticated(false);
        return;
      }

      const resProjects = await fetch('/api/projects?all=true', { headers: { 'Authorization': currentPassword } });
      if (resProjects.ok) {
        const data = await resProjects.json();
        setProjectList(Array.isArray(data) ? data : []);
      }
    } catch (error) { console.error("Veriler çekilemedi:", error); }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetchData(password);
  };

  // Çoklu dil form alanları için özel onChange dinleyicisi
  const handleI18nChange = (field, value) => {
    setProjectForm(prev => ({ ...prev, [field]: { ...prev[field], [activeLangTab]: value } }));
  };

  // ================= PARTNER İŞLEMLERİ =================
  const handlePartnerSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('⏳ Logo kaydediliyor...');
    const method = editingPartnerId ? 'PUT' : 'POST';
    const bodyData = editingPartnerId ? { id: editingPartnerId, ...partnerForm } : partnerForm;

    try {
      const response = await fetch('/api/partners', {
        method, headers: { 'Content-Type': 'application/json', 'Authorization': password },
        body: JSON.stringify(bodyData),
      });
      if (response.ok) {
        setStatusMessage(editingPartnerId ? '✅ Logo güncellendi!' : '✅ Logo eklendi!');
        cancelPartnerEdit();
        fetchData();
      } else { setStatusMessage('❌ İşlem başarısız.'); }
    } catch (error) { setStatusMessage('❌ Sunucu hatası.'); }
  };

  const handleEditPartner = (item) => {
    setEditingPartnerId(item.id);
    setPartnerForm({
      company_name: item.company_name, logo_url: item.logo_url, website_url: item.website_url || '',
      is_active: item.is_active === 1, sort_order: item.sort_order
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelPartnerEdit = () => {
    setEditingPartnerId(null);
    setPartnerForm(initialPartnerForm);
  };

  const handlePartnerQuickUpdate = async (id, updates) => {
    try {
      await fetch('/api/partners', {
        method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': password },
        body: JSON.stringify({ id, ...updates }),
      });
      fetchData();
    } catch (error) { console.error(error); }
  };

  const handlePartnerDelete = async (id, name) => {
    if (!window.confirm(`"${name}" adlı markayı silmek istediğinize emin misiniz?`)) return;
    try {
      await fetch('/api/partners', {
        method: 'DELETE', headers: { 'Content-Type': 'application/json', 'Authorization': password },
        body: JSON.stringify({ id }),
      });
      setStatusMessage('🗑️ Marka silindi.');
      if (editingPartnerId === id) cancelPartnerEdit();
      fetchData();
    } catch (error) { console.error(error); }
  };

  // ================= PROJE İŞLEMLERİ =================
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('⏳ Proje kaydediliyor...');
    
    // Göndermeden önce çoklu dil objelerini DB için string (JSON) haline getir
    const preparedData = {
      ...projectForm,
      title: JSON.stringify(projectForm.title),
      client: JSON.stringify(projectForm.client),
      category: JSON.stringify(projectForm.category),
      shortDesc: JSON.stringify(projectForm.shortDesc),
      content: JSON.stringify(projectForm.content),
      features: JSON.stringify(projectForm.features)
    };

    const method = editingProjectId ? 'PUT' : 'POST';
    const bodyData = editingProjectId ? { id: editingProjectId, ...preparedData } : preparedData;

    try {
      const response = await fetch('/api/projects', {
        method, headers: { 'Content-Type': 'application/json', 'Authorization': password },
        body: JSON.stringify(bodyData),
      });
      if (response.ok) {
        setStatusMessage(editingProjectId ? '✅ Proje güncellendi!' : '✅ Proje eklendi!');
        cancelProjectEdit();
        fetchData();
      } else { setStatusMessage('❌ İşlem başarısız.'); }
    } catch (error) { setStatusMessage('❌ Sunucu hatası.'); }
  };

  const handleEditProject = (item) => {
    setEditingProjectId(item.id);
    
    // Veritabanından gelen string verileri React objelerine dönüştür
    setProjectForm({
      projectId: item.projectId, slug: item.slug, year: item.year || '',
      techStack: item.techStack || '[]', coverImage: item.coverImage,
      liveLink: item.liveLink || '', githubLink: item.githubLink || '',
      sortOrder: item.sortOrder, isActive: item.isActive === 1,
      // i18n Parse Alanları
      title: safeParseI18n(item.title),
      client: safeParseI18n(item.client),
      category: safeParseI18n(item.category),
      shortDesc: safeParseI18n(item.shortDesc),
      content: safeParseI18n(item.content, '[]'),
      features: safeParseI18n(item.features, '[]')
    });
    
    document.getElementById('project-form-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const cancelProjectEdit = () => {
    setEditingProjectId(null);
    setProjectForm({ ...initialProjectForm, projectId: `PRJ-${Date.now().toString().slice(-4)}` });
  };

  const handleProjectQuickUpdate = async (id, updates) => {
    try {
      await fetch('/api/projects', {
        method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': password },
        body: JSON.stringify({ id, ...updates }),
      });
      fetchData();
    } catch (error) { console.error(error); }
  };

  const handleProjectDelete = async (id, titleText) => {
    const titleObj = safeParseI18n(titleText);
    if (!window.confirm(`"${titleObj.tr}" adlı projeyi silmek istediğinize emin misiniz?`)) return;
    try {
      await fetch('/api/projects', {
        method: 'DELETE', headers: { 'Content-Type': 'application/json', 'Authorization': password },
        body: JSON.stringify({ id }),
      });
      setStatusMessage('🗑️ Proje silindi.');
      if (editingProjectId === id) cancelProjectEdit();
      fetchData();
    } catch (error) { console.error(error); }
  };

  return (
    <div className="admin-container">
      {!isAuthenticated ? (
        <div className="login-box">
          <h2>Admin Girişi</h2>
          <form onSubmit={handleLogin}>
            <input type="password" placeholder="Şifrenizi girin..." value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit" className="primary-btn">Giriş Yap</button>
          </form>
        </div>
      ) : (
        <div className="admin-wrapper">
          {statusMessage && <div className="global-status">{statusMessage}</div>}

          {/* ================= 1. BÖLÜM: BİZE GÜVENENLER ================= */}
          <div className="section-title-box"><h2>Bize Güvenenler Yönetimi</h2></div>
          
          <div className="dashboard-grid">
            <div className="admin-box">
              <h3>{editingPartnerId ? 'Logoyu Düzenle' : 'Yeni Logo Ekle'}</h3>
              <form onSubmit={handlePartnerSubmit}>
                <div className="input-group">
                  <label>Şirket/Marka Adı *</label>
                  <input type="text" value={partnerForm.company_name} onChange={(e) => setPartnerForm({...partnerForm, company_name: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label>Logo URL (Link) *</label>
                  <input type="text" value={partnerForm.logo_url} onChange={(e) => setPartnerForm({...partnerForm, logo_url: e.target.value})} required />
                  <small className="image-hint">💡 Önerilen: 400x400px (Kare), Şeffaf arkaplanlı PNG veya WEBP.</small>
                </div>
                <div className="input-group">
                  <label>Web Sitesi Linki</label>
                  <input type="url" value={partnerForm.website_url} onChange={(e) => setPartnerForm({...partnerForm, website_url: e.target.value})} />
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
                <div className="action-buttons">
                  <button type="submit" className="primary-btn">{editingPartnerId ? 'Değişiklikleri Kaydet' : 'Markayı Kaydet'}</button>
                  {editingPartnerId && <button type="button" onClick={cancelPartnerEdit} className="cancel-btn">İptal</button>}
                </div>
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
                    <div className="item-actions">
                      <label className="active-toggle">
                        <input type="checkbox" checked={item.is_active === 1} onChange={(e) => handlePartnerQuickUpdate(item.id, { is_active: e.target.checked })} />
                      </label>
                      <button className="edit-btn" onClick={() => handleEditPartner(item)}>Düzenle</button>
                      <button className="delete-btn" onClick={() => handlePartnerDelete(item.id, item.company_name)}>Sil</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <hr className="admin-divider" />

          {/* ================= 2. BÖLÜM: NELER YAPTIK (PROJELER) ================= */}
          <div className="section-title-box" id="project-form-section"><h2>Neler Yaptık (Projeler) Yönetimi</h2></div>

          <div className="dashboard-grid">
            <div className="admin-box">
              <h3>{editingProjectId ? 'Projeyi Düzenle' : 'Yeni Proje Ekle'}</h3>
              
              {/* ÇOKLU DİL SEKMELERİ */}
              <div className="lang-tabs">
                <button type="button" className={`lang-tab ${activeLangTab === 'tr' ? 'active' : ''}`} onClick={() => setActiveLangTab('tr')}>🇹🇷 Türkçe İçerik</button>
                <button type="button" className={`lang-tab ${activeLangTab === 'en' ? 'active' : ''}`} onClick={() => setActiveLangTab('en')}>🇬🇧 English Content</button>
              </div>

              <form onSubmit={handleProjectSubmit}>
                {/* --- EVRENSEL (DİLDEN BAĞIMSIZ) ALANLAR --- */}
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div className="input-group flex-1">
                    <label>Proje ID</label>
                    <input type="text" value={projectForm.projectId} onChange={(e) => setProjectForm({...projectForm, projectId: e.target.value})} required />
                  </div>
                  <div className="input-group flex-1">
                    <label>Slug (URL - Örn: cigerci-ozkan)</label>
                    <input type="text" value={projectForm.slug} onChange={(e) => setProjectForm({...projectForm, slug: e.target.value})} required />
                  </div>
                  <div className="input-group flex-1">
                    <label>Yıl</label>
                    <input type="text" value={projectForm.year} onChange={(e) => setProjectForm({...projectForm, year: e.target.value})} />
                  </div>
                </div>

                {/* --- ÇOKLU DİL DESTEKLİ ALANLAR --- */}
                <div className="input-group">
                  <label>Proje Başlığı ({activeLangTab.toUpperCase()}) *</label>
                  <input type="text" value={projectForm.title[activeLangTab]} onChange={(e) => handleI18nChange('title', e.target.value)} required />
                </div>
                
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div className="input-group flex-1">
                    <label>Müşteri / Tür ({activeLangTab.toUpperCase()})</label>
                    <input type="text" value={projectForm.client[activeLangTab]} onChange={(e) => handleI18nChange('client', e.target.value)} />
                  </div>
                  <div className="input-group flex-1">
                    <label>Kategori ({activeLangTab.toUpperCase()})</label>
                    <input type="text" value={projectForm.category[activeLangTab]} onChange={(e) => handleI18nChange('category', e.target.value)} />
                  </div>
                </div>

                <div className="input-group">
                  <label>Kısa Açıklama - Lead Text ({activeLangTab.toUpperCase()})</label>
                  <textarea rows="2" value={projectForm.shortDesc[activeLangTab]} onChange={(e) => handleI18nChange('shortDesc', e.target.value)} />
                </div>

                <div className="input-group">
                  <label>Detay Paragrafları JSON ({activeLangTab.toUpperCase()}) - Örn: ["Yazı 1", "Yazı 2"]</label>
                  <textarea rows="3" value={projectForm.content[activeLangTab]} onChange={(e) => handleI18nChange('content', e.target.value)} />
                </div>

                <div className="input-group">
                  <label>Özellikler JSON ({activeLangTab.toUpperCase()}) - Örn: ["Özellik 1", "Özellik 2"]</label>
                  <input type="text" value={projectForm.features[activeLangTab]} onChange={(e) => handleI18nChange('features', e.target.value)} />
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }}/>
                
                {/* --- YİNE EVRENSEL ALANLAR --- */}
                <div className="input-group">
                  <label>Kapak Görseli URL *</label>
                  <input type="text" value={projectForm.coverImage} onChange={(e) => setProjectForm({...projectForm, coverImage: e.target.value})} required />
                  <small className="image-hint">💡 Önerilen: 1920x1080px (Yatay), Kalitesi optimize edilmiş WEBP veya JPG.</small>
                </div>

                <div className="input-group">
                  <label>Teknolojiler (Evrensel JSON: ["React", "PHP"])</label>
                  <input type="text" value={projectForm.techStack} onChange={(e) => setProjectForm({...projectForm, techStack: e.target.value})} />
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                  <div className="input-group flex-1">
                    <label>Canlı Sistem Linki</label>
                    <input type="url" value={projectForm.liveLink} onChange={(e) => setProjectForm({...projectForm, liveLink: e.target.value})} />
                  </div>
                  <div className="input-group flex-1">
                    <label>GitHub Linki</label>
                    <input type="url" value={projectForm.githubLink} onChange={(e) => setProjectForm({...projectForm, githubLink: e.target.value})} />
                  </div>
                </div>

                <div className="inline-group">
                  <div className="input-group flex-1">
                    <label>Sıralama</label>
                    <input type="number" value={projectForm.sortOrder} onChange={(e) => setProjectForm({...projectForm, sortOrder: e.target.value})} min="1" required />
                  </div>
                  <div className="checkbox-group flex-2">
                    <label>
                      <input type="checkbox" checked={projectForm.isActive} onChange={(e) => setProjectForm({...projectForm, isActive: e.target.checked})} />
                      Sitede Görünsün
                    </label>
                  </div>
                </div>

                <div className="action-buttons">
                  <button type="submit" className="primary-btn">{editingProjectId ? 'Değişiklikleri Kaydet' : 'Projeyi Kaydet'}</button>
                  {editingProjectId && <button type="button" onClick={cancelProjectEdit} className="cancel-btn">İptal</button>}
                </div>
              </form>
            </div>

            <div className="admin-box list-box">
              <h3>Projeler ({projectList.length})</h3>
              <div className="partners-list">
                {projectList.length === 0 ? <p className="empty-text">Henüz proje yok.</p> : projectList.map((item) => {
                  const titleObj = safeParseI18n(item.title);
                  const catObj = safeParseI18n(item.category);
                  return (
                  <div key={item.id} className={`partner-item ${item.isActive === 0 ? 'pasif-item' : ''}`}>
                    <div className="quick-action">
                      <label>Sıra</label>
                      <input type="number" defaultValue={item.sortOrder} onBlur={(e) => handleProjectQuickUpdate(item.id, { sortOrder: e.target.value })} className="sort-input" min="1" />
                    </div>
                    <img src={item.coverImage} alt={titleObj.tr} style={{ objectFit: 'cover' }} />
                    <div className="partner-info">
                      <h4>{titleObj.tr} <small style={{fontWeight:'normal', color:'#888'}}>({item.projectId})</small></h4>
                      <span style={{ fontSize: '11px', color: '#666' }}>{catObj.tr}</span>
                    </div>
                    
                    <div className="item-actions">
                      <label className="active-toggle">
                        <input type="checkbox" checked={item.isActive === 1} onChange={(e) => handleProjectQuickUpdate(item.id, { isActive: e.target.checked })} />
                      </label>
                      <button className="edit-btn" onClick={() => handleEditProject(item)}>Düzenle</button>
                      <button className="delete-btn" onClick={() => handleProjectDelete(item.id, item.title)}>Sil</button>
                    </div>
                  </div>
                )})}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* STİLLER */}
      <style>{`
        .admin-container { min-height: calc(100vh - 80px); display: flex; justify-content: center; background-color: #f5f5f5; padding: 40px 20px; box-sizing: border-box; }
        .admin-wrapper { width: 100%; max-width: 1100px; display: flex; flex-direction: column; gap: 30px; }
        .login-box { background: #fff; padding: 40px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); width: 100%; max-width: 400px; text-align: center; margin: auto; }
        .global-status { background: #7426B0; color: white; padding: 12px 20px; border-radius: 8px; font-weight: 600; text-align: center; position: sticky; top: 20px; z-index: 100; box-shadow: 0 4px 12px rgba(116,38,176,0.3); }
        .section-title-box h2 { font-size: 24px; color: #080808; border-left: 4px solid #7426B0; padding-left: 12px; margin: 0; }
        .admin-divider { border: none; height: 2px; background: #e0e0e0; margin: 20px 0; }

        .dashboard-grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: 30px; align-items: start; }
        .admin-box { background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .admin-box h3 { margin-top: 0; margin-bottom: 20px; color: #0b0b0b; font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
        
        .lang-tabs { display: flex; gap: 10px; margin-bottom: 20px; border-bottom: 2px solid #eee; padding-bottom: 10px; }
        .lang-tab { background: transparent; border: none; font-size: 14px; font-weight: 600; color: #888; cursor: pointer; padding: 8px 16px; border-radius: 6px; transition: 0.2s; }
        .lang-tab:hover { background: #f0f0f0; }
        .lang-tab.active { color: #7426B0; background: rgba(116, 38, 176, 0.1); }

        .input-group { margin-bottom: 15px; } 
        .inline-group { display: flex; align-items: center; gap: 20px; margin-top: 15px; }
        .flex-1 { flex: 1; margin-bottom: 0; }
        .flex-2 { flex: 2; }
        
        .input-group label { display: block; font-weight: 600; margin-bottom: 6px; color: #333; font-size: 13px; }
        input[type="text"], input[type="url"], input[type="password"], input[type="number"], textarea { width: 100%; padding: 10px 14px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; outline: none; box-sizing: border-box; font-family: inherit; }
        textarea { resize: vertical; }
        
        .image-hint { display: block; margin-top: 6px; font-size: 11px; color: #666; font-style: italic; }
        
        .checkbox-group { font-size: 14px; font-weight: 600; color: #333; } 
        .checkbox-group input { margin-right: 8px; width: 16px; height: 16px; cursor: pointer; }
        
        .action-buttons { display: flex; gap: 10px; margin-top: 15px; }
        .primary-btn { flex: 2; padding: 12px; background-color: #7426B0; color: white; border: none; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer; transition: 0.2s; }
        .primary-btn:hover { background-color: #5a1d8c; }
        .cancel-btn { flex: 1; padding: 12px; background-color: #f1f2f6; color: #333; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: 0.2s; }
        .cancel-btn:hover { background-color: #e2e4e9; }
        
        .partners-list { display: flex; flex-direction: column; gap: 15px; max-height: 700px; overflow-y: auto; padding-right: 5px; }
        .empty-text { text-align: center; color: #666; font-size: 14px; }
        .partner-item { display: flex; align-items: center; justify-content: space-between; padding: 12px 15px; background-color: #fafafa; border: 1px solid #eee; border-radius: 8px; gap: 15px; }
        .pasif-item { opacity: 0.55; background-color: #f5f5f5; border-style: dashed; }
        .partner-item img { width: 60px; height: 40px; object-fit: contain; border-radius: 4px; }
        .partner-info { flex: 1; } .partner-info h4 { margin: 0; font-size: 14px; color: #333; word-break: break-word; }
        
        .quick-action { display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .quick-action label { font-size: 10px; color: #888; font-weight: bold; text-transform: uppercase; }
        .sort-input { width: 45px !important; text-align: center; padding: 4px !important; font-size: 13px !important; }
        
        .item-actions { display: flex; align-items: center; gap: 8px; }
        .active-toggle input { width: 16px; height: 16px; cursor: pointer; margin: 0 5px; }
        .edit-btn { background-color: #4b7bec; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold; }
        .edit-btn:hover { background-color: #3867d6; }
        .delete-btn { background-color: #ff4757; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold; }
        .delete-btn:hover { background-color: #ff2a3f; }

        @media (max-width: 900px) { .dashboard-grid { grid-template-columns: 1fr; } .item-actions { flex-direction: column; } }
      `}</style>
    </div>
  );
}

export default Admin;