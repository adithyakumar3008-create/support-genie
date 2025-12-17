-- 5. MESSAGES (For Live Chat Mirror)
CREATE TABLE IF NOT EXISTS messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT NOT NULL,
    sender TEXT NOT NULL CHECK (sender IN ('user', 'agent')),
    content TEXT NOT NULL,
    msg_type TEXT DEFAULT 'text', -- text/audio/image
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Realtime
alter publication supabase_realtime add table messages;
