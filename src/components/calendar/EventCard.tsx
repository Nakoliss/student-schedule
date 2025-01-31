import { cn } from "@/lib/utils";
import { Event } from "./types";

interface EventCardProps {
  event: Event;
  getEventStyle: (type: Event['type']) => string;
  style?: React.CSSProperties;
}

export const EventCard = ({ event, getEventStyle, style }: EventCardProps) => {
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
          <div className="text-sm text-center">{event.startTime}</div>
        </div>
        <div className="text-black text-sm text-center mt-auto">
          {event.endTime}
        </div>
      </div>
    </div>
  );
};