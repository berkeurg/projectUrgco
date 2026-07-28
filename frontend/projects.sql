CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id TEXT, -- Örn: PRJ-01
    slug TEXT, -- Örn: cigerci-ozkan (URL dostu isim)
    title TEXT,
    client TEXT,
    year TEXT,
    category TEXT,
    tech_stack TEXT, -- JSON formatında tutacağız: '["React", "Node.js"]'
    short_desc TEXT,
    content TEXT, -- JSON formatında paragraflar
    cover_image TEXT,
    features TEXT, -- JSON formatında özellikler
    live_link TEXT,
    github_link TEXT,
    sort_order INTEGER DEFAULT 1,
    is_active INTEGER DEFAULT 1
);