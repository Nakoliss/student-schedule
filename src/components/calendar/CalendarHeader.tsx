import React from 'react';
import { days } from './constants';

interface CalendarHeaderProps {
  onDayClick: (index: number, day: string) => void;
}

export const CalendarHeader = ({ onDayClick }: CalendarHeaderProps) => {
  return (
    <div className="grid grid-cols-[60px_repeat(5,1fr)] border-b">
      <div className="h-12 border-r" />
      {days.map((day, index) => (
        <div
          key={day}
          onClick={() => onDayClick(index, day)}
          className="h-12 flex items-center justify-center border-r font-medium cursor-pointer hover:bg-accent/10 transition-colors"
        >
          {day}
        </div>
      ))}
    </div>
  );
};