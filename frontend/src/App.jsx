import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Sayfalarımız
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';

// Sabit Bileşenlerimiz
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      
      {/* 1. KISIM: Yönlendirme (Routes) dışında kalan alan. Sitede HER ZAMAN görünür. */}
      <Navbar /> 
      
      {/* 2. KISIM: Değişken alan (Trafik polisi). Sadece tıklanan linke göre içindeki sayfayı değiştirir. */}
      <main style={{ minHeight: '80vh', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </main>
      
      {/* 3. KISIM: Yine her zaman sabit kalan alt kısım. */}
      <Footer />

    </BrowserRouter>
  );
}

export default App;