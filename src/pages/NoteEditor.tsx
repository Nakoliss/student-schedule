import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useEvents } from "@/hooks/use-events";

const STORAGE_KEY_PREFIX = 'course_notes_';

const NoteEditor = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { events } = useEvents();
  const courseTitle = location.state?.courseTitle || 
    events.find(event => event.id === courseId)?.title || 
    "Sans titre";
  const [content, setContent] = useState("");

  useEffect(() => {
    if (courseId) {
      const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${courseId}`);
      if (stored) {
        try {
          // Try to parse it in case it's JSON
          const parsed = JSON.parse(stored);
          // If it's an array or object, ignore it and start fresh
          if (typeof parsed === 'string') {
            setContent(parsed);
          }
        } catch {
          // If it's not JSON, use it directly
          setContent(stored);
        }
      }
    }
  }, [courseId]);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${courseId}`, newContent);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/courses_notes')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
      </div>

      <h1 className="text-4xl font-bold mb-8">{courseTitle}</h1>

      <div className="notebook-container">
        <Textarea
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          className="notebook-paper min-h-[calc(100vh-250px)]"
          placeholder="Écrivez vos notes ici..."
        />
      </div>
    </div>
  );
};

export default NoteEditor;