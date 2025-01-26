import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { days } from "@/components/calendar/constants";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { Event } from "@/components/calendar/types";

const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Yoga',
    day: 0,
    startTime: '8:00',
    endTime: '10:00',
    type: 'class'
  },
  {
    id: '2',
    title: 'Design',
    day: 1,
    startTime: '14:00',
    endTime: '18:00',
    type: 'class'
  }
];

const DayView = () => {
  const { dayIndex } = useParams();
  const navigate = useNavigate();
  
  const dayEvents = sampleEvents.filter(
    event => event.day === Number(dayIndex)
  );
  
  const dayName = days[Number(dayIndex)];
  const today = new Date();
  const formattedDate = format(today, "d MMMM yyyy", { locale: fr });

  return (
    <div className="min-h-screen p-4 md:p-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour
      </Button>
      
      <h1 className="text-4xl font-bold mb-2">{dayName}</h1>
      <p className="text-lg text-muted-foreground mb-8">{formattedDate}</p>
      
      {dayEvents.length > 0 ? (
        <div className="space-y-6">
          {dayEvents.map((event) => (
            <div 
              key={event.id}
              className="p-6 bg-white rounded-lg shadow-md"
            >
              <div className="text-2xl font-handwriting mb-2">
                {event.startTime} - {event.endTime} → {event.title}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default DayView;