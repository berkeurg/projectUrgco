// --- GÜVENLİK KONTROLÜ (YENİ) ---
// Gelen isteğin başlığındaki (Header) şifre ile sistemdeki şifreyi karşılaştırır
function checkAuth(request, env) {
  const authHeader = request.headers.get("Authorization");
  const secretPassword = env.ADMIN_PASSWORD; // Şifreyi çevre değişkeninden alıyoruz
  
  // Eğer sistemde şifre tanımlanmamışsa veya gelen şifre yanlışsa erişimi reddet
  if (!secretPassword || authHeader !== secretPassword) {
    return false;
  }
  return true;
}

// 1. VERİ ÇEKME (GET)
export async function onRequestGet(context) {
  try {
    const url = new URL(context.request.url);
    const showAll = url.searchParams.get("all");

    let sql = "SELECT * FROM partners WHERE is_active = 1 ORDER BY sort_order ASC, id DESC";
    
    // Eğer tüm veriler (pasifler dahil) isteniyorsa, şifre sor!
    if (showAll === "true") {
      if (!checkAuth(context.request, context.env)) {
        return Response.json({ error: "Yetkisiz erişim!" }, { status: 401 });
      }
      sql = "SELECT * FROM partners ORDER BY sort_order ASC, id DESC";
    }

    const { results } = await context.env.urgco_db.prepare(sql).all();
    return Response.json(results);
  } catch (error) {
    return Response.json({ error: "Veritabanına ulaşılamadı.", detay: error.message }, { status: 500 });
  }
}

// 2. VERİ EKLEME (POST)
export async function onRequestPost(context) {
  if (!checkAuth(context.request, context.env)) return Response.json({ error: "Yetkisiz işlem!" }, { status: 401 });

  try {
    const data = await context.request.json();
    const { company_name, logo_url, website_url, sort_order, is_active } = data;
    const activeValue = is_active ? 1 : 0;

    const { success } = await context.env.urgco_db.prepare(
      "INSERT INTO partners (company_name, logo_url, website_url, sort_order, is_active) VALUES (?, ?, ?, ?, ?)"
    ).bind(company_name, logo_url, website_url, parseInt(sort_order) || 1, activeValue).run();

    if (success) return Response.json({ message: "Logo eklendi!" });
    return Response.json({ error: "Eklenirken sorun oluştu." }, { status: 500 });
  } catch (error) {
    return Response.json({ error: "Sunucu hatası.", detay: error.message }, { status: 500 });
  }
}

// 3. VERİ GÜNCELLEME (PUT)
export async function onRequestPut(context) {
  if (!checkAuth(context.request, context.env)) return Response.json({ error: "Yetkisiz işlem!" }, { status: 401 });

  try {
    const data = await context.request.json();
    const { id, is_active, sort_order } = data;
    let updates = [], params = [];
    
    if (is_active !== undefined) { updates.push("is_active = ?"); params.push(is_active ? 1 : 0); }
    if (sort_order !== undefined) { updates.push("sort_order = ?"); params.push(parseInt(sort_order) || 1); }

    if (updates.length === 0) return Response.json({ error: "Güncellenecek veri yok" }, { status: 400 });

    params.push(id);
    const sql = `UPDATE partners SET ${updates.join(', ')} WHERE id = ?`;
    const { success } = await context.env.urgco_db.prepare(sql).bind(...params).run();

    if (success) return Response.json({ message: "Kayıt güncellendi!" });
    return Response.json({ error: "Güncelleme başarısız." }, { status: 500 });
  } catch (error) {
    return Response.json({ error: "Sunucu hatası.", detay: error.message }, { status: 500 });
  }
}

// 4. VERİ SİLME (DELETE)
export async function onRequestDelete(context) {
  if (!checkAuth(context.request, context.env)) return Response.json({ error: "Yetkisiz işlem!" }, { status: 401 });

  try {
    const { id } = await context.request.json();
    const { success } = await context.env.urgco_db.prepare("DELETE FROM partners WHERE id = ?").bind(id).run();

    if (success) return Response.json({ message: "Kayıt silindi!" });
    return Response.json({ error: "Kayıt silinemedi." }, { status: 500 });
  } catch (error) {
    return Response.json({ error: "Sunucu hatası.", detay: error.message }, { status: 500 });
  }
}