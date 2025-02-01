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
      <div className={cn(
        "flex flex-col h-full justify-between min-h-[60px]",
        isShortEvent ? "p-0.5" : "p-1"
      )}>
        <div className="text-black">
          <span className={cn(
            "hidden md:inline font-medium",
            !isShortEvent && "text-base"
          )}>{event.title}</span>
          <span className="md:hidden font-medium">{event.title.substring(0, 3)}...</span>
          {isShortEvent ? (
            <div className="text-center text-sm">
              {event.startTime} - {event.endTime}
            </div>
          ) : (
            <>
              <div className="text-center text-base">
                {event.startTime}
              </div>
              <div className="text-center text-base mt-auto mb-0">
                {event.endTime}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};