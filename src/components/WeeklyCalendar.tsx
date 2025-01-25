import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarHeader } from './calendar/CalendarHeader';
import { CalendarGrid } from './calendar/CalendarGrid';
import { WeekendSection } from './calendar/WeekendSection';
import { days, timeSlots, DEFAULT_SCROLL_TIME } from './calendar/constants';
import type { Event } from './calendar/types';

const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Yoga',
    day: 0,
    startTime: '8:00',
    endTime: '10:00',
    type: 'class'
  },
  {
    id: '2',
    title: 'Design',
    day: 1,
    startTime: '14:00',
    endTime: '18:00',
    type: 'class'
  }
];

const getEventStyle = (type: Event['type']) => {
  switch (type) {
    case 'class':
      return 'bg-primary/20 text-primary-foreground/90';
    case 'study':
      return 'bg-accent/20 text-accent-foreground/90';
    default:
      return 'bg-secondary text-secondary-foreground';
  }
};

interface DayViewProps {
  day: string;
  events: Event[];
  isOpen: boolean;
  onClose: () => void;
}

const DayView = ({ day, events, isOpen, onClose }: DayViewProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl mx-4">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{day}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {events.map((event) => (
            <div
              key={event.id}
              className={cn(
                "p-4 rounded-lg",
                getEventStyle(event.type)
              )}
            >
              <div className="font-semibold">{event.title}</div>
              <div className="text-sm text-muted-foreground">
                {event.startTime} - {event.endTime}
              </div>
            </div>
          ))}
          {events.length === 0 && (
            <p className="text-muted-foreground text-center py-8">
              Aucun cours prévu pour ce jour
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const WeeklyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<{ index: number; name: string } | null>(null);
  const isMobile = useIsMobile();
  const gridRef = useRef<HTMLDivElement>(null);
  
  const handleDayClick = (dayIndex: number, dayName: string) => {
    setSelectedDay({ index: dayIndex, name: dayName });
  };

  const selectedDayEvents = selectedDay
    ? sampleEvents.filter(event => event.day === selectedDay.index)
    : [];

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
              events={sampleEvents}
              onDayClick={handleDayClick}
              getEventStyle={getEventStyle}
            />
          </div>
        </ScrollArea>

        <WeekendSection onDayClick={handleDayClick} daysLength={days.length} />
      </div>

      {selectedDay && (
        <DayView
          day={selectedDay.name}
          events={selectedDayEvents}
          isOpen={!!selectedDay}
          onClose={() => setSelectedDay(null)}
        />
      )}
    </div>
  );
};