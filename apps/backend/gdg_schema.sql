-- 1. USERS (Real MSME Customers)
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    phone_number TEXT UNIQUE NOT NULL,
    name TEXT,
    preferred_language TEXT DEFAULT 'en', -- Auto-detected
    trust_score INT DEFAULT 50 -- Dynamic confidence
);

-- 2. ORDERS (Real Transaction History)
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    item_name TEXT NOT NULL,
    amount_inr INT NOT NULL,
    status TEXT CHECK (status IN ('Delivered', 'Shipped', 'Processing', 'Refunded')),
    order_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    delivery_proof_url TEXT
);

-- 3. REFUND_POLICIES (The Logic Source)
CREATE TABLE IF NOT EXISTS refund_policies (
    category TEXT PRIMARY KEY,
    max_refund_amount INT,
    requires_image BOOLEAN DEFAULT TRUE,
    auto_approval_window_hours INT
);

-- 4. THOUGHT_LOGS (For the "God Mode" Dashboard)
CREATE TABLE IF NOT EXISTS thought_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT,
    step_name TEXT,
    thought_content TEXT, -- The "Reasoning" text
    detected_emotion TEXT,
    detected_language TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Realtime
alter publication supabase_realtime add table thought_logs;
