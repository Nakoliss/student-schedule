import React from 'react';
import { days } from './constants';
import { format, addDays, startOfWeek } from 'date-fns';
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
    const newDate = addDays(currentDate, -7);
    onWeekChange(newDate);
  };

  const handleNextWeek = () => {
    const newDate = addDays(currentDate, 7);
    onWeekChange(newDate);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-4 px-4">
        <Button variant="ghost" size="icon" onClick={handlePrevWeek}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleNextWeek}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-[80px_repeat(5,1fr)] border-b">
        <div className="h-12" />
        {days.map((day, index) => {
          const date = addDays(weekStart, index);
          return (
            <div
              key={day}
              onClick={() => onDayClick(index, day)}
              className="h-12 flex items-center justify-center border-r font-medium cursor-pointer hover:bg-accent/10 transition-colors px-2 text-center"
            >
              <div>
                <div>{day}</div>
                <div className="text-sm text-muted-foreground">
                  {format(date, 'd MMMM yyyy', { locale: fr })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};