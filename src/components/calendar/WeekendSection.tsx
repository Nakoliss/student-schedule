import { weekendDays } from './constants';

interface WeekendSectionProps {
  onDayClick: (index: number, day: string) => void;
  daysLength: number;
}

export const WeekendSection = ({ onDayClick, daysLength }: WeekendSectionProps) => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-4 min-w-[800px]">
      {weekendDays.map((day, index) => (
        <div
          key={day}
          className="p-4 border rounded-lg bg-background cursor-pointer hover:bg-accent/10 transition-colors"
          onClick={() => onDayClick(daysLength + index, day)}
        >
          <h3 className="text-lg font-semibold mb-2">{day}</h3>
          <div className="text-sm text-muted-foreground">
            Cliquez pour voir les détails
          </div>
        </div>
      ))}
    </div>
  );
};