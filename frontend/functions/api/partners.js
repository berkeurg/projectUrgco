export async function onRequestGet(context) {
  try {
    // wrangler.toml'da tanımladığımız "urgco_db" veritabanına bağlanıp verileri çekiyoruz
    const { results } = await context.env.urgco_db.prepare(
      "SELECT * FROM partners WHERE is_active = 1 ORDER BY sort_order ASC"
    ).all();

    // Gelen verileri React'in okuyabileceği tertemiz bir JSON formatında dışarı aktarıyoruz
    return Response.json(results);
    
  } catch (error) {
    // Eğer bir hata olursa çökmemesi için hata mesajı döndürüyoruz
    return Response.json({ error: "Veritabanına ulaşılamadı." }, { status: 500 });
  }
}