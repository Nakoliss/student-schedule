interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
  startTime?: string;
  endTime?: string;
}

const STORAGE_KEY = 'student_schedule_events';

// Empty initial state
const INITIAL_EVENTS: Event[] = [];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const eventApi = {
  getEvents: async (): Promise<Event[]> => {
    try {
      await delay(100); // Small delay to ensure storage is ready
      let events = INITIAL_EVENTS;
      
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        console.log('Retrieved events from storage:', stored);
        
        if (stored) {
          events = JSON.parse(stored);
          console.log('Parsed events:', events);
        } else {
          console.log('No events found, initializing with empty array');
          localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_EVENTS));
        }
      } catch (storageError) {
        console.error('Storage access error:', storageError);
        // Continue with empty events array
      }
      
      return events;
    } catch (error) {
      console.error('Error fetching events:', error);
      return INITIAL_EVENTS; // Return empty array instead of throwing
    }
  },

  clearAllEvents: async (): Promise<void> => {
    try {
      await delay(100);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_EVENTS));
      console.log('All events cleared successfully');
    } catch (error) {
      console.error('Error clearing events:', error);
      throw new Error('Failed to clear events');
    }
  },

  createEvent: async (event: Event): Promise<Event> => {
    const apiEvent = {
      ...event,
      start: event.start || event.startTime,
      end: event.end || event.endTime,
      startTime: event.startTime || event.start,
      endTime: event.endTime || event.end
    };
    
    const events = await eventApi.getEvents();
    events.push(apiEvent);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    console.log('Event created successfully:', apiEvent);
    return apiEvent;
  },

  updateEvent: async (event: Event): Promise<Event> => {
    try {
      await delay(100);
      const events = await eventApi.getEvents();
      const updatedEvents = events.map(e => e.id === event.id ? event : e);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEvents));
      console.log('Event updated successfully:', event);
      return event;
    } catch (error) {
      console.error('Error updating event:', error);
      throw new Error('Failed to update event');
    }
  },

  deleteEvent: async (eventId: string): Promise<void> => {
    try {
      await delay(100);
      const events = await eventApi.getEvents();
      const filteredEvents = events.filter(e => e.id !== eventId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredEvents));
      console.log('Event deleted successfully:', eventId);
    } catch (error) {
      console.error('Error deleting event:', error);
      throw new Error('Failed to delete event');
    }
  }
};