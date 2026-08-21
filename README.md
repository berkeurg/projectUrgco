# 🚀 Urgco Dijital - Kurumsal Web Ajansı Platformu

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Three.js](https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white)
![Sentry](https://img.shields.io/badge/Sentry-362D59?style=for-the-badge&logo=sentry&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

Modern web teknolojileri kullanılarak geliştirilmiş, yüksek performanslı ve etkileşimli dijital ajans web platformu. 

Kullanıcı deneyimini (UX) ön planda tutan bu proje; 3D grafik entegrasyonları, asenkron veri yönetimi, gelişmiş hata takip sistemleri ve zarif kaydırma (scroll) animasyonları ile donatılmıştır.

🔗 **Canlı Demo:** [urgco.tr](https://urgco.tr)

---

## ✨ Öne Çıkan Özellikler

* **Tembel Yüklenen (Lazy) 3D Grafikler:** Three.js kullanılarak oluşturulan "Infinity Knot" (Sonsuzluk Düğümü) objesi, performansı artırmak adına `React.lazy` ve `Suspense` ile asenkron olarak yüklenir.
* **Graceful Degradation (Zarif Düşüş):** Ziyaretçinin cihazı WebGL desteklemiyorsa, tarayıcıyı zorlamak veya çökertmek yerine otomatik olarak donanım testi yapılır ve 3D içerik es geçilerek kesintisiz bir deneyim sunulur.
* **Gerçek Zamanlı Hata Takibi (Sentry):** Production (canlı) ortamında meydana gelebilecek hatalar Sentry entegrasyonu ile anlık olarak izlenir ve loglanır.
* **Dinamik Partner Yönetimi:** İş ortaklarına ait logolar ve bağlantılar, REST API (`/api/partners`) üzerinden dinamik olarak çekilir ve Responsive Grid yapısında sergilenir.
* **Akıllı Scroll Animasyonları:** `react-intersection-observer` kullanılarak, kullanıcı sayfayı aşağı kaydırdıkça tetiklenen performanslı Fade-Up (belirme) animasyonları ve "Sticky" (yapışkan) kart mimarisi oluşturulmuştur.
* **Uluslararasılaştırma (i18n):** `react-i18next` entegrasyonu ile proje, çok dilli (Multi-language) yapıya tam uyumlu olarak ölçeklendirilmiştir.

---

## 🛠️ Kullanılan Teknolojiler

* **Frontend Framework:** React.js 
* **3D & Animasyon:** Three.js, React Three Fiber (R3F)
* **Durum (State) Yönetimi:** React Hooks (useState, useEffect)
* **Gözlemci & Etkileşim:** react-intersection-observer
* **Çoklu Dil Desteği:** react-i18next
* **Hata İzleme (Error Tracking):** Sentry
* **Yönlendirme:** React Router DOM (404 Sayfa yönetimleri dahil)

---

## ⚙️ Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

1. **Projeyi Klonlayın:**
   ```bash
   git clone [https://github.com/berkeurg/projectUrgco.git](https://github.com/berkeurg/projectUrgco.git)