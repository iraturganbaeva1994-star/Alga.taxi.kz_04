-- Migration: create app_settings table and default flag
CREATE TABLE IF NOT EXISTS app_settings (
  key TEXT PRIMARY KEY,
  value JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

INSERT INTO app_settings (key, value)
VALUES ('show_phone_numbers', jsonb_build_object('enabled', true))
ON CONFLICT (key) DO NOTHING;
