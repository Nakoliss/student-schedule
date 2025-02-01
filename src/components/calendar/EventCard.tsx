import { cn } from "@/lib/utils";
import { Event } from "./types";

interface EventCardProps {
  event: Event;
  getEventStyle: (type: Event['type']) => string;
  style?: React.CSSProperties;
}

export const EventCard = ({ event, getEventStyle, style }: EventCardProps) => {
  // Calculate duration in minutes
  const [startHours, startMinutes] = event.startTime.split(':').map(Number);
  const [endHours, endMinutes] = event.endTime.split(':').map(Number);
  const durationInMinutes = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
  
  console.log('Event duration calculation:', {
    event: event.title,
    startTime: event.startTime,
    endTime: event.endTime,
    durationInMinutes
  });

  // Determine if event is less than 1 hour
  const isShortEvent = durationInMinutes < 60;

  return (
    <div
      className={cn(
        "event-card rounded-md overflow-hidden shadow-sm w-full min-h-[60px]",
        getEventStyle(event.type)
      )}
      style={style}
    >
      <div className="flex flex-col h-full justify-between p-1 min-h-[60px]">
        <div className="text-black">
          <span className="hidden md:inline font-medium">{event.title}</span>
          <span className="md:hidden font-medium">{event.title.substring(0, 3)}...</span>
          <div className={cn(
            "text-center",
            isShortEvent ? "text-xs" : "text-sm"
          )}>
            {event.startTime}
          </div>
        </div>
        <div className={cn(
          "text-black text-center mt-auto",
          isShortEvent ? "text-xs" : "text-sm"
        )}>
          {event.endTime}
        </div>
      </div>
    </div>
  );
};