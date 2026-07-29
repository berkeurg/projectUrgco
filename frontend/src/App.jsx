// YENİ: React'ten Suspense ve lazy fonksiyonlarını ekledik
import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis, useLenis } from 'lenis/react';

// Sabit Bileşenlerimiz (Anında yüklenecekler)
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor'; 

// YENİ: Sayfalarımızı "Tembel (Lazy)" olarak içe aktarıyoruz
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Admin = lazy(() => import("./pages/Admin.jsx"));

// --- LENİS İLE UYUMLU "EN ÜSTE KAYDIR" BİLEŞENİ. ---
function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ReactLenis root options={{ lerp: 0.05 }}>
        
        <ScrollToTop />
        <CustomCursor />
        <Navbar /> 
        
        <main style={{ minHeight: '80vh', padding: '20px' }}>
          {/* 
            YENİ: Sayfa kodları arka planda indirilene kadar 
            tarayıcının kilitlenmesini engelleyen Suspense kapsayıcısı 
          */}
          <Suspense 
            fallback={
              <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Yükleniyor...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Suspense>
        </main>
        
        <Footer />
        
      </ReactLenis>
    </BrowserRouter>
  );
}

export default App;