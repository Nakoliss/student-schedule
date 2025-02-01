import { WeeklyCalendar } from "@/components/WeeklyCalendar";
import { Sidebar } from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEvents } from "@/hooks/use-events";

const Index = () => {
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  const navigate = useNavigate();
  const { events } = useEvents();

  // Find the current course based on events
  const getCurrentCourse = () => {
    const now = new Date();
    const currentEvent = events.find(event => {
      const [hours, minutes] = event.startTime.split(':').map(Number);
      const [endHours, endMinutes] = event.endTime.split(':').map(Number);
      const eventDate = new Date();
      eventDate.setHours(hours, minutes, 0);
      const eventEndDate = new Date();
      eventEndDate.setHours(endHours, endMinutes, 0);
      return now >= eventDate && now <= eventEndDate;
    });
    return currentEvent?.courseId;
  };

  const handleNotesClick = () => {
    const currentCourseId = getCurrentCourse();
    if (currentCourseId) {
      navigate(`/course/${currentCourseId}/notes`);
    } else {
      // If no current course, navigate to courses list
      navigate('/courses');
    }
  };

  return (
    <div className="flex min-h-screen relative">
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-50"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      )}

      <Button
        onClick={handleNotesClick}
        className="absolute top-4 right-20 z-50"
      >
        Notes de cours
      </Button>

      <main className="flex-1 overflow-x-auto">
        <WeeklyCalendar />
      </main>

      <div className={`${showSidebar ? 'block' : 'hidden'} ${isMobile ? 'absolute right-0 z-40 h-full bg-background' : 'relative'}`}>
        <div className="pt-16">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Index;