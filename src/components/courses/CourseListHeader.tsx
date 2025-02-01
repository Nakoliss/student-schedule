import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface CourseListHeaderProps {
  onAddCourse: () => void;
  onClearCourses: () => void;
}

export const CourseListHeader = ({ onAddCourse, onClearCourses }: CourseListHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold">Liste de cours</h1>
      <div className="flex gap-2">
        <Button variant="destructive" onClick={onClearCourses}>
          <Trash2 className="h-4 w-4 mr-2" />
          Supprimer tout
        </Button>
        <Button onClick={onAddCourse}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un cours
        </Button>
      </div>
    </div>
  );
};