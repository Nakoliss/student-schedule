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
  console.log('Events received in CalendarGrid:', events);

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
    
    console.log(`Checking event ${event.title} at time ${time} - current: ${currentTime}, start: ${startTime}, end: ${endTime}`);
    
    return currentTime >= startTime && currentTime < endTime;
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    return `${hour}:${minutes}`;
  };

  return (
    <div className="calendar-grid">
      {timeSlots.map((time) => (
        <React.Fragment key={time}>
          <div className="calendar-cell time-cell">
            {formatTime(time)}
          </div>
          {days.map((_, dayIndex) => {
            const dayEvents = events.filter(event => shouldShowEvent(event, time, dayIndex));
            console.log(`Time ${time}, Day ${dayIndex}, Events:`, dayEvents);
            
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
                    <div
                      key={event.id}
                      className={cn(
                        "event-card absolute inset-x-0 mx-1 rounded-md overflow-hidden",
                        getEventStyle(event.type)
                      )}
                      style={{
                        height: `${heightInPixels}px`,
                        top: '0px',
                        zIndex: 10
                      }}
                    >
                      <div className="flex flex-col h-full justify-between p-1">
                        <div className="text-black">
                          <span className="hidden md:inline font-medium">{event.title}</span>
                          <span className="md:hidden font-medium">{event.title.substring(0, 3)}...</span>
                          <div className="text-sm text-center">{formatTime(event.startTime)}</div>
                        </div>
                        <div className="text-black text-sm text-center">
                          {formatTime(event.endTime)}
                        </div>
                      </div>
                    </div>
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