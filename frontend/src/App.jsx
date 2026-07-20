// 1. React'ın sihirli değişken yapısını (useState) içeri aktarıyoruz
import { useState } from 'react';

// 2. Ana Bileşenimiz (Her zaman büyük harfle başlar)
function App() {
  
  // Bir State (Değişken) oluşturuyoruz. Başlangıç değeri 0.
  const [sayac, setSayac] = useState(0);

  // 3. Ekranda görünecek HTML kısmı (JSX)
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>urgco.tr Projesine Hoş Geldin BenuşBal!</h1>
      
      <p>Şu anki sayı: {sayac}</p>
      
      {/* Butona tıklandığında sayac değişkenini 1 artırıyoruz */}
      <button onClick={() => setSayac(sayac + 1)}>
        Sayıyı Artır
      </button>
    </div>
  );
}

// Projenin geri kalanının bu dosyayı görebilmesi için dışa aktarıyoruz
export default App;