import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import type { Note } from "@/components/calendar/types";

const STORAGE_KEY_PREFIX = 'course_notes_';

const NoteEditor = () => {
  const { courseId, noteId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const courseTitle = location.state?.courseTitle || "Cours";
  const initialNote = location.state?.note;
  const [note, setNote] = useState<Note | null>(initialNote);

  useEffect(() => {
    if (!note && noteId) {
      const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${courseId}`);
      if (stored) {
        const notes: Note[] = JSON.parse(stored);
        const foundNote = notes.find(n => n.id === noteId);
        if (foundNote) setNote(foundNote);
      }
    }
  }, [courseId, noteId, note]);

  const saveNote = (updatedNote: Note) => {
    const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${courseId}`);
    const notes: Note[] = stored ? JSON.parse(stored) : [];
    const updatedNotes = notes.map(n => n.id === updatedNote.id ? updatedNote : n);
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${courseId}`, JSON.stringify(updatedNotes));
    setNote(updatedNote);
  };

  const handleContentChange = (content: string) => {
    if (note) {
      const updatedNote = { ...note, content };
      saveNote(updatedNote);
    }
  };

  if (!note) return null;

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
      </div>

      <h1 className="text-4xl font-bold mb-2">{note.title}</h1>
      <h2 className="text-2xl text-muted-foreground mb-8">{courseTitle}</h2>

      <Textarea
        value={note.content}
        onChange={(e) => handleContentChange(e.target.value)}
        className="min-h-[500px] p-4"
        placeholder="Écrivez vos notes ici..."
      />
    </div>
  );
};

export default NoteEditor;