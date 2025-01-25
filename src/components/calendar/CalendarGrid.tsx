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
  return (
    <div className="calendar-grid">
      {timeSlots.map((time) => (
        <React.Fragment key={time}>
          <div className="calendar-cell time-cell">
            {time}
          </div>
          {days.map((_, dayIndex) => {
            const dayEvents = events.filter(
              event => 
                event.day === dayIndex && 
                event.startTime === time
            );
            
            return (
              <div 
                key={`${dayIndex}-${time}`} 
                className="calendar-cell relative hover:bg-accent/10 cursor-pointer transition-colors"
                onClick={() => onDayClick(dayIndex, days[dayIndex])}
              >
                {dayEvents.map(event => (
                  <div
                    key={event.id}
                    className={cn(
                      "event-card",
                      getEventStyle(event.type)
                    )}
                  >
                    <span className="hidden md:inline">{event.title}</span>
                    <span className="md:hidden">{event.title.substring(0, 3)}...</span>
                  </div>
                ))}
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};