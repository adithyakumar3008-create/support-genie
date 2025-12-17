import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'

export type AgentEvent = {
    id: string
    agent_name: string
    step_name: string
    thought_content: string
    status: string
    created_at: string
}

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

            if (data) setEvents(data.reverse())
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
