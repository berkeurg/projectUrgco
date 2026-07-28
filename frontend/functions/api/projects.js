// --- GÜVENLİK KONTROLÜ ---
function checkAuth(request, env) {
  const authHeader = request.headers.get("Authorization");
  const secretPassword = env.ADMIN_PASSWORD; 
  if (!secretPassword || authHeader !== secretPassword) {
    return false;
  }
  return true;
}

// 1. VERİ ÇEKME (GET) - Ön yüz ve Admin için
export async function onRequestGet(context) {
  try {
    const url = new URL(context.request.url);
    const showAll = url.searchParams.get("all");

    // React (Frontend) camelCase isimler beklediği için SQL'de "AS" ile isimleri çeviriyoruz
    let sql = `SELECT 
      id, project_id AS projectId, slug, title, client, year, category, 
      tech_stack AS techStack, short_desc AS shortDesc, content, 
      cover_image AS coverImage, features, live_link AS liveLink, 
      github_link AS githubLink, sort_order AS sortOrder, is_active AS isActive 
      FROM projects WHERE is_active = 1 ORDER BY sort_order ASC, id DESC`;
    
    // Eğer tüm veriler isteniyorsa (Admin Paneli için) şifre sor
    if (showAll === "true") {
      if (!checkAuth(context.request, context.env)) {
        return Response.json({ error: "Yetkisiz erişim!" }, { status: 401 });
      }
      sql = `SELECT 
        id, project_id AS projectId, slug, title, client, year, category, 
        tech_stack AS techStack, short_desc AS shortDesc, content, 
        cover_image AS coverImage, features, live_link AS liveLink, 
        github_link AS githubLink, sort_order AS sortOrder, is_active AS isActive 
        FROM projects ORDER BY sort_order ASC, id DESC`;
    }

    const { results } = await context.env.urgco_db.prepare(sql).all();
    return Response.json(results);
  } catch (error) {
    return Response.json({ error: "Veritabanına ulaşılamadı.", detay: error.message }, { status: 500 });
  }
}

// 2. VERİ EKLEME (POST) - Admin Panelinden yeni proje eklemek için
export async function onRequestPost(context) {
  if (!checkAuth(context.request, context.env)) return Response.json({ error: "Yetkisiz işlem!" }, { status: 401 });

  try {
    const data = await context.request.json();
    const { 
      projectId, slug, title, client, year, category, techStack, shortDesc, 
      content, coverImage, features, liveLink, githubLink, sortOrder, isActive 
    } = data;
    
    const activeValue = isActive ? 1 : 0;

    const sql = `INSERT INTO projects (
      project_id, slug, title, client, year, category, tech_stack, short_desc, 
      content, cover_image, features, live_link, github_link, sort_order, is_active
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const { success } = await context.env.urgco_db.prepare(sql).bind(
      projectId || `PRJ-${Date.now().toString().slice(-4)}`, // ID girilmezse otomatik atar
      slug, title, client, year, category, 
      techStack || "[]", shortDesc, content || "[]", coverImage, 
      features || "[]", liveLink || "", githubLink || "", 
      parseInt(sortOrder) || 1, activeValue
    ).run();

    if (success) return Response.json({ message: "Proje başarıyla eklendi!" });
    return Response.json({ error: "Eklenirken sorun oluştu." }, { status: 500 });
  } catch (error) {
    return Response.json({ error: "Sunucu hatası.", detay: error.message }, { status: 500 });
  }
}

// 3. VERİ GÜNCELLEME (PUT) - Tam Kapsamlı (Düzenleme ve Hızlı İşlemler İçin)
export async function onRequestPut(context) {
  if (!checkAuth(context.request, context.env)) return Response.json({ error: "Yetkisiz işlem!" }, { status: 401 });

  try {
    const data = await context.request.json();
    const { id } = data;
    let updates = [], params = [];

    // React'ten gelen camelCase anahtarları, veritabanındaki snake_case sütunlara eşliyoruz
    const fieldMap = {
      projectId: 'project_id', slug: 'slug', title: 'title', client: 'client', year: 'year',
      category: 'category', techStack: 'tech_stack', shortDesc: 'short_desc', content: 'content',
      coverImage: 'cover_image', features: 'features', liveLink: 'live_link', githubLink: 'github_link',
      sortOrder: 'sort_order', isActive: 'is_active'
    };

    for (const [key, dbColumn] of Object.entries(fieldMap)) {
      if (data[key] !== undefined) {
        updates.push(`${dbColumn} = ?`);
        let val = data[key];
        if (key === 'sortOrder') val = parseInt(val) || 1;
        if (key === 'isActive') val = val ? 1 : 0;
        params.push(val);
      }
    }

    if (updates.length === 0) return Response.json({ error: "Güncellenecek veri yok" }, { status: 400 });

    params.push(id);
    const sql = `UPDATE projects SET ${updates.join(', ')} WHERE id = ?`;
    const { success } = await context.env.urgco_db.prepare(sql).bind(...params).run();

    if (success) return Response.json({ message: "Proje güncellendi!" });
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
    const { success } = await context.env.urgco_db.prepare("DELETE FROM projects WHERE id = ?").bind(id).run();

    if (success) return Response.json({ message: "Proje silindi!" });
    return Response.json({ error: "Proje silinemedi." }, { status: 500 });
  } catch (error) {
    return Response.json({ error: "Sunucu hatası.", detay: error.message }, { status: 500 });
  }
}