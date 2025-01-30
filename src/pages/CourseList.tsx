import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useEvents } from "@/hooks/use-events";
import { AddCourseDialog } from "@/components/calendar/AddCourseDialog";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { days } from "@/components/calendar/constants";
import { useToast } from "@/components/ui/use-toast";

const CourseList = () => {
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const { events, createEvent, clearAllEvents } = useEvents();
  const { toast } = useToast();

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

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Liste de cours</h1>
        <div className="flex gap-2">
          <Button variant="destructive" onClick={handleClearAllCourses}>
            <Trash2 className="h-4 w-4 mr-2" />
            Supprimer tout
          </Button>
          <Button onClick={handleAddCourse}>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un cours
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {events.map((event) => (
          <Card key={event.id} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {days[event.day]} • {event.startTime} - {event.endTime}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                event.type === 'class' ? 'bg-blue-100 text-blue-800' :
                event.type === 'study' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {event.type === 'class' ? 'Cours' :
                 event.type === 'study' ? 'Étude' :
                 'Autre'}
              </span>
            </div>
          </Card>
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