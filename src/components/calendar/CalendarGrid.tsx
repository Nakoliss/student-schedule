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
    const pixelsPerMinute = 1; // Each minute = 1px (60px per hour)
    const totalMinutes = hours * 60 + minutes;
    const position = totalMinutes * pixelsPerMinute;
    
    console.log(`Calculating position for ${startTime}:`, {
      hours,
      minutes,
      totalMinutes,
      position,
      pixelsPerMinute
    });
    
    return `${position}px`;
  };

  const getEventDuration = (startTime: string, endTime: string) => {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    
    const startInMinutes = startHours * 60 + startMinutes;
    const endInMinutes = endHours * 60 + endMinutes;
    const durationInMinutes = endInMinutes - startInMinutes;
    
    // Convert duration to pixels (1 minute = 1px)
    const heightInPixels = durationInMinutes;
    
    console.log(`Calculating duration from ${startTime} to ${endTime}:`, {
      startInMinutes,
      endInMinutes,
      durationInMinutes,
      heightInPixels
    });
    
    return `${heightInPixels}px`;
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
        const dayColumnWidth = 100 / 6; // 6 columns (5 days + time column)
        const left = `${((event.day + 1) * dayColumnWidth)}%`;
        const width = `${dayColumnWidth}%`;
        const top = getEventTopPosition(event.startTime);
        const height = getEventDuration(event.startTime, event.endTime);
        
        console.log(`Positioning event ${event.title}:`, {
          top,
          height,
          left,
          width,
          day: event.day,
          startTime: event.startTime,
          endTime: event.endTime
        });
        
        return (
          <EventCard
            key={event.id}
            event={event}
            getEventStyle={getEventStyle}
            style={{ 
              position: 'absolute',
              top,
              left,
              width,
              height,
              zIndex: 20
            }}
          />
        );
      })}
    </div>
  );
};