import { Card } from "@/components/ui/card";
import type { Event } from "@/components/calendar/types";
import { days } from "@/components/calendar/constants";

interface CourseCardProps {
  event: Event;
  onClick: (id: string, title: string) => void;
}

export const CourseCard = ({ event, onClick }: CourseCardProps) => {
  console.log("Rendering CourseCard for:", event.title);
  
  return (
    <Card 
      className="p-6 cursor-pointer transition-all transform hover:-translate-y-1 hover:shadow-lg min-h-[400px]"
      onClick={() => onClick(event.id, event.title)}
      style={{
        background: "linear-gradient(to right, #d7d2cc 0%, #304352 100%)",
        borderRadius: "8px",
        border: "2px solid #304352",
        boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 23px, #000 24px)`,
          backgroundSize: "100% 24px",
          pointerEvents: "none"
        }}
      />
      <div className="relative z-10 flex flex-col h-full">
        <h3 className="font-bold text-xl text-white mb-4">{event.title}</h3>
        <p className="text-gray-200 mb-auto">
          {days[event.day]} • {event.startTime} - {event.endTime}
        </p>
        <span className={`mt-3 inline-block px-3 py-1 rounded-full text-sm ${
          event.type === 'class' ? 'bg-blue-200 text-blue-900' :
          event.type === 'study' ? 'bg-green-200 text-green-900' :
          'bg-gray-200 text-gray-900'
        }`}>
          {event.type === 'class' ? 'Cours' :
           event.type === 'study' ? 'Étude' :
           'Autre'}
        </span>
      </div>
      <div 
        className="absolute bottom-0 right-0 w-16 h-16"
        style={{
          background: "linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.1) 50%)",
          borderTopLeftRadius: "8px"
        }}
      />
    </Card>
  );
};