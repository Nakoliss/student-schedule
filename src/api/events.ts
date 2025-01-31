import type { Event } from '@/components/calendar/types';

const STORAGE_KEY = 'student_schedule_events';

// Empty initial state
const INITIAL_EVENTS: Event[] = [];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const eventApi = {
  getEvents: async (): Promise<Event[]> => {
    try {
      await delay(100); // Small delay to ensure storage is ready
      const stored = localStorage.getItem(STORAGE_KEY);
      console.log('Retrieved events from storage:', stored);
      
      if (!stored) {
        console.log('No events found, initializing with empty array');
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_EVENTS));
        return INITIAL_EVENTS;
      }
      
      const events = JSON.parse(stored);
      console.log('Parsed events:', events);
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
    try {
      await delay(100);
      const events = await eventApi.getEvents();
      const newEvents = [...events, event];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newEvents));
      console.log('Event created successfully:', event);
      return event;
    } catch (error) {
      console.error('Error creating event:', error);
      throw new Error('Failed to create event');
    }
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