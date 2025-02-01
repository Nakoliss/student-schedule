import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEvents } from "@/hooks/use-events";
import { AddCourseDialog } from "@/components/calendar/AddCourseDialog";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { CourseCard } from "@/components/courses/CourseCard";
import { CourseListHeader } from "@/components/courses/CourseListHeader";

const CourseList = () => {
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const { events, createEvent, clearAllEvents } = useEvents();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddCourse = () => {
    console.log("Opening add course dialog from CourseList");
    setIsAddCourseOpen(true);
  };

  const handleClearAllCourses = async () => {
    try {
      await clearAllEvents();
      toast({
        title: "Cours supprimés",
        description: "Tous les cours ont été supprimés avec succès"
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer les cours",
        variant: "destructive"
      });
    }
  };

  const handleCourseClick = (courseId: string, courseTitle: string) => {
    console.log("Navigating directly to course notes:", courseId);
    navigate(`/course/${courseId}/notes`);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
      </div>

      <CourseListHeader 
        onAddCourse={handleAddCourse}
        onClearCourses={handleClearAllCourses}
      />

      <div className="grid gap-4">
        {events.map((event) => (
          <CourseCard
            key={event.id}
            event={event}
            onClick={handleCourseClick}
          />
        ))}
      </div>

      <AddCourseDialog
        isOpen={isAddCourseOpen}
        onClose={() => setIsAddCourseOpen(false)}
        onAddCourse={(course) => {
          console.log("Creating new course:", course);
          createEvent({
            ...course,
            id: crypto.randomUUID()
          });
          setIsAddCourseOpen(false);
          toast({
            title: "Cours ajouté",
            description: "Le cours a été ajouté avec succès"
          });
        }}
      />
    </div>
  );
};

export default CourseList;