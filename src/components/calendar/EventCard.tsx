import { cn } from "@/lib/utils";
import { Event } from "./types";

interface EventCardProps {
  event: Event;
  heightInPixels: number;
  getEventStyle: (type: Event['type']) => string;
}

export const EventCard = ({ event, heightInPixels, getEventStyle }: EventCardProps) => {
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    return `${hour}:${minutes}`;
  };

  return (
    <div
      className={cn(
        "event-card absolute inset-x-0 mx-1 rounded-md overflow-hidden shadow-sm",
        getEventStyle(event.type)
      )}
      style={{
        height: `${heightInPixels}px`,
        top: '0px',
        zIndex: 10
      }}
    >
      <div className="flex flex-col h-full justify-between p-1">
        <div className="text-black">
          <span className="hidden md:inline font-medium">{event.title}</span>
          <span className="md:hidden font-medium">{event.title.substring(0, 3)}...</span>
          <div className="text-sm text-center">{formatTime(event.startTime)}</div>
        </div>
        <div className="text-black text-sm text-center">
          {formatTime(event.endTime)}
        </div>
      </div>
    </div>
  );
};