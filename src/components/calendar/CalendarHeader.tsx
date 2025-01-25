import React from 'react';
import { days } from './constants';
import { format, addDays, startOfWeek, subWeeks, addWeeks } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
  onDayClick: (index: number, day: string) => void;
  currentDate: Date;
  onWeekChange: (date: Date) => void;
}

export const CalendarHeader = ({ onDayClick, currentDate, onWeekChange }: CalendarHeaderProps) => {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start week on Monday

  const handlePrevWeek = () => {
    const newDate = subWeeks(currentDate, 1);
    onWeekChange(newDate);
  };

  const handleNextWeek = () => {
    const newDate = addWeeks(currentDate, 1);
    onWeekChange(newDate);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePrevWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleNextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="calendar-grid border-b">
        <div className="h-16" /> {/* Time column header spacer */}
        {days.map((day, index) => {
          const date = addDays(weekStart, index);
          return (
            <div
              key={day}
              onClick={() => onDayClick(index, day)}
              className="h-16 flex flex-col justify-center items-center border-r cursor-pointer hover:bg-accent/10 transition-colors px-2"
            >
              <div className="font-medium">{day}</div>
              <div className="text-sm text-muted-foreground">
                {format(date, 'd MMMM yyyy', { locale: fr })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};