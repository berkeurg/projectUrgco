import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Mobilde imleç (cursor) mantığı olmadığı için bileşeni kapatıyoruz
    if (window.innerWidth < 768) {
      setIsMobile(true);
      return;
    }

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // Performans (60fps) için doğrudan DOM'a müdahale ediyoruz
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }
      if (outlineRef.current) {
        outlineRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }
    };

    // Tıklanabilir elementlerin üzerine gelindiğinde imlecin büyümesi için
    const handleMouseOver = (e) => {
      const isClickable = e.target.closest('a, button, input, textarea, .magnetic-card-wrapper');
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Mobilde hiçbir şey render etme
  if (isMobile) return null;

  return (
    <>
      {/* Arkadan süzülerek gelen dış çember */}
      <div ref={outlineRef} className={`cursor-outline ${isHovering ? 'hover' : ''}`}></div>
      
      {/* Fareyi milisaniyesinde takip eden merkez nokta */}
      <div ref={dotRef} className={`cursor-dot ${isHovering ? 'hover' : ''}`}></div>
      
      <style>{`
        /* İMLEÇ CSS AYARLARI */
        .cursor-dot, 
        .cursor-outline {
          position: fixed;
          top: 0;
          left: 0;
          border-radius: 50%;
          /* pointer-events: none çok önemlidir! Tıklamaların altındaki elemente geçmesini sağlar */
          pointer-events: none; 
          z-index: 99999;
          transform: translate3d(0, 0, 0);
        }

        .cursor-dot {
          width: 8px;
          height: 8px;
          margin-top: -4px; /* Merkezleme */
          margin-left: -4px;
          background-color: #7426B0; /* Kurumsal Mor */
          transition: opacity 0.3s ease;
        }

        .cursor-outline {
          width: 40px;
          height: 40px;
          margin-top: -20px;
          margin-left: -20px;
          border: 1px solid rgba(116, 38, 176, 0.5);
          /* transform'a verilen transition, dış çemberin biraz geriden süzülerek gelmesini sağlar */
          transition: transform 0.15s ease-out, width 0.3s ease, height 0.3s ease, margin 0.3s ease, background-color 0.3s ease;
        }

        /* HOVER (Link Üzerine Gelme) EFEKTLERİ */
        .cursor-outline.hover {
          width: 60px;
          height: 60px;
          margin-top: -30px;
          margin-left: -30px;
          background-color: rgba(116, 38, 176, 0.1);
          border-color: #7426B0;
        }

        .cursor-dot.hover {
          opacity: 0; /* Dış çember büyürken içteki nokta gizlenir */
        }
      `}</style>
    </>
  );
}