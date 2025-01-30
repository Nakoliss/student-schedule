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
    const calendarStartHour = 0; // Calendar starts at 00:00
    
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
    
    // Calculate total minutes for both start and end times
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    
    // Calculate the difference in minutes
    const durationInMinutes = endTotalMinutes - startTotalMinutes;
    
    // Convert to pixels (1 hour = 60px, so 1 minute = 1px)
    const heightInPixels = (durationInMinutes / 60) * 60;
    
    console.log(`Calculating duration from ${startTime} to ${endTime}:`, {
      startTotalMinutes,
      endTotalMinutes,
      durationInMinutes,
      heightInPixels
    });
    
    return heightInPixels;
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
        const leftPosition = `calc(${(event.day + 1) * (100 / 8)}% + 4px)`;
        const width = `calc(${100 / 8}% - 8px)`;
        
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