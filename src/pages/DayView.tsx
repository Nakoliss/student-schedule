import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { days } from "@/features/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useEvents } from "@/features/calendar";

const DayView = () => {
  const { dayIndex } = useParams();
  const navigate = useNavigate();
  const { events } = useEvents();
  
  const dayEvents = events.filter(
    (event) => event.day === Number(dayIndex)
  );
  
  const dayName = days[Number(dayIndex)];
  const today = new Date();
  const formattedDate = format(today, "d MMMM yyyy", { locale: fr });

  const handleCourseClick = (courseId: string, courseTitle: string) => {
    navigate(`/course/${courseId}`, { state: { courseTitle } });
  };

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
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleCourseClick(event.id, event.title)}
            >
              <div className="text-2xl font-handwriting mb-2">
                {event.start} - {event.end} → {event.title}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          Aucun cours prévu pour ce jour
        </p>
      )}
    </div>
  );
};

export default DayView;