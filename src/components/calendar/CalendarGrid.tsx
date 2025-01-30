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

  const getEventTopPosition = (startTime: string) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const calendarStartHour = 8; // Calendar starts at 8:00
    
    // Calculate offset from start of calendar in minutes
    const totalMinutesFromStart = (hours - calendarStartHour) * 60 + minutes;
    
    // Convert to pixels (1 hour = 60px)
    const position = (totalMinutesFromStart / 60) * 60;
    
    console.log(`Calculating position for ${startTime}:`, {
      hours,
      minutes,
      totalMinutesFromStart,
      position
    });
    
    return position;
  };

  const getEventDuration = (startTime: string, endTime: string) => {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    
    const durationInMinutes = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
    const heightInPixels = (durationInMinutes / 60) * 60;
    
    console.log(`Calculating duration from ${startTime} to ${endTime}:`, {
      durationInMinutes,
      heightInPixels
    });
    
    return heightInPixels;
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
                  const topPosition = getEventTopPosition(event.startTime);
                  const heightInPixels = getEventDuration(event.startTime, event.endTime);
                  
                  console.log(`Positioning event ${event.title}:`, {
                    startTime: event.startTime,
                    endTime: event.endTime,
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