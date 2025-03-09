import { Card } from "@/components/ui/card";
import type { Event } from "@/features/calendar/types";
import { days } from "@/features/calendar/components/constants";

interface CourseCardProps {
  event: Event;
  onClick: (courseId: string, courseTitle: string) => void;
}

export const CourseCard = ({ event, onClick }: CourseCardProps) => {
  console.log("Rendering CourseCard for:", event.title);
  
  return (
    <Card
      className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onClick(event.id, event.title)}
    >
      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
      <div className="text-sm text-muted-foreground">
        {event.startTime || event.start} - {event.endTime || event.end}
      </div>
    </Card>
  );
};