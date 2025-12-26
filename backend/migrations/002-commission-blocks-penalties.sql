-- Migration: commission rules, driver balances, blocks, penalties, audit_logs
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Commission rules: scope = global | service | driver
CREATE TABLE IF NOT EXISTS commission_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scope TEXT NOT NULL,
  service_type TEXT,
  driver_id UUID,
  percent NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Driver balances (in cents)
CREATE TABLE IF NOT EXISTS driver_balances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID UNIQUE NOT NULL,
  balance_cents BIGINT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Manual and automatic blocks for users
CREATE TABLE IF NOT EXISTS user_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  reason TEXT,
  automatic BOOLEAN DEFAULT false,
  blocked_until TIMESTAMPTZ,
  active BOOLEAN DEFAULT true,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Penalties (fines) applied to users
CREATE TABLE IF NOT EXISTS penalties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  order_id UUID,
  amount_cents BIGINT NOT NULL,
  reason TEXT,
  applied BOOLEAN DEFAULT false,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Audit log for blocks/penalties/other admin actions
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id UUID,
  action TEXT NOT NULL,
  target_table TEXT,
  target_id UUID,
  payload JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_commission_scope ON commission_rules(scope);
CREATE INDEX IF NOT EXISTS idx_driver_balances_driver ON driver_balances(driver_id);
CREATE INDEX IF NOT EXISTS idx_user_blocks_user ON user_blocks(user_id);
CREATE INDEX IF NOT EXISTS idx_penalties_user ON penalties(user_id);
