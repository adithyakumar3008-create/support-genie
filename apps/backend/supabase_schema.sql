-- 1. Business Profiles (The MSME Context)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_number TEXT UNIQUE NOT NULL, -- The WhatsApp ID
    business_name TEXT NOT NULL,
    owner_name TEXT NOT NULL,
    operating_hours TEXT DEFAULT '9AM-9PM'
);

-- 2. Real Inventory (The "Brain's" Knowledge Base)
CREATE TABLE IF NOT EXISTS inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku_name TEXT NOT NULL,
    description TEXT, -- Gemini reads this for context
    quantity INTEGER NOT NULL DEFAULT 0,
    price_inr DECIMAL(10,2) NOT NULL,
    last_restock TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Customer Orders (For Refund Logic)
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_phone TEXT NOT NULL,
    items_json JSONB NOT NULL, -- e.g. [{"sku": "Rice", "qty": 1}]
    total_amount DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'delivered', -- 'delivered', 'refunded', 'pending'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() -- CRITICAL for 7-day rule
);

-- 4. The "Thought Stream" (For Dashboard Visualization)
CREATE TABLE IF NOT EXISTS agent_thoughts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL,
    node_name TEXT NOT NULL, -- 'triage', 'inventory', 'refund'
    thought_content TEXT NOT NULL, -- The raw internal monologue
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Realtime for agent_thoughts (Idempotent Check)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_publication_rel ppr
    JOIN pg_class c ON ppr.prrelid = c.oid
    JOIN pg_namespace n ON c.relnamespace = n.oid
    JOIN pg_publication pub ON ppr.prpubid = pub.oid
    WHERE pub.pubname = 'supabase_realtime'
      AND n.nspname = 'public'
      AND c.relname = 'agent_thoughts'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.agent_thoughts;
  END IF;
END$$;
