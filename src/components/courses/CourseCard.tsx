import { Card } from "@/components/ui/card";
import type { Event } from "@/components/calendar/types";
import { days } from "@/components/calendar/constants";

interface CourseCardProps {
  event: Event;
  onClick: (id: string, title: string) => void;
}

export const CourseCard = ({ event, onClick }: CourseCardProps) => {
  return (
    <Card 
      className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => onClick(event.id, event.title)}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">{event.title}</h3>
          <p className="text-sm text-muted-foreground">
            {days[event.day]} • {event.startTime} - {event.endTime}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${
          event.type === 'class' ? 'bg-blue-100 text-blue-800' :
          event.type === 'study' ? 'bg-green-100 text-green-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {event.type === 'class' ? 'Cours' :
           event.type === 'study' ? 'Étude' :
           'Autre'}
        </span>
      </div>
    </Card>
  );
};