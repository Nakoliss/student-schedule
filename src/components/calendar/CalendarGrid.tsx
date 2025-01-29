import React from 'react';
import { timeSlots, days } from './constants';
import { Event } from './types';
import { cn } from '@/lib/utils';

interface CalendarGridProps {
  events: Event[];
  onDayClick: (index: number, day: string) => void;
  getEventStyle: (type: Event['type']) => string;
}

export const CalendarGrid = ({ events, onDayClick, getEventStyle }: CalendarGridProps) => {
  const getEventDuration = (event: Event) => {
    const startIndex = timeSlots.indexOf(event.startTime);
    const endIndex = timeSlots.indexOf(event.endTime);
    return endIndex - startIndex;
  };

  const isEventStartingAt = (event: Event, time: string) => {
    return event.startTime === time;
  };

  const shouldShowEvent = (event: Event, time: string) => {
    const startIndex = timeSlots.indexOf(event.startTime);
    const currentIndex = timeSlots.indexOf(time);
    const endIndex = timeSlots.indexOf(event.endTime);
    return currentIndex >= startIndex && currentIndex < endIndex;
  };

  return (
    <div className="calendar-grid">
      {timeSlots.map((time) => (
        <React.Fragment key={time}>
          <div className="calendar-cell time-cell">
            {time}
          </div>
          {days.map((_, dayIndex) => {
            const dayEvents = events.filter(
              event => event.day === dayIndex && shouldShowEvent(event, time)
            );
            
            return (
              <div 
                key={`${dayIndex}-${time}`} 
                className="calendar-cell relative hover:bg-accent/10 cursor-pointer transition-colors"
                onClick={() => onDayClick(dayIndex, days[dayIndex])}
              >
                {dayEvents.map(event => {
                  if (!isEventStartingAt(event, time)) return null;
                  
                  const duration = getEventDuration(event);
                  const heightInPixels = duration * 60; // Each time slot is 60px high
                  
                  return (
                    <div
                      key={event.id}
                      className={cn(
                        "event-card absolute inset-x-0 mx-1",
                        getEventStyle(event.type)
                      )}
                      style={{
                        height: `${heightInPixels}px`,
                        top: '1px',
                        zIndex: 10
                      }}
                    >
                      <span className="hidden md:inline">{event.title}</span>
                      <span className="md:hidden">{event.title.substring(0, 3)}...</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};