import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'

// Base properties common to all events
export interface BaseAgentEvent {
    id: string;
    created_at: string;
}

// Session Event
export interface SessionEvent extends BaseAgentEvent {
    type: 'session';
    data: {
        session_id: string;
        tier: string;
        language: string;
        state: string;
        latency: number;
    };
}

// Language Event
export interface LanguageEvent extends BaseAgentEvent {
    type: 'language';
    data: {
        language_detected: string;
        confidence_score: number;
    };
}

// Metrics Event
export interface MetricsEvent extends BaseAgentEvent {
    type: 'metrics';
    data: {
        neural_load: number;
        confidence: number;
        latency_ms: number;
    };
}

// Thought Event
export interface ThoughtEvent extends BaseAgentEvent {
    type: 'thought';
    agent_name: string;
    step_name: string;
    thought_content: string;
    status: string;
}

// Discriminated Union Type for all possible agent events
export type AgentEvent = SessionEvent | LanguageEvent | MetricsEvent | ThoughtEvent;


export function useAgentEvents() {
    const [events, setEvents] = useState<AgentEvent[]>([])

    useEffect(() => {
        // Initial fetch
        const fetchEvents = async () => {
            const { data } = await supabase
                .from('agent_events')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(50)

            if (data) setEvents(data.reverse() as AgentEvent[])
        }

        fetchEvents()

        // Realtime subscription
        const channel = supabase
            .channel('public:agent_events')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'agent_events' }, (payload) => {
                const newEvent = payload.new as AgentEvent
                setEvents((prev) => [...prev, newEvent])
            })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    return events
}
