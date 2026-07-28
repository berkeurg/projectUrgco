-- Eğer daha önce varsa tabloyu siler (Temiz kurulum için)
DROP TABLE IF EXISTS partners;

-- Bize Güvenenler tablosunu oluşturur
CREATE TABLE partners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT NOT NULL,
    logo_url TEXT NOT NULL,
    website_url TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Test edebilmemiz için içine ilk verimizi ekliyoruz
INSERT INTO partners (company_name, logo_url, website_url, sort_order, is_active) 
VALUES ('Ciğerci Özkan', 'https://resmim.net/cdn/2026/07/28/EkTtJ6.png','https://www.cigerciozkan.com', 1, 1);