import type { Event } from '@/components/calendar/types';

// You can replace these with actual API calls when you have a backend
const STORAGE_KEY = 'student_schedule_events';

// Add some test events
const TEST_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Mathematics',
    day: 0, // Monday
    startTime: '09:00',
    endTime: '10:30',
    type: 'class'
  },
  {
    id: '2',
    title: 'Physics',
    day: 2, // Wednesday
    startTime: '14:00',
    endTime: '15:30',
    type: 'class'
  }
];

export const eventApi = {
  getEvents: async (): Promise<Event[]> => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Initialize with test events if storage is empty
        localStorage.setItem(STORAGE_KEY, JSON.stringify(TEST_EVENTS));
        return TEST_EVENTS;
      }
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error fetching events:', error);
      throw new Error('Failed to fetch events');
    }
  },

  createEvent: async (event: Event): Promise<Event> => {
    try {
      const events = await eventApi.getEvents();
      const newEvents = [...events, event];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newEvents));
      return event;
    } catch (error) {
      console.error('Error creating event:', error);
      throw new Error('Failed to create event');
    }
  },

  updateEvent: async (event: Event): Promise<Event> => {
    try {
      const events = await eventApi.getEvents();
      const updatedEvents = events.map(e => e.id === event.id ? event : e);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEvents));
      return event;
    } catch (error) {
      console.error('Error updating event:', error);
      throw new Error('Failed to update event');
    }
  },

  deleteEvent: async (eventId: string): Promise<void> => {
    try {
      const events = await eventApi.getEvents();
      const filteredEvents = events.filter(e => e.id !== eventId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredEvents));
    } catch (error) {
      console.error('Error deleting event:', error);
      throw new Error('Failed to delete event');
    }
  }
};