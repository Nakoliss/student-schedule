import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import type { Note } from "@/components/calendar/types";

const STORAGE_KEY_PREFIX = 'course_notes_';

const CourseNotes = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const courseTitle = location.state?.courseTitle || "Cours";
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${courseId}`);
    if (stored) {
      setNotes(JSON.parse(stored));
    }
  }, [courseId]);

  const saveNotes = (newNotes: Note[]) => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${courseId}`, JSON.stringify(newNotes));
    setNotes(newNotes);
  };

  const addNote = () => {
    const title = prompt("Titre de la note:");
    if (title) {
      const newNote: Note = {
        id: crypto.randomUUID(),
        courseId: courseId!,
        title,
        content: "",
        createdAt: new Date().toISOString()
      };
      saveNotes([...notes, newNote]);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <Button onClick={addNote}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle note
        </Button>
      </div>

      <h1 className="text-4xl font-bold mb-2">Notes de cours</h1>
      <h2 className="text-2xl text-muted-foreground mb-8">{courseTitle}</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map(note => (
          <Card
            key={note.id}
            className="p-4 hover:shadow-lg transition-shadow cursor-pointer bg-yellow-100 min-h-[200px]"
            onClick={() => navigate(`/course/${courseId}/notes/${note.id}`, { 
              state: { courseTitle, note } 
            })}
          >
            <h3 className="font-bold mb-2">{note.title}</h3>
            <p className="text-sm text-muted-foreground">
              {note.content.substring(0, 100)}
              {note.content.length > 100 ? "..." : ""}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseNotes;