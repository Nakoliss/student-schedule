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
      className="p-4 cursor-pointer transition-all transform hover:-translate-y-1 hover:shadow-lg"
      onClick={() => onClick(event.id, event.title)}
      style={{
        background: "linear-gradient(to right, #d7d2cc 0%, #304352 100%)",
        borderRadius: "8px",
        border: "2px solid #304352",
        boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
        position: "relative",
        overflow: "hidden",
        height: "100%"
      }}
    >
      <div className="relative z-10 flex flex-col h-full">
        <h3 className="font-bold text-2xl text-white text-center mb-2">Notes de cours</h3>
        <div className="mb-2"></div>
        <h4 className="font-bold text-xl text-white leading-normal">{event.title}</h4>
        <div className="text-gray-200 mt-2 text-lg">
          <p className="mb-1">{days[event.day]}</p>
          <p>{event.startTime} - {event.endTime}</p>
        </div>
        <span className="hidden">
          {event.type === 'class' ? 'Cours' :
           event.type === 'study' ? 'Étude' :
           'Autre'}
        </span>
      </div>
      <div 
        className="absolute bottom-0 right-0 w-12 h-12"
        style={{
          background: "linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.1) 50%)",
          borderTopLeftRadius: "8px"
        }}
      />
    </Card>
  );
};