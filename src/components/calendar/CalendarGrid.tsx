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
  console.log('Time slots:', timeSlots);
  console.log('Days:', days);

  const getEventDuration = (event: Event) => {
    const startIndex = timeSlots.indexOf(event.startTime);
    const endIndex = timeSlots.indexOf(event.endTime);
    console.log(`Duration calculation for ${event.title}:`, {
      startTime: event.startTime,
      endTime: event.endTime,
      startIndex,
      endIndex,
      duration: endIndex - startIndex
    });
    return endIndex - startIndex;
  };

  const isEventStartingAt = (event: Event, time: string, dayIndex: number) => {
    const isStarting = event.startTime === time && event.day === dayIndex;
    console.log(`Checking if event ${event.title} starts at ${time} on day ${dayIndex}:`, isStarting);
    return isStarting;
  };

  const getEventTopPosition = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const startHour = 8; // Calendar starts at 8:00
    const hourDiff = hours - startHour;
    const minuteOffset = minutes / 60;
    const position = (hourDiff + minuteOffset) * 60; // Each hour is 60px high
    console.log(`Calculating position for time ${time}:`, {
      hours,
      minutes,
      hourDiff,
      minuteOffset,
      position
    });
    return position;
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
                    heightInPixels,
                    duration,
                    style: {
                      position: 'absolute',
                      top: `${topPosition}px`,
                      left: '4px',
                      right: '4px',
                      zIndex: 20
                    }
                  });
                  
                  return (
                    <EventCard
                      key={event.id}
                      event={event}
                      heightInPixels={heightInPixels}
                      getEventStyle={getEventStyle}
                      style={{ 
                        position: 'absolute',
                        top: `${topPosition}px`,
                        left: '4px',
                        right: '4px',
                        zIndex: 20
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