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
  console.log('Events received in CalendarGrid:', events);

  const getEventDuration = (event: Event) => {
    const startIndex = timeSlots.indexOf(event.startTime);
    const endIndex = timeSlots.indexOf(event.endTime);
    return endIndex - startIndex;
  };

  const isEventStartingAt = (event: Event, time: string, dayIndex: number) => {
    return event.startTime === time && event.day === dayIndex;
  };

  const getEventTopPosition = (time: string) => {
    const startIndex = timeSlots.indexOf(time);
    if (startIndex === -1) {
      console.error(`Invalid time slot: ${time}`);
      return 0;
    }
    return startIndex * 60; // Each time slot is 60px high
  };

  return (
    <div className="calendar-grid">
      {timeSlots.map((time) => (
        <React.Fragment key={time}>
          <TimeCell time={time} />
          {days.map((_, dayIndex) => {
            const dayEvents = events.filter(event => event.day === dayIndex);
            console.log(`Rendering events for day ${dayIndex}:`, dayEvents);
            
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
                  const topPosition = getEventTopPosition(event.startTime);
                  
                  console.log(`Positioning event ${event.title}:`, {
                    startTime: event.startTime,
                    topPosition,
                    heightInPixels
                  });
                  
                  return (
                    <EventCard
                      key={event.id}
                      event={event}
                      heightInPixels={heightInPixels}
                      getEventStyle={getEventStyle}
                      style={{ 
                        top: `${topPosition}px`,
                        position: 'absolute'
                      }}
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