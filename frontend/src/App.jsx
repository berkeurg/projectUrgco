import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
// YENİ: useLenis hook'unu import ettik
import { ReactLenis, useLenis } from 'lenis/react';

// Sayfalarımız
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Admin from './pages/Admin';

// Sabit Bileşenlerimiz
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// YENİ: Özel İmleç (Cursor) Bileşeni
import CustomCursor from './components/CustomCursor'; 

// --- LENİS İLE UYUMLU "EN ÜSTE KAYDIR" BİLEŞENİ. ---
function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis(); // Lenis motorunu yakalıyoruz

  useEffect(() => {
    if (lenis) {
      // Sayfa (URL) değiştiğinde Lenis motoruna 0 (en üst) noktasına gitmesini söylüyoruz.
      // immediate: true sayesinde aşağıdan yukarı kayarak değil, anında tepeye ışınlanır.
      lenis.scrollTo(0, { immediate: true });
    } else {
      // Lenis henüz yüklenmediyse güvenlik önlemi
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ReactLenis root options={{ lerp: 0.05 }}>
        
        {/* 
          DİKKAT: ScrollToTop bileşenini ReactLenis'in İÇİNE taşıdık. 
          Çünkü useLenis hook'unun çalışabilmesi için Lenis kapsayıcısının içinde olması şarttır.
        */}
        <ScrollToTop />

        {/* YENİ: Custom Cursor tüm siteyi kapsayacak şekilde eklendi */}
        <CustomCursor />
        
        <Navbar /> 
        
        <main style={{ minHeight: '80vh', padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        
        <Footer />
        
      </ReactLenis>
    </BrowserRouter>
  );
}

export default App;