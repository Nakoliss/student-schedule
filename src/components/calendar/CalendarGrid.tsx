import React from 'react';
import { timeSlots, days } from './constants';
import { Event } from './types';
import { EventCard } from './EventCard';
import { TimeCell } from './TimeCell';

interface CalendarGridProps {
  events: Event[];
  onDayClick: (index: number, day: string) => void;
  getEventStyle: (type: Event['type']) => string;
}

export const CalendarGrid = ({ events, onDayClick, getEventStyle }: CalendarGridProps) => {
  console.log('Events in CalendarGrid:', events);

  const getEventDuration = (event: Event) => {
    const startIndex = timeSlots.indexOf(event.startTime);
    const endIndex = timeSlots.indexOf(event.endTime);
    return endIndex - startIndex;
  };

  const isEventStartingAt = (event: Event, time: string, dayIndex: number) => {
    return event.startTime === time && event.day === dayIndex;
  };

  const convertTimeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return (hours * 60) + minutes;
  };

  const shouldShowEvent = (event: Event, time: string, dayIndex: number) => {
    if (event.day !== dayIndex) return false;
    
    const currentTime = convertTimeToMinutes(time);
    const startTime = convertTimeToMinutes(event.startTime);
    const endTime = convertTimeToMinutes(event.endTime);
    
    return currentTime >= startTime && currentTime < endTime;
  };

  return (
    <div className="calendar-grid">
      {timeSlots.map((time) => (
        <React.Fragment key={time}>
          <TimeCell time={time} />
          {days.map((_, dayIndex) => {
            const dayEvents = events.filter(event => event.day === dayIndex);
            console.log(`Events for day ${dayIndex}:`, dayEvents);
            
            return (
              <div 
                key={`${dayIndex}-${time}`} 
                className="calendar-cell relative hover:bg-accent/10 cursor-pointer transition-colors"
                onClick={() => onDayClick(dayIndex, days[dayIndex])}
              >
                {dayEvents.map(event => {
                  if (!isEventStartingAt(event, time, dayIndex)) return null;
                  
                  const duration = getEventDuration(event);
                  const heightInPixels = duration * 60;
                  
                  return (
                    <EventCard
                      key={event.id}
                      event={event}
                      heightInPixels={heightInPixels}
                      getEventStyle={getEventStyle}
                    />
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