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
    
    // Each hour is 60px tall (as defined in calendar-cell height)
    const hourOffset = hours * 60; // Convert hours to pixels
    const minuteOffset = minutes; // Convert minutes to pixels
    
    const position = hourOffset + minuteOffset;
    
    console.log(`Calculating position for ${startTime}:`, {
      hours,
      minutes,
      hourOffset,
      minuteOffset,
      position
    });
    
    return position;
  };

  const getEventDuration = (startTime: string, endTime: string) => {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    
    // Convert everything to minutes first
    const startInMinutes = (startHours * 60) + startMinutes;
    const endInMinutes = (endHours * 60) + endMinutes;
    
    // Calculate duration in minutes, which will be our pixels
    const duration = endInMinutes - startInMinutes;
    
    console.log(`Calculating duration from ${startTime} to ${endTime}:`, {
      startInMinutes,
      endInMinutes,
      duration
    });
    
    return duration;
  };

  return (
    <div className="calendar-grid relative">
      {/* Render the base grid */}
      {timeSlots.map((time) => (
        <React.Fragment key={time}>
          <TimeCell time={time} />
          {days.map((_, dayIndex) => (
            <div 
              key={`${dayIndex}-${time}`} 
              className="calendar-cell relative hover:bg-accent/10 cursor-pointer transition-colors"
              onClick={() => onDayClick(dayIndex, days[dayIndex])}
            />
          ))}
        </React.Fragment>
      ))}

      {/* Render events layer */}
      {events.map(event => {
        const topPosition = getEventTopPosition(event.startTime);
        const heightInPixels = getEventDuration(event.startTime, event.endTime);
        // Calculate position based on 6 columns (time column + 5 days)
        const leftPosition = `calc(${(event.day + 1) * (100 / 6)}% + 4px)`;
        const width = `calc(${100 / 6}% - 8px)`;
        
        console.log(`Positioning event ${event.title}:`, {
          day: event.day,
          startTime: event.startTime,
          endTime: event.endTime,
          topPosition,
          heightInPixels,
          leftPosition,
          width
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
              left: leftPosition,
              width: width,
              zIndex: 20
            }}
          />
        );
      })}
    </div>
  );
};