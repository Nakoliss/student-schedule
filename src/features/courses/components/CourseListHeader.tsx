import { Button } from "@/components/ui/button";

interface CourseListHeaderProps {
  onAddCourse: () => void;
  onClearCourses: () => void;
}

export const CourseListHeader = ({ onAddCourse, onClearCourses }: CourseListHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Mes cours</h1>
      <div className="space-x-4">
        <Button onClick={onAddCourse}>
          Ajouter un cours
        </Button>
        <Button 
          variant="outline" 
          onClick={onClearCourses}
        >
          Effacer tout
        </Button>
      </div>
    </div>
  );
};