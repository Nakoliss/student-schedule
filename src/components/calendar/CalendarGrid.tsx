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
    const pixelsPerHour = 60; // Each hour slot is 60px tall
    const totalMinutes = hours * 60 + minutes;
    const position = (totalMinutes / 60) * pixelsPerHour;
    
    console.log(`Calculating position for ${startTime}:`, {
      hours,
      minutes,
      totalMinutes,
      position,
      pixelsPerHour
    });
    
    return position;
  };

  const getEventDuration = (startTime: string, endTime: string) => {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    
    const startInMinutes = startHours * 60 + startMinutes;
    const endInMinutes = endHours * 60 + endMinutes;
    const durationInMinutes = endInMinutes - startInMinutes;
    
    // Convert duration to pixels (1 hour = 60px)
    const heightInPixels = (durationInMinutes / 60) * 60;
    
    console.log(`Calculating duration from ${startTime} to ${endTime}:`, {
      startInMinutes,
      endInMinutes,
      durationInMinutes,
      heightInPixels
    });
    
    return heightInPixels;
  };

  return (
    <div className="calendar-grid relative">
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

      {events.map(event => {
        const topPosition = getEventTopPosition(event.startTime);
        const heightInPixels = getEventDuration(event.startTime, event.endTime);
        const leftPosition = `${((event.day + 1) * (100/7))}%`; // +1 to skip time column
        
        console.log(`Positioning event ${event.title}:`, {
          day: event.day,
          startTime: event.startTime,
          endTime: event.endTime,
          topPosition,
          heightInPixels,
          leftPosition
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
              width: `${100/7}%`,
              zIndex: 20
            }}
          />
        );
      })}
    </div>
  );
};