import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import type { Event } from '../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useParams } from 'react-router-dom';
import { days } from './constants';
import { useEvents } from '../hooks/use-events';
import { getEventStyle } from '../utils';

interface DayViewProps {
  day?: string;
  events?: Event[];
  isOpen?: boolean;
  onClose?: () => void;
  getEventStyle?: (type: 'class' | 'study' | 'other') => string;
}

export const DayView = ({ 
  day: propDay, 
  events: propEvents, 
  isOpen: propIsOpen, 
  onClose: propOnClose,
  getEventStyle: propGetEventStyle 
}: DayViewProps = {}) => {
  const { dayIndex } = useParams<{ dayIndex: string }>();
  const dayNumber = dayIndex ? parseInt(dayIndex) : 0;
  const { events: allEvents } = useEvents();
  
  const [isOpen, setIsOpen] = useState(propIsOpen ?? false);
  
  const day = propDay || days[dayNumber] || 'Lundi';
  const events = propEvents || (allEvents?.filter(event => event.day === dayNumber) || []);
  const styleGetter = propGetEventStyle || getEventStyle;
  
  const handleClose = () => {
    setIsOpen(false);
    propOnClose?.();
  };
  
  useEffect(() => {
    // When mounted via route, open the dialog
    if (dayIndex !== undefined) {
      setIsOpen(true);
    }
  }, [dayIndex]);
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
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
                styleGetter(event.type)
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