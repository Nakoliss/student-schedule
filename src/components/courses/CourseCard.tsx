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
      <div className="relative z-10 flex flex-col h-full">
        <h3 className="font-bold text-xl text-white text-center mb-4">Notes de cours</h3>
        <div className="mb-4"></div>
        <h4 className="font-bold text-lg text-white leading-normal">{event.title}</h4>
        <div className="text-gray-200 mb-auto mt-4">
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
        className="absolute bottom-0 right-0 w-16 h-16"
        style={{
          background: "linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.1) 50%)",
          borderTopLeftRadius: "8px"
        }}
      />
    </Card>
  );
};