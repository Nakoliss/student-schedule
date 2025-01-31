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
        // Parse times (e.g., "15:15")
        const [hours, minutes] = event.startTime.split(':').map(Number);
        const [endHours, endMinutes] = event.endTime.split(':').map(Number);
        
        // Convert to percentages
        // Each hour = 4.167% (100% / 24 hours)
        // Each minute = 0.069% (4.167% / 60 minutes)
        const startPercent = (hours * (100/24)) + (minutes * (100/1440));
        const endPercent = (endHours * (100/24)) + (endMinutes * (100/1440));
        const heightPercent = endPercent - startPercent;
        
        console.log('Event calculation:', {
          title: event.title,
          startTime: `${hours}:${minutes}`,
          endTime: `${endHours}:${endMinutes}`,
          startPercent,
          endPercent,
          heightPercent
        });
        
        // Column positioning
        const timeColWidth = 60;
        const dayWidth = `calc((100% - ${timeColWidth}px) / ${days.length})`;
        const left = `calc(${timeColWidth}px + (${event.day} * ${dayWidth}))`;
        
        const style = {
          position: 'absolute' as const,
          top: `${startPercent}%`,
          left,
          width: dayWidth,
          height: `${heightPercent}%`,
          zIndex: 20
        };
        
        return (
          <EventCard
            key={event.id}
            event={event}
            getEventStyle={getEventStyle}
            style={style}
          />
        );
      })}
    </div>
  );
};