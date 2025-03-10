import { cn } from "@/lib/utils";
import { Event } from "../types";

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
        "event-card rounded-md overflow-hidden shadow-sm w-full",
        getEventStyle(event.type)
      )}
      style={style}
    >
      <div className={cn(
        "flex flex-col h-full",
        isShortEvent ? "p-[1px]" : "p-2"
      )}>
        <div className={cn(
          "text-black",
          isShortEvent 
            ? "grid grid-cols-[1fr_auto] items-center gap-0.5 text-[10px]" 
            : "flex flex-col gap-1 text-sm"
        )}>
          <div className="font-medium truncate">
            {event.title}
          </div>
          {isShortEvent ? (
            <div className="whitespace-nowrap opacity-75">
              {event.startTime}-{event.endTime}
            </div>
          ) : (
            <div className="text-sm opacity-90">
              {event.startTime} - {event.endTime}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};