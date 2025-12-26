-- Initial DDL for Alga Taxi (Postgres + PostGIS)
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL,
  phone TEXT UNIQUE,
  email TEXT,
  password_hash TEXT,
  lang_pref TEXT DEFAULT 'ru',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS drivers (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  full_name TEXT,
  status TEXT,
  last_location GEOGRAPHY(POINT,4326)
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES users(id),
  driver_id UUID REFERENCES users(id),
  status TEXT,
  service_type TEXT,
  price_cents BIGINT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  type TEXT,
  address TEXT,
  geom GEOGRAPHY(POINT,4326)
);

CREATE INDEX IF NOT EXISTS idx_drivers_last_location ON drivers USING GIST (last_location);
CREATE INDEX IF NOT EXISTS idx_order_points_geom ON order_points USING GIST (geom);

-- Application-wide settings (feature flags, defaults)
CREATE TABLE IF NOT EXISTS app_settings (
  key TEXT PRIMARY KEY,
  value JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Default: control visibility of phone numbers in apps (admin-controlled)
INSERT INTO app_settings (key, value)
VALUES ('show_phone_numbers', jsonb_build_object('enabled', true))
ON CONFLICT (key) DO NOTHING;
