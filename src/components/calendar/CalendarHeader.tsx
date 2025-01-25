import { days } from './constants';

interface CalendarHeaderProps {
  onDayClick: (index: number, day: string) => void;
}

export const CalendarHeader = ({ onDayClick }: CalendarHeaderProps) => {
  return (
    <div className="calendar-grid rounded-t-lg border-b sticky top-0 z-30 bg-background">
      <div className="calendar-cell" />
      {days.map((day, index) => (
        <div 
          key={day} 
          className="calendar-cell day-header hover:bg-accent/10 cursor-pointer transition-colors"
          onClick={() => onDayClick(index, day)}
        >
          <span className="hidden md:inline">{day}</span>
          <span className="md:hidden">{day.substring(0, 3)}</span>
        </div>
      ))}
    </div>
  );
};