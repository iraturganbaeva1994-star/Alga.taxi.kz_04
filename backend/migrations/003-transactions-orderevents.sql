-- Migration: transactions ledger, order_events, driver_activity, notifications_log
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Transactions ledger
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  type TEXT NOT NULL, -- credit|debit|reversal
  amount_cents BIGINT NOT NULL,
  currency TEXT DEFAULT 'KZT',
  related_order UUID,
  related_action TEXT,
  metadata JSONB,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_transactions_user ON transactions(user_id);

-- Order events log
CREATE TABLE IF NOT EXISTS order_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL,
  event TEXT NOT NULL, -- created,assigned,accepted,arrived,started,completed,cancelled
  actor_user_id UUID,
  payload JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_order_events_order ON order_events(order_id);

-- Driver activity events (online/offline/break/start_shift/end_shift)
CREATE TABLE IF NOT EXISTS driver_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID NOT NULL,
  event TEXT NOT NULL,
  payload JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_driver_activity_driver ON driver_activity(driver_id);

-- Notifications / SMS log
CREATE TABLE IF NOT EXISTS notifications_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  to_phone TEXT,
  user_id UUID,
  channel TEXT, -- sms|push
  provider TEXT,
  message TEXT,
  provider_status TEXT,
  provider_response JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications_log(user_id);
