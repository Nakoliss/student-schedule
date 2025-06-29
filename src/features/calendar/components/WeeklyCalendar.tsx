import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from "@/shared";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarHeader } from '@/features/calendar';
import { CalendarGrid } from '@/features/calendar';
import { getEventStyle } from '@/features/calendar';
import { timeSlots, DEFAULT_SCROLL_TIME } from '@/features/calendar';
import { useEvents } from '@/features/calendar';
import type { Event } from "../types";

export const WeeklyCalendar = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const gridRef = useRef<HTMLDivElement>(null);
  const { events } = useEvents();
  
  const handleDayClick = (dayIndex: number) => {
    navigate(`/day/${dayIndex}`);
  };

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
            currentDate={new Date()}
            onWeekChange={(date) => console.log('Week changed:', date)}
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
      </div>
    </div>
  );
};