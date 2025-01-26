import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarHeader } from './calendar/CalendarHeader';
import { CalendarGrid } from './calendar/CalendarGrid';
import { WeekendSection } from './calendar/WeekendSection';
import { AddCourseDialog } from './calendar/AddCourseDialog';
import { getEventStyle } from './calendar/utils';
import { days, timeSlots, DEFAULT_SCROLL_TIME } from './calendar/constants';
import type { Event } from './calendar/types';

const initialEvents: Event[] = [
  {
    id: '2',
    title: 'Design',
    day: 1,
    startTime: '14:00',
    endTime: '18:00',
    type: 'class'
  }
];

export const WeeklyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const gridRef = useRef<HTMLDivElement>(null);
  
  const handleDayClick = (dayIndex: number) => {
    navigate(`/day/${dayIndex}`);
  };

  const handleAddCourse = (course: Omit<Event, "id">) => {
    const newCourse: Event = {
      ...course,
      id: crypto.randomUUID()
    };
    setEvents(prev => [...prev, newCourse]);
    console.log("New course added:", newCourse);
  };

  // Export the events so they can be accessed by other components
  (window as any).calendarEvents = events;

  useEffect(() => {
    const defaultTimeIndex = timeSlots.findIndex(time => time === DEFAULT_SCROLL_TIME);
    
    if (defaultTimeIndex !== -1 && gridRef.current) {
      const rowHeight = 60; // Height of each time slot in pixels
      const scrollPosition = defaultTimeIndex * rowHeight;
      
      requestAnimationFrame(() => {
        if (gridRef.current) {
          const scrollContainer = gridRef.current.closest('[data-radix-scroll-area-viewport]');
          if (scrollContainer) {
            scrollContainer.scrollTop = scrollPosition;
            console.log('Scrolling to position:', scrollPosition);
          }
        }
      });
    }
  }, []);
  
  return (
    <div className="p-4 pt-16 md:pt-4">
      <div className="flex flex-col h-[calc(100vh-12rem)]">
        <div className="sticky top-0 z-10 bg-background">
          <CalendarHeader 
            onDayClick={handleDayClick} 
            currentDate={currentDate}
            onWeekChange={setCurrentDate}
          />
        </div>
        <ScrollArea className="flex-1">
          <div ref={gridRef}>
            <CalendarGrid 
              events={events}
              onDayClick={handleDayClick}
              getEventStyle={getEventStyle}
            />
          </div>
        </ScrollArea>

        <WeekendSection onDayClick={handleDayClick} daysLength={days.length} />
      </div>

      <AddCourseDialog
        isOpen={isAddCourseOpen}
        onClose={() => setIsAddCourseOpen(false)}
        onAddCourse={handleAddCourse}
      />
    </div>
  );
};