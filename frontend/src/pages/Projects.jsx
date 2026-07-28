import { useState, useEffect, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLenis } from 'lenis/react';

// --- TEKİL PROJE (BÖLÜNMÜŞ EKRAN) BİLEŞENİ ---
function ProjectSplitScreen({ project, index }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'tr'; 
  const isEven = index % 2 === 0;

  const getI18nText = (data) => {
    if (!data) return '';
    try {
      const parsed = JSON.parse(data);
      return parsed[currentLang] || parsed['tr'] || data; 
    } catch {
      return data;
    }
  };

  const getI18nArray = (data) => {
    if (!data) return [];
    try {
      const parsed = JSON.parse(data);
      const langString = parsed[currentLang] || parsed['tr'] || data;
      
      if (typeof langString === 'string') {
        try { return JSON.parse(langString); } catch { return [langString]; }
      }
      return Array.isArray(langString) ? langString : [langString];
    } catch {
      return [data];
    }
  };

  const getUniversalArray = (data) => {
    if (!data) return [];
    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [data];
    } catch {
      return typeof data === 'string' ? [data] : [];
    }
  };

  const title = getI18nText(project.title);
  const client = getI18nText(project.client);
  const category = getI18nText(project.category);
  const shortDesc = getI18nText(project.shortDesc);
  
  const contentArray = getI18nArray(project.content);
  const featuresArray = getI18nArray(project.features);
  const techStackArray = getUniversalArray(project.techStack);

  return (
    <div className={`project-section ${isEven ? 'layout-left' : 'layout-right'}`}>
      
      {/* SOL TARAF: Ekrana Yapışan (Sticky) Görsel Alanı */}
      <div className="sticky-visual-container">
        <div className="sticky-visual-inner">
          <img src={project.coverImage} alt={title} className="project-cover" />
          
          <div className="visual-overlay">
            <span className="project-id">{project.projectId || `PRJ-0${project.id}`}</span>
            <div className="status-indicator">
              <span className="status-dot"></span>
              <span>{t('projects.status.published', 'YAYINDA')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SAĞ TARAF: Kayan (Scroll) Dinamik Veri Alanı */}
      <div className="scroll-content-container">
        
        <div className="content-header">
          <span className="content-category">{category}</span>
          <h2 className="content-title">{title}</h2>
          
          <div className="project-meta-grid">
            <div className="meta-item">
              <span className="meta-label">{t('projects.labels.client', 'MÜŞTERİ')}</span>
              <span className="meta-value">{client}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">{t('projects.labels.year', 'YIL')}</span>
              <span className="meta-value">{project.year}</span>
            </div>
          </div>
        </div>

        <div className="content-tech">
          <span className="section-label">{t('projects.labels.tech', 'KULLANILAN TEKNOLOJİLER')}</span>
          <div className="tech-tags">
            {techStackArray.map((tech, i) => (
              <span key={i} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>

        <div className="content-body">
          <span className="section-label">{t('projects.labels.details', 'PROJE DETAYLARI')}</span>
          <p className="lead-text">{shortDesc}</p>
          
          {contentArray.map((paragraph, i) => (
            <p key={i} className="body-text">{paragraph}</p>
          ))}
        </div>

        <div className="content-features">
          <span className="section-label">{t('projects.labels.features', 'TEMEL MİMARİ & ÖZELLİKLER')}</span>
          <ul className="features-list">
            {featuresArray.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="content-actions">
          {project.liveLink && project.liveLink !== '#' && (
            <a href={project.liveLink} target="_blank" rel="noreferrer" className="action-btn primary">
              <span>{t('projects.buttons.live', 'CANLI SİSTEMİ GÖR')}</span>
              <span className="arrow">↗</span>
            </a>
          )}
          {project.githubLink && project.githubLink !== '#' && (
            <a href={project.githubLink} target="_blank" rel="noreferrer" className="action-btn secondary">
              <span>{t('projects.buttons.github', 'KAYNAK KOD (GITHUB)')}</span>
              <span className="arrow">↗</span>
            </a>
          )}
        </div>

      </div>
    </div>
  );
}

// --- ANA BİLEŞEN ---
export default function Projects() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const showcaseRef = useRef(null);
  const lenis = useLenis();

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (Array.isArray(data)) {
          setProjects(data);
        }
      } catch (error) {
        console.error("Projeler yüklenirken hata oluştu:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [currentLang]);

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="projects-page" key={currentLang}>
      
      {/* Sayfa Giriş (Hero) Kısmı */}
      <section className="projects-hero">
        <span className="hero-badge">{t('projects.badge', 'PORTFOLYO // VİTRİN')}</span>
        <h1 className="hero-title">{t('projects.title', 'Seçilmiş Projeler.')}</h1>
        <p className="hero-subtitle">
          {t('projects.subtitle', 'Sadece tasarlamıyoruz, mühendislik disipliniyle inşa ediyoruz. Veritabanı şemalarından, milisaniyelik ön yüz etkileşimlerine kadar her satır kodun bir amacı var.')}
        </p>
      </section>

      {/* Dinamik Yapışkan Bölünmüş Ekran Alanı */}
      <div className="projects-showcase" ref={showcaseRef}>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '100px', color: '#7426B0', fontFamily: "'Fira Code', monospace" }}>
            {t('projects.loading', 'Yükleniyor...')}
          </div>
        ) : projects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px', color: '#666', fontFamily: "'Fira Code', monospace" }}>
            {t('projects.empty', 'Henüz gösterilecek proje bulunmuyor.')}
          </div>
        ) : (
          currentProjects.map((project, index) => (
            <ProjectSplitScreen key={project.id} project={project} index={index} />
          ))
        )}
      </div>

      {/* --- SAYFALAMA (PAGINATION) ARAYÜZÜ --- */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <div className="pagination-wrapper">
            <button 
              className="pagination-arrow" 
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
            >
              ←
            </button>
            
            <div className="pagination-numbers">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button 
              className="pagination-arrow" 
              onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
              disabled={currentPage === totalPages}
            >
              →
            </button>
          </div>
        </div>
      )}

      {/* --- SAYFA İÇİ CSS --- */}
      <style>{`
        .projects-page {
          background-color: transparent; 
          width: 100%;
          min-height: 100vh;
        }

        /* --- HERO CSS --- */
        .projects-hero {
          max-width: 1200px;
          margin: 0 auto;
          padding: 150px 5vw 100px 5vw;
        }

        .hero-badge {
          display: inline-block;
          font-family: 'Fira Code', 'Consolas', monospace;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 2px;
          color: #7426B0;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .hero-title {
          font-size: clamp(40px, 6vw, 80px);
          font-weight: 800;
          color: #080808;
          letter-spacing: -2px;
          margin: 0 0 24px 0;
          line-height: 1.1;
        }

        .hero-subtitle {
          font-size: clamp(16px, 2vw, 22px);
          color: #626262;
          font-weight: 400;
          max-width: 800px;
          line-height: 1.6;
          margin: 0;
        }

        /* --- YAPIŞKAN BÖLÜNMÜŞ EKRAN CSS --- */
        .projects-showcase {
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        .project-section {
          display: flex;
          position: relative;
          width: 100%;
          min-height: 100vh; 
          border-top: 1px solid rgba(0,0,0,0.1);
        }

        .projects-showcase .project-section:first-child {
          border-top: none;
        }

        .project-section.layout-left {
          flex-direction: row;
        }
        
        .project-section.layout-right {
          flex-direction: row-reverse;
        }

        /* SOL TARAF (YAPIŞKAN) */
        .sticky-visual-container {
          width: 50%;
          position: relative;
        }

        .sticky-visual-inner {
          position: sticky;
          top: 80px;
          height: calc(100vh - 80px);
          padding: 40px; 
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .project-cover {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 24px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.1);
          filter: grayscale(20%);
          transition: filter 0.5s ease;
        }

        .sticky-visual-inner:hover .project-cover {
          filter: grayscale(0%);
        }

        .visual-overlay {
          position: absolute;
          bottom: 70px;
          left: 70px;
          display: flex;
          align-items: center;
          gap: 20px;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          padding: 10px 20px;
          border-radius: 30px;
          color: white;
          font-family: 'Fira Code', 'Consolas', monospace;
          font-size: 13px;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: bold;
          color: #27C93F;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: #27C93F;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(39, 201, 63, 0.5);
        }

        /* SAĞ TARAF (KAYAN İÇERİK) */
        .scroll-content-container {
          width: 50%;
          padding: 10vh 5vw 15vh 5vw;
          display: flex;
          flex-direction: column;
          gap: 60px;
        }

        .content-header {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .content-category {
          font-family: 'Fira Code', 'Consolas', monospace;
          color: #7426B0;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .content-title {
          font-size: clamp(32px, 4vw, 56px);
          font-weight: 900;
          color: #080808;
          margin: 0;
          line-height: 1.1;
          letter-spacing: -1px;
        }

        .project-meta-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr); 
          gap: 20px;
          padding-top: 30px;
          border-top: 1px solid rgba(0,0,0,0.1);
        }

        .meta-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .meta-label {
          font-family: 'Fira Code', 'Consolas', monospace;
          font-size: 11px;
          color: #888888;
          letter-spacing: 1px;
        }

        .meta-value {
          font-size: 16px;
          font-weight: 700;
          color: #080808;
        }

        .section-label {
          display: block;
          font-family: 'Fira Code', 'Consolas', monospace;
          font-size: 12px;
          color: #888888;
          letter-spacing: 1.5px;
          margin-bottom: 20px;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .tech-tag {
          padding: 8px 16px;
          border: 1px solid rgba(116, 38, 176, 0.2);
          border-radius: 40px;
          color: #7426B0;
          font-size: 14px;
          font-weight: 600;
          background: rgba(116, 38, 176, 0.03);
        }

        .content-body {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .lead-text {
          font-size: 22px;
          font-weight: 600;
          color: #080808;
          line-height: 1.5;
          margin: 0;
        }

        .body-text {
          font-size: 16px;
          color: #626262;
          line-height: 1.8;
          margin: 0;
        }

        .features-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .features-list li {
          position: relative;
          padding-left: 20px;
          font-size: 16px;
          color: #080808;
          font-weight: 500;
        }

        .features-list li::before {
          content: "▹";
          position: absolute;
          left: 0;
          top: 0;
          color: #7426B0;
        }

        .content-actions {
          display: flex;
          gap: 20px;
          margin-top: 20px;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 32px;
          border-radius: 40px;
          text-decoration: none;
          font-weight: 700;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .action-btn.primary {
          background-color: #080808;
          color: #FFFFFF;
        }

        .action-btn.secondary {
          background-color: transparent;
          color: #080808;
          border: 1px solid #080808;
        }

        .action-btn .arrow {
          transition: transform 0.3s ease;
        }

        .action-btn:hover {
          transform: translateY(-2px);
        }

        .action-btn:hover .arrow {
          transform: translate(4px, -4px);
        }

        .action-btn.primary:hover {
          background-color: #7426B0;
        }

        .action-btn.secondary:hover {
          border-color: #7426B0;
          color: #7426B0;
        }

        /* --- SAYFALAMA (PAGINATION) CSS --- */
        .pagination-container {
          width: 100%;
          padding: 80px 0 120px 0;
          display: flex;
          justify-content: center;
          align-items: center;
          border-top: 1px solid rgba(0,0,0,0.1);
        }

        .pagination-wrapper {
          display: flex;
          align-items: center;
          gap: 20px;
          background: #FFFFFF;
          padding: 10px 20px;
          border-radius: 50px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.05);
        }

        .pagination-numbers {
          display: flex;
          gap: 10px;
        }

        .pagination-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: #626262;
          font-family: 'Fira Code', 'Consolas', monospace;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pagination-btn:hover {
          background: rgba(116, 38, 176, 0.1);
          color: #7426B0;
        }

        .pagination-btn.active {
          background: #7426B0;
          color: #FFFFFF;
        }

        .pagination-arrow {
          background: transparent;
          border: none;
          font-size: 18px;
          color: #080808;
          cursor: pointer;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .pagination-arrow:disabled {
          color: #CCCCCC;
          cursor: not-allowed;
        }

        .pagination-arrow:not(:disabled):hover {
          background: rgba(0,0,0,0.05);
        }

        /* --- MOBİL UYUMLULUK DÜZELTMELERİ --- */
        @media (max-width: 992px) {
          .projects-hero {
            padding: 120px 5vw 60px 5vw;
          }

          .project-section, 
          .project-section.layout-left, 
          .project-section.layout-right {
            flex-direction: column;
            min-height: auto;
          }

          .sticky-visual-container {
            width: 100%;
          }

          .sticky-visual-inner {
            position: relative; 
            top: 0;
            height: 60vh; 
            padding: 20px 5vw 0 5vw;
          }

          .visual-overlay {
            bottom: 20px;
            left: 5vw;
            margin-left: 20px;
          }

          .scroll-content-container {
            width: 100%;
            padding: 40px 5vw 80px 5vw;
            gap: 40px;
          }

          .project-meta-grid {
            grid-template-columns: 1fr; 
            gap: 15px;
          }

          .content-actions {
            flex-direction: column;
          }

          .action-btn {
            justify-content: center; 
          }
        }
      `}</style>
    </div>
  );
}